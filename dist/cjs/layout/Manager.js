'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var event_Event = require('../event/Event.js');

/// //////////////////////////////////////////
// State Manager
/// //////////////////////////////////////////
var StateManager = /*#__PURE__*/function () {
  function StateManager() {
    _rollupPluginBabelHelpers._classCallCheck(this, StateManager);
    _rollupPluginBabelHelpers._defineProperty(this, "_states", {});
  }
  _rollupPluginBabelHelpers._createClass(StateManager, [{
    key: "getManager",
    value: function getManager(state_id) {
      return this._states[state_id];
    }

    // eslint-disable-next-line prettier/prettier
  }, {
    key: "clearAll",
    value: function clearAll() {}
  }, {
    key: "createState",
    value: function createState(props) {
      return this.createManager(props.id, props);
    }
  }, {
    key: "createStates",
    value: function createStates(props_array) {
      var _iterator = _rollupPluginBabelHelpers._createForOfIteratorHelper(props_array),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var props = _step.value;
          this.createManager(props.id, props);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createManager",
    value: function createManager(state_id, props) {
      var componentManagerInstance = ComponentManager.getInstance();
      var _component = componentManagerInstance.getComponent(props.type);
      if (_component) {
        var config = _component.config;
        var state_inst = this.getManager(state_id);
        if (state_inst) {
          // TODO: warn that we are trying to create a manager that exists
          return state_inst;
        } else {
          if (config.state) {
            // make sure to pass component manager
            if (!props.manager) {
              props.manager = componentManagerInstance;
            }
            // create the class
            state_inst = this.createStateByClass(config.state, props);
            if (state_inst.registerComponent) {
              state_inst.registerComponent({}, {}, config);
            }
            this._states[state_id] = state_inst;
          }
          return state_inst;
        }
      } else {
        throw new Error('Component type does not exist: ' + props.type);
      }
    }
  }, {
    key: "createStateByClass",
    value: function createStateByClass(StateClass, props) {
      if (StateClass) {
        return new StateClass(props);
      }
      return null;
    }

    // TODO: create state statemanagers from layout tree
  }, {
    key: "createLayoutState",
    value: function createLayoutState(layout_tree) {
      var _this = this;
      walkLayout(layout_tree, function (props) {
        if (props.type && props.id && props.config && (props.data || props.content || props.actions)) {
          _this.createState(props);
        }
      });
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * @returns {StateManager}
     */
    function getInstance() {
      if (StateManager._instance === null) {
        StateManager._instance = new StateManager();
      }
      return this._instance;
    }
  }]);
  return StateManager;
}();
_rollupPluginBabelHelpers._defineProperty(StateManager, "_instance", null);
var walkLayout = function walkLayout(layt, callback) {
  var _walk = function _walk(_layt) {
    for (var d in _layt) {
      if (callback && _layt[d]) {
        callback(_layt[d]);
      }
      if (_layt[d].data) {
        _walk(_layt[d].data);
      }
      if (_layt[d].content) {
        _walk([_layt[d].content]);
      }
      if (_layt[d].actions) {
        _walk([_layt[d].actions]);
      }
    }
  };
  _walk(layt);
};

/// //////////////////////////////////////////
// Component Manager
/// //////////////////////////////////////////
var ComponentManager = /*#__PURE__*/function () {
  function ComponentManager() {
    _rollupPluginBabelHelpers._classCallCheck(this, ComponentManager);
    _rollupPluginBabelHelpers._defineProperty(this, "_components", {});
  }
  _rollupPluginBabelHelpers._createClass(ComponentManager, [{
    key: "getEventManager",
    value: function getEventManager() {
      return this._event_manager;
    }
  }, {
    key: "getStateFactory",
    value: function getStateFactory() {
      return this._state_factory;
    }
  }, {
    key: "getStateManager",
    value: function getStateManager() {
      return this._state_factory;
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this._components = {};
    }
  }, {
    key: "registerComponent",
    value: function registerComponent(component) {
      /**
       * Adds component to layout manager of any type.
       * Specific types in TYPES are specifically used when automatically generating the layout using AI.
       */

      // attach managers and factory
      component.manager = this;
      if (typeof component.component === 'function') {
        this._components[component.type] = component;
      } else {
        console.error('Could not register ' + component.type + ' since it was not a function');
      }
    }
  }, {
    key: "getComponentTypes",
    value: function getComponentTypes() {
      return Object.keys(this._components);
    }
  }, {
    key: "getComponents",
    value: function getComponents() {
      return this._components;
    }
  }, {
    key: "getComponent",
    value: function getComponent(component_type) {
      return this._components[component_type];
    }
  }, {
    key: "getComponentInstance",
    value: function getComponentInstance(component_type, parameters) {
      // TODO: validate parameter inputs
      // paramters
      parameters.manager = this;
      // create component
      var c = this._components[component_type];
      if (c) {
        // if React component is of type class
        if (c.is_withclass) {
          return c.component;
        } else {
          // if React component is of type function
          // eslint-disable-next-line new-cap
          return new c.component(parameters);
        }
      } else {
        console.warn('Component instance not registered of type: ' + component_type);
      }
    }
  }, {
    key: "collectComponentInventory",
    value: function collectComponentInventory() {
      var store = {};
      for (var _i = 0, _Object$entries = Object.entries(this._components); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _rollupPluginBabelHelpers._slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          comp = _Object$entries$_i[1];
        var cfg = comp.config;
        if (cfg && key && cfg.type) {
          var parents = '';
          if (cfg.relation) {
            parents = cfg.relation.within;
          }
          store[cfg.type] = {
            id: cfg.type,
            title: cfg.name,
            type: cfg.type,
            events: comp.events,
            actions: comp.triggers,
            category: 'TBD',
            parent: parents,
            schema: cfg.options
          };
          // also add the children
          if (cfg.contains) {
            for (var _i2 = 0, _Object$entries2 = Object.entries(cfg.contains); _i2 < _Object$entries2.length; _i2++) {
              var _Object$entries2$_i = _rollupPluginBabelHelpers._slicedToArray(_Object$entries2[_i2], 2),
                key_itm = _Object$entries2$_i[0],
                _comp = _Object$entries2$_i[1];
              var itm = cfg.contains[key_itm];
              store[key_itm] = {
                id: key_itm,
                title: itm.title || itm.id,
                category: 'TBD',
                type: key_itm,
                parent: cfg.type,
                schema: _comp
              };
            }
          }
        }
      }
      return store;
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * @returns {ComponentManager}
     */
    function getInstance() {
      if (ComponentManager._instance === null) {
        ComponentManager._instance = new ComponentManager();
        ComponentManager._instance._event_manager = event_Event.EventManager.getInstance();
        ComponentManager._instance._state_factory = StateManager.getInstance();
      }
      return this._instance;
    }
  }]);
  return ComponentManager;
}();
_rollupPluginBabelHelpers._defineProperty(ComponentManager, "_instance", null);
var Manager = {
  ComponentManager: ComponentManager,
  StateManager: StateManager
};

exports["default"] = Manager;
exports.walkLayout = walkLayout;
//# sourceMappingURL=Manager.js.map
