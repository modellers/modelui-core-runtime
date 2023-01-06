export class MemoryManager {
  // Shared memory manager (used by code to access memory objects)

  static _instance = null

  _memories = {}

  /**
   * @returns {MemoryManager}
   */
  static getInstance() {
    if (MemoryManager._instance === null) {
      MemoryManager._instance = new MemoryManager()
    }

    return this._instance
  }

  clearAll() {
    this._memories = {}
  }

  registerMemory(id, memory) {
    this._memories[id] = memory
  }

  getMemory(id) {
    return this._memories[id]
  }
}

try {
  // TODO: add do browser scope for debugging (remove)
  window.memoryManager = MemoryManager.getInstance()
} catch (e) {}
