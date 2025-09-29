import { InstagramFollower, InstagramFollowing } from '@/types/instagram';

interface StatsCardsProps {
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    mutualCount: number;
    followBackRate: number;
    followingRate: number;
    ratio: string;
    followingNotFollowingBack: InstagramFollowing[];
    followersNotFollowingBack: InstagramFollower[];
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Followers',
      value: stats.totalFollowers.toLocaleString(),
      icon: '👥',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Following',
      value: stats.totalFollowing.toLocaleString(),
      icon: '➕',
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      title: 'Reciproci',
      value: stats.mutualCount.toLocaleString(),
      icon: '🤝',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'Ratio F/F',
      value: stats.ratio,
      icon: '📊',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      title: 'Follow Back Rate',
      value: `${stats.followBackRate}%`,
      icon: '📈',
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      title: 'Non ti seguono',
      value: stats.followingNotFollowingBack.length.toLocaleString(),
      icon: '❌',
      color: 'bg-red-50 text-red-700 border-red-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`rounded-lg border p-4 ${card.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            <div className="text-2xl">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}