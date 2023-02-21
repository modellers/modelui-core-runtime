import { h as _objectSpread2, _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck, d as _defineProperty, e as _assertThisInitialized } from '../_rollupPluginBabelHelpers-55d249d8.js';
import { getTreeFromFlatData, getFlatDataFromTree } from '../util/TreeUtil.js';
import { events as events$1, triggers as triggers$1, StateList, ListBase } from './ListBase.js';
import './StateBase.js';
import './StateBaseComponent.js';
import 'react';
import '../util/ObjUtil.js';

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
var events = _objectSpread2(_objectSpread2({}, events$1), treeEvents);
var triggers = _objectSpread2(_objectSpread2({}, triggers$1), treeTriggers);
var StateTree = StateList;
var TreeBase = /*#__PURE__*/function (_ListBase) {
  _inherits(TreeBase, _ListBase);
  var _super = _createSuper(TreeBase);
  function TreeBase(props) {
    var _this;
    _classCallCheck(this, TreeBase);
    _this = _super.call(this, props);
    // add a separate tree state
    _defineProperty(_assertThisInitialized(_this), "getTreeFromList", function (data) {
      var _data = data;
      if (!_data) {
        _data = _this.state.data;
      }
      return getTreeFromFlatData({
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
    _defineProperty(_assertThisInitialized(_this), "getListFromTree", function (tree) {
      var _tree = tree;
      if (!_tree) {
        _tree = _this.state.tree;
      }
      var flatData = getFlatDataFromTree({
        treeData: _tree,
        getNodeKey: function getNodeKey(itm) {
          return itm.id;
        },
        ignoreCollapsed: false
      });
      var data = [];
      flatData.forEach(function (item) {
        var itm = _objectSpread2({}, item.node);
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
    _defineProperty(_assertThisInitialized(_this), "getPathToNodeById", function (id) {
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
  return _createClass(TreeBase);
}(ListBase);
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

export { StateTree, TreeBase, TreeBase$1 as default, events, item, itemtext, schema, triggers };
//# sourceMappingURL=TreeBase.js.map
