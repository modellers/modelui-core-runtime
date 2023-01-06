/* eslint-disable no-unused-vars */
// event handler
import { XMLParser as XMLFastParser, XMLBuilder } from 'fast-xml-parser' // https://www.npmjs.com/package/fast-xml-parser
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
  id: 'xml',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'XML Parser options',
  'x-layout': 'component',
  type: 'object',
  version: 0.1,
  properties: {},
  required: []
}

export class StateWorker extends StateLess {
  // NOTE: idea is that the StateWorker is a generic instance that can be reused running scripts

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
          try {
            const parser = new XMLFastParser({
              ignoreAttributes: false
            })
            const result = parser.parse(obj.xml)
            this.triggerEvent('read', { id: obj.id, json: result })
          } catch (e) {
            // notify event: missing - Failure
            this.triggerEvent('failure_reading', {
              id: obj.id,
              xml: obj.xml,
              error: e + '',
              e
            })
          }
        }
      },
      convert: {
        schema: {},
        handler: (obj) => {
          this.triggerEvent('converting', { id: obj.id, json: obj.json })
          try {
            const options = {
              ignoreAttributes: false,
              attributeNamePrefix: '@_',
              format: true
            }
            const builder = new XMLBuilder(options)
            const xml = builder.build(obj.json)
            // const xml = toXml(obj.json);
            this.triggerEvent('converted', { id: obj.id, xml: xml })
          } catch (e) {
            // notify event: missing - Failure
            this.triggerEvent('failure_converting', {
              id: obj.id,
              xml: obj.xml,
              error: e + '',
              e
            })
          }
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
  name: 'XML',
  type: 'xml',
  author: 'Kjartan Jónsson',
  description: 'XML Parser',
  version: 0.1,
  relation: {
    contains: [],
    within: 'component' // parent
  },
  options: options,
  state: StateWorker
}

export function XMLParser(props) {
  const stateWorker = new StateWorker(props)
  stateWorker.registerComponent({}, {}, config)
  return stateWorker
}
