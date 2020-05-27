# Ichigoo 🐈

Ichigoo is a static site generator that I created in order to beat out boredom during lockdown. The motivation is to understand how GatsbyJS works under-the-hood. The best way to learn is to clone it. Just like GatsbyJS, Ichigoo supports creating static sites with React and GraphQL. It also supports SPA navigation through React Router.

## Installing

In order to install, start with installing the CLI:

```
npm install -g ichigoo-cli
```

Create a new static site project

```
ichigoo new -- --name static-site
```

## Development

Run a dev server

```
ichigoo dev
```

Build for production

```
ichigoo build
```

Serve production server locally

```
ichigoo serve
```

## Powered By...

With Ichigoo, I learned to use tools that I don't use as much at work. There are:

- 📦 Parcel - for bundling
- 🐉 Lerna - for package organization
- 💂 Commander - for creating CLI tool
- 📁 Plop - for generating starter project
- 🖥️ Ora - pretty spinner in terminals
- 👨‍🏫 Chalk - pretty colors in terminals
- 📈 GraphQL - query only what you need
- ✍🏻Creating Babel Presets - I used them but never created one before until now

The codebase is well-commented so if you decided to dive in and see how it works, feel free to do so. I've also written accompanying blog posts to chronicle my explorations in creating this. There are available in series so feel free to check it out.

## Would I recommend you to use it?

Yes! But only if you are interested in learning about how static site generators work. Stuff would probably break along the way since this was purely created for learning purposes. If you're looking for something more serious, check out GatsbyJS or one of the many static site generator you can find here: https://www.staticgen.com/

## Development

Uninstall any production version of Ichigoo and clone this repo. You can install the local CLI globally by running:

```
cd ichigoo/packages/ichigoo-cli
npm install -g ./
```

Then, you can start developing by generating a main project.

```
ichigoo new -- --name static-site
```

In order to work on the local version of this repo, run `npm link` under `ichigoo/packages/ichigoo`. Then run `npm link ichigoo` on the `static-site` folder.

In order to avoid errors due to multiple module copy, it is important to manually resolve npm links. For example, here's how to resolve module linking for react.

```
cd static-site/node_modules/react
npm link

cd ichigoo/packages/ichigoo
npm link react
npm install
```

You can check if there's a single local copy of React by running `npm ls react` on `ichigoo/packages/ichigoo`. You should get something like this:

ichigoo@0.0.0 /your/local/path/ichigoo/packages/ichigoo
└── react@16.13.1 -> /your/local/path/static-site/node_modules/react

Running `npm ls react` on your main project should get you this:

static-site@1.0.0 /your/local/path/static-site
└── react@16.13.1
