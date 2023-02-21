'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var print_config = {
  name: 'StoryUtil',
  type: 'storyutil',
  author: 'Kjartan Jónsson',
  description: 'StoryUtil component',
  version: 0.1,
  relation: {
    contains: []
  },
  contains: {},
  options: {}
};
var registerStoryWatchList = function registerStoryWatchList(eventHandlerInstance, test_handler, action) {
  if (!action) {
    throw Error('registerStorWatchList is missing action handler');
  }
  eventHandlerInstance.register(test_handler, {
    print: {
      schema: {},
      handler: function handler(obj) {
        console.info(obj);
        action(obj.event)(obj);
      }
    }
  }, {}, print_config);
};
var createWatchList = function createWatchList(eventHandlerInstance, test_handler, component_id, event_types, action) {
  // create watchlist
  var watch_list = [];
  var test_handler_id = component_id + '_handler_id';
  if (!action) {
    throw Error('createWatchList is missing action handler');
  }
  event_types.forEach(function (event_type) {
    watch_list.push({
      component: {
        id: component_id,
        event: event_type
      },
      trigger: {
        id: test_handler_id,
        action: 'print'
      },
      transform: function transform(data) {
        return {
          event: event_type,
          data: data
        };
      }
    });
  });
  eventHandlerInstance.watch(watch_list);
  registerStoryWatchList(eventHandlerInstance, test_handler_id, action);
};
var createEventTriggers = function createEventTriggers(eventHandlerInstance, component_id, triggers_fn, trigger_data) {
  var triggers = triggers_fn;
  trigger_data = trigger_data || {}; // default none data
  return /*#__PURE__*/React__default["default"].createElement("div", null, Object.keys(triggers).map(function (trigger_id, i) {
    var values = {
      title: trigger_id + '_value',
      id: trigger_id + '_value'
    };
    if (trigger_data[trigger_id]) {
      values = trigger_data[trigger_id];
    }
    return /*#__PURE__*/React__default["default"].createElement("button", {
      key: trigger_id + '_key_' + triggers[trigger_id].name,
      title: triggers[trigger_id].info.description,
      onClick: function onClick() {
        if (typeof values === 'function') {
          eventHandlerInstance.addAction(component_id, trigger_id, values());
        } else {
          eventHandlerInstance.addAction(component_id, trigger_id, values);
        }
      }
    }, triggers[trigger_id].info.name);
  }));
};
var prepStoryComponent = function prepStoryComponent(componentManagerInstance, action, registerComponents, props, triggers, events, overrides) {
  overrides = overrides || {};
  var component_manager = componentManagerInstance;
  var state_manager = componentManagerInstance.getStateManager();
  // attach managers and factories
  props.manager = component_manager;
  if (typeof action !== 'function') {
    throw Error('prepStoryComponent is missing action handler');
  }
  if (typeof registerComponents !== 'function') {
    throw Error('prepStoryComponent is missing registerComponents');
  }
  registerComponents(component_manager);
  state_manager.clearAll();
  state_manager.createLayoutState([props]);
  createWatchList(componentManagerInstance.getEventManager(), props.id + '_handler', props.id, Object.keys(events), action);
  return createEventTriggers(componentManagerInstance.getEventManager(), props.id, triggers, overrides.triggers);
};
var createStoryArgumentTypesFromSchema = function createStoryArgumentTypesFromSchema(options_schema) {
  // https://storybook.js.org/docs/6.3/react/essentials/controls#annotation
  // https://json-schema.org/learn/miscellaneous-examples.html
  var args = {};
  Object.keys(options_schema.properties).forEach(function (attr, idx) {
    var prop = options_schema.properties[attr];
    args[attr] = {
      name: prop.title || attr,
      defaultValue: prop["default"],
      table: {
        type: {
          summary: prop.description
          // detail: prop.description
        }
      }
    };

    if (prop.type === 'boolean') {
      args[attr].control = {
        type: 'boolean'
      };
    }
    if (prop.type === 'number' || prop.type === 'integer' || prop.type === 'float') {
      args[attr].control = {
        type: 'number'
      };
      if (prop.minimum !== undefined) {
        args[attr].control = {
          type: 'range',
          min: prop.minimum,
          max: prop.maximum
        };
      }
    }
    if (prop.type === 'string') {
      args[attr].control = {
        type: 'string'
      };
    }
    if (prop["enum"]) {
      args[attr].control = {
        type: 'select',
        options: prop["enum"]
      };
      if (prop["enum"].length < 3) {
        args[attr].control.type = 'inline-radio';
      }
      // args[attr] = PropTypes.oneOf(prop.enum);
    }

    if (prop.format === 'color') {
      args[attr].control = {
        type: 'color'
      };
    }
    if (prop.type === 'object') {
      args[attr].control = {
        type: 'object'
      };
    }
    if (prop.type === 'array') {
      args[attr].control = {
        type: 'array'
      };
    }
  });
  return args;
};
var createStoryArgumentDefaultsFromSchema = function createStoryArgumentDefaultsFromSchema(options_schema) {
  // https://storybook.js.org/docs/6.3/react/essentials/controls#annotation
  var args = {};
  Object.keys(options_schema.properties).forEach(function (attr, idx) {
    var prop = options_schema.properties[attr];
    if (prop["default"]) {
      args[attr] = prop["default"];
    }
  });
  return args;
};
var createLayoutViewArgumentTypes = function createLayoutViewArgumentTypes(config) {
  // depreciated: user createStoryArgumentTypesFromSchema
  // https://storybook.js.org/docs/react/essentials/controls#annotation
  var args = {};
  var defaultStyles = {
    // common options
    label: {
      control: 'text'
    },
    labelPlacement: {
      control: {
        type: 'select',
        options: ['bottom', 'end', 'start', 'top']
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
      }
    },
    indicatorColor: {
      control: {
        type: 'select',
        options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
      }
    },
    textColor: {
      control: {
        type: 'select',
        options: ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error']
      }
    },
    buttonVariant: {
      control: {
        type: 'select',
        options: ['contained', 'outlined', 'text', 'fab']
      }
    },
    tabVariant: {
      control: {
        type: 'select',
        options: ['inherit', 'fullWidth', 'scrollable']
      }
    },
    contentMargin: {
      control: {
        type: 'number'
      }
    },
    variant: {
      control: {
        type: 'select',
        options: ['filled', 'outlined', 'standard']
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'large', 'medium']
      }
    },
    shape: {
      control: {
        type: 'select',
        options: ['circular', 'rounded', 'square']
      }
    },
    max_count: {
      control: {
        type: 'number'
      }
    },
    spacing: {
      control: {
        type: 'number'
      }
    },
    direction: {
      control: {
        type: 'select',
        options: ['row', 'row-reverse', 'column', 'column-reverse']
      }
    },
    justify: {
      control: {
        type: 'select',
        options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
      }
    },
    alignItems: {
      control: {
        type: 'select',
        options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline']
      }
    },
    gridXS: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    gridSM: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    modalType: {
      control: {
        type: 'select',
        options: ['alert', 'dialog', 'modal']
      }
    }
  };
  // expanded
  var inputStyles = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, defaultStyles), config.options);
  // find out what this components supports and return it as argument
  Object.keys(config.options).forEach(function (attr, idx) {
    var arg = inputStyles[attr];
    // TODO: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-controloptions
    args[attr] = arg;
  });
  return args;
};
var StoryUtil = {
  createLayoutViewArgumentTypes: createLayoutViewArgumentTypes,
  createStoryArgumentDefaultsFromSchema: createStoryArgumentDefaultsFromSchema,
  createStoryArgumentTypesFromSchema: createStoryArgumentTypesFromSchema,
  prepStoryComponent: prepStoryComponent,
  createEventTriggers: createEventTriggers,
  createWatchList: createWatchList,
  registerStoryWatchList: registerStoryWatchList
};

exports.createEventTriggers = createEventTriggers;
exports.createLayoutViewArgumentTypes = createLayoutViewArgumentTypes;
exports.createStoryArgumentDefaultsFromSchema = createStoryArgumentDefaultsFromSchema;
exports.createStoryArgumentTypesFromSchema = createStoryArgumentTypesFromSchema;
exports.createWatchList = createWatchList;
exports["default"] = StoryUtil;
exports.prepStoryComponent = prepStoryComponent;
exports.registerStoryWatchList = registerStoryWatchList;
//# sourceMappingURL=StoryUtil.js.map
