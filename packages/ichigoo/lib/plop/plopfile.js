module.exports = function (plop) {
  plop.addHelper("cwd", (p) => process.cwd());
  // controller generator
  plop.setGenerator("new", {
    description: "application controller logic",
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
    ],
  });
};
