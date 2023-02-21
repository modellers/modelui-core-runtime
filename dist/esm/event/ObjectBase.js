import { _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck, d as _defineProperty, e as _assertThisInitialized, h as _objectSpread2 } from '../_rollupPluginBabelHelpers-55d249d8.js';
import { StateLess } from './StateBase.js';
import Event from './Event.js';
import { mergeDeep } from '../util/ObjUtil.js';
import { MemoryManager } from '../components/Data/MemoryManager.js';

var triggers = {
  insert: {
    alias: [],
    info: {
      name: 'Insert',
      description: 'Insert object'
    },
    schema: {}
  },
  read: {
    alias: [],
    info: {
      name: 'Read',
      description: 'Read object'
    },
    schema: {}
  },
  update: {
    alias: [],
    info: {
      name: 'Update',
      description: 'Update object'
    },
    schema: {}
  },
  upsert: {
    alias: [],
    info: {
      name: 'Upsert',
      description: 'Upsert object'
    },
    schema: {}
  },
  "delete": {
    alias: [],
    info: {
      name: 'Delete',
      description: 'Delete object'
    },
    schema: {}
  }
};
var events = {
  invalid: {
    alias: [],
    info: {
      name: 'invalid',
      description: 'Insert was invalid'
    },
    schema: {}
  },
  failure: {
    alias: [],
    info: {
      name: 'failure',
      description: 'Insert was failed'
    },
    schema: {}
  },
  inserting: {
    alias: [],
    info: {
      name: 'inserting',
      description: 'Insterting item creates or replaces'
    },
    schema: {}
  },
  inserted: {
    alias: [],
    info: {
      name: 'inserted',
      description: 'Inserted item creates or replaces'
    },
    schema: {}
  },
  reading: {
    alias: [],
    info: {
      name: 'Reading',
      description: 'Reading identifer'
    },
    schema: {}
  },
  read: {
    alias: [],
    info: {
      name: 'Read',
      description: 'Read identifer'
    },
    schema: {}
  },
  upserting: {
    alias: [],
    info: {
      name: 'upserting',
      description: 'TBD'
    },
    schema: {}
  },
  upserted: {
    alias: [],
    info: {
      name: 'upserted',
      description: 'TBD'
    },
    schema: {}
  },
  updating: {
    alias: [],
    info: {
      name: 'updating',
      description: 'TBD'
    },
    schema: {}
  },
  updated: {
    alias: [],
    info: {
      name: 'updated',
      description: 'TBD'
    },
    schema: {}
  },
  deleting: {
    alias: [],
    info: {
      name: 'deleting',
      description: 'TBD'
    },
    schema: {}
  },
  deleted: {
    alias: [],
    info: {
      name: 'deleted',
      description: 'TBD'
    },
    schema: {}
  },
  missing: {
    alias: [],
    info: {
      name: 'Missing',
      description: 'Missing read identifer'
    },
    schema: {}
  }
};

