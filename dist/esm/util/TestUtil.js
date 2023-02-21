import { j as _typeof, g as _slicedToArray } from '../_rollupPluginBabelHelpers-55d249d8.js';
import React from 'react';

var _createComponent = function _createComponent(renderer, _Component, component_id, data, options, schema_expected, manager) {
  // check for component manager
  if (!manager) {
    throw Error('TestUtil._createComponent: Manager was not provided through props for component ' + component_id);
  }
  if (renderer !== null) {
    if (typeof renderer.create !== 'function') {
      throw Error('_createComponent is missing renderer function');
    }
  }
  if (options.render) {
    renderer.create(
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-pascal-case
    React.createElement(_Component, {
      id: component_id,
      key: component_id,
      data: data,
      config: {
        options: options
      },
      schema: schema_expected,
      manager: manager
    }));
  } else {
    new _Component({
      id: component_id,
      key: component_id,
      data: data,
      config: {
        options: options
      },
      schema: schema_expected,
      manager: manager
    });
  }
};
var createComponentClassTests = function createComponentClassTests(componentManagerInstance, registerComponents, renderer, config, triggers_expected, events_expected, schema_expected, data, options) {
  options = options || {
    render: true
  };
  data = data || {};
  if (typeof registerComponents !== 'function') {
    throw Error('createComponentClassTests is missing registerComponents');
  }
  if (renderer !== null) {
    if (typeof renderer.create !== 'function') {
      throw Error('createComponentClassTests is not a component renderer');
    }
  }
  // TODO: run this before each
  componentManagerInstance.clearAll();
  componentManagerInstance.getStateManager().clearAll();
  componentManagerInstance.getEventManager().clearAll();
  registerComponents(componentManagerInstance);
  var c = componentManagerInstance.getComponent(config.type);
  var _Component = c.component;
  var triggers = c.triggers;
  var events = c.events;
  var component_id = config.type + '_id';
  componentManagerInstance.getStateManager().clearAll();
  componentManagerInstance.getStateManager().createState({
    type: config.type,
    data: data,
    id: component_id,
    manager: componentManagerInstance
  });
  return [{
    title: component_id + ' trigger registration contains same actions as in component trigger export',
    test: function test() {
      componentManagerInstance.getStateManager().clearAll();
      _createComponent(renderer, _Component, component_id, data, options, schema_expected, componentManagerInstance);
      var trigger_info_events = triggers;
      var actions = componentManagerInstance.getEventManager().getCopyOfActions();
      expect(Object.keys(actions)).toEqual([component_id]);
      // check that we are registering the correct items
      expect(Object.keys(actions[component_id])).toEqual(Object.keys(trigger_info_events));
    }
  }, {
    title: component_id + ' trigger export registration contains required information',
    test: function test() {
      var trigger_info_events = triggers;
      // check that the registered event count matches the registered handler count
      expect(Object.keys(trigger_info_events)).toEqual(triggers_expected);
      // check that the registered events attributes are defined
      Object.keys(trigger_info_events).forEach(function (trigger_event, idx) {
        // check info
        expect(Object.keys(trigger_info_events[trigger_event])).toContain('info');
        expect(Object.keys(trigger_info_events[trigger_event].info)).toContain('name');
        expect(Object.keys(trigger_info_events[trigger_event].info)).toContain('description');
        // check schema
        expect(Object.keys(trigger_info_events[trigger_event])).toContain('schema');
        // check alias
        expect(Object.keys(trigger_info_events[trigger_event])).toContain('alias');
      });
    }
  }, {
    title: component_id + ' component instance has trigger registration handlers',
    test: function test() {
      componentManagerInstance.getStateManager().clearAll();
      _createComponent(renderer, _Component, component_id, data, options, schema_expected, componentManagerInstance);
      var trigger_info_events = triggers;
      var actions = componentManagerInstance.getEventManager().getCopyOfActions();
      // check that the registered events attributes are defined
      Object.keys(trigger_info_events).forEach(function (trigger_event, idx) {
        // check handler
        expect(Object.keys(actions[component_id][trigger_event])).toContain('handler');
        expect(typeof actions[component_id][trigger_event].handler === 'function').toBeTruthy();
      });
    }
  }, {
    title: component_id + ' event registration',
    test: function test() {
      var trigger_events = events_expected;
      var actions = events;
      expect(Object.keys(actions)).toEqual(trigger_events);
      trigger_events.forEach(function (trigger_event, idx) {
        // check info
        expect(Object.keys(actions[trigger_event])).toContain('info');
        expect(Object.keys(actions[trigger_event].info)).toContain('name');
        expect(Object.keys(actions[trigger_event].info)).toContain('description');
        // check schema
        expect(Object.keys(actions[trigger_event])).toContain('schema');
        // check alias
        expect(Object.keys(actions[trigger_event])).toContain('alias');
      });
    }
  }, {
    title: component_id + ' config has options',
    test: function test() {
      expect(Object.keys(config)).toContain('options');
      // check that we have the basics for a schema
      var options_schema = config.options;
      expect(Object.keys(options_schema)).toContain('id');
      expect(Object.keys(options_schema)).toContain('$schema');
      expect(Object.keys(options_schema)).toContain('description');
      expect(Object.keys(options_schema)).toContain('x-layout');
      expect(Object.keys(options_schema)).toContain('type');
      expect(Object.keys(options_schema)).toContain('version');
      expect(Object.keys(options_schema)).toContain('properties');
      expect(Object.keys(options_schema)).toContain('required');
    }
  }, {
    title: component_id + ' config has basic info',
    test: function test() {
      expect(Object.keys(config)).toContain('options');
      // check that we have the basics for a schema
      expect(_typeof(config.name)).toEqual('string');
      expect(_typeof(config.type)).toEqual('string');
      expect(_typeof(config.author)).toEqual('string');
      expect(_typeof(config.description)).toEqual('string');
      expect(_typeof(config.version)).toEqual('number');
      expect(_typeof(config.author)).toEqual('string');
      expect(_typeof(config.relation)).toEqual('object');
    }
  }, {
    title: component_id + ' config has relational info',
    test: function test() {
      expect(Object.keys(config)).toContain('options');
      // check that we have the basics for a schema
      expect(_typeof(config.relation)).toEqual('object');
      expect(_typeof(config.relation.within)).toEqual('string');
    }
  }, {
    title: component_id + ' option schema is accessible through buildStoreInfo',
    test: function test() {
      /* componentManagerInstance.clearAll();
      registerComponents();
      */
      _createComponent(renderer, _Component, component_id, data, options, schema_expected, componentManagerInstance);
      // fetch result
      var store = componentManagerInstance.getEventManager().collectComponentInventory();
      // should exist
      expect(store).toHaveProperty(config.type);
      var store_item = store[config.type];
      // check that we have the required info
      // as define din ui-modeler-events.js store data
      expect(_typeof(store_item.id)).toEqual('string');
      expect(_typeof(store_item.title)).toEqual('string');
      expect(_typeof(store_item.type)).toEqual('string');
      expect(_typeof(store_item.parent)).toEqual('string');
    }
  }, {
    title: component_id + ' schema definition is accessible through getComponentSchema',
    test: function test() {
      var schema = componentManagerInstance.getEventManager().getComponentSchema(config.type);
      expect(schema).toEqual(config.options);
    }
  }, {
    title: component_id + ' events definition is accessible through getComponentEventsByType',
    test: function test() {
      var component = componentManagerInstance.getEventManager().getComponentByType(config.type);
      expect(component).not.toEqual(undefined);
      expect(component.actions).toEqual(config.actions);
    }
  }, {
    title: component_id + ' actions definition is accessible through getComponentActionsByType',
    test: function test() {
      var component = componentManagerInstance.getEventManager().getComponentByType(config.type);
      expect(component).not.toEqual(undefined);
      expect(component.events).toEqual(config.events);
    }
  } /* {
    title: component_id + ' events definition is accessible through getEvents',
    test: () => {
    }
    }, {
    title: component_id + ' action definition is accessible through getActions',
    test: () => {
    }
    }
    */];
};

