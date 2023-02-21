'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_rollupPluginBabelHelpers-aae655da.js');
var layout_Manager = require('../layout/Manager.js');
require('../event/Event.js');

function renderContent(classes, item) {
  var content = item.content;
  var content_type = _rollupPluginBabelHelpers._typeof(content);
  if (content_type === 'object') {
    content = layout_Manager["default"].ComponentManager.getInstance().getComponentInstance(content.type, content || {});
  } else {
    if (content_type !== 'string') {
      content = 'Expected object for content having id ' + item.id;
    }
  }
  return content;
}
var ComponentUtil = {
  renderContent: renderContent
};

exports["default"] = ComponentUtil;
exports.renderContent = renderContent;
//# sourceMappingURL=ComponentUtil.js.map
