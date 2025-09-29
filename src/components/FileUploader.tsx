'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FileUploaderProps {
  onFilesUploaded: (followersFile: File, followingFile: File) => void;
  isLoading?: boolean;
}

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  type: 'followers' | 'following';
}

export default function FileUploader({ onFilesUploaded, isLoading = false }: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const detectFileType = (filename: string): 'followers' | 'following' | null => {
    const lowerName = filename.toLowerCase();
    if (lowerName.includes('followers')) return 'followers';
    if (lowerName.includes('following')) return 'following';
    return null;
  };

  const handleFiles = useCallback((files: FileList) => {
    setError(null);
    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach(file => {
      // Controlla se è un file HTML
      if (file.type !== 'text/html' && !file.name.endsWith('.html')) {
        setError(`${file.name} non è un file HTML valido. Carica solo i file .html dall'export di Instagram.`);
        return;
      }

      const fileType = detectFileType(file.name);
      if (!fileType) {
        setError(`Impossibile determinare il tipo di ${file.name}. Assicurati che il nome contenga "followers" o "following".`);
        return;
      }

      newFiles.push({
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: fileType
      });
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const canAnalyze = (): boolean => {
    const hasFollowers = uploadedFiles.some(f => f.type === 'followers');
    const hasFollowing = uploadedFiles.some(f => f.type === 'following');
    return hasFollowers && hasFollowing;
  };

  const handleAnalyze = () => {
    const followersFile = uploadedFiles.find(f => f.type === 'followers')?.file;
    const followingFile = uploadedFiles.find(f => f.type === 'following')?.file;

    if (followersFile && followingFile) {
      onFilesUploaded(followersFile, followingFile);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header con istruzioni */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📊 Analizzatore Instagram
        </h1>
        <p className="text-gray-600 mb-6">
          Carica i file HTML dal tuo export Instagram per analizzare followers e following
        </p>
      </div>

      {/* Area di upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".html"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
        />
        
        <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
        <p className="text-base sm:text-lg font-medium text-gray-700 mb-2 px-2">
          Trascina qui i file HTML o{' '}
          <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
            selezionali
          </label>
        </p>
        <p className="text-xs sm:text-sm text-gray-500 px-2">
          Carica <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">followers_1.html</code> e <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">following.html</code>
        </p>
      </div>

      {/* Errori */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm sm:text-base">{error}</p>
          </div>
        </div>
      )}

      {/* Lista file caricati */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3 sm:mb-4 px-1">File caricati:</h3>
          <div className="space-y-2 sm:space-y-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center min-w-0 flex-1">
                  <FileText className={`w-5 h-5 mr-3 flex-shrink-0 ${
                    file.type === 'followers' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{file.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {file.size} • {file.type === 'followers' ? 'Followers' : 'Following'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-600 hover:text-red-800 p-1.5 sm:p-2 ml-2 flex-shrink-0 rounded-md hover:bg-red-50 transition-colors"
                  disabled={isLoading}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pulsante analisi */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 text-center">
          {canAnalyze() ? (
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analizzando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Inizia Analisi
                </>
              )}
            </button>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
              <p className="text-yellow-800 text-sm sm:text-base">
                ⚠️ Carica entrambi i file (followers e following) per iniziare l&apos;analisi
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}