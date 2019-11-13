# Application Code

`app/` contains the browser code that gets bundled into `app.[hash].js`. It's got all the logic, crypto, and UI. All of it gets used in the browser, and some of it by the server for server side rendering.

The main entrypoint for the browser is [main.js](./main.js) and on the server [routes.js](./routes.js) is imported by [/server/routes/pages.js](../server/routes/pages.js)

- `pages` contains display logic an markup for pages
- `routes` contains route definitions and logic
- `templates` contains ui elements smaller than pages
