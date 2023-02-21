'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var event_ListBase = require('./ListBase.js');
var event_StateBaseComponent = require('./StateBaseComponent.js');
var util_ObjUtil = require('../util/ObjUtil.js');
require('./StateBase.js');
require('react');

// event handler
// import Event from './Event'

var triggers = event_ListBase["default"].triggers;
var events = event_ListBase["default"].events;
var schema_with_ids = {
  $id: 'identifiers',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Identifiers',
  type: 'object',
  properties: {
    id: {
      type: 'string'
    }
  },
  required: ['id']
};
var StateSchemaList = /*#__PURE__*/function (_ListBase$StateList) {
  _rollupPluginBabelHelpers._inherits(StateSchemaList, _ListBase$StateList);
  var _super = _rollupPluginBabelHelpers._createSuper(StateSchemaList);
  function StateSchemaList(props) {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, StateSchemaList);
    _this = _super.call(this, props);
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "findItemIndexById", function (id, data) {
      return util_ObjUtil.findItemIndexById(id, data);
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
              items: _this.state.data,
              schema: _this.state.schema
            }, {});
          }
        },
        replace: {
          // is the only way to change the schema
          schema: {},
          handler: function handler(objs) {
            // replace content

            // make sure we get items and / or schema properties
            var data_state = _this.state;
            if (objs.schema) ; // TODO: validate schema
            if (objs.items) {
              if (!Array.isArray(objs.items)) {
                objs.items = [objs.items];
              }
              // TODO: validate data (new or old) against new schema
            }

            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'replacing', {
              old: data_state,
              "new": objs
            }, {});
            var data = objs;
            if (_this.updateView('replace', [], [], data.items)) {
              _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
                data: data.items || _this.state.data,
                schema: data.schema || _this.state.schema
              }));
            }
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'replaced', {
              count: _this.state.data.length,
              items: _this.state.data,
              schema: _this.state.schema
            }, {});
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'changed', {
              count: _this.state.data.length,
              items: _this.state.data,
              schema: _this.state.schema
            }, {});
          }
        },
        push: {
          schema: {},
          handler: function handler(objs) {
            // append
            var data_added = [];
            var data_updated = []; // contains ids
            var data_state = _rollupPluginBabelHelpers._toConsumableArray(_this.state.data || []); // FIXME: use better way
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
                data_state[idx] = util_ObjUtil.mergeDeep(data_state[idx], obj);
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
            _this.eventManager.addEvent(_this.props.id, 'changed', {
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
            var data_state = _rollupPluginBabelHelpers._toConsumableArray(_this.state.data || []); // FIXME: use better way
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
            _this.eventManager.addEvent(_this.props.id, 'changed', {
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
            _this.eventManager.addEvent(_this.props.id, 'changed', {
              count: data.length,
              items: data,
              deleted: deleting
            }, {});
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'deleted', {
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
              _this.state.data.splice(_this.state.data.length - 1, 1);
              if (_this.updateView('pop', [], [], _this.state.data)) {
                _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
                  data: _this.state.data
                }));
                // Event.EventManager.getInstance().addEvent(
                _this.eventManager.addEvent(_this.props.id, 'changed', {
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
            _this.state.data.splice(0, 1);
            if (_this.updateView('pop_front', [], [], _this.state.data)) {
              _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
                data: _this.state.data
              }));
              // Event.EventManager.getInstance().addEvent(
              _this.eventManager.addEvent(_this.props.id, 'changed', {
                count: _this.state.data.length,
                items: _this.state.data
              }, {});
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
            _this.eventManager.addEvent(_this.props.id, 'selecting', objs, null);
            if (_this.updateView('select', objs, data_updated, _this.state)) {
              // Event.EventManager.getInstance().addEvent(
              _this.eventManager.addEvent(_this.props.id, 'selected', selected, null);
            }
          }
        },
        clear: {
          schema: {},
          handler: function handler(obj) {
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'clearing', {
              count: _this.state.data.length,
              items: _this.state.data
            }, {});
            _this.setState(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, _this.state), {}, {
              data: []
            }));
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'cleared', {
              count: _this.state.data.length,
              items: _this.state.data
            }, {});
            // Event.EventManager.getInstance().addEvent(
            _this.eventManager.addEvent(_this.props.id, 'changed', {
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
    _this.props = props;
    // ensure array
    var _data = [];
    var _schema = props.data.schema || _this.props.schema || schema_with_ids; // expect ids
    if (props.data) {
      // make sure we have at least a data property
      if (!props.data.items) {
        throw new Error('Expecting data property in data object');
      }
      if (Array.isArray(props.data.items)) {
        _data = props.data.items;
      } else {
        // check if this is an empty object
        if (_rollupPluginBabelHelpers._typeof(props.data.items) === 'object') {
          // objects should not be empty
          if (props.data.items.length) {
            _data = [props.data.items];
          }
        } else {
          _data = [props.data.items];
        }
      }
    }
    // apply default values
    _this.state = {
      schema: _schema,
      data: _data || [],
      selectedIndex: 0,
      selectedId: null
    };
    if (!_this.props.manager) {
      throw new Error('Manager was not passed through StateSchemaList props');
    }
    _this.eventManager = _this.props.manager.getEventManager();
    return _this;
  }
  return _rollupPluginBabelHelpers._createClass(StateSchemaList);
}(event_ListBase["default"].StateList);
var ListSchemaBase = /*#__PURE__*/function (_StateBaseComponent$S) {
  _rollupPluginBabelHelpers._inherits(ListSchemaBase, _StateBaseComponent$S);
  var _super2 = _rollupPluginBabelHelpers._createSuper(ListSchemaBase);
  /**
   * Used to manage internal state of avatars
   */
  function ListSchemaBase(props) {
    var _this2;
    _rollupPluginBabelHelpers._classCallCheck(this, ListSchemaBase);
    if (!props.config.options) {
      props.config.options = {};
    }
    _this2 = _super2.call(this, props);
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "updateData", function (change, object_id, silent) {
      // debugger;
      // const change_row_idx = this.findItemIndexById(object_id.id, this.state.data);
      // do the update
      _this2.triggerAction('push', [change]);
      // this.state.data[change_row_idx] = mergeDeep (this.state.data[change_row_idx], change)
    });
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
      // EventManager.getInstance().addAction(this.props.id, 'select', { id: id });
      _this2.triggerAction('select', {
        id: id
      });
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this2), "handleSelect", function (key, data, index, evt) {
      if (!evt) {
        _this2.setSelectedId(data.id, evt);
      }
    });
    _this2.props = props;
    return _this2;
  }
  _rollupPluginBabelHelpers._createClass(ListSchemaBase, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return ListSchemaBase;
}(event_StateBaseComponent.StateBaseComponent);
var ListSchemaBase$1 = {
  events: events,
  triggers: triggers,
  StateSchemaList: StateSchemaList,
  ListSchemaBase: ListSchemaBase
};

exports.ListSchemaBase = ListSchemaBase;
exports.StateSchemaList = StateSchemaList;
exports["default"] = ListSchemaBase$1;
exports.events = events;
exports.triggers = triggers;
//# sourceMappingURL=ListSchemaBase.js.map
