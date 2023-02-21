import { j as _typeof } from '../_rollupPluginBabelHelpers-55d249d8.js';
import Manager from '../layout/Manager.js';
import '../event/Event.js';

function renderContent(classes, item) {
  var content = item.content;
  var content_type = _typeof(content);
  if (content_type === 'object') {
    content = Manager.ComponentManager.getInstance().getComponentInstance(content.type, content || {});
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

export { ComponentUtil as default, renderContent };
//# sourceMappingURL=ComponentUtil.js.map
