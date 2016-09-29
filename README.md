# react-router-html-webpack-plugin

[![npm version][npm-version-badge]][npm-url]
[![npm downloads][npm-downloads-badge]][npm-url]
[![Travis][travis-badge]][travis-url]
[![Codecov][codecov-badge]][codecov-url]
[![semantic-release][semantic-release-badge]][semantic-release-url]
[![Commitizen][commitizen-badge]][commitizen-url]

- You use [React Router][react-router-url]
- You use [webpack][webpack-url]
- You have a full static website hosted on something like [GitHub Pages][github-pages-url]
- You use [HTML Webpack Plugin][html-webpack-plugin-url] and want a drop-in replacement to make the static html files from [React Router][react-router-url] routes
- You want **React Router HTML Webpack Plugin** :smile:

## Installation

Install the plugin with npm:
```shell
$ npm install react-router-html-webpack-plugin --save-dev
```

## Basic Usage

Basic usage copies [HTML Webpack Plugin][html-webpack-plugin-usage-url]:

```javascript
// webpack.config.js
import ReactRouterHtmlWebpackPlugin from 'react-router-html-webpack-plugin';
export default {
  // ...
  plugins: [
    // ...
    new ReactRouterHtmlWebpackPlugin({ routes: 'routes.js' }),
    // ...
  ],
  // ...
};
```

```javascript
// routes.js
import React from 'react';
import Route from 'react-router/lib/Route';

import DummyComponent from './DummyComponent';

export default (
	<Route path="/">
		<Route path="foo" component={DummyComponent} />
		<Route path="bar" component={DummyComponent} />
	</Route>
);
```

The resulting files will be:

```
index.html
foo.html
foo/index.html
bar.html
bar/index.html
```

## Configuration

You can pass a hash of configuration options to React Router Html Webpack Plugin, exactly like [HTML Webpack Plugin][html-webpack-plugin-configuration-url]. Allowed values are the same except for some differences:

- `routes`: The routes file to generate routes from. Ignores routes and acts exactly like [HTML Webpack Plugin][html-webpack-plugin-url] when omitted.
- `filename`: For each route, the file to write the HTML to. Defaults to `['[route].html', '[route]/index.html']` if `routes` is set. An array of strings writes to each file. For example:
    - With the default configuration, matching `foo/bar` writes to both `<output.path>/foo/bar.html` and `<output.path>/foo/bar/index.html`
  - In the case of the base route (ie `/`), this value will make assumptions to produce sane values. For example:
    - `[route].html` or `[route]/index.html` writes to `<output.path>/index.html`
    - `subdirectory/[route]/index.html` writes to `<output.path>/subdirectory/index.html`

[codecov-badge]: https://img.shields.io/codecov/c/github/saiichihashimoto/react-router-html-webpack-plugin.svg?style=flat-square&maxAge=86400
[codecov-url]: https://codecov.io/gh/saiichihashimoto/react-router-html-webpack-plugin
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square&maxAge=86400
[commitizen-url]: http://commitizen.github.io/cz-cli
[github-pages-url]: https://pages.github.com
[html-webpack-plugin-configuration-url]: https://github.com/ampedandwired/html-webpack-plugin/blob/master/README.md#configuration
[html-webpack-plugin-usage-url]: https://github.com/ampedandwired/html-webpack-plugin/blob/master/README.md#basic-usage
[html-webpack-plugin-url]: https://www.npmjs.com/package/html-webpack-plugin
[npm-downloads-badge]: https://img.shields.io/npm/dm/react-router-html-webpack-plugin.svg?style=flat-square&maxAge=86400
[npm-version-badge]: https://img.shields.io/npm/v/react-router-html-webpack-plugin.svg?style=flat-square&maxAge=86400
[npm-url]: https://www.npmjs.com/package/react-router-html-webpack-plugin
[react-router-url]: https://www.npmjs.com/package/react-router
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[travis-badge]: https://img.shields.io/travis/saiichihashimoto/react-router-html-webpack-plugin/master.svg?style=flat-square&maxAge=86400
[travis-url]: https://travis-ci.org/saiichihashimoto/react-router-html-webpack-plugin
[webpack-url]: http://webpack.github.io
