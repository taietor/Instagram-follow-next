// Tipi TypeScript per i dati Instagram

export interface InstagramFollower {
  username: string;
  url: string;
  date: string;
}

export interface InstagramFollowing {
  username: string;
  url: string;
  date: string;
}

export interface FollowAnalysis {
  mutualFollows: InstagramFollower[];
  followingNotFollowingBack: InstagramFollowing[];
  followersNotFollowingBack: InstagramFollower[];
  totalFollowers: number;
  totalFollowing: number;
  mutualCount: number;
}

export interface InstagramData {
  followers: InstagramFollower[];
  following: InstagramFollowing[];
  analysis: FollowAnalysis | null;
}

export interface InstagramPost {
  title?: string;
  media?: Array<{
    uri: string;
    creation_timestamp: number;
  }>;
  timestamp?: number;
}

export interface InstagramMessage {
  sender_name: string;
  timestamp_ms: number;
  content?: string;
  type?: string;
}

export interface InstagramLikedPost {
  title: string;
  string_list_data: Array<{
    href: string;
    value: string;
    timestamp: number;
  }>;
}

export interface SearchFilter {
  searchTerm: string;
  dateFrom: string;
  dateTo: string;
  type: 'all' | 'followers' | 'following' | 'mutual' | 'not_following_back';
}