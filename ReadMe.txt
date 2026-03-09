Project structure (current)
- This project now serves a simple static one-page site directly from:
  jit/src/main/webapp/index.html
- Frontend build tooling (webpack/npm under jit/frontend) is no longer used.

How to run (Spring/Tomcat)
- Build/package with Maven as usual for this Java web app.
- Edit HTML/CSS/JS files directly under jit/src/main/webapp.

Notes
- If a frontend pipeline is needed again in the future, it can be reintroduced,
  but today there is no required npm build step.
