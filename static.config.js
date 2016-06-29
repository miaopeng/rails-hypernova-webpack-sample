const path = require('path');
const jsRoot = `${__dirname}/app/assets/javascripts`;
const apps = [
  'hello_world',
];

/**
 * Sercer Rendering Register Name Stucture:
 *   Prefix Name / Category Name(App Name) / File Name(Component Name)
 */
const serverRenderingComponents = [
  'apps/hello_world/index',
];

function getAppEntryPath(appName) {
  return `${jsRoot}/apps/${appName}/src/index.js`;
}

function getModEntry(modName) {
  return `${jsRoot}/mods/${modName}/src/index.js`;
}

function getServerRenderingComponents() {
  const components = {};
  serverRenderingComponents.forEach(key => components[key] = path.resolve(`${jsRoot}/${key}.server.js`));
  return components;
}

function getServerRenderingEntry() {
  const entry = {};
  serverRenderingComponents.forEach(key => {
    const filePath = key.split('/');
    const fileName = filePath.pop();
    if (fileName) {
      entry[key] = `${jsRoot}/${filePath.join('/')}/src/${fileName}.js`;
    }
  });
  return entry;
}

module.exports = {
  apps,

  serverRenderingComponents,

  jsRoot,

  ports: {
    hypernova: 3131,
  },

  alias: {
    // libs: __dirname + '/app/assets/javascripts/libs',
    // // mods: __dirname + '/app/assets/javascripts/mods',
    // data: __dirname + '/app/assets/javascripts/data',
    // vendor: __dirname + '/vendor/assets/javascripts',
    // moment: __dirname + '/vendor/assets/javascripts/moment/moment',
  },

  externals: {
    'jquery': 'jQuery',
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    'react-dom/server': 'ReactDOM.server',
    // './React': 'React',
    // 'react/addons': 'React',
    // 'react-addons-transition-group': 'React.addons.TransitionGroup',
    // 'react-addons-create-fragment' : 'React.addons.createFragment',
    // 'react-addons-update': 'React.addons.update',
    // 'react-addons-pure-render-mixin': 'React.addons.PureRenderMixin',
  },

  getAppEntry(app) {
    const entries = {};
    const appNames = app ? [app] : apps;
    appNames.forEach(appName => {
      entries[appName] = getAppEntryPath(appName);
    });
    return entries;
  },

  getAppEntryPath,
  getModEntry,
  getServerRenderingComponents,
  getServerRenderingEntry,
};
