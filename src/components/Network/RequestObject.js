/* eslint-disable no-unused-vars */
// event handler
import Event from '../../event/Event'
import { StateLess } from '../../event/StateBase'

export const triggers = {
  read: {
    alias: [],
    info: {
      name: 'Read',
      description: 'Read XML returning JSON'
    },
    schema: {}
  },
  convert: {
    alias: [],
    info: {
      name: 'Convert',
      description: 'Converts JSON to XML'
    },
    schema: {}
  }
}

export const events = {
  reading: {
    alias: [],
    info: {
      name: 'reading',
      description: 'Reading the XML and returning XML'
    },
    schema: {}
  },
  read: {
    alias: [],
    info: {
      name: 'read',
      description: 'Read the XML and returning XML'
    },
    schema: {}
  },
  failure_reading: {
    alias: [],
    info: {
      name: 'Reading XML failed',
      description: 'Parsing the XML faild'
    },
    schema: {}
  },
  converting: {
    alias: [],
    info: {
      name: 'Converting',
      description: 'Converting the JSON to XML'
    },
    schema: {}
  },
  converted: {
    alias: [],
    info: {
      name: 'Converted',
      description: 'Converted the JSON to XML'
    },
    schema: {}
  },
  failure_converting: {
    alias: [],
    info: {
      name: 'Failure Converting',
      description: 'Convertion the JSON to XML failed'
    },
    schema: {}
  }
}

export const options = {
  id: 'object-request',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'XML Parser options',
  'x-layout': 'component',
  type: 'object',
  version: 0.1,
  properties: {},
  required: []
}

export class StateREST extends StateLess {
  // NOTE: idea is that the StateREST is a generic instance that can be reused running scripts

  constructor(props) {
    super(props)
    this.props = props
    // apply initial values
    this.state = {}
  }

  registerComponent = (actionHandlers, eventHandlers, component_info) => {
    actionHandlers = actionHandlers || {}
    eventHandlers = eventHandlers || {}
    // add our known handlers
    // register componenet overiding or adding new event handlers

    const dataActionHandlers = {
      read: {
        schema: {},
        handler: (obj) => {
          this.triggerEvent('reading', { id: obj.id, xml: obj.xml })
        }
      },
      convert: {
        schema: {},
        handler: (obj) => {
          this.triggerEvent('converting', { id: obj.id, json: obj.json })
        }
      }
    }

    // register componenet overiding or adding new event handlers
    this.ddEvent = Event.EventManager.getInstance().register(
      this.props.id,
      { ...dataActionHandlers, ...actionHandlers },
      { ...events, ...eventHandlers },
      component_info
    )
    return this.ddEvent
  }
}

export const config = {
  name: 'Object Request',
  type: 'object-request',
  author: 'Kjartan Jónsson',
  description: 'JSON Web request',
  version: 0.1,
  relation: {
    contains: [],
    within: 'component' // parent
  },
  options: options,
  state: StateREST
}

export function RequestObject(props) {
  const stateREST = new StateREST(props)
  stateREST.registerComponent({}, {}, config)
  return stateREST
}
