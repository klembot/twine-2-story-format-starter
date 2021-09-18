# story-format-starter

This is a starter project for Twine 2 story format development. It contains
setup to compile a story format using Webpack.

## Included scripts

Run `npm install` to install dependencies.

Run `npm start` to start a development version of the story format that will
automatically reload when you make changes. The development version will use
Twee code stored in `examples/` as the story data that that format will see. The
`TWEE_EXAMPLE` environment variable in your shell governs which file will be
used--e.g. setting `TWEE_EXAMPLE` to `my-example` will compile
`examples/my-example.twee`.

Run `npm run build` to build the story format for use by Twine in `dist`. It
will be placed in a directory named after the story format version set in
`src/story-format.json`.

## File structure

`src/story-format.json` sets static properties on the story format JSONP data.
See the [Twine 2 story format specs] for details on these values.

`src/logo.svg` is the logo referenced in `src/story-format.json`, which will
appear next to the story format in Twine.

`src/runtime/index.js` is the script entrypoint for the story format. It will
run when the story bound to the format is opened in a browser.

`src/runtime/index.ejs` is the HTML template used by the story format. This can
be customized, but keep in mind that Webpack will automatically insert any JS
and CSS included as part of `src/runtime/index.js` for you. This file contains
some additional templating so that these assets will be inlined into a single
file during `npm run build`.

`src/editor-extensions/hydrate.js` is the script entrypoint for story format
editor extensions. Please take a look at `EXTENDING.md` in the [Twine repo] for
a description of these properties.

## What's not included?

This is intentionally very bare-bones and unopinionated. It's intended as a
starting point, not a complete solution for story format development. Things
omitted here:

-   Styling--for instance, vanilla CSS, LESS, or SASS
-   Testing--for instance, Jest or Mocha
-   Transpiling--for instance, Babel or TypeScript

[twine 2 story format specs]: https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md
[twine repo]: https://github.com/klembot/twinejs
