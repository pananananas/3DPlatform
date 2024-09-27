# 3D Platform

# TODOS:

## Essential:

Side panel:

- [ ] render center point, camera animations (https://codesandbox.io/p/sandbox/sew669?file=/src/App.js:17,14)
- [ ] camera animations (https://drei.docs.pmnd.rs)

- [ ] use replicate to convert ply to splat on upload
  - [ ] get the python file for convertion
  - [ ] dockerize the python script
  - [ ] do the nessesary things to run the script in replicate
  - [ ] connect API endpoint to run on upload


AI Model generation:
- [ ] generate models using replicate (https://replicate.com/camenduru/lgm?input=nodejs&output=json)

- [ ] edit colors (color picker) (https://uiwjs.github.io/react-color/)

- [ ] add scenes support to display multiple models
  - [ ] create new scene with models
  - [ ] add model to scene
  - [ ] create scene by uploading images (gaussian splatting on replicate)

- [ ] display model previews in model list


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

- [x] user profile route

- [x] download 3d model button

- [x] edit rotation/translation

- [x] delete button

- [x] author info

- [x] edit center point