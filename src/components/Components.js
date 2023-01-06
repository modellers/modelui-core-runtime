// Managers and factories
import Manager from '../layout/Manager'

// Components
import { registerObjectCollection, registerXML } from './Data/Data'

export default function registerComponents(component_manager) {
  if (!component_manager) {
    component_manager = Manager.ComponentManager.getInstance()
  }
  /*
    if (component_manager.constructor.name !== 'ComponentManager') {
        throw `Constructor must be component manager. Got type ${component_manager.constructor.name}`;
    }
    */

  registerObjectCollection(component_manager)
  registerXML(component_manager)
}
