'use strict';

var components_Data_MemoryManager = require('./MemoryManager.js');
var components_Data_ObjectCollection = require('./ObjectCollection.js');
var util_TestUtil = require('../../util/TestUtil.js');
var layout_Manager = require('../../layout/Manager.js');
var components_Components = require('../Components.js');
var event_Event = require('../../event/Event.js');
require('../../_rollupPluginBabelHelpers-aae655da.js');
require('../../event/ObjectBase.js');
require('../../event/StateBase.js');
require('../../util/ObjUtil.js');
require('react');
require('./Data.js');
require('./XMLParser.js');
require('../../json2xml-b8c1001f.js');
require('../Network/Network.js');
require('../Network/RequestObject.js');

/**
 * MenuComponent tests
 * Testing DD events and actions integrety
 */
describe('ObjectCollection protocol', function () {
  var tests = util_TestUtil.createComponentClassTests(layout_Manager["default"].ComponentManager.getInstance(), components_Components, null, components_Data_ObjectCollection.config, ['insert', 'read', 'update', 'upsert', 'delete'], ['invalid', 'failure', 'inserting', 'inserted', 'reading', 'read', 'upserting', 'upserted', 'updating', 'updated', 'deleting', 'deleted', 'missing'], {}, undefined, {
    render: false
  });
  tests.forEach(function (t) {
    test(t.title, t.test);
  });
});
describe('ObjectCollection register', function () {
  var tests = util_TestUtil.createComponentRegisterTests(layout_Manager["default"].ComponentManager.getInstance(), components_Components, 'object', components_Data_ObjectCollection.ObjectCollection, components_Data_ObjectCollection.triggers, components_Data_ObjectCollection.events, components_Data_ObjectCollection.config, {});
  tests.forEach(function (t) {
    test(t.title, t.test);
  });
});
describe('ObjectCollection memory test', function () {
  beforeEach(function () {
    event_Event.EventManager.getInstance().clearAll();
    // eslint-disable-next-line no-unused-vars
    new components_Data_ObjectCollection.ObjectCollection({
      id: 'test_collection',
      type: 'object',
      schema: {},
      data: {
        1: {
          id: '1',
          ok: 1
        },
        '1d': {
          father: {
            daugther: 8,
            son: 5
          }
        }
      },
      manager: layout_Manager["default"].ComponentManager.getInstance()
    });
  });
  test('Initiated data exists', function (done) {
    util_TestUtil.testEventSequence(layout_Manager["default"].ComponentManager.getInstance(), 'test_collection', 'read', '1', 'read', function (obj) {
      expect(obj.id).toEqual('1');
      expect(obj.ok).toEqual(1);
      // check global shared memeory
      var mm = components_Data_MemoryManager.MemoryManager.getInstance().getMemory('test_collection').getData();
      expect(mm.docs['1']).toEqual({
        id: '1',
        ok: 1
      });
      expect(mm.docs['1d']).toEqual({
        father: {
          daugther: 8,
          son: 5
        }
      });
      done();
    });
  });
  test('Inserting data', function (done) {
    util_TestUtil.testEventSequence(layout_Manager["default"].ComponentManager.getInstance(), 'test_collection', 'insert', {
      id: '2',
      ok: 2
    }, 'inserted', function (obj) {
      expect(obj.id).toEqual('2');
      expect(obj.ok).toEqual(2);
      // check global shared memeory
      var mm = components_Data_MemoryManager.MemoryManager.getInstance().getMemory('test_collection').getData();
      expect(mm.docs['2']).toEqual({
        id: '2',
        ok: 2
      });
      done();
    });
  });

  // TODO: add more of these tests for delete, get, read ...
  test('Updating missing data results in missing', function (done) {
    util_TestUtil.testEventSequence(layout_Manager["default"].ComponentManager.getInstance(), 'test_collection', 'update', {
      id: 'MISSING-ID',
      OK: 'Ok value 2'
    }, 'missing', function (obj) {
      expect(obj.id).toEqual('MISSING-ID');
      done();
    });
  });
  test('Updating shallow object', function (done) {
    util_TestUtil.testEventSequence(layout_Manager["default"].ComponentManager.getInstance(), 'test_collection', 'update', {
      id: '1',
      ok: 'FINE'
    }, 'updated', function (obj) {
      expect(obj).toEqual({
        id: '1',
        ok: 'FINE'
      });
      // check global shared memeory
      var mm = components_Data_MemoryManager.MemoryManager.getInstance().getMemory('test_collection').getData();
      expect(mm.docs['1']).toEqual({
        id: '1',
        ok: 'FINE'
      });
      done();
    });
  });
  test('Updating deep object', function (done) {
    // increase age of daugther to 9
    util_TestUtil.testEventSequence(layout_Manager["default"].ComponentManager.getInstance(), 'test_collection', 'update', {
      id: '1d',
      father: {
        daughter: 9
      }
    }, 'updated', function (obj) {
      // check global shared memeory
      var mm = components_Data_MemoryManager.MemoryManager.getInstance().getMemory('test_collection').getData();
      expect(mm.docs['1d']).toEqual({
        father: {
          daugther: 8,
          son: 5,
          daughter: 9
        },
        id: '1d'
      });
      done();
    });
  });

  /*
  test('Upsert data', (done) => {
     // "insert"  { "id": "1", "ok": 1 } -> "inserted" -> { "id": "1", "ok": 1 }
    // "read"  { "id": "1" } -> "read" -> { "id": "1", "ok": 1 }
    // "update"  { "id": "1", "ok": 2 } -> "updated" -> { "id": "1", "ok": 2 }
    // "read"  { "id": "1" } -> "updated" -> { "id": "1", "ok": 2 }
     EventManager.getInstance().register(
      'test',
      {
        result: {
          schema: {},
          handler: (obj) => {
            expect(obj.id).toEqual('1')
            expect(obj.ok).toEqual(1)
            // check global shared memeory
            const mm = MemoryManager.getInstance()
              .getMemory('test_collection')
              .getData()
            expect(mm.docs['1']).toEqual({ id: '1', ok: 1 })
            done()
          }
        }
      },
      {},
      {}
    )
    EventManager.getInstance().watch([
      {
        component: { id: 'test', event: 'result' },
        trigger: { id: 'test_collection', action: 'upsert' },
        transform: function (data) {
          return data
        }
      },
      {
        component: { id: 'test_collection', event: 'upserted' },
        trigger: { id: 'test', action: 'result' },
        transform: function (data) {
          return data
        }
      }
    ])
    EventManager.getInstance().addEvent(
      'test',
      'result',
      { id: '1', ok: 1 },
      {}
    )
  })
  */
});
//# sourceMappingURL=ObjectCollection.test.js.map
