// common tools
import StateBase from './StateBase'
import StateBaseComponent from './StateBaseComponent'
// event handler
// import Event from './Event'

const events = {
  changed: {
    alias: [],
    info: {
      name: 'Changed',
      description: 'Input value changed'
    },
    schema: {}
  },
  enabled: {
    alias: [],
    info: {
      name: 'Enabled',
      description: 'Enabled input'
    },
    schema: {}
  },
  disabled: {
    alias: [],
    info: {
      name: 'Disabled',
      description: 'Disabled input'
    },
    schema: {}
  },
  submitted: {
    alias: [],
    info: {
      name: 'Submitted',
      description: 'Submitted value'
    },
    schema: {}
  },
  cleared: {
    alias: [],
    info: {
      name: 'Cleared',
      description: 'Cleared value'
    },
    schema: {}
  },
  populated: {
    alias: [],
    info: {
      name: 'Populated',
      description: 'Populated value'
    },
    schema: {}
  },
  replaced: {
    alias: [],
    info: {
      name: 'Replaced',
      description: 'Replaced value'
    },
    schema: {}
  },
  invalidated: {
    alias: [],
    info: { name: 'In-validated', description: 'Unselecting item' },
    schema: {}
  },
  validated: {
    alias: [],
    info: { name: 'De-Selected', description: 'Unselecting item' },
    schema: {}
  }
}

const triggers = {
  submit: {
    info: { name: 'Submit', description: 'Submits the form data' },
    schema: {},
    alias: []
  },
  enable: {
    info: {
      name: 'Enables',
      description: 'Enables the form so that we can change form inputs'
    },
    schema: {},
    alias: []
  },
  disable: {
    info: {
      name: 'Disable',
      description: 'Disables the form so that we can not change input value'
    },
    schema: {},
    alias: []
  },
  // change: { info: { name: 'Change', description: 'Changes' }, schema: {}, alias: [] },
  clear: {
    info: {
      name: 'Clear',
      description: 'Removes all input values clearing the form'
    },
    schema: {},
    alias: []
  },
  populate: {
    info: {
      name: 'Populate',
      description: 'Fills the form with specified data'
    },
    schema: {},
    alias: []
  },
  replace: {
    info: {
      name: 'Replace',
      description: 'Replaces the form with specified data'
    },
    schema: {},
    alias: []
  }
}

class StateInput extends StateBase.StateInstance {
  constructor(props) {
    super(props)
    this.props = props
    // apply initial values
    this.state = {
      data: {
        id: props.data.id || null,
        value: props.data.value,
        schema: props.data.schema || props.schema
      },
      enabled: (props.config || {}).enabled || true,
      schema: props.schema
    }

    if (!this.props.manager) {
      throw new Error('Manager was not passed through StateInput props')
    }

    this.eventManager = this.props.manager.getEventManager()
  }

  registerComponent = (actionHandlers, eventHandlers, component_info) => {
    const self = this
    actionHandlers = actionHandlers || {}
    eventHandlers = eventHandlers || {}
    // add our known handlers
    // register componenet overiding or adding new event handlers
    const dataActionHandlers = {
      submit: {
        schema: {},
        handler: (obj) => {
          // Event.EventManager.getInstance().addEvent(
          this.eventManager.addEvent(this.props.id, 'submitting', obj, null)
          this.getActionState('submit', function (change) {
            const update = self.alterState(change)
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(
              self.props.id,
              'submitted',
              update.data,
              null
            )
          })
        }
      },
      enable: {
        schema: {},
        handler: (obj) => {
          const change = { disabled: false }
          self.alterState(change)
          if (this.updateView('enable', obj, obj, self.state.data)) {
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'enabled', change, null)
          }
        }
      },
      disable: {
        schema: {},
        handler: (obj) => {
          const change = { disabled: true }
          self.alterState(change)
          if (this.updateView('disable', obj, obj, self.state.data)) {
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'disabled', change, null)
          }
        }
      },
      clear: {
        schema: {},
        handler: (obj) => {
          const change = { data: { value: '' } } // getSchemaDefaults(this.state.data.schema || this.state.schema);
          const update = self.alterState(change)
          // Event.EventManager.getInstance().addEvent(
          self.eventManager.addEvent(self.props.id, 'clearing', change, {})
          if (self.updateView('clear', obj, obj, update)) {
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(
              self.props.id,
              'cleared',
              update.data,
              null
            )
          }
          // Event.EventManager.getInstance().addEvent(
          self.eventManager.addEvent(
            self.props.id,
            'changed',
            update.data,
            null
          )
        }
      },
      populate: {
        schema: {},
        handler: (obj) => {
          const change = { data: { value: obj.value, id: obj.id } }
          self.alterState(change)
          if (self.updateView('populate', obj, obj, self.state.data)) {
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'populated', obj, null)
          }
          // Event.EventManager.getInstance().addEvent(
          self.eventManager.addEvent(self.props.id, 'changed', obj, null)
        }
      },
      replace: {
        schema: {},
        handler: (obj) => {
          const replaced = {
            ...self.state,
            data: {
              ...obj,
              id: obj.id,
              value: obj.value || this.state.data.value,
              schema: obj.schema || this.state.data.schema
            }
          }
          self.setState(replaced)
          if (self.updateView('replace', obj, obj, self.state.data)) {
            // Event.EventManager.getInstance().addEvent(
            self.eventManager.addEvent(self.props.id, 'replaced', obj, null)
          }
          // Event.EventManager.getInstance().addEvent(
          self.eventManager.addEvent(self.props.id, 'changed', obj, null)
        }
      }
    }

    // register componenet overiding or adding new event handlers
    // this.ddEvent = Event.EventManager.getInstance().register(
    self.ddEvent = self.eventManager.register(
      self.props.id,
      { ...dataActionHandlers, ...actionHandlers },
      { ...events, ...eventHandlers },
      component_info
    )
    return self.ddEvent
  }
}

class InputBase extends StateBaseComponent.StateBaseComponent {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    if (!props.config.options) {
      props.config.options = {}
    }
    super(props)
    this.props = props
  }

  updateView = (action, arr, updated, data) => {
    // extend by parent
    return true
  }

  render() {
    return null
  }
}

export default { events, triggers, StateInput, InputBase }
