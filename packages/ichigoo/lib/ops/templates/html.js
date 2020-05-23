/**
 * Simple HTML skeleton that will be used to
 * build static HTML and manifest files
 */
const HTML = (component, scripts) => {
  const dependencies = scripts.map(
    (script) => `<script src="${script}" async></script>`
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
            <div class="content" id="content">
                ${component}
            </div>
            ${dependencies.join("")}
        </body>
    </html>
    `;
};

module.exports = HTML;
