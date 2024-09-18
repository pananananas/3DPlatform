# 3D Platform

## TODOS:

- [x] update uploadthing

- [ ] display model previews in model list

- [ ] add sidebars to model display

  - [x] model info
  - [ ] edit model (rotation etc)
  - [ ] edit colors (color picker) (https://uiwjs.github.io/react-color/)
  - [ ] camera animations (https://drei.docs.pmnd.rs)

- [ ] add scenes support to display multiple models
  - [ ] create new scene with models
  - [ ] add model to scene
  - [ ] create scene by uploading images (gaussian splatting on replicate)

AI Model generation:

- [ ] connect to replicate (https://replicate.com/camenduru/lgm?input=nodejs&output=json)

Maybe later:

- [ ] error management - Sentry
- [ ] analytics - PostHog
- [ ] rate limiting - Upstash
- [x] transition api

## Notes:

- Multiple splats preview: (https://codesandbox.io/p/sandbox/qp4jmf?file=/src/App.js)
- 3D Badge: (https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber)

## DONE:

- [x] deploy on vercel
- [x] setup database

- [x] db update to include 3d models

- [x] page with list of models 3d models
- [x] rendering 3d using react three fiber
- [x] page with 3d model viewer

- [x] add auth
- [x] add uploadthing

- [x] reroute "models" to models/view
- [x] move model list to "/models" route
- [x] add placeholder landing page
- [x] add support for multiple model types
