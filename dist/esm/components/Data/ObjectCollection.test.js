import { MemoryManager } from './MemoryManager.js';
import { ObjectCollection, config, events, triggers } from './ObjectCollection.js';
import { createComponentClassTests, createComponentRegisterTests, testEventSequence } from '../../util/TestUtil.js';
import Manager from '../../layout/Manager.js';
import registerComponents from '../Components.js';
import Event from '../../event/Event.js';
import '../../_rollupPluginBabelHelpers-55d249d8.js';
import '../../event/ObjectBase.js';
import '../../event/StateBase.js';
import '../../util/ObjUtil.js';
import 'react';
import './Data.js';
import './XMLParser.js';
import '../../json2xml-ac73b7d0.js';
import '../Network/Network.js';
import '../Network/RequestObject.js';

/**
 * MenuComponent tests
 * Testing DD events and actions integrety
 */
describe('ObjectCollection protocol', function () {
  var tests = createComponentClassTests(Manager.ComponentManager.getInstance(), registerComponents, null, config, ['insert', 'read', 'update', 'upsert', 'delete'], ['invalid', 'failure', 'inserting', 'inserted', 'reading', 'read', 'upserting', 'upserted', 'updating', 'updated', 'deleting', 'deleted', 'missing'], {}, undefined, {
    render: false
  });
  tests.forEach(function (t) {
    test(t.title, t.test);
  });
});
describe('ObjectCollection register', function () {
  var tests = createComponentRegisterTests(Manager.ComponentManager.getInstance(), registerComponents, 'object', ObjectCollection, triggers, events, config, {});
  tests.forEach(function (t) {
    test(t.title, t.test);
  });
});
describe('ObjectCollection memory test', function () {
  beforeEach(function () {
    Event.EventManager.getInstance().clearAll();
    // eslint-disable-next-line no-unused-vars
    new ObjectCollection({
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
      manager: Manager.ComponentManager.getInstance()
    });
  });
  test('Initiated data exists', function (done) {
    testEventSequence(Manager.ComponentManager.getInstance(), 'test_collection', 'read', '1', 'read', function (obj) {
      expect(obj.id).toEqual('1');
      expect(obj.ok).toEqual(1);
      // check global shared memeory
      var mm = MemoryManager.getInstance().getMemory('test_collection').getData();
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
    testEventSequence(Manager.ComponentManager.getInstance(), 'test_collection', 'insert', {
      id: '2',
      ok: 2
    }, 'inserted', function (obj) {
      expect(obj.id).toEqual('2');
      expect(obj.ok).toEqual(2);
      // check global shared memeory
      var mm = MemoryManager.getInstance().getMemory('test_collection').getData();
      expect(mm.docs['2']).toEqual({
        id: '2',
        ok: 2
      });
      done();
    });
  });

  // TODO: add more of these tests for delete, get, read ...
  test('Updating missing data results in missing', function (done) {
    testEventSequence(Manager.ComponentManager.getInstance(), 'test_collection', 'update', {
      id: 'MISSING-ID',
      OK: 'Ok value 2'
    }, 'missing', function (obj) {
      expect(obj.id).toEqual('MISSING-ID');
      done();
    });
  });
  test('Updating shallow object', function (done) {
    testEventSequence(Manager.ComponentManager.getInstance(), 'test_collection', 'update', {
      id: '1',
      ok: 'FINE'
    }, 'updated', function (obj) {
      expect(obj).toEqual({
        id: '1',
        ok: 'FINE'
      });
      // check global shared memeory
      var mm = MemoryManager.getInstance().getMemory('test_collection').getData();
      expect(mm.docs['1']).toEqual({
        id: '1',
        ok: 'FINE'
      });
      done();
    });
  });
  test('Updating deep object', function (done) {
    // increase age of daugther to 9
    testEventSequence(Manager.ComponentManager.getInstance(), 'test_collection', 'update', {
      id: '1d',
      father: {
        daughter: 9
      }
    }, 'updated', function (obj) {
      // check global shared memeory
      var mm = MemoryManager.getInstance().getMemory('test_collection').getData();
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
