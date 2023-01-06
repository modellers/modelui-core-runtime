// manager
import {
  ObjectCollection,
  events as eventsObject,
  triggers as triggersObject,
  config as configObject
} from './ObjectCollection'
import {
  XMLParser,
  events as eventsXMLParser,
  triggers as triggersXMLParser,
  config as configXMLParser
} from './XMLParser'

export function registerObjectCollection(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: ObjectCollection,
    type: configObject.type,
    events: eventsObject,
    triggers: triggersObject,
    config: configObject
  })
}

export function registerXML(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: XMLParser,
    type: configXMLParser.type,
    events: eventsXMLParser,
    triggers: triggersXMLParser,
    config: configXMLParser
  })
}
