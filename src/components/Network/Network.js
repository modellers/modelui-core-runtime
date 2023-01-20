// manager
import {
  RequestObject,
  events as eventsRequestObject,
  triggers as triggersRequestObject,
  config as configRequestObject
} from './RequestObject'

export function registerRequestObject(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: RequestObject,
    type: configRequestObject.type,
    events: eventsRequestObject,
    triggers: triggersRequestObject,
    config: configRequestObject
  })
}
