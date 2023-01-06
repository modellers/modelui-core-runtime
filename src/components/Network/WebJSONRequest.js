import axios from 'axios'
// event handler
import EventManager from '../../event/Event'
/*
{
    schema:
    url: url, -- require
    body: object, -- optional
    query: object -- optional
}
*/
export function WebJSONRequest(props) {
  const collection_name = props.id
  const schema = props.schema
  /*
    const data = props.data;
    const options = props.options;
    */

  const raiseSuccessEvent = (event_name, data, evt) => {
    EventManager.getInstance().addEvent(collection_name, event_name, data, evt)
  }

  const raiseFailureEvent = (event_name, data, evt) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
    EventManager.getInstance().addEvent(collection_name, event_name, data, evt)
  }

  const isValidDocumentSchema = (obj, schema) => {
    // returns true if doc validates against schema
    return true
  }

  EventManager.getInstance().register(collection_name, {
    get: (obj) => {
      // Validate schema
      const schema_validation = isValidDocumentSchema(obj, schema)
      if (schema_validation) {
        // Create query parameter
        let query_param = ''
        if (obj.query) {
          query_param = '?'
          for (const p in obj.query) {
            query_param = query_param + p + '=' + obj.query[p] + '&'
          }
        }
        // Do api rest call
        axios
          .get(obj.url + query_param)
          .then((result) => {
            const data = result.data
            if (result.status === 200) {
              raiseSuccessEvent('got', data, result)
            } else {
              raiseFailureEvent('' + result.status, data, result)
            }
          })
          .catch(function (error) {
            console.log(error)
            raiseFailureEvent('failure', obj, error)
          })
      } else {
        raiseFailureEvent('invalid', obj, {
          message: 'Invalid object',
          code: 501,
          data: { document: obj, schema: schema, reason: schema_validation }
        })
      }
    }
  })
}
