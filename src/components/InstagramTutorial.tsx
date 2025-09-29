'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, FileText, HelpCircle } from 'lucide-react';

export default function InstagramTutorial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">
            📱 Come scaricare i dati Instagram corretti
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-4 text-sm">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Download className="w-4 h-4" />
              1. Richiedi i tuoi dati Instagram
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Vai su <strong>Instagram → Impostazioni → Privacy → Scarica le tue informazioni</strong></li>
              <li>Clicca su <strong>&ldquo;Richiedi download&rdquo;</strong></li>
              <li>Seleziona <strong>&ldquo;Alcune delle tue informazioni&rdquo;</strong></li>
            </ol>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">
              ✅ Seleziona SOLO questo:
            </h4>
            <div className="bg-white rounded border p-3 font-mono text-sm">
              <div className="text-green-600">☑️ <strong>Connections</strong></div>
              <div className="ml-4 text-green-600">☑️ Followers and following</div>
              <div className="ml-4 text-gray-500">☐ Contacts</div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">
              ❌ NON selezionare questi (per ridurre tempo e dimensioni):
            </h4>
            <div className="bg-white rounded border p-3 font-mono text-xs space-y-1">
              <div className="text-gray-500">☐ Your Instagram activity</div>
              <div className="text-gray-500">☐ Personal information</div>
              <div className="text-gray-500">☐ Logged information</div>
              <div className="text-gray-500">☐ Security and login information</div>
              <div className="text-gray-500">☐ Apps and websites off of Instagram</div>
              <div className="text-gray-500">☐ Preferences</div>
              <div className="text-gray-500">☐ Ads information</div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">
              ⚙️ Configurazione:
            </h4>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Formato:</strong> HTML (non JSON)</li>
              <li><strong>Qualità media:</strong> Bassa</li>
              <li><strong>Range di date:</strong> Tutto il periodo</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              2. File necessari per l&apos;app:
            </h4>
            <div className="bg-white rounded border p-3 font-mono text-sm">
              <div className="text-gray-600">📁 instagram-export.zip/</div>
              <div className="text-gray-600 ml-4">└── 📁 connections/</div>
              <div className="text-gray-600 ml-8">└── 📁 followers_and_following/</div>
              <div className="text-purple-600 ml-12">├── 📄 <strong>followers_1.html</strong> ← CARICA</div>
              <div className="text-purple-600 ml-12">├── 📄 <strong>following.html</strong> ← CARICA</div>
              <div className="text-gray-400 ml-12">├── 📄 blocked_profiles.html</div>
              <div className="text-gray-400 ml-12">└── 📄 ...</div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">
              ⏰ Tempi di attesa:
            </h4>
            <p className="text-gray-700">
              Instagram ti invierà un&apos;email quando i dati saranno pronti. 
              Il processo può richiedere da <strong>pochi minuti a diverse ore</strong> 
              a seconda della quantità di dati.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">
              🔒 Privacy garantita:
            </h4>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>✅ I file vengono processati solo localmente</li>
              <li>✅ Nessun dato viene salvato sui nostri server</li>
              <li>✅ I file vengono eliminati dopo l&apos;analisi</li>
              <li>✅ Codice completamente open source</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}