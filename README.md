### 🛠️ 0. Folder Structure
```
your-project/
├── angular.json                  # Angular CLI config
├── package.json                  # npm dependencies + scripts
├── package-lock.json             # exact versions installed
├── README.md                     # project info/instructions
├── tsconfig*.json                # TypeScript config
├── public/                       # Static assets like favicon
├── src/                          # Main source folder
│   ├── app/                      # App logic: components, services, routing
│   │   ├── dashboard-i/          # Dashboard for internal users
│   │   ├── dashboard-o/          # Dashboard for external users
│   │   ├── login/, auth/, util/  # Login, auth guards, helpers
│   ├── assets/                   # Static files (e.g. images)
│   ├── environments/             # Separate dev/prod configs
│   ├── main.ts                   # App entry point
│   └── styles.css                # Global styles
```
---

### 🧱 1. Install Node & npm (first time only)

#### Linux/macOS
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

---

### 📦 2. Install Angular CLI (first time only)
```bash
npm install -g @angular/cli
```

---

### 📂 3. Navigate to your project
```bash
cd /path/to/your-project
```
Or open it in VSCode or WebStorm
---

### 📥 4. Install the dependencies
This looks at `package.json` and installs what's needed:

```bash
npm install
```

This creates:
```
node_modules/       # 🔁 where all dependencies are installed
```

---

### 🚀 5. Run the project
Start the Angular dev server:

```bash
ng serve
```

It compiles your app, watches for changes, and serves it at:
```
http://localhost:4200/
```

---

### 🧭 Where Angular looks and what it uses

- **Starts at:** `src/main.ts`
  - Loads `AppComponent` from `src/app/app.component.ts`
- **HTML Shell:** `src/index.html` → has `<app-root></app-root>` for AppComponent
- **Routing:** `src/app/app.routes.ts` defines which components to load per URL
- **Modules/Components:** all organized under `src/app/`
- **Environment:** picks `src/environments/environment.ts` (or `.development.ts` if `--configuration=development`)
- **Global styles:** `src/styles.css`
- **Assets:** `src/assets/` → copied as-is to the output `dist/` folder
- **Favicons/Icons:** from `public/` (Angular uses this if specified in `angular.json`)

---
