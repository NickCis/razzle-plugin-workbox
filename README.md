# razzle-plugin-workbox

A [Razzle](https://github.com/jaredpalmer/razzle) plugin for seting up [workbox](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) and register the service worker as [create react app](https://github.com/facebook/create-react-app) example [does](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/src/serviceWorker.js).

## Usage

Install the plugin:

```sh
# using npm
npm install --dev razzle-plugin-workbox

# yarn
npm add --dev razzle-plugin-workbox
```

Add configuration to `razzle.config.js`:

```js
// razzle.config.js file

module.exports = {
  plugins: [
    'workbox'
  ],
};
```

Register service worker:

```js
// src/client.js

import React from 'react';
import { hydrate } from 'react-dom';
import { register } from 'razzle-plugin-workbox/service-worker';
import App from './App';

hydrate(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

register();
```

## Configuration

The plugin can be set up with any [workbox parameters](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW#GenerateSW). It comes with [create react app defaults](./index.js#L11), but feel free to change them:


```js
// razzle.config.js file

module.exports = {
  plugins: [
    {
      name: 'workbox',
      options: {
        swDest: 'my-service-worker-name.js',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/maps\.googleapis\.com\/maps-api-v3\/api\/js/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-maps-v3-js',
            },
          },
        ],
      },
    },
  ],
};
```

In addition, the `register` function allows certain configuration:
- `swDest`: The asset name of the service worker file.
- `publicUrl`: If you change where the assets are served.
- `onSuccess`: Callback to be executed when the service worker has initialized sucessfully.
- `onUpdate`: Callback to be executed when the service worker has been updated.

_([Default values can be found here](./service-worker.js#L15))_

```js
// src/client.js

import React from 'react';
import { hydrate } from 'react-dom';
import { register } from 'razzle-plugin-workbox/service-worker';
import App from './App';

hydrate(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

register({
  swDest: 'my-service-worker-name.js',
});
```