var createComponentRegisterTests = function createComponentRegisterTests(componentManagerInstance, registerComponents, component_type, _Component, triggers, events, config, contains) {
  return [{
    title: component_type + ' basic registration info',
    test: function test() {
      componentManagerInstance.clearAll();
      componentManagerInstance.getStateManager().clearAll();
      componentManagerInstance.getEventManager().clearAll();
      registerComponents(componentManagerInstance);
      var c = componentManagerInstance.getComponent(component_type);
      expect(c).not.toEqual(undefined);
      expect(c.type).toEqual(component_type);
      expect(c.component).toEqual(_Component);
      expect(c.config).toEqual(config);
      expect(c.events).toEqual(events);
      expect(c.triggers).toEqual(triggers);
    }
  }, {
    title: component_type + ' configuration registration',
    test: function test() {
      componentManagerInstance.clearAll();
      componentManagerInstance.getStateManager().clearAll();
      componentManagerInstance.getEventManager().clearAll();
      registerComponents(componentManagerInstance);
      var c = componentManagerInstance.getComponent(component_type);
      expect(c).not.toEqual(undefined);
      var cfg = c.config;
      expect(cfg).toHaveProperty('type');
      expect(cfg).toHaveProperty('name');
      expect(cfg).toHaveProperty('relation');
      expect(cfg.relation).toHaveProperty('within');
      expect(cfg.relation).toHaveProperty('contains');
    }
  }, {
    title: component_type + ' matches rendered type and schema',
    test: function test() {
      componentManagerInstance.clearAll();
      componentManagerInstance.getStateManager().clearAll();
      componentManagerInstance.getEventManager().clearAll();
      registerComponents(componentManagerInstance);
      var c = componentManagerInstance.getComponent(component_type);
      expect(c).not.toEqual(undefined);
      var cfg = c.config;
      expect(cfg).toHaveProperty('type');
      expect(cfg).toHaveProperty('options');
      // test that the config type is the type iin our options schema
      expect(cfg.options.id).toEqual(cfg.type);
      // TODO: test that this is the same as in component registered
    }
  }, {
    title: component_type + ' tests option schema',
    test: function test() {
      if (Object.keys(contains).length) {
        // test only if we have keys
        componentManagerInstance.clearAll();
        componentManagerInstance.getStateManager().clearAll();
        componentManagerInstance.getEventManager().clearAll();
        registerComponents(componentManagerInstance);
        var c = componentManagerInstance.getComponent(component_type);
        expect(c).not.toEqual(undefined);
        var cfg = c.config;
        var schema_option = cfg.options;
        expect(schema_option).toHaveProperty('id');
        expect(schema_option).toHaveProperty('$schema');
        expect(schema_option).toHaveProperty('title');
        expect(schema_option).toHaveProperty('description');
        expect(schema_option).toHaveProperty('x-layout');
        expect(schema_option).toHaveProperty('type');
        expect(schema_option).toHaveProperty('version');
        expect(schema_option).toHaveProperty('properties');
        expect(schema_option).toHaveProperty('required');
        expect(schema_option['x-layout']).toEqual('component');
      }
    }
  }, {
    title: component_type + ' tests containing components',
    test: function test() {
      if (Object.keys(contains).length) {
        // test only if we have keys
        componentManagerInstance.clearAll();
        componentManagerInstance.getStateManager().clearAll();
        componentManagerInstance.getEventManager().clearAll();
        registerComponents(componentManagerInstance);
        var c = componentManagerInstance.getComponent(component_type);
        expect(c).not.toEqual(undefined);
        var cfg = c.config;
        expect(cfg).toHaveProperty('contains');
        // eslint-disable-next-line no-unused-vars
        for (var _i = 0, _Object$entries = Object.entries(contains); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0];
            _Object$entries$_i[1];
          expect(cfg.contains).toHaveProperty(key);
          // should expect to have a schema
          var schema = cfg.contains[key];
          expect(schema).toHaveProperty('id');
          expect(schema).toHaveProperty('$schema');
          expect(schema).toHaveProperty('title');
          expect(schema).toHaveProperty('description');
          expect(schema).toHaveProperty('x-layout');
          expect(schema).toHaveProperty('type');
          expect(schema).toHaveProperty('version');
          expect(schema).toHaveProperty('properties');
          expect(schema).toHaveProperty('required');
          expect(schema.id).toEqual(key); // should be same id as the key
          // should expect a x-layout having value "component-item"
          expect(schema['x-layout']).toEqual('component-item');
        }
      }
    }
  }];
};
function uuidv4() {
  // random string generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
function testEventSequence(componentManagerInstance, module_name, event_name, event_data, trigger_name, callback) {
  var test_name = uuidv4();
  componentManagerInstance.getEventManager().register(test_name, {
    result: {
      schema: {},
      handler: callback
    }
  }, {}, {}); // event and component info not used in test
  componentManagerInstance.getEventManager().watch([{
    component: {
      id: test_name,
      event: 'result'
    },
    trigger: {
      id: module_name,
      action: event_name
    },
    transform: function transform(data) {
      return data;
    }
  }, {
    component: {
      id: module_name,
      event: trigger_name
    },
    trigger: {
      id: test_name,
      action: 'result'
    },
    transform: function transform(data) {
      return data;
    }
  }]);
  componentManagerInstance.getEventManager().addEvent(test_name, 'result', event_data, {});
}
var TestUtil = {
  createComponentClassTests: createComponentClassTests,
  createComponentRegisterTests: createComponentRegisterTests,
  testEventSequence: testEventSequence
};

export { createComponentClassTests, createComponentRegisterTests, TestUtil as default, testEventSequence };
//# sourceMappingURL=TestUtil.js.map
