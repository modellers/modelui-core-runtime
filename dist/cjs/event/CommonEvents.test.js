'use strict';

var event_CommonEvents = require('./CommonEvents.js');
require('./Event.js');
require('../_rollupPluginBabelHelpers-aae655da.js');

describe('CommonEvents', function () {
  it('registerEvents is exported', function () {
    expect(event_CommonEvents.registerEvents).toBeTruthy();
  });
  it('registerEventApp is exported', function () {
    expect(event_CommonEvents.registerEventApp).toBeTruthy();
  });
  it('registerEventDebugging is exported', function () {
    expect(event_CommonEvents.registerEventDebugging).toBeTruthy();
  });
});
//# sourceMappingURL=CommonEvents.test.js.map
