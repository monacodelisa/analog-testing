import { eventHandler } from 'file:///workspaces/analog-testing/analog-tailwind-vscode/node_modules/h3/dist/index.mjs';
import render from 'file:///workspaces/analog-testing/analog-tailwind-vscode/dist/ssr/main.server.js';

// ROLLUP_NO_REPLACE 
 const template = "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>MyApp</title>\n    <base href=\"/\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <link rel=\"icon\" type=\"image/x-icon\" href=\"/assets/favicon-BYy3mmNz.ico\" />\n    <script type=\"module\" crossorigin src=\"/assets/index-CkJP8_YS.js\"></script>\n    <link rel=\"stylesheet\" crossorigin href=\"/assets/index-CGHtetep.css\">\n  </head>\n  <body>\n    <app-root></app-root>\n  </body>\n</html>\n";

/**
 * This file is written in JavaScript
 * because it is used by Nitro to build
 * the renderer for SSR.
 *
 * The package is shipped as commonjs
 * which won't be parsed by Nitro correctly.
 */

const renderer = eventHandler(async (event) => {
  const html = await render(event.req.url, template);

  return html;
});

export { renderer as default };
//# sourceMappingURL=renderer.mjs.map
