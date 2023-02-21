import { d as _defineProperty, b as _createClass, c as _classCallCheck } from '../../_rollupPluginBabelHelpers-55d249d8.js';

var MemoryManager = /*#__PURE__*/function () {
  function MemoryManager() {
    _classCallCheck(this, MemoryManager);
    _defineProperty(this, "_memories", {});
  }
  _createClass(MemoryManager, [{
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
_defineProperty(MemoryManager, "_instance", null);
try {
  // TODO: add do browser scope for debugging (remove)
  window.memoryManager = MemoryManager.getInstance();
} catch (e) {}

export { MemoryManager };
//# sourceMappingURL=MemoryManager.js.map
