/* eslint-disable prettier/prettier */
import React from 'react'
import Manager from './Manager'
import LayoutComponent, {
  events as eventsLayout,
  triggers as triggersLayout,
  config as configLayout
} from './LayoutComponent'

export function LayoutRender(
  container_id,
  data,
  classes,
  config,
  component_manger,
  wrapper = 'div',
  ignore = []
) {
  const content = [] // rendered content
  if (!component_manger) {
    throw new Error('Manager was not passed to LayoutRender')
  }
  console.info('-----------FIXME: TODO: IS THIS CODE USED?-----------')
  for (const item of config.layout) {
    if (!item) {
      continue
    }
    // check if we should skip generating this item by request of the caller. Example dont allow card action to have another card
    if (ignore.indexOf(item.type) > -1) {
      console.warn(
        'Using item type=' +
        item.type +
        ' not supported in layout for ' +
        container_id
      )
      continue
    }
    // create a component identifier
    const id = container_id + (item.id || item.type)

    // build the component
    if (item.type === 'layout') {
      content.push(
        <Layouter
          id={id}
          key={id}
          classes={classes}
          data={data}
          manager={component_manger}
          config={item.config}
        />
      )
    } else {
      const item_data = data || {}
      const params = {
        id: id,
        key: id,
        classes: classes,
        manager: component_manger,
        data: item.data || item_data[item.pick] || item_data,
        config: item.config
      }
      const component =
        Manager.ComponentManager.getInstance().getComponentInstance(
          item.type,
          params
        )
      if (component) {
        content.push(component)
      } else {
        // TODO: notify missing component with type
      }
    }
  }
  return <div>{content}</div>
}

export function Layouter(props) {
  // style
  const classes = {}
  // recursive render
  return LayoutRender(
    props.id,
    props.data,
    classes,
    props.config,
    props.manager,
    'div'
  )
}

export function registerLayout(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: Layout,
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

export default { LayoutRender, Layouter, Layout }
