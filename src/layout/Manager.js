import Event from '../event/Event'

/// //////////////////////////////////////////
// State Manager
/// //////////////////////////////////////////
class StateManager {
  static _instance = null

  _states = {}

  /**
   * @returns {StateManager}
   */
  static getInstance() {
    if (StateManager._instance === null) {
      StateManager._instance = new StateManager()
    }

    return this._instance
  }

  getManager(state_id) {
    return this._states[state_id]
  }

  clearAll() {}

  createState(props) {
    return this.createManager(props.id, props)
  }

  createStates(props_array) {
    for (const props of props_array) {
      this.createManager(props.id, props)
    }
  }

  createManager(state_id, props) {
    const componentManagerInstance = ComponentManager.getInstance()
    const _component = componentManagerInstance.getComponent(props.type)
    if (_component) {
      const config = _component.config
      let state_inst = this.getManager(state_id)
      if (state_inst) {
        // TODO: warn that we are trying to create a manager that exists
        return state_inst
      } else {
        if (config.state) {
          // make sure to pass component manager
          if (!props.manager) {
            props.manager = componentManagerInstance
          }
          // create the class
          state_inst = this.createStateByClass(config.state, props)
          if (state_inst.registerComponent) {
            state_inst.registerComponent({}, {}, config)
          }
          this._states[state_id] = state_inst
        }
        return state_inst
      }
    } else {
      throw new Error('Component type does not exist: ' + props.type)
    }
  }

  createStateByClass(StateClass, props) {
    if (StateClass) {
      return new StateClass(props)
    }
    return null
  }

  // TODO: create state statemanagers from layout tree
  createLayoutState(layout_tree) {
    walkLayout(layout_tree, (props) => {
      if (
        props.type &&
        props.id &&
        props.config &&
        (props.data || props.content || props.actions)
      ) {
        this.createState(props)
      }
    })
  }
}

export const walkLayout = (layt, callback) => {
  const _walk = (_layt) => {
    for (const d in _layt) {
      if (callback && _layt[d]) {
        callback(_layt[d])
      }
      if (_layt[d].data) {
        _walk(_layt[d].data)
      }
      if (_layt[d].content) {
        _walk([_layt[d].content])
      }
      if (_layt[d].actions) {
        _walk([_layt[d].actions])
      }
    }
  }
  _walk(layt)
}

/// //////////////////////////////////////////
// Component Manager
/// //////////////////////////////////////////

class ComponentManager {
  static _instance = null

  _components = {}

  /**
   * @returns {ComponentManager}
   */
  static getInstance() {
    if (ComponentManager._instance === null) {
      ComponentManager._instance = new ComponentManager()
      ComponentManager._instance._event_manager =
        Event.EventManager.getInstance()
      ComponentManager._instance._state_factory = StateManager.getInstance()
    }

    return this._instance
  }

  getEventManager() {
    return this._event_manager
  }

  getStateFactory() {
    return this._state_factory
  }

  getStateManager() {
    return this._state_factory
  }

  clearAll() {
    this._components = {}
  }

  registerComponent(component) {
    /**
     * Adds component to layout manager of any type.
     * Specific types in TYPES are specifically used when automatically generating the layout using AI.
     */

    // attach managers and factory
    component.manager = this

    if (typeof component.component === 'function') {
      this._components[component.type] = component
    } else {
      console.error(
        'Could not register ' + component.type + ' since it was not a function'
      )
    }
  }

  getComponentTypes() {
    return Object.keys(this._components)
  }

  getComponents() {
    return this._components
  }

  getComponent(component_type) {
    return this._components[component_type]
  }

  getComponentInstance(component_type, parameters) {
    // validate parameter inputs
    console.info(component_type, parameters)
    // paramters
    parameters.manager = this
    // create component
    const c = this._components[component_type]
    if (c) {
      // if React component is of type class
      if (c.is_withclass) {
        return c.component
      } else {
        // if React component is of type function
        // eslint-disable-next-line new-cap
        return new c.component(parameters)
      }
    } else {
      console.warn(
        'Component instance not registered of type: ' + component_type
      )
    }
  }

  collectComponentInventory() {
    const store = {}
    for (const [key, comp] of Object.entries(this._components)) {
      const cfg = comp.config
      if (cfg && key && cfg.type) {
        let parents = ''
        if (cfg.relation) {
          parents = cfg.relation.within
        }
        store[cfg.type] = {
          id: cfg.type,
          title: cfg.name,
          type: cfg.type,
          events: comp.events,
          actions: comp.triggers,
          category: 'TBD',
          parent: parents,
          schema: cfg.options
        }
        // also add the children
        if (cfg.contains) {
          for (const [key_itm, comp] of Object.entries(cfg.contains)) {
            const itm = cfg.contains[key_itm]
            store[key_itm] = {
              id: key_itm,
              title: itm.title || itm.id,
              category: 'TBD',
              type: key_itm,
              parent: cfg.type,
              schema: comp
            }
          }
        }
      }
    }
    return store
  }
}

export default { ComponentManager, StateManager }
