import ListBase from '../event/ListBase'
// layout
import { renderContent } from '../util/ComponentUtil'

export const triggers = ListBase.triggers
export const events = ListBase.events
export const config = {
  options: {}
}

export const StateLayout = ListBase.StateList

export class LayoutBase extends ListBase.ListBase {
  renderContent = renderContent
}

export default { triggers, events, config, LayoutBase, StateLayout }
