import * as cheerio from 'cheerio';
import { InstagramFollower, InstagramFollowing, FollowAnalysis } from '@/types/instagram';

type SortableData = InstagramFollower | InstagramFollowing;

export class InstagramDataParser {
  /**
   * Parsa il file HTML dei followers
   */
  parseFollowersHTML(htmlContent: string): InstagramFollower[] {
    const $ = cheerio.load(htmlContent);
    const followers: InstagramFollower[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $('._a6-g').each((_index: number, element: any) => {
      const $element = $(element);
      const $link = $element.find('a[href*="instagram.com"]');
      const username = $link.attr('href')?.split('/').pop();
      const dateText = $element.find('div').last().text();

      if (username && dateText) {
        followers.push({
          username: username,
          url: $link.attr('href') || '',
          date: this.parseDate(dateText)
        });
      }
    });

    return followers;
  }

  /**
   * Parsa il file HTML dei following
   */
  parseFollowingHTML(htmlContent: string): InstagramFollowing[] {
    const $ = cheerio.load(htmlContent);
    const following: InstagramFollowing[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $('._a6-g').each((_index: number, element: any) => {
      const $element = $(element);
      const $link = $element.find('a[href*="instagram.com"]');
      const username = $link.attr('href')?.split('/').pop();
      const dateText = $element.find('div').last().text();

      if (username && dateText) {
        following.push({
          username: username,
          url: $link.attr('href') || '',
          date: this.parseDate(dateText)
        });
      }
    });

    return following;
  }

  /**
   * Analizza le relazioni di follow
   */
  analyzeRelationships(
    followers: InstagramFollower[], 
    following: InstagramFollowing[]
  ): FollowAnalysis {
    const followersSet = new Set(followers.map(f => f.username));
    const followingSet = new Set(following.map(f => f.username));

    // Mutual follows (si seguono a vicenda)
    const mutualFollows = followers.filter(follower => 
      followingSet.has(follower.username)
    );

    // Following ma non ti seguono indietro
    const followingNotFollowingBack = following.filter(followed => 
      !followersSet.has(followed.username)
    );

    // Ti seguono ma tu non li segui
    const followersNotFollowingBack = followers.filter(follower => 
      !followingSet.has(follower.username)
    );

    return {
      mutualFollows,
      followingNotFollowingBack,
      followersNotFollowingBack,
      totalFollowers: followers.length,
      totalFollowing: following.length,
      mutualCount: mutualFollows.length
    };
  }

  /**
   * Metodo principale per analizzare i file Instagram
   */
  analyzeInstagramFiles(followersHtml: string, followingHtml: string): FollowAnalysis {
    const followers = this.parseFollowersHTML(followersHtml);
    const following = this.parseFollowingHTML(followingHtml);
    return this.analyzeRelationships(followers, following);
  }

  /**
   * Converte il formato data di Instagram in ISO string
   */
  private parseDate(dateString: string): string {
    try {
      // Instagram date format: "Sep 24, 2025 1:44 am"
      const date = new Date(dateString);
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  /**
   * Filtra i risultati in base ai criteri
   */
  static filterData(
    data: SortableData[], 
    searchTerm: string, 
    dateFrom: string, 
    dateTo: string
  ): SortableData[] {
    return data.filter(item => {
      // Filtro per termine di ricerca
      if (searchTerm && !item.username.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtro per data
      if (dateFrom || dateTo) {
        const itemDate = new Date(item.date);
        if (dateFrom && itemDate < new Date(dateFrom)) return false;
        if (dateTo && itemDate > new Date(dateTo)) return false;
      }

      return true;
    });
  }

  /**
   * Ordina i dati
   */
  static sortData(data: SortableData[], sortBy: 'username' | 'date', order: 'asc' | 'desc' = 'asc'): SortableData[] {
    return [...data].sort((a, b) => {
      let aValue: string | number, bValue: string | number;
      
      if (sortBy === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      } else {
        aValue = a.username.toLowerCase();
        bValue = b.username.toLowerCase();
      }

      if (order === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
  }

  /**
   * Ottiene statistiche dettagliate
   */
  static getDetailedStats(analysis: FollowAnalysis) {
    const followBackRate = analysis.totalFollowers > 0 
      ? (analysis.mutualCount / analysis.totalFollowers * 100).toFixed(2)
      : '0';

    const followingRate = analysis.totalFollowing > 0
      ? (analysis.mutualCount / analysis.totalFollowing * 100).toFixed(2)
      : '0';

    return {
      ...analysis,
      followBackRate: parseFloat(followBackRate),
      followingRate: parseFloat(followingRate),
      ratio: analysis.totalFollowing > 0 
        ? (analysis.totalFollowers / analysis.totalFollowing).toFixed(2)
        : 'N/A'
    };
  }
}