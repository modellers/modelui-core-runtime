// Managers and factories
import Manager from './layout'

// Components
import { registerLayout } from './layout/Layout'

export function registerCoreComponents(component_manager) {
  if (!component_manager) {
    component_manager = Manager.ComponentManager.getInstance()
  }
  /*
  if (component_manager.constructor.name !== 'ComponentManager') {
      throw `Constructor must be component manager. Got type ${component_manager.constructor.name}`;
  }
  */

  registerLayout(component_manager)
}
