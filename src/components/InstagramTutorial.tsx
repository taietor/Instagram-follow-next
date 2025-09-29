'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, HelpCircle } from 'lucide-react';

export default function InstagramTutorial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left hover:bg-white/50 rounded-lg p-2 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-blue-600 text-white p-1.5 sm:p-2 rounded-full flex-shrink-0 mt-0.5">
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <h3 className="text-base sm:text-lg font-bold text-blue-900 leading-tight">
                📱 Come scaricare i dati Instagram
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-blue-700 opacity-90 leading-tight">
              Guida passo-passo per ottenere i file necessari
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
            Cliccami
          </span>
          <div className="ml-1">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            )}
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-3 sm:space-y-4">
          {/* Step 1 - Navigazione migliorata */}
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-blue-100 shadow-sm">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</div>
              Vai su Instagram e richiedi i tuoi dati
            </h4>
            
            {/* Percorso mobile-friendly */}
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-gray-800 mb-2">📱 Su Mobile:</p>
                <div className="flex flex-wrap gap-1 text-gray-700">
                  <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium">Profilo</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium">☰ Menu</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium">Centro gestione account</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium">Le tue informazioni → Autorizzazioni</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-green-100 px-2 py-1 rounded text-xs font-bold text-green-800">Esporta le tue informazioni</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-gray-800 mb-2">💻 Su Desktop:</p>
                <div className="flex flex-wrap gap-1 text-gray-700">
                  <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium">Impostazioni</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-blue-100 px-2 py-1 rounded text-xs font-medium">Privacy e sicurezza</span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-green-100 px-2 py-1 rounded text-xs font-bold text-green-800">Scarica le tue informazioni</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-xs sm:text-sm text-gray-700">Clicca su <strong>&ldquo;Richiedi download&rdquo;</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-xs sm:text-sm text-gray-700">Seleziona <strong>&ldquo;Alcune delle tue informazioni&rdquo;</strong></span>
              </div>
            </div>
          </div>

          {/* Step 2 - Selezione dati */}
          <div className="bg-green-50 rounded-xl p-3 sm:p-4 border border-green-200 shadow-sm">
            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</div>
              Seleziona SOLO questi dati
            </h4>
            <div className="bg-white rounded-lg border p-3 sm:p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold text-lg">☑️</span>
                  <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">Connections</span>
                </div>
                <div className="ml-6 pl-2 border-l-2 border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-600 text-sm">☑️</span>
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">Followers and following</span>
                    <span className="bg-red-100 text-red-600 px-1 py-0.5 rounded text-xs font-bold">ESSENZIALE!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">☐</span>
                    <span className="text-gray-500 text-xs line-through">Contacts (non necessario)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 - Cosa NON selezionare */}
          <div className="bg-red-50 rounded-xl p-3 sm:p-4 border border-red-200 shadow-sm">
            <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <div className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</div>
              NON selezionare (per velocità)
            </h4>
            <div className="bg-white rounded-lg border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-gray-400">☐</span>
                <span className="text-gray-600">Your Instagram activity</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">☐</span>
                <span className="text-gray-600">Personal information</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">☐</span>
                <span className="text-gray-600">Logged information</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">☐</span>
                <span className="text-gray-600">Security info</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">☐</span>
                <span className="text-gray-600">Apps & websites</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">☐</span>
                <span className="text-gray-600">Ads information</span>
              </div>
            </div>
          </div>

          {/* Step 4 - Configurazione download */}
          <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200 shadow-sm">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</div>
              Configurazione download
            </h4>
            <div className="space-y-3">
              <div className="bg-white rounded-lg border p-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-blue-900 text-xs uppercase tracking-wide">Formato</div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-bold text-center">
                      HTML ✅
                    </div>
                    <div className="text-xs text-blue-600 text-center">
                      Non JSON
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-blue-900 text-xs uppercase tracking-wide">Qualità</div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-bold text-center">
                      Bassa ✅
                    </div>
                    <div className="text-xs text-blue-600 text-center">
                      Più veloce
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-blue-900 text-xs uppercase tracking-wide">Periodo</div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-bold text-center">
                      Tutto ✅
                    </div>
                    <div className="text-xs text-blue-600 text-center">
                      Completo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 - File necessari */}
          <div className="bg-purple-50 rounded-xl p-3 sm:p-4 border border-purple-200 shadow-sm">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
              <FileText className="w-4 h-4" />
              File da caricare
            </h4>
            <div className="bg-white rounded-lg border p-3 overflow-x-auto">
              <div className="font-mono text-xs sm:text-sm whitespace-nowrap">
                <div className="text-gray-600">📁 instagram-export.zip/</div>
                <div className="text-gray-600 ml-4">└── 📁 connections/</div>
                <div className="text-gray-600 ml-8">└── 📁 followers_and_following/</div>
                <div className="text-purple-600 ml-12 font-bold">├── 📄 followers_1.html ← CARICA</div>
                <div className="text-purple-600 ml-12 font-bold">├── 📄 following.html ← CARICA</div>
                <div className="text-gray-400 ml-12">├── 📄 blocked_profiles.html</div>
                <div className="text-gray-400 ml-12">└── 📄 ...</div>
              </div>
            </div>
          </div>

          {/* Step 6 - Tempi e Privacy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-yellow-50 rounded-xl p-3 sm:p-4 border border-yellow-200 shadow-sm">
              <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2 text-sm">
                ⏰ Tempi di attesa
              </h4>
              <div className="text-yellow-800 text-xs sm:text-sm">
                Instagram ti invierà un&apos;email quando i dati saranno pronti. 
                Il processo può richiedere da <span className="font-bold">pochi minuti a diverse ore</span>.
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                🔒 Privacy garantita
              </h4>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✅</span>
                  <span>Elaborazione solo locale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✅</span>
                  <span>Nessun salvataggio online</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✅</span>
                  <span>File eliminati dopo analisi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✅</span>
                  <span>Codice open source</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}