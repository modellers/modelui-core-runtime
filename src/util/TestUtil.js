/**
 *  tests
 * Testing DD events and actions integrety
 */

import React from 'react'

const _createComponent = (
  renderer,
  _Component,
  component_id,
  data,
  options,
  schema_expected,
  manager
) => {
  // check for component manager
  if (!manager) {
    throw Error(
      'TestUtil._createComponent: Manager was not provided through props for component ' +
        component_id
    )
  } else {
    /*
    if (manager.constructor.name !== 'ComponentManager') {
      throw "TestUtil._createComponent: Manager was expected to be ComponentManager. Got for '" + manager.constructor.name + "' " + component_id;
    }
    */
  }
  if (renderer !== null) {
    if (typeof renderer.create !== 'function') {
      throw Error('_createComponent is missing renderer function')
    }
  }

  // eslint-disable-next-line no-unused-vars
  let _component = null
  if (options.render) {
    _component = renderer.create(
      // eslint-disable-next-line react/jsx-pascal-case
      <_Component
        id={component_id}
        key={component_id}
        data={data}
        config={{ options: options }}
        schema={schema_expected}
        manager={manager}
      />
    )
  } else {
    _component = new _Component({
      id: component_id,
      key: component_id,
      data: data,
      config: { options: options },
      schema: schema_expected,
      manager: manager
    })
  }
}

