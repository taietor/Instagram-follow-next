'use server';

import { InstagramDataParser } from '@/lib/instagram-parser';
import { FollowAnalysis } from '@/types/instagram';

export async function analyzeUploadedFiles(
  followersFileContent: string,
  followingFileContent: string
): Promise<FollowAnalysis> {
  try {
    // Usa i metodi statici per analizzare i file
    const analysis = InstagramDataParser.analyzeInstagramFiles(followersFileContent, followingFileContent);
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing uploaded files:', error);
    throw new Error('Errore nell\'analisi dei file. Assicurati che siano file HTML validi dall\'export Instagram.');
  }
}

export async function getAnalysisStats(analysis: FollowAnalysis) {
  return {
    totalFollowers: analysis.totalFollowers,
    totalFollowing: analysis.totalFollowing,
    mutualFollows: analysis.mutualCount,
    notFollowingBack: analysis.followingNotFollowingBack.length,
    notFollowedBy: analysis.followersNotFollowingBack.length,
    followRatio: analysis.totalFollowing > 0
      ? Number((analysis.totalFollowers / analysis.totalFollowing).toFixed(2))
      : 0,
    mutualRatio: analysis.totalFollowers > 0
      ? Number((analysis.mutualCount / analysis.totalFollowers * 100).toFixed(1))
      : 0
  };
}