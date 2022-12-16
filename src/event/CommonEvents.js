import Event from '../event/Event'

const registerEventDebugging = () => {
  // add specific solutions
  Event.EventManager.getInstance().register('console', {
    print: {
      schema: {},
      handler: (obj) => {
        console.info('------------- DEBUG-STORY ----------------')
        console.info(obj)
      }
    }
  })
}

const registerEventApp = () => {
  // add specific solutions
  Event.EventManager.getInstance().register(
    'app',
    {
      warning: {
        schema: {},
        handler: (obj) => {
          console.info('--------------- WARNING ------------------')
          console.warn(obj)
        }
      },
      error: {
        schema: {},
        handler: (obj) => {
          console.info('---------------- ERROR -------------------')
          console.error(obj)
        }
      }
    },
    {
      ready: {
        alias: [],
        info: {
          name: 'Ready',
          description: 'Ready'
        },
        schema: {}
      }
    },
    {
      name: 'Application',
      type: 'app',
      author: 'Kjartan Jónsson',
      description: 'Application',
      version: 0.1,
      options: {}
    }
  )
}

const registerEvents = (event_types) => {
  // TODO: event
}

export default { registerEvents, registerEventApp, registerEventDebugging }
