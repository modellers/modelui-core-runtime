'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_rollupPluginBabelHelpers-aae655da.js');

var MemoryManager = /*#__PURE__*/function () {
  function MemoryManager() {
    _rollupPluginBabelHelpers._classCallCheck(this, MemoryManager);
    _rollupPluginBabelHelpers._defineProperty(this, "_memories", {});
  }
  _rollupPluginBabelHelpers._createClass(MemoryManager, [{
    key: "clearAll",
    value: function clearAll() {
      this._memories = {};
    }
  }, {
    key: "registerMemory",
    value: function registerMemory(id, memory) {
      this._memories[id] = memory;
    }
  }, {
    key: "getMemory",
    value: function getMemory(id) {
      return this._memories[id];
    }
  }], [{
    key: "getInstance",
    value:
    /**
     * @returns {MemoryManager}
     */
    function getInstance() {
      if (MemoryManager._instance === null) {
        MemoryManager._instance = new MemoryManager();
      }
      return this._instance;
    }
  }]);
  return MemoryManager;
}();
// Shared memory manager (used by code to access memory objects)
_rollupPluginBabelHelpers._defineProperty(MemoryManager, "_instance", null);
try {
  // TODO: add do browser scope for debugging (remove)
  window.memoryManager = MemoryManager.getInstance();
} catch (e) {}

exports.MemoryManager = MemoryManager;
//# sourceMappingURL=MemoryManager.js.map
