# 📊 Instagram Follow Analyzer

Un'applicazione Next.js per analizzare i tuoi dati Instagram e scoprire chi ti segue, chi segui e le relazioni reciproche.

## 🌟 Funzionalità

- ✅ **Analisi completa dei follower/following**
- ✅ **Statistiche dettagliate** (follower, following, rapporti)
- ✅ **Identificazione non-follower** (chi non ti segue indietro)
- ✅ **Ricerca utenti** con filtri avanzati
- ✅ **Interface responsive** e user-friendly
- ✅ **Privacy-first** - tutto elaborato localmente
- ✅ **Open source** e completamente gratuito

## 🚀 Come iniziare

### 1. Scarica i tuoi dati Instagram

1. **Accedi a Instagram** sul web o app
2. Vai su **Impostazioni** → **Privacy e sicurezza** → **Scarica le tue informazioni**
3. Clicca su **Richiedi download**

### 2. ⚠️ IMPORTANTE: Seleziona SOLO questi dati

Quando Instagram ti chiede "Choose specific info to export", **seleziona SOLO**:

#### ✅ **Connections** (OBBLIGATORIO)
```
☑️ Connections
   ☑️ Followers and following  ← QUESTO È ESSENZIALE
   ☐ Contacts                 ← Non necessario
```

#### ❌ **NON selezionare questi** (per ridurre dimensioni e tempo):
```
☐ Your Instagram activity
   ☐ Avatars Store
   ☐ Checkout  
   ☐ Comments
   ☐ Events
   ☐ Fundraisers
   ☐ Gifts
   ☐ Likes
   ☐ Meta Spark
   ☐ Monetization
   ☐ Saved
   ☐ Story interactions
   ☐ Subscriptions
   ☐ Other activity
   ☐ Quicksnaps
   ☐ Threads
   ☐ Media
   ☐ Edits
   ☐ Reports
   ☐ Shared access
   ☐ AI
   ☐ Messages

☐ Personal information
☐ Logged information  
☐ Security and login information
☐ Apps and websites off of Instagram
☐ Preferences
☐ Ads information
```

### 3. Configurazione download

- **Formato**: Seleziona **HTML** (non JSON)
- **Qualità media**: Bassa (non importa per i follower)
- **Range di date**: Tutto il periodo

### 4. Attendi il download

- Instagram ti invierà un'email quando i dati saranno pronti
- Il processo può richiedere da pochi minuti a diverse ore
- Riceverai un file ZIP da scaricare

### 5. Estrai e usa l'app

1. **Estrai il file ZIP** 
2. Vai nella cartella: `connections/followers_and_following/`
3. **Carica questi 2 file** nella nostra app:
   - `followers_1.html`
   - `following.html`

## 📁 Struttura file necessari

Dopo aver estratto il ZIP, dovresti avere:
```
instagram-export/
└── connections/
    └── followers_and_following/
        ├── followers_1.html     ← CARICA QUESTO
        ├── following.html       ← CARICA QUESTO
        ├── blocked_profiles.html
        ├── close_friends.html
        └── ... (altri file non necessari)
```

## 🎯 Come usare l'app

1. **Avvia l'applicazione**:
   ```bash
   npm install
   npm run dev
   ```

2. **Apri** http://localhost:3000

3. **Carica i file**:
   - Clicca su "Carica File Instagram"
   - Seleziona `followers_1.html` e `following.html`
   - Clicca "Analizza Dati"

4. **Visualizza i risultati**:
   - Statistiche generali
   - Lista follower/following
   - Chi non ti segue indietro
   - Ricerca e filtri

## 🔧 Installazione Sviluppo

```bash
# Clona il repository
git clone https://github.com/tuousername/instagram-follow-next.git
cd instagram-follow-next

# Installa dipendenze
npm install

# Avvia in modalità sviluppo
npm run dev

# Build per produzione
npm run build
npm start
```

## 🛠️ Stack Tecnologico

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling moderno
- **Cheerio** - Parsing HTML
- **Lucide React** - Icone moderne
- **Server Actions** - Processing server-side

## 🔒 Privacy e Sicurezza

- ✅ **Nessun dato salvato**: I file vengono processati solo in memoria
- ✅ **Processing locale**: Tutto avviene nel tuo browser/server locale
- ✅ **Open source**: Codice completamente ispezionabile
- ✅ **No tracking**: Nessun analytics o tracking di terze parti
- ✅ **Temporaneo**: I file vengono eliminati dopo l'elaborazione

## 📊 Cosa puoi scoprire

### Statistiche Base
- Numero totale follower
- Numero totale following  
- Rapporto follower/following
- Data ultimo aggiornamento

### Analisi Avanzata
- **Ghost Followers**: Chi ti segue ma tu non segui
- **Non-Followers**: Chi segui ma non ti segue indietro
- **Mutual Friends**: Follower reciproci
- **Recent Activity**: Utenti recenti per data

### Funzionalità di Ricerca
- Ricerca per username
- Filtri per tipo di relazione
- Ordinamento per data/nome
- Paginazione per liste lunghe

## 🤝 Contributi

Contributi benvenuti! Per favore:

1. Fork il repository
2. Crea un branch per la tua feature
3. Commit le modifiche
4. Push al branch
5. Apri una Pull Request

## 📄 Licenza

MIT License - vedi il file [LICENSE](LICENSE) per dettagli.

## ⚠️ Disclaimer

Questa app non è affiliata con Meta/Instagram. Usa i dati a tuo rischio e rispetta sempre i termini di servizio di Instagram.

---

**Made with ❤️ per aiutare a capire meglio le tue connessioni Instagram**