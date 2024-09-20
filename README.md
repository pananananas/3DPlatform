# 3D Platform

## TODOS:


## Essential:

- [x] user profile route

Side panel:
- [ ] edit name model
- [ ] edit rotation/translatio

- [ ] center point

- [x] delete button

- [x] author info

- [ ] download 3d model button



- [ ] use replicate to convert ply to splat on upload


- [ ] camera animations (https://drei.docs.pmnd.rs)

- [ ] edit colors (color picker) (https://uiwjs.github.io/react-color/)

- [ ] add scenes support to display multiple models
  - [ ] create new scene with models
  - [ ] add model to scene
  - [ ] create scene by uploading images (gaussian splatting on replicate)

- [ ] display model previews in model list

AI Model generation:
- [ ] generate models using replicate (https://replicate.com/camenduru/lgm?input=nodejs&output=json)

Maybe later:
- [x] analytics - PostHog
- [ ] error management - Sentry
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
