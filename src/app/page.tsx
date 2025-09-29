'use client';

import React, { useState } from 'react';
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              📊 Risultati Analisi Instagram
            </h1>
            <button
              onClick={resetAnalysis}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              ← Carica Nuovi File
            </button>
          </div>

          {/* Statistiche principali */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Followers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFollowers.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">➕</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Following</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalFollowing.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🤝</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Seguiti Reciproci</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.mutualFollows.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rapporto F/F</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.followRatio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Componente analizzatore completo */}
          <InstagramAnalyzer analysis={analysis} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <InstagramTutorial />
      <FileUploader onFilesUploaded={handleFilesUploaded} isLoading={isLoading} />
      
      {error && (
        <div className="max-w-4xl mx-auto mt-6 px-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-2">⚠️</span>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}