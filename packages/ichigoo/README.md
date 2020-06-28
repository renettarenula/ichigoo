# Ichigoo 🐈

Ichigoo is a static site generator that was created in order to beat out boredom during lockdown. The motivation is to understand how GatsbyJS works under-the-hood. The best way to learn is to clone it. Just like GatsbyJS, Ichigoo supports creating static sites with React and GraphQL. It also supports SPA navigation through React Router.

**Disclaimer**: This is an experiment and was created for fun.

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
