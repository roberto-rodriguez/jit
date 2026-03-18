Project structure
- Java/Spring web app output path remains: jit/src/main/webapp
- Frontend source (Node + Vite toolchain): jit/frontend

Frontend workflow
1) Install dependencies
   cd frontend
   npm install

2) Start live-reload development server
   npm run dev

3) Build production assets into Spring webapp folder
   npm run build

What build/dev does
- Frontend source files live under `frontend/` (`index.html`, `src/main.js`, `src/style.css`).
- Static assets (images, favicon, legacy bundle.js) are served from `src/main/webapp` as Vite public assets.
- Production build writes directly to `src/main/webapp` so Maven/Tomcat packaging remains unchanged.
- Build is configured as non-destructive (`emptyOutDir: false`) so existing webapp files (e.g., `META-INF/context.xml`, images, legacy assets) are not deleted.

Spring/Tomcat packaging
- After frontend build, package/deploy with Maven as usual.

Deployment reference
1- Navigate to /target
2- To run in Azure, run command:
az webapp deploy --resource-group DefaultResourceGroup-EUS --name jit --src-path target/ROOT.war --track-status true

http://jit-fdg5f2dvbeexhhbz.canadacentral-01.azurewebsites.net

To list available groups:
az group list -o table

To list available apps within a group:
az webapp list --resource-group DefaultResourceGroup-EUS -o table

If you previously ran a build from an older config and files disappeared
- Restore tracked webapp files with: `git checkout -- src/main/webapp`
