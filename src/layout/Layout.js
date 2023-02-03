/* eslint-disable prettier/prettier */
import React from 'react'
import { Layouter, LayoutRender } from './Layouter'
import LayoutComponent, {
  events as eventsLayout,
  triggers as triggersLayout,
  config as configLayout
} from './LayoutComponent'

export function registerLayout(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: Layouter,
    type: configLayout.type,
    events: eventsLayout,
    triggers: triggersLayout,
    config: configLayout
  })
}

export function Layout(props) {
  // lets enumerate schema to extract uiSchema and validation
  return <LayoutComponent {...props} />
}

export default { LayoutRender, Layouter }
