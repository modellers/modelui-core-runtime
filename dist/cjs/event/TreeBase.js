'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var util_TreeUtil = require('../util/TreeUtil.js');
var event_ListBase = require('./ListBase.js');
require('./StateBase.js');
require('./StateBaseComponent.js');
require('react');
require('../util/ObjUtil.js');

var treeTriggers = {
  /*
  expand: {
    alias: [],
    info: {
      name: 'Expand',
      description: 'Adds data at the end to component'
    },
    schema: {}
  },
  collapse: {
    alias: [],
    info: {
      name: 'Collapse',
      description: 'Adds data to the front of the component'
    },
    schema: {}
  }
  */
};
var treeEvents = {
  /*
  expanded: {
    alias: [],
    info: {
      name: 'Expanded',
      description: 'Expanded item'
    },
    schema: {} 
  },
  collapsed: {
    alias: [],
    info: {
      name: 'Collapsed',
      description: 'Collapsed item'
    },
    schema: {}
  }
  */
};
var events = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, event_ListBase.events), treeEvents);
var triggers = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, event_ListBase.triggers), treeTriggers);
var StateTree = event_ListBase.StateList;
var TreeBase = /*#__PURE__*/function (_ListBase) {
  _rollupPluginBabelHelpers._inherits(TreeBase, _ListBase);
  var _super = _rollupPluginBabelHelpers._createSuper(TreeBase);
  function TreeBase(props) {
    var _this;
    _rollupPluginBabelHelpers._classCallCheck(this, TreeBase);
    _this = _super.call(this, props);
    // add a separate tree state
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "getTreeFromList", function (data) {
      var _data = data;
      if (!_data) {
        _data = _this.state.data;
      }
      return util_TreeUtil.getTreeFromFlatData({
        flatData: _data,
        getKey: function getKey(itm) {
          return itm.id;
        },
        getParentKey: function getParentKey(itm) {
          return itm.parent;
        },
        rootKey: _this.props.config.options.rootId || null
      });
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "getListFromTree", function (tree) {
      var _tree = tree;
      if (!_tree) {
        _tree = _this.state.tree;
      }
      var flatData = util_TreeUtil.getFlatDataFromTree({
        treeData: _tree,
        getNodeKey: function getNodeKey(itm) {
          return itm.id;
        },
        ignoreCollapsed: false
      });
      var data = [];
      flatData.forEach(function (item) {
        var itm = _rollupPluginBabelHelpers._objectSpread2({}, item.node);
        if (item.parentNode === null) {
          itm.parent = null; // null;
        } else {
          itm.parent = item.parentNode.id;
        }
        delete itm.children;
        data.push(itm);
      });
      return data;
    });
    _rollupPluginBabelHelpers._defineProperty(_rollupPluginBabelHelpers._assertThisInitialized(_this), "getPathToNodeById", function (id) {
      var idx = _this.findItemIndexById(id);
      if (idx === null) ; else {
        var itm = _this.state.data[idx];
        if (itm.parent !== null) {
          return _this.getPathToNodeById(itm.parent);
        }
      }
    });
    _this.state.tree = _this.getTreeFromList();
    return _this;
  }
  return _rollupPluginBabelHelpers._createClass(TreeBase);
}(event_ListBase.ListBase);
var schema = {
  $id: 'https://example.com/list.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'List item',
  type: 'array',
  items: {
    $ref: 'list.item.json'
  }
};
var item = {
  $id: 'https://example.com/list.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'List item',
  type: 'object',
  required: ['text'],
  properties: {
    text: {
      $ref: 'list.itemtext.json'
    },
    avatar: {
      $ref: 'avatar.schema.json'
    },
    action: {
      oneOf: [{
        $ref: 'button.schema.json'
      }, {
        $ref: 'list.itemtext.json'
      }
      // {'$ref': 'form.checkbox.json'}
      // {'$ref': 'form.switch.json'}
      ]
    }
  }
};

var itemtext = {
  $id: 'https://example.com/list.itemtext.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'List item text',
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    }
  }
};
var TreeBase$1 = {
  events: events,
  triggers: triggers,
  StateTree: StateTree,
  TreeBase: TreeBase
};

exports.StateTree = StateTree;
exports.TreeBase = TreeBase;
exports["default"] = TreeBase$1;
exports.events = events;
exports.item = item;
exports.itemtext = itemtext;
exports.schema = schema;
exports.triggers = triggers;
//# sourceMappingURL=TreeBase.js.map
