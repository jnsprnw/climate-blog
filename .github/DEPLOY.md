# Deployment via GitHub Actions

Diese GitHub Action baut automatisch die SvelteKit-App und lädt sie per FTP auf deinen Server hoch.

## 🚀 Trigger-Optionen

Die Action kann auf drei verschiedene Arten getriggert werden:

### 1. Automatisch bei Git Push (Standard)

```bash
git add .
git commit -m "Update content"
git push origin main
```

Die Action startet automatisch bei jedem Push auf den `main` Branch.

### 2. Manuell über GitHub UI

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **"Actions"**
3. Wähle **"Build and Deploy via FTP"** aus
4. Klicke auf **"Run workflow"**
5. Wähle den Branch und klicke auf **"Run workflow"**

### 3. Per POST-Request / API

Du kannst die Action auch per API triggern, z.B. von einem CMS, Webhook oder Script:

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/jnsprnw/climate-blog/dispatches \
  -d '{"event_type":"deploy"}'
```

**GitHub Personal Access Token erstellen:**

1. Gehe zu GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Klicke auf **"Generate new token (classic)"**
3. Wähle Scope: `repo` (Full control of private repositories)
4. Generiere und kopiere den Token
5. Verwende diesen Token in der API-Anfrage

**Beispiel mit curl aus einem Shell-Script:**

```bash
#!/bin/bash
GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/jnsprnw/climate-blog/dispatches \
  -d '{"event_type":"deploy"}'
```

## ⚙️ Setup: FTP-Credentials konfigurieren

Die Action benötigt deine FTP-Zugangsdaten. Diese werden als **GitHub Secrets** gespeichert:

### Secrets hinzufügen:

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **Settings** → **Secrets and variables** → **Actions**
3. Klicke auf **"New repository secret"**
4. Füge folgende Secrets hinzu:

| Secret Name    | Beschreibung       | Beispiel                 |
| -------------- | ------------------ | ------------------------ |
| `FTP_SERVER`   | FTP-Server-Adresse | `ftp.example.com`        |
| `FTP_USERNAME` | FTP-Benutzername   | `user@example.com`       |
| `FTP_PASSWORD` | FTP-Passwort       | `dein-sicheres-passwort` |

### FTP-Einstellungen anpassen

Falls dein Server andere Einstellungen benötigt, kannst du die Workflow-Datei anpassen:

**Datei:** `.github/workflows/deploy.yml`

```yaml
# FTP-Protokoll ändern:
protocol: ftps # Optionen: ftp, ftps, ftp-ssl

# Port ändern (Standard: 21):
port: 21

# Build-Verzeichnis anpassen:
local-dir: ./.svelte-kit/output/prerendered/pages/ # Bei adapter-static mit prerender

# Server-Zielverzeichnis anpassen:
server-dir: ./public_html/ # Oder ./httpdocs/, ./www/, ./, etc.

# Dateien ausschließen:
exclude: |
  **/.git*
  **/.git*/**
  **/node_modules/**
  **/.DS_Store
```

## 📁 Build-Verzeichnis

Die Action lädt standardmäßig das `./.svelte-kit/output/prerendered/pages/` Verzeichnis hoch. Dies enthält alle gebauten, statischen HTML/CSS/JS-Dateien nach dem Prerendering mit `@sveltejs/adapter-static`.

**Aktuell konfiguriert:** `@sveltejs/adapter-static`

### Setup für statisches Hosting via FTP:

✅ Der Adapter ist bereits konfiguriert und baut die statischen Dateien in `.svelte-kit/output/prerendered/pages/`.

**Wichtig:** Du benötigst eine `.env`-Datei mit der öffentlichen URL deiner Website:

1. **Erstelle `.env` im Root-Verzeichnis:**

   ```bash
   PUBLIC_PAGE_URL=https://deine-domain.com
   ```

2. **Für lokale Entwicklung:**
   Die `.env`-Datei wird für Production-Builds benötigt. Passe die URL an deine tatsächliche Domain an.

3. **`.gitignore` prüfen:**
   Stelle sicher, dass `.env` in deiner `.gitignore` steht, um Secrets nicht zu committen.

**GitHub Actions Environment Variable:**
Alternativ kannst du `PUBLIC_PAGE_URL` auch als GitHub Secret hinzufügen und in der Action verwenden:

```yaml
- name: Build SvelteKit app
  run: bun run build
  env:
    PUBLIC_PAGE_URL: ${{ secrets.PUBLIC_PAGE_URL }}
```

## 🔍 Action-Logs anschauen

1. Gehe zu **Actions** in deinem GitHub Repository
2. Klicke auf den laufenden/abgeschlossenen Workflow
3. Sieh dir die Logs für jeden Schritt an
4. Bei Fehlern findest du hier detaillierte Informationen

## 🔐 Sicherheit

- ✅ **Secrets werden verschlüsselt** in GitHub gespeichert
- ✅ **Niemals Passwörter** in den Code committen!
- ✅ Verwende **FTPS** statt FTP wenn möglich (verschlüsselt)
- ✅ GitHub Personal Access Tokens haben **Ablaufdaten** - rechtzeitig erneuern

## 🛠️ Troubleshooting

### Problem: "FTP connection failed"

- Überprüfe die Server-Adresse in `FTP_SERVER`
- Stelle sicher, dass der Port korrekt ist (Standard: 21)
- Versuche `protocol: ftp` statt `ftps` (oder umgekehrt)

### Problem: "Authentication failed"

- Überprüfe Username und Passwort in den Secrets
- Teste die Zugangsdaten lokal mit einem FTP-Client (z.B. FileZilla)

### Problem: "Directory not found"

- Passe `server-dir` an das Zielverzeichnis deines Servers an
- Häufige Verzeichnisse: `./public_html/`, `./httpdocs/`, `./www/`

### Problem: Build schlägt fehl

- Überprüfe, ob `bun run build` lokal funktioniert
- Stelle sicher, dass alle Dependencies in `package.json` vorhanden sind
- Prüfe, ob die `.env`-Datei mit `PUBLIC_PAGE_URL` vorhanden ist (lokal) oder als GitHub Secret konfiguriert ist

### Problem: "PUBLIC_PAGE_URL is not exported"

- Erstelle eine `.env`-Datei mit `PUBLIC_PAGE_URL=https://deine-domain.com`
- Oder füge `PUBLIC_PAGE_URL` als GitHub Secret hinzu und setze es in der Action als Environment Variable

## 📚 Weitere Optionen

### Nur bestimmte Dateien hochladen:

```yaml
include: |
  build/**
  .htaccess
```

### Alte Dateien vor Upload löschen:

```yaml
dangerous-clean-slate: true # ⚠️ Vorsicht: Löscht ALLES auf dem Server!
```

### Dry-Run (ohne tatsächlichen Upload):

```yaml
dry-run: true
```

### Verschiedene Branches auf verschiedene Server:

Erstelle mehrere Workflow-Dateien oder verwende Conditionals:

```yaml
- name: Deploy to Production
  if: github.ref == 'refs/heads/main'
  # ... FTP Upload zu Production Server

- name: Deploy to Staging
  if: github.ref == 'refs/heads/develop'
  # ... FTP Upload zu Staging Server
```