export const createComponentClassTests = (
  componentManagerInstance,
  registerComponents,
  renderer,
  config,
  triggers_expected,
  events_expected,
  schema_expected,
  data,
  options
) => {
  options = options || { render: true }
  data = data || {}
  if (typeof registerComponents !== 'function') {
    throw Error('createComponentClassTests is missing registerComponents')
  }
  if (renderer !== null) {
    if (typeof renderer.create !== 'function') {
      throw Error('createComponentClassTests is not a component renderer')
    }
  }
  // TODO: run this before each
  componentManagerInstance.clearAll()
  componentManagerInstance.getStateManager().clearAll()
  componentManagerInstance.getEventManager().clearAll()
  registerComponents(componentManagerInstance)

  const c = componentManagerInstance.getComponent(config.type)
  const _Component = c.component
  const triggers = c.triggers
  const events = c.events
  const component_id = config.type + '_id'
  componentManagerInstance.getStateManager().clearAll()
  componentManagerInstance.getStateManager().createState({
    type: config.type,
    data: data,
    id: component_id,
    manager: componentManagerInstance
  })

  return [
    {
      title:
        component_id +
        ' trigger registration contains same actions as in component trigger export',
      test: () => {
        componentManagerInstance.getStateManager().clearAll()
        _createComponent(
          renderer,
          _Component,
          component_id,
          data,
          options,
          schema_expected,
          componentManagerInstance
        )
        const trigger_info_events = triggers
        const actions = componentManagerInstance
          .getEventManager()
          .getCopyOfActions()
        expect(Object.keys(actions)).toEqual([component_id])
        // check that we are registering the correct items
        expect(Object.keys(actions[component_id])).toEqual(
          Object.keys(trigger_info_events)
        )
      }
    },
    {
      title:
        component_id +
        ' trigger export registration contains required information',
      test: () => {
        const trigger_info_events = triggers
        // check that the registered event count matches the registered handler count
        expect(Object.keys(trigger_info_events)).toEqual(triggers_expected)
        // check that the registered events attributes are defined
        Object.keys(trigger_info_events).forEach((trigger_event, idx) => {
          // check info
          expect(Object.keys(trigger_info_events[trigger_event])).toContain(
            'info'
          )
          expect(
            Object.keys(trigger_info_events[trigger_event].info)
          ).toContain('name')
          expect(
            Object.keys(trigger_info_events[trigger_event].info)
          ).toContain('description')
          // check schema
          expect(Object.keys(trigger_info_events[trigger_event])).toContain(
            'schema'
          )
          // check alias
          expect(Object.keys(trigger_info_events[trigger_event])).toContain(
            'alias'
          )
        })
      }
    },
    {
      title:
        component_id + ' component instance has trigger registration handlers',
      test: () => {
        componentManagerInstance.getStateManager().clearAll()
        _createComponent(
          renderer,
          _Component,
          component_id,
          data,
          options,
          schema_expected,
          componentManagerInstance
        )
        const trigger_info_events = triggers
        const actions = componentManagerInstance
          .getEventManager()
          .getCopyOfActions()
        // check that the registered events attributes are defined
        Object.keys(trigger_info_events).forEach((trigger_event, idx) => {
          // check handler
          expect(Object.keys(actions[component_id][trigger_event])).toContain(
            'handler'
          )
          expect(
            typeof actions[component_id][trigger_event].handler === 'function'
          ).toBeTruthy()
        })
      }
    },
    {
      title: component_id + ' event registration',
      test: () => {
        const trigger_events = events_expected
        const actions = events
        expect(Object.keys(actions)).toEqual(trigger_events)
        trigger_events.forEach((trigger_event, idx) => {
          // check info
          expect(Object.keys(actions[trigger_event])).toContain('info')
          expect(Object.keys(actions[trigger_event].info)).toContain('name')
          expect(Object.keys(actions[trigger_event].info)).toContain(
            'description'
          )
          // check schema
          expect(Object.keys(actions[trigger_event])).toContain('schema')
          // check alias
          expect(Object.keys(actions[trigger_event])).toContain('alias')
        })
      }
    },
    {
      title: component_id + ' config has options',
      test: () => {
        expect(Object.keys(config)).toContain('options')
        // check that we have the basics for a schema
        const options_schema = config.options
        expect(Object.keys(options_schema)).toContain('id')
        expect(Object.keys(options_schema)).toContain('$schema')
        expect(Object.keys(options_schema)).toContain('description')
        expect(Object.keys(options_schema)).toContain('x-layout')
        expect(Object.keys(options_schema)).toContain('type')
        expect(Object.keys(options_schema)).toContain('version')
        expect(Object.keys(options_schema)).toContain('properties')
        expect(Object.keys(options_schema)).toContain('required')
      }
    },
    {
      title: component_id + ' config has basic info',
      test: () => {
        expect(Object.keys(config)).toContain('options')
        // check that we have the basics for a schema
        expect(typeof config.name).toEqual('string')
        expect(typeof config.type).toEqual('string')
        expect(typeof config.author).toEqual('string')
        expect(typeof config.description).toEqual('string')
        expect(typeof config.version).toEqual('number')
        expect(typeof config.author).toEqual('string')
        expect(typeof config.relation).toEqual('object')
      }
    },
    {
      title: component_id + ' config has relational info',
      test: () => {
        expect(Object.keys(config)).toContain('options')
        // check that we have the basics for a schema
        expect(typeof config.relation).toEqual('object')
        expect(typeof config.relation.within).toEqual('string')
      }
    },
    {
      title:
        component_id + ' option schema is accessible through buildStoreInfo',
      test: () => {
        /* componentManagerInstance.clearAll();
        registerComponents();
        */
        _createComponent(
          renderer,
          _Component,
          component_id,
          data,
          options,
          schema_expected,
          componentManagerInstance
        )
        // fetch result
        const store = componentManagerInstance
          .getEventManager()
          .collectComponentInventory()
        // should exist
        expect(store).toHaveProperty(config.type)

        const store_item = store[config.type]
        // check that we have the required info
        // as define din ui-modeler-events.js store data
        expect(typeof store_item.id).toEqual('string')
        expect(typeof store_item.title).toEqual('string')
        expect(typeof store_item.type).toEqual('string')
        expect(typeof store_item.parent).toEqual('string')
      }
    },
    {
      title:
        component_id +
        ' schema definition is accessible through getComponentSchema',
      test: () => {
        const schema = componentManagerInstance
          .getEventManager()
          .getComponentSchema(config.type)
        expect(schema).toEqual(config.options)
      }
    },
    {
      title:
        component_id +
        ' events definition is accessible through getComponentEventsByType',
      test: () => {
        const component = componentManagerInstance
          .getEventManager()
          .getComponentByType(config.type)
        expect(component).not.toEqual(undefined)
        expect(component.actions).toEqual(config.actions)
      }
    },
    {
      title:
        component_id +
        ' actions definition is accessible through getComponentActionsByType',
      test: () => {
        const component = componentManagerInstance
          .getEventManager()
          .getComponentByType(config.type)
        expect(component).not.toEqual(undefined)
        expect(component.events).toEqual(config.events)
      }
    } /* {
      title: component_id + ' events definition is accessible through getEvents',
      test: () => {
      }
    }, {
      title: component_id + ' action definition is accessible through getActions',
      test: () => {
      }
    }
    */
  ]
}

