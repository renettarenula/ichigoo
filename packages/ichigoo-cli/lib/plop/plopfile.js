module.exports = function (plop) {
  plop.addHelper("cwd", (p) => process.cwd());
  // controller generator
  plop.setGenerator("new", {
    description: "Generate new project",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What's your project name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{cwd}}/{{name}}/package.json",
        templateFile: "templates/package.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{name}}/.babelrc",
        templateFile: "templates/babelrc.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{name}}/src/components/Layout.js",
        templateFile: "templates/components/layout.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{name}}/src/pages/About.js",
        templateFile: "templates/pages/about.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{name}}/src/pages/Index.js",
        templateFile: "templates/pages/index.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{name}}/src/pages/Speaking.js",
        templateFile: "templates/pages/speaking.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{name}}/src/App.js",
        templateFile: "templates/app.hbs",
      },
      {
        type: "add",
        path: "{{cwd}}/{{name}}/routes.js",
        templateFile: "templates/routes.hbs",
      },
    ],
  });
};
