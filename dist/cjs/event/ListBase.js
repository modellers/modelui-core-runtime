'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var event_StateBase = require('./StateBase.js');
var event_StateBaseComponent = require('./StateBaseComponent.js');
var util_ObjUtil = require('../util/ObjUtil.js');
require('react');

// event handler
// import Event from './Event'

var schema_only_id = {
  // "$schema": "http://json-schema.org/draft-06/schema#",
  $id: 'v1/listbase/..',
  type: 'array',
  items: {
    $ref: '#/definitions/identifier'
  },
  definitions: {
    identifier: {
      type: 'object',
      additionalProperties: true,
      properties: {
        id: {
          type: 'string'
        }
      },
      required: ['id'],
      title: 'Identifier with additional properties'
    }
  }
};
var triggers = {
  submit: {
    alias: [],
    info: {
      name: 'Submit',
      description: 'Submit entire list'
    },
    schema: {}
  },
  replace: {
    alias: [],
    info: {
      name: 'Replace',
      description: 'Replace data'
    },
    schema: {}
  },
  push: {
    alias: [],
    info: {
      name: 'Push',
      description: 'Adds data at the end to component'
    },
    schema: {}
  },
  push_front: {
    alias: [],
    info: {
      name: 'Push front',
      description: 'Adds data to the front of the component'
    },
    schema: {}
  },
  "delete": {
    alias: [],
    info: {
      name: 'Delete data instance',
      description: 'Removes data from the component'
    },
    schema: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, schema_only_id), {}, {
      $id: 'v1/listbase/delete'
    })
  },
  pop: {
    alias: [],
    info: {
      name: 'Pop back item',
      description: 'Deletes / removes back data item'
    },
    schema: {}
  },
  pop_front: {
    alias: [],
    info: {
      name: 'Pop front item',
      description: 'Deletes / removes front data item'
    },
    schema: {}
  },
  select: {
    alias: [],
    info: {
      name: 'Select item',
      description: 'Selects the data item'
    },
    schema: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, schema_only_id), {}, {
      $id: 'v1/listbase/select'
    })
  },
  clear: {
    alias: [],
    info: {
      name: 'Clear items',
      description: 'Removes all items from list'
    },
    schema: {}
  }
};
var events = {
  changed: {
    alias: [],
    info: {
      name: 'changed',
      description: 'Changed size'
    },
    schema: {}
  },
  replacing: {
    alias: [],
    info: {
      name: 'replacing',
      description: 'Replacing content'
    },
    schema: {}
  },
  replaced: {
    alias: [],
    info: {
      name: 'replaced',
      description: 'Replace content'
    },
    schema: {}
  },
  submitted: {
    alias: [],
    info: {
      name: 'Submitted',
      description: 'Subbited all items in list'
    },
    schema: {}
  },
  deleted: {
    alias: [],
    info: {
      name: 'Deleted',
      description: 'Deleted specified items'
    },
    schema: {}
  },
  pushing: {
    alias: [],
    info: {
      name: 'Pusing',
      description: 'Pushing item in front of list'
    },
    schema: {}
  },
  pushed: {
    alias: [],
    info: {
      name: 'Pushed',
      description: 'Pushed item in front of list'
    },
    schema: {}
  },
  selected: {
    alias: [],
    info: {
      name: 'Selected',
      description: 'Selecting item'
    },
    schema: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, schema_only_id), {}, {
      $id: 'v1/listbase/selected'
    })
  },
  deselected: {
    alias: [],
    info: {
      name: 'De-Selected',
      description: 'Unselecting item'
    },
    schema: {}
  },
  clearing: {
    alias: [],
    info: {
      name: 'Clearing',
      description: 'Removing all items'
    },
    schema: {}
  },
  cleared: {
    alias: [],
    info: {
      name: 'Cleared',
      description: 'Removed all items'
    },
    schema: {}
  }
};
var StateList = /*#__PURE__*/function (_StateBase$StateInsta) {
  _rollupPluginBabelHelpers._inherits(StateList, _StateBase$StateInsta);
  var _super = _rollupPluginBabelHelpers._createSuper(StateList);
  function StateList(_props) {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, StateList);
    _this = _super.call(this, _props);
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "findItemIndexById", function (id, data) {
      return util_ObjUtil.findItemIndexById(id, data);
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "updateItem", function (id, props) {
      var idx = _this.findItemIndexById(id, _this.state.data);
      var updated = _rollupPluginBabelHelpers._toConsumableArray(_this.state.data); // copy
      // TODO: validate props against schema
      if (idx >= 0) {
        for (var _i = 0, _Object$entries = Object.entries(props); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _rollupPluginBabelHelpers._slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];
          updated[idx][key] = value;
        }
        _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
          data: updated
        }));
      }
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "registerComponent", function (actionHandlers, eventHandlers, component_info) {
      actionHandlers = actionHandlers || {};
      eventHandlers = eventHandlers || {};
      // add our known handlers
      var dataActionHandlers = {
        submit: {
          schema: {},
          handler: function handler(objs) {
            // submit
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'submitted', {
              count: _this.state.data.length,
              items: _this.state.data
            }, {});
          }
        },
        replace: {
          schema: {},
          handler: function handler(objs) {
            // append
            var data_state = _this.state.data || [];
            // want an array
            if (!Array.isArray(objs)) {
              objs = [objs];
            }
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'replacing', {
              count: data_state.length,
              old: data_state,
              "new": objs
            }, {});
            var data = objs;
            if (_this.updateView('replace', [], [], data)) {
              _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
                data: data
              }));
            }
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'replaced', {
              count: data.length,
              items: data
            }, {});
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'changed', {
              count: data.length,
              items: data
            }, {});
          }
        },
        push: {
          schema: {},
          handler: function handler(objs) {
            // append
            var data_added = [];
            var data_updated = []; // contains ids
            var data_state = _this.state.data || [];
            var selected = {};
            // want an array
            if (!Array.isArray(objs)) {
              objs = [objs];
            }
            objs.forEach(function (obj) {
              var idx = _this.findItemIndexById(obj.id, data_state);
              if (idx === null) {
                data_added.push(obj);
              } else {
                // update the index
                data_state[idx] = util_ObjUtil.mergeDeep(data_state[idx], obj); // TODO: fetch from utils
                data_updated.push(idx);
              }
              if (obj.selected) {
                // TODO: test that we can push items that are selected
                selected = {
                  selectedId: obj.id,
                  selectedIndex: idx
                };
              }
            });
            var data = [].concat(_rollupPluginBabelHelpers._toConsumableArray(data_state), data_added);
            // notify parent class of push event
            try {
              // Event.EventManager.getInstance().addEvent(
              _this.eventManager.addEvent(_this.props.id, 'pushing', data_added, {});
              if (_this.updateView('push', data_added, data_updated, data)) {
                _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), selected), {}, {
                  data: data
                }));
              }
            } catch (e) {
              _this.exceptionCatched('push', e);
            }
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'pushed', {
              count: data.length,
              items: data,
              added: data_added
            }, {});
            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'changed', {
              count: data.length,
              items: data,
              added: data_added,
              updated: data_updated
            }, {});
            // FIXME: this.showSelected(selected.selectedId, selected.selectedIndex || -1);
          }
        },

        push_front: {
          schema: {},
          handler: function handler(objs) {
            var data_added = [];
            var data_updated = [];
            var data_state = _this.state.data || [];
            var selected = {};
            // want an array
            if (!Array.isArray(objs)) {
              objs = [objs];
            }
            objs.forEach(function (obj) {
              var idx = _this.findItemIndexById(obj.id, _this.state.data);
              if (idx === null) {
                data_added.push(obj);
              } else {
                // update the index
                data_state[idx] = obj;
                data_updated.push(idx);
              }
              if (obj.selected) {
                // TODO: test that we can push items that are selected
                selected = {
                  selectedId: obj.id,
                  selectedIndex: idx || data_added.length - 1
                };
              }
            });
            var data = [].concat(data_added, _rollupPluginBabelHelpers._toConsumableArray(data_state));
            if (_this.updateView('push_front', [], data_updated, data)) {
              _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), selected), {}, {
                data: data
              }));
            }
            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'changed', {
              count: data.length,
              items: data
            }, {});
            // FIXME: this.showSelected(selected.selectedId, selected.selectedIndex || -1);
          }
        },

        "delete": {
          schema: {},
          handler: function handler(objs) {
            // want an array
            if (!Array.isArray(objs)) {
              objs = [objs];
            }
            var data = _this.state.data;
            var data_updated = [];
            var deleting = [];
            objs.forEach(function (obj) {
              if (obj.id) {
                // requires array
                var idx = _this.findItemIndexById(obj.id, data);
                if (idx !== null) {
                  deleting.push(obj.id);
                  data = util_ObjUtil.removeItemIndexByIndex(idx, data);
                  data_updated.push(idx);
                }
              }
            });
            try {
              if (_this.updateView('delete', [], data_updated, data)) {
                _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
                  data: data
                }));
              }
            } catch (e) {
              _this.exceptionCatched('delete', e);
            }

            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'changed', {
              count: data.length,
              items: data,
              deleted: deleting
            }, {});
            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'deleted', {
              count: deleting.length,
              items: data,
              deleted: deleting
            }, {});
          }
        },
        pop: {
          schema: {},
          handler: function handler(obj) {
            if (_this.state.data.length > 0) {
              var data = _this.state.data.slice();
              var data_removed = data.splice(data.length - 1, 1); // remove item
              if (_this.updateView('pop', [], data_removed, data)) {
                _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
                  data: data
                }));
                // Event.EventManager.getInstance().addEvent(
                _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'changed', {
                  count: _this.state.data.length,
                  items: _this.state.data
                }, {});
              }
            }
          }
        },
        pop_front: {
          schema: {},
          handler: function handler(obj) {
            if (_this.state.data.length > 0) {
              var data = _this.state.data.slice();
              var data_removed = data.splice(0, 1);
              if (_this.updateView('pop_front', [], data_removed, data)) {
                _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
                  data: data
                }));
                // Event.EventManager.getInstance().addEvent(
                _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'changed', {
                  count: _this.state.data.length,
                  items: _this.state.data
                }, {});
              }
            }
          }
        },
        select: {
          schema: {},
          handler: function handler(objs) {
            var data_updated = [];
            var selected = [];
            // want an array
            if (!Array.isArray(objs)) {
              objs = [objs];
            }
            // allow only one selection
            for (var i = 0; i < _this.state.data.length; i++) {
              _this.state.data[i].selected = false;
            }
            // find selected
            objs.forEach(function (obj) {
              if (obj.id) {
                // requires array
                var idx = _this.findItemIndexById(obj.id, _this.state.data);
                if (idx !== null) {
                  _this.state.data[idx].selected = !_this.state.data[idx].selected;
                  _this.state.selectedId = _this.state.data[idx].id;
                  _this.state.selectedIndex = idx;
                  data_updated.push(idx);
                  selected.push(_this.state.data[idx]);
                }
              }
            });
            // for now we just replace the state
            _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
              data: _this.state.data
            }));
            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'selecting', objs, null);
            if (_this.updateView('select', objs, data_updated, _this.state)) {
              // Event.EventManager.getInstance().addEvent(
              _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'selected', selected, null);
            }
          }
        },
        clear: {
          schema: {},
          handler: function handler(obj) {
            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'clearing', {
              count: _this.state.data.length,
              items: _this.state.data
            }, {});
            _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
              data: []
            }));
            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'cleared', {
              count: _this.state.data.length,
              items: _this.state.data
            }, {});
            // Event.EventManager.getInstance().addEvent(
            _this.ddEvent = _this.eventManager.addEvent(_this.props.id, 'changed', {
              count: _this.state.data.length,
              items: _this.state.data
            }, {});
            _this.updateView('clear', [], [], []);
          }
        }
      };

      // register componenet overiding or adding new event handlers
      // this.ddEvent = Event.EventManager.getInstance().register(
      _this.ddEvent = _this.eventManager.register(_this.props.id, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, dataActionHandlers), actionHandlers), _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, events), eventHandlers), component_info);
      return _this.ddEvent;
    });
    _this.props = _props;
    // ensure array
    var _data = [];
    if (_props.data) {
      if (Array.isArray(_props.data)) {
        _data = _props.data;
      } else {
        // check if this is an empty object
        if (_rollupPluginBabelHelpers._typeof(_props.data) === 'object') {
          // objects should not be empty
          if (_props.data.length) {
            _data = [_props.data];
          }
        } else {
          _data = [_props.data];
        }
      }
    }
    // apply default values
    _this.state = {
      data: _data || [],
      selectedIndex: 0,
      selectedId: null
    };
    if (!_this.props.manager) {
      throw new Error('Manager was not passed through StateList props');
    }
    _this.eventManager = _this.props.manager.getEventManager();
    return _this;
  }
  return _rollupPluginBabelHelpers._createClass(StateList);
}(event_StateBase["default"].StateInstance);
var ListBase = /*#__PURE__*/function (_StateBaseComponent$S) {
  _rollupPluginBabelHelpers._inherits(ListBase, _StateBaseComponent$S);
  var _super2 = _rollupPluginBabelHelpers._createSuper(ListBase);
  /**
   * Used to manage internal state of avatars
   */
  function ListBase(_props2) {
    var _this2;
    _rollupPluginBabelHelpers._classCallCheck(this, ListBase);
    if (!_props2.config.options) {
      _props2.config.options = {};
    }
    _this2 = _super2.call(this, _props2);
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "updateView", function (action, arr, updated, data) {
      // extend by parent
      return true;
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "exceptionCatched", function (action_name, event_object) {
      // console.info('ListBase: ' + action_name + ' --> ', event_object)
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "findItemIndexById", function (id, data) {
      if (_this2.stateManager) {
        return _this2.stateManager.findItemIndexById(id, data);
      }
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "updateItem", function (id, props, silent) {
      if (silent) {
        return _this2.updateItemSilent(id, props);
      } else {
        return _this2.triggerAction('push', _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, props), {}, {
          id: id
        }));
      }
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "updateItemSilent", function (id, props) {
      if (_this2.stateManager) {
        return _this2.stateManager.updateItem(id, props);
      }
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "getData", function () {
      return _this2.state.data;
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "showSelectedRow", function (row) {
      if (_this2.props.config.options.select) {
        return row.selected;
      }
      return false;
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "showSelected", function (id, idx) {
      // parent implementation to update the visual representation
      return true; // returns true to update state. Else do not update state.
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "setSelectedId", function (id, evt, selected) {
      // Event.EventManager.getInstance().addAction(this.props.id, 'select', { id: id });
      _this2.triggerAction('select', {
        id: id
      });
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "getSelectedId", function () {
      var selected = [];
      _this2.state.data.forEach(function (itm) {
        if (itm.selected) {
          selected.push(itm.id);
        }
      });
      return selected;
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "getItemTreeState", function () {
      var selected = [];
      var expanded = [];
      _this2.state.data.forEach(function (itm) {
        if (itm.selected) {
          selected.push(itm.id);
        }
        if (itm.expanded) {
          expanded.push(itm.id);
        }
      });
      return {
        selected: selected,
        expanded: expanded,
        focused: _this2.state.selectedId
      };
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "handleSelect", function (key, data, index, evt) {
      if (!evt) {
        _this2.setSelectedId(data.id, evt);
      }
    });
    _this2.props = _props2;
    return _this2;
  }
  _rollupPluginBabelHelpers._createClass(ListBase, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return ListBase;
}(event_StateBaseComponent.StateBaseComponent);
/*
module.exports.triggers = triggers
module.exports.events = events
module.exports.StateList = StateList
module.exports.ListBase = ListBase
*/
var ListBase$1 = {
  events: events,
  triggers: triggers,
  StateList: StateList,
  ListBase: ListBase
};

exports.ListBase = ListBase;
exports.StateList = StateList;
exports["default"] = ListBase$1;
exports.events = events;
exports.triggers = triggers;
//# sourceMappingURL=ListBase.js.map
