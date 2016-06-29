const hypernova = require('hypernova/server');
const components = require('./static.config').getServerRenderingComponents();

hypernova({
  devMode: process.env.NODE_ENV !== 'production',

  getComponent: hypernova.createGetComponent(components),

  port: 3131,
});

module.exports = components;
