'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import InstagramAnalyzer from '@/components/InstagramAnalyzer';
import InstagramTutorial from '@/components/InstagramTutorial';
import { analyzeUploadedFiles, getAnalysisStats } from '@/app/actions/file-upload-actions';
import { FollowAnalysis } from '@/types/instagram';

interface AnalysisStats {
  totalFollowers: number;
  totalFollowing: number;
  mutualFollows: number;
  notFollowingBack: number;
  notFollowedBy: number;
  followRatio: number;
  mutualRatio: number;
}

export default function Home() {
  const [analysis, setAnalysis] = useState<FollowAnalysis | null>(null);
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesUploaded = async (followersFile: File, followingFile: File) => {
    try {
      setIsLoading(true);
      setError(null);

      // Leggiamo il contenuto dei file
      const followersContent = await followersFile.text();
      const followingContent = await followingFile.text();

      // Analizziamo i file
      const analysisResult = await analyzeUploadedFiles(followersContent, followingContent);
      const statsResult = await getAnalysisStats(analysisResult);

      setAnalysis(analysisResult);
      setStats(statsResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto durante l\'analisi');
      console.error('Error analyzing files:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setStats(null);
    setError(null);
  };

  if (analysis && stats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Header responsive */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                📊 Analisi Instagram
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                I tuoi risultati di analisi dei follower
              </p>
            </div>
            <button
              onClick={resetAnalysis}
              className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Carica Nuovi File</span>
            </button>
          </div>

          {/* Statistiche principali - 4 colonne anche su mobile */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-6">
            <div className="bg-white p-2 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 lg:mb-3">
                  <span className="text-sm sm:text-lg lg:text-2xl">👥</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">Followers</p>
                <p className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">{stats.totalFollowers.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-2 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 lg:mb-3">
                  <span className="text-sm sm:text-lg lg:text-2xl">➕</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">Following</p>
                <p className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">{stats.totalFollowing.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-2 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 lg:mb-3">
                  <span className="text-sm sm:text-lg lg:text-2xl">🤝</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">Reciproci</p>
                <p className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">{stats.mutualFollows.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-2 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-1 sm:mb-2 lg:mb-3">
                  <span className="text-sm sm:text-lg lg:text-2xl">📊</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-0.5 sm:mb-1">Rapporto</p>
                <p className="text-sm sm:text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900">{stats.followRatio}</p>
              </div>
            </div>
          </div>

          {/* Componente analizzatore */}
          <InstagramAnalyzer analysis={analysis} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto">
          <InstagramTutorial />
          <FileUploader onFilesUploaded={handleFilesUploaded} isLoading={isLoading} />
          
          {error && (
            <div className="mt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
                  <p className="text-red-700 text-sm sm:text-base">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}