'use client';

import { useState } from 'react';
import { searchUsers } from '@/app/actions/instagram-actions';
import { InstagramFollower, InstagramFollowing } from '@/types/instagram';

type SearchResult = (InstagramFollower | InstagramFollowing) & { status?: string };

export default function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const result = await searchUsers(searchTerm);
      setSearchResults(result.results);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'mutual':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">🤝 Reciproco</span>;
      case 'follower_only':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">👥 Ti segue</span>;
      case 'following_only':
        return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">➕ Lo segui</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Cerca Utenti</h2>
      
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Inserisci username da cercare..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchTerm.trim()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Cerco...' : 'Cerca'}
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 mb-2">
            Risultati ({searchResults.length})
          </h3>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {searchResults.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    @{user.username}
                  </a>
                  <p className="text-sm text-gray-500">
                    {new Date(user.date).toLocaleDateString('it-IT')}
                  </p>
                </div>
                {user.status && getStatusBadge(user.status)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}