// FIXME: should have state
var StateObject = /*#__PURE__*/function (_StateLess) {
  _inherits(StateObject, _StateLess);
  var _super = _createSuper(StateObject);
  /*
    docs = data || {};
    this.props.id = props.id;
    schema = props.schema;
    data = props.data;
    */
  // regiser so this is accessible to all transforms
  // TODO: do this in a nicer way

  function StateObject(props) {
    var _this;
    _classCallCheck(this, StateObject);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "getData", function () {
      // Used by memory manager when allowing transformations to read data
      // Specifically implemented in ObjectCollection
      return _this.getState().data;
    });
    _defineProperty(_assertThisInitialized(_this), "deepMerge", function (obj_target, obj_source) {
      return mergeDeep(obj_target, obj_source); // { ...obj_target, ...obj_source }
    });
    _defineProperty(_assertThisInitialized(_this), "raiseSuccessEvent", function (event_name, data, evt) {
      _this.triggerEvent(event_name, data, evt);
    });
    _defineProperty(_assertThisInitialized(_this), "raiseFailureEvent", function (event_name, data, evt) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
      _this.triggerEvent(event_name, data, evt);
    });
    _defineProperty(_assertThisInitialized(_this), "isValidDocumentSchema", function (doc, schema) {
      // returns true if doc validates against schema
      return true;
    });
    _defineProperty(_assertThisInitialized(_this), "isValidDocumentId", function (document_id) {
      return document_id !== null && document_id !== undefined;
    });
    _defineProperty(_assertThisInitialized(_this), "getValidDocumentId", function (obj) {
      if (typeof obj === 'string') {
        return obj;
      } // this is a string id
      var obj_id = obj.id || obj.identifier;
      if (_this.isValidDocumentId(obj_id)) {
        return obj_id;
      }
      return null;
    });
    _defineProperty(_assertThisInitialized(_this), "registerComponent", function (actionHandlers, eventHandlers, component_info) {
      actionHandlers = actionHandlers || {};
      eventHandlers = eventHandlers || {};
      // add our known handlers
      // register componenet overiding or adding new event handlers
      var dataActionHandlers = {
        insert: {
          schema: {},
          handler: function handler(objs) {
            var self = _assertThisInitialized(_this);
            function insert_one(obj, docs, schema) {
              // https://firebase.google.com/docs/firestore/manage-data/add-data
              var schema_validation = self.isValidDocumentSchema(obj, schema);
              if (schema_validation) {
                // notify event: creating - Pending
                self.raiseSuccessEvent('inserting', obj);
                // create the id
                var document_id = self.getValidDocumentId(obj);
                docs[document_id] = obj;
                self.raiseSuccessEvent('inserted', obj);
                // TODO: Event: created - Success
                // TODO: Event: exists - Failure
                // TODO: Event: failure - Failure
              } else {
                // notify event: invalid - Failure validating against schema
                self.raiseFailureEvent('invalid', obj, {
                  message: 'Document structure is invalid against schema',
                  code: 501,
                  data: {
                    document: obj,
                    schema: schema,
                    reason: schema_validation
                  }
                });
              }
            }
            if (Array.isArray(objs)) {
              objs.forEach(function (obj) {
                insert_one(obj, self.state.data.docs, self.state.data.schema);
              });
            } // many
            else {
              insert_one(objs, self.state.data.docs);
            } // one
          }
        },

        read: {
          schema: {},
          handler: function handler(document_ids) {
            // https://firebase.google.com/docs/firestore/query-data/get-data
            // validate document id
            var self = _assertThisInitialized(_this);
            function read_one(document_id, docs) {
              document_id = self.getValidDocumentId(document_id);
              if (!document_id) {
                self.raiseFailureEvent('invalid', {
                  id: document_id
                }, {
                  message: 'Document identifier is invalid',
                  code: 301,
                  data: {
                    id: document_id
                  }
                });
              } else {
                // notify event: reading - Pending
                self.raiseSuccessEvent('reading', {
                  id: document_id
                });
                var obj = docs[document_id];
                if (obj) {
                  // notify event: read - Success
                  try {
                    self.raiseSuccessEvent('read', obj);
                  } catch (e) {
                    self.raiseFailureEvent('failure', {
                      id: document_id
                    }, e);
                  }
                } else {
                  // notify event: missing - Failure
                  self.raiseFailureEvent('missing', {
                    id: document_id
                  }, {
                    message: 'Document identifier is invalid',
                    code: 401,
                    data: {
                      id: document_id
                    }
                  });
                }
              }
            }
            if (Array.isArray(document_ids)) {
              document_ids.forEach(function (document_id) {
                read_one(document_id, _this.state.data.docs, _this.state.data.schema);
              });
            } // many
            else {
              read_one(document_ids, _this.state.data.docs);
            } // one
          }
        },

        update: {
          schema: {},
          handler: function handler(objs) {
            var self = _assertThisInitialized(_this);
            function update_one(obj, docs, schema) {
              // validate obj against schema
              var schema_validation = self.isValidDocumentSchema(obj, schema);
              if (schema_validation) {
                // TODO: Event: invalidated - Failure validating against schema
                // notify event: updating - Pending
                var document_id = self.getValidDocumentId(obj);
                self.raiseSuccessEvent('updating', obj);
                if (document_id) {
                  var doc = docs[document_id];
                  if (doc) {
                    try {
                      docs[document_id] = mergeDeep(doc || {}, obj);
                      self.raiseSuccessEvent('updated', docs[document_id]);
                    } catch (e) {
                      self.raiseFailureEvent('error', obj);
                    }
                  } else {
                    // notify event: missing - Failure
                    self.raiseFailureEvent('missing', {
                      id: document_id,
                      data: docs
                    }, {});
                    // TODO: Event: failure - Failure
                  }
                } else {
                  self.raiseFailureEvent('invalid', obj, {
                    message: 'Document identifier is invalid',
                    code: 301,
                    data: document_id
                  });
                }
              }
            }
            if (Array.isArray(objs)) {
              objs.forEach(function (obj) {
                update_one(obj, _this.state.data.docs, _this.state.data.schema);
              });
            } // many
            else {
              update_one(objs, _this.state.data.docs, _this.state.data.schema);
            } // one
          }
        },

        upsert: {
          schema: {},
          handler: function handler(objs) {
            var self = _assertThisInitialized(_this);
            function upsert_one(obj, docs, schema) {
              // validate document id
              var schema_validation = self.isValidDocumentSchema(obj, schema);
              if (schema_validation) {
                // Event: upserting - Pending
                self.raiseSuccessEvent('upserting', obj);
                var document_id = self.getValidDocumentId(obj);
                if (document_id) {
                  var doc = docs[document_id];
                  try {
                    docs[document_id] = self.deepMerge(doc || {}, obj);
                    self.raiseSuccessEvent('upserted', docs[document_id]);
                  } catch (e) {
                    self.raiseFailureEvent('failure', obj, e);
                  }
                }
              } else {
                // notify event: invalid - Failure validating against schema
                self.raiseFailureEvent('invalid', obj, {
                  message: 'Document structure is invalid against schema',
                  code: 501,
                  data: {
                    document: obj,
                    schema: schema,
                    reason: schema_validation
                  }
                });
              }
            }
            if (Array.isArray(objs)) {
              objs.forEach(function (obj) {
                upsert_one(obj, _this.state.data.docs, _this.state.data.schema);
              });
            } // many
            else {
              upsert_one(objs, _this.state.data.docs, _this.state.data.schema);
            } // one
          }
        },

        "delete": {
          schema: {},
          handler: function handler(document_ids) {
            var self = _assertThisInitialized(_this);
            function delete_one(document_id, docs) {
              // https://firebase.google.com/docs/firestore/manage-data/delete-data
              // validate document id
              document_id = self.getValidDocumentId(document_id);
              if (document_id) {
                // Event: deleting - Pending
                self.raiseSuccessEvent('deleting', {
                  id: document_id
                });
                var doc = docs[document_id];
                // Do the actuall deletion
                if (doc) {
                  // TODO: check if this exist
                  delete docs[document_id];
                  self.raiseSuccessEvent('deleted', {
                    id: document_id
                  });
                  // Event: deleted - Success
                  // raiseSuccessEvent('deleted', obj);
                } else {
                  self.raiseFailureEvent('missing', {
                    id: document_id
                  });
                }
              } else {
                self.raiseFailureEvent('invalid', {
                  id: document_id
                }, {
                  message: 'Document identifier is invalid',
                  code: 301,
                  data: {
                    id: document_id
                  }
                });
              }
            }
            if (Array.isArray(document_ids)) {
              document_ids.forEach(function (document_id) {
                delete_one(document_id, _this.state.data.docs);
              });
            } // many
            else {
              delete_one(document_ids, _this.state.data.docs);
            } // one
          }
        }
      };

      // register componenet overiding or adding new event handlers
      _this.ddEvent = Event.EventManager.getInstance().register(_this.props.id, _objectSpread2(_objectSpread2({}, dataActionHandlers), actionHandlers), _objectSpread2(_objectSpread2({}, events), eventHandlers), component_info);
      return _this.ddEvent;
    });
    _this.props = props;
    // apply initial values
    _this.state = {
      data: {
        docs: props.data,
        schema: props.data.schema || props.schema
      },
      schema: props.schema
    };
    // add to globally shared memory (allowing transforms to read data)
    MemoryManager.getInstance().registerMemory(props.id, _assertThisInitialized(_this));
    return _this;
  }
  return _createClass(StateObject);
}(StateLess);

export { StateObject, events, triggers };
//# sourceMappingURL=ObjectBase.js.map
