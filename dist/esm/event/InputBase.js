import { _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck, d as _defineProperty, e as _assertThisInitialized, h as _objectSpread2 } from '../_rollupPluginBabelHelpers-55d249d8.js';
import StateBase from './StateBase.js';
import StateBaseComponent from './StateBaseComponent.js';
import 'react';

// event handler
// import Event from './Event'

var events = {
  changed: {
    alias: [],
    info: {
      name: 'Changed',
      description: 'Input value changed'
    },
    schema: {}
  },
  enabled: {
    alias: [],
    info: {
      name: 'Enabled',
      description: 'Enabled input'
    },
    schema: {}
  },
  disabled: {
    alias: [],
    info: {
      name: 'Disabled',
      description: 'Disabled input'
    },
    schema: {}
  },
  submitted: {
    alias: [],
    info: {
      name: 'Submitted',
      description: 'Submitted value'
    },
    schema: {}
  },
  cleared: {
    alias: [],
    info: {
      name: 'Cleared',
      description: 'Cleared value'
    },
    schema: {}
  },
  populated: {
    alias: [],
    info: {
      name: 'Populated',
      description: 'Populated value'
    },
    schema: {}
  },
  replaced: {
    alias: [],
    info: {
      name: 'Replaced',
      description: 'Replaced value'
    },
    schema: {}
  },
  invalidated: {
    alias: [],
    info: {
      name: 'In-validated',
      description: 'Unselecting item'
    },
    schema: {}
  },
  validated: {
    alias: [],
    info: {
      name: 'De-Selected',
      description: 'Unselecting item'
    },
    schema: {}
  }
};
var triggers = {
  submit: {
    info: {
      name: 'Submit',
      description: 'Submits the form data'
    },
    schema: {},
    alias: []
  },
  enable: {
    info: {
      name: 'Enables',
      description: 'Enables the form so that we can change form inputs'
    },
    schema: {},
    alias: []
  },
  disable: {
    info: {
      name: 'Disable',
      description: 'Disables the form so that we can not change input value'
    },
    schema: {},
    alias: []
  },
  // change: { info: { name: 'Change', description: 'Changes' }, schema: {}, alias: [] },
  clear: {
    info: {
      name: 'Clear',
      description: 'Removes all input values clearing the form'
    },
    schema: {},
    alias: []
  },
  populate: {
    info: {
      name: 'Populate',
      description: 'Fills the form with specified data'
    },
    schema: {},
    alias: []
  },
  replace: {
    info: {
      name: 'Replace',
      description: 'Replaces the form with specified data'
    },
    schema: {},
    alias: []
  }
};
var StateInput = /*#__PURE__*/function (_StateBase$StateInsta) {
  _inherits(StateInput, _StateBase$StateInsta);
  var _super = _createSuper(StateInput);
  function StateInput(props) {
    var _this;
    _classCallCheck(this, StateInput);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "registerComponent", function (actionHandlers, eventHandlers, component_info) {
      var self = _assertThisInitialized(_this);
      actionHandlers = actionHandlers || {};
      eventHandlers = eventHandlers || {};
      // add our known handlers
      // register componenet overiding or adding new event handlers
      var dataActionHandlers = {
        submit: {
          schema: {},
          handler: function handler(obj) {
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'submitting', obj, null);
            _this.getActionState('submit', function (change) {
              var update = self.alterState(change);
              // Event.EventManager.getInstance().addEvent(
              self.eventManager.addEvent(self.props.id, 'submitted', update.data, null);
            });
          }
        },
        enable: {
          schema: {},
          handler: function handler(obj) {
            var change = {
              disabled: false
            };
            self.alterState(change);
            if (_this.updateView('enable', obj, obj, self.state.data)) {
              // Event.EventManager.getInstance().addEvent(
              self.eventManager.addEvent(self.props.id, 'enabled', change, null);
            }
          }
        },
        disable: {
          schema: {},
          handler: function handler(obj) {
            var change = {
              disabled: true
            };
            self.alterState(change);
            if (_this.updateView('disable', obj, obj, self.state.data)) {
              // Event.EventManager.getInstance().addEvent(
              self.eventManager.addEvent(self.props.id, 'disabled', change, null);
            }
          }
        },
        clear: {
          schema: {},
          handler: function handler(obj) {
            var change = {
              data: {
                value: ''
              }
            }; // getSchemaDefaults(this.state.data.schema || this.state.schema);
            var update = self.alterState(change);
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'clearing', change, {});
            if (self.updateView('clear', obj, obj, update)) {
              // Event.EventManager.getInstance().addEvent(
              self.eventManager.addEvent(self.props.id, 'cleared', update.data, null);
            }
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'changed', update.data, null);
          }
        },
        populate: {
          schema: {},
          handler: function handler(obj) {
            var change = {
              data: {
                value: obj.value,
                id: obj.id
              }
            };
            self.alterState(change);
            if (self.updateView('populate', obj, obj, self.state.data)) {
              // Event.EventManager.getInstance().addEvent(
              self.eventManager.addEvent(self.props.id, 'populated', obj, null);
            }
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'changed', obj, null);
          }
        },
        replace: {
          schema: {},
          handler: function handler(obj) {
            var replaced = _objectSpread2(_objectSpread2({}, self.state), {}, {
              data: _objectSpread2(_objectSpread2({}, obj), {}, {
                id: obj.id,
                value: obj.value || _this.state.data.value,
                schema: obj.schema || _this.state.data.schema
              })
            });
            self.setState(replaced);
            if (self.updateView('replace', obj, obj, self.state.data)) {
              // Event.EventManager.getInstance().addEvent(
              self.eventManager.addEvent(self.props.id, 'replaced', obj, null);
            }
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'changed', obj, null);
          }
        }
      };

      // register componenet overiding or adding new event handlers
      // this.ddEvent = Event.EventManager.getInstance().register(
      self.ddEvent = self.eventManager.register(self.props.id, _objectSpread2(_objectSpread2({}, dataActionHandlers), actionHandlers), _objectSpread2(_objectSpread2({}, events), eventHandlers), component_info);
      return self.ddEvent;
    });
    _this.props = props;
    // apply initial values
    _this.state = {
      data: {
        id: props.data.id || null,
        value: props.data.value,
        schema: props.data.schema || props.schema
      },
      enabled: (props.config || {}).enabled || true,
      schema: props.schema
    };
    if (!_this.props.manager) {
      throw new Error('Manager was not passed through StateInput props');
    }
    _this.eventManager = _this.props.manager.getEventManager();
    return _this;
  }
  return _createClass(StateInput);
}(StateBase.StateInstance);
var InputBase = /*#__PURE__*/function (_StateBaseComponent$S) {
  _inherits(InputBase, _StateBaseComponent$S);
  var _super2 = _createSuper(InputBase);
  /**
   * Used to manage internal state of avatars
   */
  function InputBase(props) {
    var _this2;
    _classCallCheck(this, InputBase);
    if (!props.config.options) {
      props.config.options = {};
    }
    _this2 = _super2.call(this, props);
    _defineProperty(_assertThisInitialized(_this2), "updateView", function (action, arr, updated, data) {
      // extend by parent
      return true;
    });
    _this2.props = props;
    return _this2;
  }
  _createClass(InputBase, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return InputBase;
}(StateBaseComponent.StateBaseComponent);
var InputBase$1 = {
  events: events,
  triggers: triggers,
  StateInput: StateInput,
  InputBase: InputBase
};

export { InputBase$1 as default };
//# sourceMappingURL=InputBase.js.map
