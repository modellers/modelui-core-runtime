import { d as _defineProperty, b as _createClass, c as _classCallCheck, j as _typeof, g as _slicedToArray } from '../_rollupPluginBabelHelpers-55d249d8.js';

/* eslint-disable prettier/prettier */
/***
https://stackoverflow.com/questions/44719103/singleton-object-in-react-native

import EventManager from './EventManager';

// When storing data.
let commonData = EventManager.getInstance();
commonData.setUserID("User1");

// When retrieving stored data.
let commonData = EventManager.getInstance();
let userId = commonData.getUserID();
console.log(userId);

*/
var EventManager = /*#__PURE__*/function () {
  function EventManager() {
    _classCallCheck(this, EventManager);
    _defineProperty(this, "_events", {});
    _defineProperty(this, "_watching", {});
    _defineProperty(this, "_actions", {});
    _defineProperty(this, "_components", {});
    _defineProperty(this, "_component_instance_type", {});
  }
  _createClass(EventManager, [{
    key: "getType",
    value:
    /// //////////////////////////////////////////////
    /// Utility functions
    /// //////////////////////////////////////////////

    function getType(oObj) {
      var res = false;
      if (_typeof(oObj) === 'object') {
        res = oObj === null ? 'null' :
        // Check if it is an alien object, for example created as {world:'hello'}
        typeof oObj.constructor !== 'function' ? 'object' :
        // else return object name (string)
        oObj.constructor.name;
      } else {
        // Test simple types (not constructed types)
        res = typeof oObj === 'boolean' ? 'boolean' : typeof oObj === 'number' ? 'number' : typeof oObj === 'string' ? 'string' : typeof oObj === 'function' ? 'function' : false;
      }
      return (res + '').toLowerCase();
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this._events = {};
      this._watching = {};
      this._actions = {};
      this._component_instance_type = {};
    }
  }, {
    key: "warnRegistration",
    value: function warnRegistration(input_type, component_id, event_name, msg) {
      var newLocal = 'Update registration for ' + input_type + ' ' + component_id + '.' + event_name + ' : ' + msg;
      console.warn(newLocal);
      // TODO: should notify the UI
    }
  }, {
    key: "warnInfoRegistration",
    value: function warnInfoRegistration(component_id, msg) {
      console.warn('Update registration for ' + component_id + ': ' + msg);
      // TODO: should notify the UI
    }
  }, {
    key: "valid",
    value: function valid(obj, attr, type, default_value, component_id, key, input_type) {
      // eslint-disable-next-line no-prototype-builtins
      if (!obj.hasOwnProperty(attr)) {
        obj[attr] = default_value;
        this.warnRegistration(input_type, component_id, key, 'Attribute ' + attr + ' missing. Using default value.');
      }
      if (this.getType(obj[attr]) !== type) {
        this.warnRegistration(input_type, component_id, key, "Attribute ".concat(attr, " should be of type ").concat(type, " but is ").concat(this.getType(obj[attr]), " using default values."));
      }
    }
  }, {
    key: "validInputsForUI",
    value: function validInputsForUI(obj, input_type, component_id, key) {
      // check if schema is specified. Used by UI and validating inputs during runtime
      this.valid(obj, 'schema', 'object', {
        type: 'object',
        title: component_id + '-' + key,
        description: 'Auto generated'
      }, component_id, key, input_type);
    }
  }, {
    key: "capitalize",
    value: function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /// //////////////////////////////////////////////
    /// Component self registering (is called in component)
    /// //////////////////////////////////////////////
  }, {
    key: "register",
    value: function register(component_id, actions, events, component_info) {
      var _this = this;
      // TODO: validate input action
      if (!component_info) {
        console.warn('Component info is missing for ' + component_id); // throw "Component info is missing";
      } else {
        this._components[component_info.type] = component_info;
        this._components[component_info.type].actions = actions;
        this._components[component_info.type].events = events;
        this._component_instance_type[component_id] = component_info.type;
      }
      this._actions[component_id] = {};
      this._events[component_id] = events || {};
      // lets save our actions
      Object.keys(actions).forEach(function (key) {
        // validate the action registration
        var action = actions[key];
        // if we only specify function, lets refactor
        if (typeof action === 'function') {
          action = {
            handler: action
          };
          _this.warnRegistration(component_id, key, 'Function handler should be defined as handler in an object. Auto refactoring done.');
        }
        _this.validInputsForUI(action, 'action', component_id, key);
        _this._actions[component_id][key] = action;
      });
      var event_map = {}; // used to return the event mapping id

      // lets assign ids to the events
      Object.keys(this._events[component_id]).forEach(function (key) {
        var key_id = key; // TODO: should be random
        if (!_this._events[component_id][key].id) {
          // if undefined, null or 0
          _this._events[component_id][key].id = key_id;
          event_map[key] = {
            id: key_id
          }; // REMOVE ME when refactoring this
        } else {
          event_map[key] = {
            id: _this._events[component_id][key].id
          }; // TODO: EVENT HAS CALLABLE HANDLER
        }

        _this.validInputsForUI(_this._events[component_id][key], 'event', component_id, key);
      });
      return event_map;
    }

    /// //////////////////////////////////////////////
    /// modelui core functions
    /// //////////////////////////////////////////////
  }, {
    key: "addToWatchList",
    value: function addToWatchList(cid, evt, trigger_id, trigger_action, transform) {
      if (!this._watching[cid]) {
        this._watching[cid] = {};
      }
      if (this._watching[cid][evt] === undefined) {
        this._watching[cid][evt] = []; // add a trigger array for component
      }

      // add to trigger array an action to perform
      this._watching[cid][evt].push({
        tid: trigger_id,
        // trigger id
        act: trigger_action,
        // trigger event
        transf: transform // transformation function (TODO: if not set find one!!!)
      });
    }
  }, {
    key: "watch",
    value: function watch(W) {
      var _this2 = this;
      // TODO: validate W against registered
      if (Array.isArray(W) === false) {
        W = [W];
      }
      var _loop = function _loop() {
        var w = W[i];
        var cid = w.component.id;
        var evt = w.component.event;
        if (w.component.filter) {
          // if this is a filtered watch
          if (!w.component.regex) {
            // only compile expression if missing
            w.component.regex = new RegExp(w.component.filter);
          }
          Object.entries(_this2._actions).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              cid_key = _ref2[0];
              _ref2[1];
            if (w.component.regex.exec(cid_key)) {
              _this2.addToWatchList(cid_key, evt, w.trigger.id, w.trigger.action, w.transform);
            }
          });
        } else {
          // lets add the id to watch list instead
          if (cid) {
            _this2.addToWatchList(cid, evt, w.trigger.id, w.trigger.action, w.transform);
          }
        }
      };
      for (var i = 0; i < W.length; i++) {
        _loop();
      }
    }
  }, {
    key: "addEvent",
    value: function addEvent(cid, event_name, data, evt) {
      // are we watching this component
      if (this._watching[cid]) {
        // are we watching this component event
        var actions = this._watching[cid][event_name] || [];
        for (var a in actions) {
          var act = actions[a];
          this.addAction(act.tid, act.act, data, act.transf, evt);
        }
      }
    }
  }, {
    key: "addAction",
    value: function addAction(component_id, action_name, data, transform, evt) {
      if (this._actions[component_id]) {
        if (this._actions[component_id][action_name]) {
          var transformed_data = data;
          if (transform) {
            try {
              transformed_data = transform(data);
            } catch (e) {
              console.error('Transform failed', e);
            }
          }
          if (transformed_data) {
            // only apply action if data is available
            this._actions[component_id][action_name].handler(transformed_data, evt);
          }
        }
      }
    }

    /// //////////////////////////////////////////////
    /// Debugging
    /// //////////////////////////////////////////////
  }, {
    key: "getCopyOfEvents",
    value: function getCopyOfEvents() {
      return Object.assign({}, this._events);
    }
  }, {
    key: "getCopyOfWatchers",
    value: function getCopyOfWatchers() {
      return Object.assign({}, this._watching);
    }
  }, {
    key: "getCopyOfActions",
    value: function getCopyOfActions() {
      return Object.assign({}, this._actions);
    }

    /// //////////////////////////////////////////////
    /// Modeller UI related functions
    /// //////////////////////////////////////////////
  }, {
    key: "collectComponentInventory",
    value: function collectComponentInventory() {
      var store = {};
      for (var _i = 0, _Object$entries = Object.entries(this._components); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          comp = _Object$entries$_i[1];
        var parents = '';
        if (comp.relation) {
          parents = comp.relation.within;
        }
        store[key] = {
          id: comp.type,
          title: comp.name,
          type: comp.type,
          parent: parents
        };
      }
      return store;
    }
  }, {
    key: "getComponentSchema",
    value: function getComponentSchema(type) {
      return this._components[type].options;
    }
  }, {
    key: "getComponentByType",
    value: function getComponentByType(type) {
      return this._components[type];
    }
  }, {
    key: "getComponentsRegistered",
    value: function getComponentsRegistered() {
      return Object.keys(this._component_instance_type);
    }
  }, {
    key: "getComponentType",
    value: function getComponentType(component_id) {
      return this._component_instance_type[component_id];
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * @returns {EventManager}
     */
    function getInstance() {
      if (EventManager._instance === null) {
        EventManager._instance = new EventManager();
      }
      return this._instance;
    }
  }]);
  return EventManager;
}();
_defineProperty(EventManager, "_instance", null);
var getTransformFunction = function getTransformFunction(evt) {
  // the event has .transform as attribute
  if (typeof (evt.transform || evt.code) !== 'string') {
    return 'Event code attribute is missing';
  }
  try {
    // TODO: support more params
    // eslint-disable-next-line no-new-func
    var fn = Function('data', evt.transform || evt.code);
    return fn;
  } catch (e) {
    return e + '';
  }
};
var Event = {
  EventManager: EventManager,
  getTransformFunction: getTransformFunction
};

export { Event as default };
//# sourceMappingURL=Event.js.map
