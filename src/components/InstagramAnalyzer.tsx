'use client';

import { useState, useEffect } from 'react';
import { analyzeInstagramData, filterAndSortData, getDetailedStats, searchUsers } from '@/app/actions/instagram-actions';
import StatsCards from './StatsCards';
import FilterPanel from './FilterPanel';
import UsersList from './UsersList';
import SearchUsers from './SearchUsers';
import LoadingSpinner from './LoadingSpinner';
import { InstagramData } from '@/types/instagram';

export default function InstagramAnalyzer() {
  const [data, setData] = useState<InstagramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'followers' | 'following' | 'mutual' | 'not_following_back' | 'followers_not_following_back'>('followers');
  const [detailedStats, setDetailedStats] = useState<any>(null);

  // Carica i dati iniziali
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [instagramData, stats] = await Promise.all([
        analyzeInstagramData(),
        getDetailedStats()
      ]);
      
      setData(instagramData);
      setDetailedStats(stats);
    } catch (err) {
      setError('Errore nel caricamento dei dati. Assicurati che i file Instagram siano presenti nella cartella instafile.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-semibold mb-2">❌ Errore</div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={loadData}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Riprova
        </button>
      </div>
    );
  }

  if (!data || !data.analysis) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <div className="text-yellow-600 text-lg font-semibold mb-2">⚠️ Nessun dato trovato</div>
        <p className="text-yellow-700">
          I file Instagram non sono stati trovati o sono vuoti. 
          Assicurati di aver copiato i file nella cartella <code className="bg-yellow-100 px-2 py-1 rounded">instafile</code>.
        </p>
      </div>
    );
  }

  const tabs = [
    { key: 'followers' as const, label: 'Followers', count: data.analysis.totalFollowers, icon: '👥' },
    { key: 'following' as const, label: 'Following', count: data.analysis.totalFollowing, icon: '➕' },
    { key: 'mutual' as const, label: 'Reciproci', count: data.analysis.mutualCount, icon: '🤝' },
    { key: 'not_following_back' as const, label: 'Non ti seguono', count: data.analysis.followingNotFollowingBack.length, icon: '❌' },
    { key: 'followers_not_following_back' as const, label: 'Non segui', count: data.analysis.followersNotFollowingBack.length, icon: '👋' }
  ];

  return (
    <div className="space-y-8">
      {/* Statistiche principali */}
      {detailedStats && <StatsCards stats={detailedStats} />}

      {/* Ricerca utenti */}
      <SearchUsers />

      {/* Navigazione a tab */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="flex items-center space-x-2">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count.toLocaleString()}
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Pannello filtri */}
        <FilterPanel activeTab={activeTab} />

        {/* Lista utenti */}
        <UsersList type={activeTab} />
      </div>
    </div>
  );
}