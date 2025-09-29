'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, User } from 'lucide-react';
import { FollowAnalysis, InstagramFollower, InstagramFollowing } from '@/types/instagram';

interface AnalysisStats {
  totalFollowers: number;
  totalFollowing: number;
  mutualFollows: number;
  notFollowingBack: number;
  notFollowedBy: number;
  followRatio: number;
  mutualRatio: number;
}

interface InstagramAnalyzerProps {
  analysis?: FollowAnalysis;
  stats?: AnalysisStats;
}

const USERS_PER_PAGE = 20;

export default function InstagramAnalyzer({ analysis }: InstagramAnalyzerProps) {
  const [activeTab, setActiveTab] = useState<'followers' | 'following' | 'mutual' | 'not_following_back' | 'followers_not_following_back'>('not_following_back');
  const [currentPage, setCurrentPage] = useState(1);

  const tabs = useMemo(() => [
    { key: 'followers' as const, label: 'Followers', count: analysis?.totalFollowers || 0, icon: '👥', data: analysis?.mutualFollows || [] }, // Placeholder - we don't have all followers
    { key: 'following' as const, label: 'Following', count: analysis?.totalFollowing || 0, icon: '➕', data: analysis ? [...analysis.mutualFollows, ...analysis.followingNotFollowingBack] : [] }, // Combine mutual + not following back
    { key: 'mutual' as const, label: 'Reciproci', count: analysis?.mutualCount || 0, icon: '🤝', data: analysis?.mutualFollows || [] },
    { key: 'not_following_back' as const, label: 'Non ti seguono', count: analysis?.followingNotFollowingBack.length || 0, icon: '❌', data: analysis?.followingNotFollowingBack || [] },
    { key: 'followers_not_following_back' as const, label: 'Non segui', count: analysis?.followersNotFollowingBack.length || 0, icon: '👋', data: analysis?.followersNotFollowingBack || [] }
  ], [analysis]);

  const currentTabData = useMemo(() => {
    const tab = tabs.find(t => t.key === activeTab);
    return tab?.data || [];
  }, [activeTab, tabs]);

  const totalPages = Math.ceil(currentTabData.length / USERS_PER_PAGE);
  
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    return currentTabData.slice(startIndex, startIndex + USERS_PER_PAGE);
  }, [currentTabData, currentPage]);

  // Se non abbiamo dati, mostriamo un messaggio di attesa
  if (!analysis) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="text-blue-600 text-lg font-semibold mb-2">📊 Pronto per l&apos;analisi</div>
        <p className="text-blue-700">
          Carica i tuoi file Instagram usando il form sopra per vedere l&apos;analisi dettagliata.
        </p>
      </div>
    );
  }

  // Reset page when changing tabs
  const handleTabChange = (tabKey: typeof activeTab) => {
    setActiveTab(tabKey);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Mostra max 5 numeri di pagina
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
      endPage = Math.min(totalPages, startPage + showPages - 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Navigazione a tab - Responsive con 5 elementi */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="grid grid-cols-5 sm:flex sm:flex-nowrap gap-1 sm:gap-0 p-2 sm:p-0" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`
                  py-2 sm:py-4 px-1 sm:px-4 lg:px-6 border-b-2 font-medium text-xs sm:text-sm text-center rounded-t-lg sm:rounded-none
                  ${activeTab === tab.key
                    ? 'border-blue-500 text-blue-600 bg-blue-50 sm:bg-transparent'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-base">{tab.icon}</span>
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="lg:hidden text-xs leading-tight">{tab.label.split(' ')[0]}</span>
                  <span className="bg-gray-100 text-gray-600 py-0.5 px-1 sm:px-1.5 rounded-full text-xs font-semibold">
                    {tab.count.toLocaleString()}
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Header con info */}
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {tabs.find(t => t.key === activeTab)?.label}
            </h3>
            <div className="text-sm text-gray-600">
              Mostrando {Math.min(USERS_PER_PAGE, currentData.length)} di {currentTabData.length} utenti
              {totalPages > 1 && (
                <span className="ml-2">
                  (Pagina {currentPage} di {totalPages})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Lista utenti - Grid responsive e compatto */}
        <div className="p-3 sm:p-4 lg:p-6">
          {currentData.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {currentData.map((user: InstagramFollower | InstagramFollowing, index) => (
                <div key={`${user.username}-${index}`} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm lg:text-base flex-shrink-0">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate text-sm sm:text-base lg:text-lg">
                        @{user.username}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {formatDate(user.date)}
                      </p>
                    </div>
                  </div>
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex-shrink-0 bg-blue-50 hover:bg-blue-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Visualizza</span>
                    <span className="sm:hidden">→</span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nessun utente trovato</p>
              <p className="text-sm">Non ci sono utenti in questa categoria.</p>
            </div>
          )}
        </div>

        {/* Paginazione mobile-friendly */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4 bg-gray-50">
            {/* Paginazione mobile con numeri */}
            <div className="flex items-center justify-between sm:hidden">
              <div className="text-xs text-gray-500">
                Pag. {currentPage} di {totalPages}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-xs bg-white border border-gray-300 rounded disabled:opacity-50"
                >
                  ←
                </button>
                
                {/* Numeri di pagina per mobile */}
                {getPageNumbers().slice(0, 3).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 py-1 text-xs border rounded ${
                      page === currentPage
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <span className="px-1 text-xs text-gray-400">...</span>
                )}
                
                {totalPages > 3 && currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-2 py-1 text-xs border rounded ${
                      totalPages === currentPage
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-xs bg-white border border-gray-300 rounded disabled:opacity-50"
                >
                  →
                </button>
              </div>
            </div>
            
            {/* Paginazione desktop */}
            <div className="hidden sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{(currentPage - 1) * USERS_PER_PAGE + 1}</span> a{' '}
                  <span className="font-medium">{Math.min(currentPage * USERS_PER_PAGE, currentTabData.length)}</span> di{' '}
                  <span className="font-medium">{currentTabData.length}</span> risultati
                </p>
              </div>
              
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Previous button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {/* Page numbers */}
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                {/* Next button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}