'use strict';

var layout_index = require('./layout/index.js');
require('react');
require('./layout/Manager.js');
require('./layout/LayoutBase.js');
require('./event/StateBase.js');
require('./event/Event.js');
require('./util/ObjUtil.js');
require('./components/Data/MemoryManager.js');
require('./json2xml-b8c1001f.js');
require('./event/ListBase.js');
var event_index = require('./event/index.js');
var util_index = require('./util/index.js');
require('./layout/Layout.js');
require('./layout/Layouter.js');
require('./_rollupPluginBabelHelpers-aae655da.js');
require('./layout/LayoutComponent.js');
require('./event/StateBaseComponent.js');
require('./util/ComponentUtil.js');
require('./event/CommonEvents.js');
require('./event/InputBase.js');
require('./event/ListSchemaBase.js');
require('./event/TreeBase.js');
require('./util/TreeUtil.js');
require('./util/StoryUtil.js');
require('./util/TestUtil.js');

describe('structs', function () {
  it('is truthy', function () {
    expect(event_index).toBeTruthy();
  });
});
describe('layout', function () {
  it('is truthy', function () {
    expect(layout_index).toBeTruthy();
  });
});
describe('util', function () {
  it('is truthy', function () {
    expect(util_index).toBeTruthy();
  });
});
//# sourceMappingURL=index.test.js.map
