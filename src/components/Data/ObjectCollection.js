// event handler
// TODO: create another version like this one -- https://github.com/dannyconnell/localbase
import {
  StateObject,
  triggers as baseTriggers,
  events as baseEvents
} from '../../event/ObjectBase'

export const triggers = baseTriggers
export const events = baseEvents

export const options = {
  id: 'object',
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Object collection options',
  'x-layout': 'component',
  type: 'object',
  version: 0.1,
  properties: {
    name: {
      title: 'Name',
      type: 'string'
    }
  },
  required: ['name']
}

export const config = {
  name: 'Dictionary',
  type: 'object',
  author: 'Kjartan Jónsson',
  description: 'Object dictionary',
  version: 0.1,
  relation: {
    contains: [],
    within: 'sources' // parent
  },
  options: options,
  state: StateObject
}

export function ObjectCollection(props) {
  const stateObject = new StateObject(props)
  stateObject.registerComponent({}, {}, config)
  return stateObject
}
