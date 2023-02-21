'use strict';

var event_Event = require('./Event.js');
require('../_rollupPluginBabelHelpers-aae655da.js');

var registerEventDebugging = function registerEventDebugging() {
  // add specific solutions
  event_Event.EventManager.getInstance().register('console', {
    print: {
      schema: {},
      handler: function handler(obj) {
        console.info('------------- DEBUG-STORY ----------------');
        console.info(obj);
      }
    }
  });
};
var registerEventApp = function registerEventApp() {
  // add specific solutions
  event_Event.EventManager.getInstance().register('app', {
    warning: {
      schema: {},
      handler: function handler(obj) {
        console.info('--------------- WARNING ------------------');
        console.warn(obj);
      }
    },
    error: {
      schema: {},
      handler: function handler(obj) {
        console.info('---------------- ERROR -------------------');
        console.error(obj);
      }
    }
  }, {
    ready: {
      alias: [],
      info: {
        name: 'Ready',
        description: 'Ready'
      },
      schema: {}
    }
  }, {
    name: 'Application',
    type: 'app',
    author: 'Kjartan Jónsson',
    description: 'Application',
    version: 0.1,
    options: {}
  });
};
var registerEvents = function registerEvents(event_types) {
  // TODO: event
};
var CommonEvents = {
  registerEvents: registerEvents,
  registerEventApp: registerEventApp,
  registerEventDebugging: registerEventDebugging
};

module.exports = CommonEvents;
//# sourceMappingURL=CommonEvents.js.map
