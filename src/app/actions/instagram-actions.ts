'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { InstagramDataParser } from '@/lib/instagram-parser';
import { InstagramData, SearchFilter, InstagramFollower, InstagramFollowing } from '@/types/instagram';

/**
 * Carica e analizza i file di Instagram
 */
export async function analyzeInstagramData(): Promise<InstagramData> {
  try {
    const instafileDir = path.join(process.cwd(), 'instafile');
    
    // Leggi i file followers e following
    const followersPath = path.join(instafileDir, 'connections/followers_and_following/followers_1.html');
    const followingPath = path.join(instafileDir, 'connections/followers_and_following/following.html');
    
    const [followersContent, followingContent] = await Promise.all([
      fs.readFile(followersPath, 'utf-8'),
      fs.readFile(followingPath, 'utf-8')
    ]);

    // Parsa i dati
    const followers = InstagramDataParser.parseFollowersHTML(followersContent);
    const following = InstagramDataParser.parseFollowingHTML(followingContent);
    
    // Analizza le relazioni
    const analysis = InstagramDataParser.analyzeRelationships(followers, following);

    return {
      followers,
      following,
      analysis
    };
  } catch (error) {
    console.error('Errore nell\'analisi dei dati Instagram:', error);
    return {
      followers: [],
      following: [],
      analysis: null
    };
  }
}

/**
 * Filtra e ordina i dati in base ai criteri
 */
export async function filterAndSortData(
  type: 'followers' | 'following' | 'mutual' | 'not_following_back' | 'followers_not_following_back',
  searchTerm: string = '',
  dateFrom: string = '',
  dateTo: string = '',
  sortBy: 'username' | 'date' = 'date',
  order: 'asc' | 'desc' = 'desc'
) {
  try {
    const data = await analyzeInstagramData();
    
    let targetData: (InstagramFollower | InstagramFollowing)[];
    switch (type) {
      case 'followers':
        targetData = data.followers;
        break;
      case 'following':
        targetData = data.following;
        break;
      case 'mutual':
        targetData = data.analysis?.mutualFollows || [];
        break;
      case 'not_following_back':
        targetData = data.analysis?.followingNotFollowingBack || [];
        break;
      case 'followers_not_following_back':
        targetData = data.analysis?.followersNotFollowingBack || [];
        break;
      default:
        targetData = [];
    }

    // Applica filtri
    let filteredData = InstagramDataParser.filterData(targetData, searchTerm, dateFrom, dateTo);
    
    // Applica ordinamento
    filteredData = InstagramDataParser.sortData(filteredData, sortBy, order);

    return {
      data: filteredData,
      total: filteredData.length,
      analysis: data.analysis
    };
  } catch (error) {
    console.error('Errore nel filtraggio dei dati:', error);
    return {
      data: [],
      total: 0,
      analysis: null
    };
  }
}

/**
 * Ottiene statistiche dettagliate
 */
export async function getDetailedStats() {
  try {
    const data = await analyzeInstagramData();
    
    if (!data.analysis) {
      return null;
    }

    return InstagramDataParser.getDetailedStats(data.analysis);
  } catch (error) {
    console.error('Errore nel calcolo delle statistiche:', error);
    return null;
  }
}

/**
 * Esporta i dati filtrati in formato JSON
 */
export async function exportFilteredData(
  type: 'followers' | 'following' | 'mutual' | 'not_following_back' | 'followers_not_following_back',
  filters: SearchFilter
) {
  try {
    const result = await filterAndSortData(
      type,
      filters.searchTerm,
      filters.dateFrom,
      filters.dateTo
    );

    return {
      success: true,
      data: result.data,
      filename: `instagram_${type}_${new Date().toISOString().split('T')[0]}.json`
    };
  } catch (error) {
    console.error('Errore nell\'esportazione:', error);
    return {
      success: false,
      error: 'Errore nell\'esportazione dei dati'
    };
  }
}

/**
 * Cerca utenti specifici
 */
export async function searchUsers(searchTerm: string) {
  try {
    const data = await analyzeInstagramData();
    
    const searchLower = searchTerm.toLowerCase();
    
    const foundInFollowers = data.followers.filter(user => 
      user.username.toLowerCase().includes(searchLower)
    );
    
    const foundInFollowing = data.following.filter(user => 
      user.username.toLowerCase().includes(searchLower)
    );

    // Determina lo stato di ogni utente trovato
    const followersSet = new Set(data.followers.map(f => f.username));
    const followingSet = new Set(data.following.map(f => f.username));

    const results: Array<{
      username: string;
      url: string;
      date: string;
      status: 'mutual' | 'follower_only' | 'following_only';
      source: 'followers' | 'following';
    }> = [];
    
    // Aggiungi risultati dai followers
    foundInFollowers.forEach(user => {
      results.push({
        ...user,
        status: followingSet.has(user.username) ? 'mutual' : 'follower_only',
        source: 'followers'
      });
    });
    
    // Aggiungi risultati dai following (evitando duplicati)
    foundInFollowing.forEach(user => {
      if (!foundInFollowers.find(f => f.username === user.username)) {
        results.push({
          ...user,
          status: followersSet.has(user.username) ? 'mutual' : 'following_only',
          source: 'following'
        });
      }
    });

    return {
      results,
      total: results.length
    };
  } catch (error) {
    console.error('Errore nella ricerca utenti:', error);
    return {
      results: [],
      total: 0
    };
  }
}