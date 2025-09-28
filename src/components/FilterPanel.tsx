'use client';

import { useState } from 'react';

interface FilterPanelProps {
  activeTab: 'followers' | 'following' | 'mutual' | 'not_following_back' | 'followers_not_following_back';
}

export default function FilterPanel({ activeTab }: FilterPanelProps) {
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date' as 'username' | 'date',
    order: 'desc' as 'asc' | 'desc'
  });

  const getTabDescription = () => {
    switch (activeTab) {
      case 'followers':
        return 'Persone che ti seguono su Instagram';
      case 'following':
        return 'Persone che segui su Instagram';
      case 'mutual':
        return 'Persone che ti seguono e che segui (followers reciproci)';
      case 'not_following_back':
        return 'Persone che segui ma che non ti seguono indietro';
      case 'followers_not_following_back':
        return 'Persone che ti seguono ma che non segui';
      default:
        return '';
    }
  };

  return (
    <div className="p-6 bg-gray-50 border-b border-gray-200">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {activeTab === 'followers' && '👥 Followers'}
          {activeTab === 'following' && '➕ Following'}
          {activeTab === 'mutual' && '🤝 Followers Reciproci'}
          {activeTab === 'not_following_back' && '❌ Non ti seguono indietro'}
          {activeTab === 'followers_not_following_back' && '👋 Non segui indietro'}
        </h3>
        <p className="text-gray-600">{getTabDescription()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cerca username
          </label>
          <input
            type="text"
            placeholder="@username"
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data da
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data a
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordina per
          </label>
          <select
            value={`${filters.sortBy}_${filters.order}`}
            onChange={(e) => {
              const [sortBy, order] = e.target.value.split('_');
              setFilters(prev => ({ 
                ...prev, 
                sortBy: sortBy as 'username' | 'date',
                order: order as 'asc' | 'desc'
              }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date_desc">Data (più recenti)</option>
            <option value="date_asc">Data (più vecchi)</option>
            <option value="username_asc">Username (A-Z)</option>
            <option value="username_desc">Username (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Applica Filtri
        </button>
        <button 
          onClick={() => setFilters({
            searchTerm: '',
            dateFrom: '',
            dateTo: '',
            sortBy: 'date',
            order: 'desc'
          })}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}