export const createComponentRegisterTests = (
  componentManagerInstance,
  registerComponents,
  component_type,
  _Component,
  triggers,
  events,
  config,
  contains
) => {
  return [
    {
      title: component_type + ' basic registration info',
      test: () => {
        componentManagerInstance.clearAll()
        componentManagerInstance.getStateManager().clearAll()
        componentManagerInstance.getEventManager().clearAll()
        registerComponents(componentManagerInstance)

        const c = componentManagerInstance.getComponent(component_type)
        expect(c).not.toEqual(undefined)
        expect(c.type).toEqual(component_type)
        expect(c.component).toEqual(_Component)
        expect(c.config).toEqual(config)
        expect(c.events).toEqual(events)
        expect(c.triggers).toEqual(triggers)
      }
    },
    {
      title: component_type + ' configuration registration',
      test: () => {
        componentManagerInstance.clearAll()
        componentManagerInstance.getStateManager().clearAll()
        componentManagerInstance.getEventManager().clearAll()
        registerComponents(componentManagerInstance)

        const c = componentManagerInstance.getComponent(component_type)
        expect(c).not.toEqual(undefined)
        const cfg = c.config
        expect(cfg).toHaveProperty('type')
        expect(cfg).toHaveProperty('name')
        expect(cfg).toHaveProperty('relation')
        expect(cfg.relation).toHaveProperty('within')
        expect(cfg.relation).toHaveProperty('contains')
      }
    },
    {
      title: component_type + ' matches rendered type and schema',
      test: () => {
        componentManagerInstance.clearAll()
        componentManagerInstance.getStateManager().clearAll()
        componentManagerInstance.getEventManager().clearAll()
        registerComponents(componentManagerInstance)

        const c = componentManagerInstance.getComponent(component_type)
        expect(c).not.toEqual(undefined)
        const cfg = c.config
        expect(cfg).toHaveProperty('type')
        expect(cfg).toHaveProperty('options')
        // test that the config type is the type iin our options schema
        expect(cfg.options.id).toEqual(cfg.type)
        // TODO: test that this is the same as in component registered
      }
    },
    {
      title: component_type + ' tests option schema',
      test: () => {
        if (Object.keys(contains).length) {
          // test only if we have keys
          componentManagerInstance.clearAll()
          componentManagerInstance.getStateManager().clearAll()
          componentManagerInstance.getEventManager().clearAll()
          registerComponents(componentManagerInstance)

          const c = componentManagerInstance.getComponent(component_type)
          expect(c).not.toEqual(undefined)
          const cfg = c.config
          const schema_option = cfg.options
          expect(schema_option).toHaveProperty('id')
          expect(schema_option).toHaveProperty('$schema')
          expect(schema_option).toHaveProperty('title')
          expect(schema_option).toHaveProperty('description')
          expect(schema_option).toHaveProperty('x-layout')
          expect(schema_option).toHaveProperty('type')
          expect(schema_option).toHaveProperty('version')
          expect(schema_option).toHaveProperty('properties')
          expect(schema_option).toHaveProperty('required')
          expect(schema_option['x-layout']).toEqual('component')
        }
      }
    },
    {
      title: component_type + ' tests containing components',
      test: () => {
        if (Object.keys(contains).length) {
          // test only if we have keys
          componentManagerInstance.clearAll()
          componentManagerInstance.getStateManager().clearAll()
          componentManagerInstance.getEventManager().clearAll()
          registerComponents(componentManagerInstance)

          const c = componentManagerInstance.getComponent(component_type)
          expect(c).not.toEqual(undefined)
          const cfg = c.config
          expect(cfg).toHaveProperty('contains')
          // eslint-disable-next-line no-unused-vars
          for (const [key, val] of Object.entries(contains)) {
            expect(cfg.contains).toHaveProperty(key)
            // should expect to have a schema
            const schema = cfg.contains[key]
            expect(schema).toHaveProperty('id')
            expect(schema).toHaveProperty('$schema')
            expect(schema).toHaveProperty('title')
            expect(schema).toHaveProperty('description')
            expect(schema).toHaveProperty('x-layout')
            expect(schema).toHaveProperty('type')
            expect(schema).toHaveProperty('version')
            expect(schema).toHaveProperty('properties')
            expect(schema).toHaveProperty('required')

            expect(schema.id).toEqual(key) // should be same id as the key
            // should expect a x-layout having value "component-item"
            expect(schema['x-layout']).toEqual('component-item')
          }
        }
      }
    }
  ]
}

function uuidv4() {
  // random string generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function testEventSequence(
  componentManagerInstance,
  module_name,
  event_name,
  event_data,
  trigger_name,
  callback
) {
  const test_name = uuidv4()
  componentManagerInstance.getEventManager().register(
    test_name,
    {
      result: {
        schema: {},
        handler: callback
      }
    },
    {},
    {}
  ) // event and component info not used in test
  componentManagerInstance.getEventManager().watch([
    {
      component: { id: test_name, event: 'result' },
      trigger: { id: module_name, action: event_name },
      transform: function (data) {
        return data
      }
    },
    {
      component: { id: module_name, event: trigger_name },
      trigger: { id: test_name, action: 'result' },
      transform: function (data) {
        return data
      }
    }
  ])
  componentManagerInstance
    .getEventManager()
    .addEvent(test_name, 'result', event_data, {})
}

export default {
  createComponentClassTests,
  createComponentRegisterTests,
  testEventSequence
}
