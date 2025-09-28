'use server';

import { InstagramDataParser } from '@/lib/instagram-parser';
import { FollowAnalysis } from '@/types/instagram';

export async function analyzeUploadedFiles(
  followersFileContent: string,
  followingFileContent: string
): Promise<FollowAnalysis> {
  try {
    const parser = new InstagramDataParser();
    
    // Parse dei file HTML
    const followers = await parser.parseFollowersHTML(followersFileContent);
    const following = await parser.parseFollowingHTML(followingFileContent);
    
    // Analisi delle relazioni
    const analysis = parser.analyzeRelationships(followers, following);
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing uploaded files:', error);
    throw new Error('Errore nell\'analisi dei file. Assicurati che siano file HTML validi dall\'export Instagram.');
  }
}

export async function getAnalysisStats(analysis: FollowAnalysis) {
  return {
    totalFollowers: analysis.followers.length,
    totalFollowing: analysis.following.length,
    mutualFollows: analysis.mutualFollows.length,
    notFollowingBack: analysis.notFollowingBack.length,
    notFollowedBy: analysis.notFollowedBy.length,
    followRatio: analysis.following.length > 0 
      ? Number((analysis.followers.length / analysis.following.length).toFixed(2))
      : 0,
    mutualRatio: analysis.followers.length > 0
      ? Number((analysis.mutualFollows.length / analysis.followers.length * 100).toFixed(1))
      : 0
  };
}