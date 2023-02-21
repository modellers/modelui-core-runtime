'use strict';

var layout_LayoutComponent = require('./LayoutComponent.js');
require('../_rollupPluginBabelHelpers-aae655da.js');
require('react');
require('./LayoutBase.js');
require('../event/ListBase.js');
require('../event/StateBase.js');
require('../event/StateBaseComponent.js');
require('../util/ObjUtil.js');
require('../util/ComponentUtil.js');
require('./Manager.js');
require('../event/Event.js');
require('./Layouter.js');

describe('LayoutComponent', function () {
  it('is exported', function () {
    expect(layout_LayoutComponent["default"].events).toBeTruthy();
    expect(layout_LayoutComponent["default"].triggers).toBeTruthy();
    expect(layout_LayoutComponent["default"].options).toBeTruthy();
    expect(layout_LayoutComponent["default"].config).toBeTruthy();
    expect(layout_LayoutComponent["default"].LayoutComponent).toBeTruthy();
  });
});
//# sourceMappingURL=LayoutComponent.test.js.map
