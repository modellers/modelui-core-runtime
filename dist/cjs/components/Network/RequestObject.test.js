'use strict';

var components_Network_RequestObject = require('./RequestObject.js');
var util_TestUtil = require('../../util/TestUtil.js');
var layout_Manager = require('../../layout/Manager.js');
var components_Components = require('../Components.js');
require('../../_rollupPluginBabelHelpers-aae655da.js');
require('../../event/Event.js');
require('../../event/StateBase.js');
require('react');
require('../Data/Data.js');
require('../Data/ObjectCollection.js');
require('../../event/ObjectBase.js');
require('../../util/ObjUtil.js');
require('../Data/MemoryManager.js');
require('../Data/XMLParser.js');
require('../../json2xml-b8c1001f.js');
require('./Network.js');

/**
 * RequestObject tests
 */
describe('RequestObject protocol', function () {
  var tests = util_TestUtil.createComponentClassTests(layout_Manager["default"].ComponentManager.getInstance(), components_Components, null, components_Network_RequestObject.config, ['read', 'convert'], ['reading', 'read', 'failure_reading', 'converting', 'converted', 'failure_converting'], {}, undefined, {
    render: false
  });
  tests.forEach(function (t) {
    test(t.title, t.test);
  });
});
describe('RequestObject register', function () {
  var tests = util_TestUtil.createComponentRegisterTests(layout_Manager["default"].ComponentManager.getInstance(), components_Components, 'object-request', components_Network_RequestObject.RequestObject, components_Network_RequestObject.triggers, components_Network_RequestObject.events, components_Network_RequestObject.config, {});
  tests.forEach(function (t) {
    test(t.title, t.test);
  });
});
/*
http://www.jsontest.com/

https://run.mocky.io/v3/513e6daa-641d-4505-b891-c2996fadd694
https://designer.mocky.io/manage/delete/513e6daa-641d-4505-b891-c2996fadd694/1nm9ex3oPihQVbfGlLo4sqEKeTlZNLDaAaJM

describe('RequestObject memory test', () => {
  beforeEach(() => {
    Event.EventManager.getInstance().clearAll()
    // eslint-disable-next-line no-unused-vars
    const requestObject = new RequestObject({
      id: 'test_collection',
      type: 'object_request',
      schema: {},
      data: {
        1: { id: '1', ok: 1 },
        '1d': { father: { daugther: 8, son: 5 } }
      },
      manager: Manager.ComponentManager.getInstance()
    })
  })

  test('Initiated data exists', (done) => {
    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_collection',
      'read',
      '1',
      'read',
      (obj) => {
        expect(obj.id).toEqual('1')
        expect(obj.ok).toEqual(1)
        // check global shared memeory
        const mm = MemoryManager.getInstance()
          .getMemory('test_collection')
          .getData()
        expect(mm.docs['1']).toEqual({ id: '1', ok: 1 })
        expect(mm.docs['1d']).toEqual({ father: { daugther: 8, son: 5 } })
        done()
      }
    )
  })

  test('Inserting data', (done) => {
    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_collection',
      'insert',
      { id: '2', ok: 2 },
      'inserted',
      (obj) => {
        expect(obj.id).toEqual('2')
        expect(obj.ok).toEqual(2)
        // check global shared memeory
        const mm = MemoryManager.getInstance()
          .getMemory('test_collection')
          .getData()
        expect(mm.docs['2']).toEqual({ id: '2', ok: 2 })
        done()
      }
    )
  })

  // TODO: add more of these tests for delete, get, read ...
  test('Updating missing data results in missing', (done) => {
    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_collection',
      'update',
      { id: 'MISSING-ID', OK: 'Ok value 2' },
      'missing',
      (obj) => {
        expect(obj.id).toEqual('MISSING-ID')
        done()
      }
    )
  })

  test('Updating shallow object', (done) => {
    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_collection',
      'update',
      { id: '1', ok: 'FINE' },
      'updated',
      (obj) => {
        expect(obj).toEqual({ id: '1', ok: 'FINE' })
        // check global shared memeory
        const mm = MemoryManager.getInstance()
          .getMemory('test_collection')
          .getData()
        expect(mm.docs['1']).toEqual({ id: '1', ok: 'FINE' })
        done()
      }
    )
  })

  test('Updating deep object', (done) => {
    // increase age of daugther to 9
    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_collection',
      'update',
      { id: '1d', father: { daughter: 9 } },
      'updated',
      (obj) => {
        // check global shared memeory
        const mm = MemoryManager.getInstance()
          .getMemory('test_collection')
          .getData()
        expect(mm.docs['1d']).toEqual({
          father: { daugther: 8, son: 5, daughter: 9 },
          id: '1d'
        })
        done()
      }
    )
  })
})
*/
//# sourceMappingURL=RequestObject.test.js.map
