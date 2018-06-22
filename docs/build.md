Send has two build configurations, development and production. Both can be run via `npm` scripts, `npm start` for development and `npm run build` for production. Webpack is our only build tool and all configuration lives in [webpack.config.js](../webpack.config.js).

# Development

`npm start` launches a `webpack-dev-server` on port 8080 that compiles the assets and watches files for changes. It also serves the backend API and frontend unit tests via the `server/bin/dev.js` entrypoint. The frontend tests can be run in the browser by navigating to http://localhost:8080/test and will rerun automatically as the watched files are saved with changes.

# Production

`npm run build` compiles the assets and writes the files to the `dist/` directory. `npm run prod` launches an Express server on port 1443 that serves the backend API and frontend static assets from `dist/` via the `server/bin/prod.js` entrypoint.

# Notable differences

- Development compiles assets in memory, so no `dist/` directory is generated
- Development does not enable CSP headers
- Development frontend source is instrumented for code coverage
- Only development includes sourcemaps
- Only development exposes the `/test` route
- Production sets Cache-Control immutable headers on the hashed static assets

# Custom Loaders

The `build/` directory contains custom webpack loaders specific to Send. See [build/readme.md](../build/readme.md) for details on each loader.