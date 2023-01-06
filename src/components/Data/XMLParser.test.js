/* eslint-disable no-unused-vars */
/**
 * MenuComponent tests
 * Testing DD events and actions integrety
 */

import { XMLParser, events, triggers, config } from './XMLParser'
import {
  createComponentClassTests,
  createComponentRegisterTests,
  testEventSequence
} from '../../util/TestUtil'
import Manager from '../../layout/Manager'
import registerComponents from '../Components'
import Event from '../../event/Event'

describe('XMLParser protocol', () => {
  const tests = createComponentClassTests(
    Manager.ComponentManager.getInstance(),
    registerComponents,
    null,
    config,
    ['read', 'convert'],
    [
      'reading',
      'read',
      'failure_reading',
      'converting',
      'converted',
      'failure_converting'
    ],
    {},
    undefined,
    { render: false }
  )
  tests.forEach((t) => {
    test(t.title, t.test)
  })
})

describe('XMLParser register', () => {
  const tests = createComponentRegisterTests(
    Manager.ComponentManager.getInstance(),
    registerComponents,
    'xml',
    XMLParser,
    triggers,
    events,
    config,
    {}
  )
  tests.forEach((t) => {
    test(t.title, t.test)
  })
})

describe('XMLParser memory test', () => {
  const objectCollection = null

  beforeEach(() => {
    Event.EventManager.getInstance().clearAll()
  })

  test('Parsing simple XML', (done) => {
    const xmlParser = new XMLParser({
      id: 'test_xmlParser',
      schema: {},
      data: {},
      type: 'xml',
      manager: Manager.ComponentManager.getInstance()
    })

    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_xmlParser',
      'read',
      {
        xml: '<foo attr="value">bar</foo>'
      },
      'read',
      (obj) => {
        expect(obj).toEqual({
          json: { foo: { '#text': 'bar', '@_attr': 'value' } }
        })
        done()
      }
    )
  })

  test('Parsing to XML using generated JSON', (done) => {
    const xmlParser = new XMLParser({
      id: 'test_xmlParser',
      schema: {},
      data: {},
      type: 'xml',
      manager: Manager.ComponentManager.getInstance()
    })

    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_xmlParser',
      'convert',
      {
        json: { foo: { '#text': 'bar', '@_attr': 'value' } }
      },
      'converted',
      (obj) => {
        expect(obj).toEqual({ xml: '<foo attr="value">bar</foo>\n' })
        done()
      }
    )
  })

  test('Parsing simple CMMN', (done) => {
    const xmlParser = new XMLParser({
      id: 'test_xmlParser',
      schema: {},
      data: {},
      type: 'xml',
      manager: Manager.ComponentManager.getInstance()
    })

    testEventSequence(
      Manager.ComponentManager.getInstance(),
      'test_xmlParser',
      'read',
      {
        xml: test_data_cmmn_xml
      },
      'read',
      (obj) => {
        expect(obj).toEqual(test_data_cmmn_json)
        done()
      }
    )
  })
})

// TODO: add this data in a test (to and from xml)
const test_data_1car = `
<car>
  <color alpha="7">purple</color>
  <type>minivan</type>
  <registration>2020-02-03</registration>
  <capacity>7</capacity>
</car>
`

const test_data_cmmn_xml = `<?xml version="1.0" encoding="UTF-8"?>
<cmmn:definitions xmlns:dc="http://www.omg.org/spec/CMMN/20151109/DC" xmlns:cmmndi="http://www.omg.org/spec/CMMN/20151109/CMMNDI" xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:di="http://www.omg.org/spec/CMMN/20151109/DI" id="Definitions_0q2hekz" targetNamespace="http://bpmn.io/schema/cmmn" exporter="cmmn-js (https://demo.bpmn.io/cmmn)" exporterVersion="0.20.0">
    <cmmn:case id="Case_0mbeegm">
        <cmmn:casePlanModel id="CasePlanModel_0l75tfv" name="A CasePlanModel">
            <cmmn:planItem id="PlanItem_0nndxko" definitionRef="Task_14nbr0o">
                <cmmn:entryCriterion id="EntryCriterion_0i4ja07" sentryRef="Sentry_18pc5du" />
            </cmmn:planItem>
            <cmmn:planItem id="PlanItem_0th8d5v" definitionRef="EventListener_0poum21" />
            <cmmn:sentry id="Sentry_18pc5du">
                <cmmn:planItemOnPart id="PlanItemOnPart_125ga5x" sourceRef="PlanItem_0th8d5v">
                    <cmmn:standardEvent>occur</cmmn:standardEvent>
                </cmmn:planItemOnPart>
            </cmmn:sentry>
            <cmmn:task id="Task_14nbr0o" name="Task item" />
            <cmmn:eventListener id="EventListener_0poum21" name="Page load" />
        </cmmn:casePlanModel>
    </cmmn:case>
    <cmmndi:CMMNDI>
        <cmmndi:CMMNDiagram id="CMMNDiagram_1">
            <cmmndi:Size width="500" height="500" />
            <cmmndi:CMMNShape id="DI_CasePlanModel_0l75tfv" cmmnElementRef="CasePlanModel_0l75tfv">
                <dc:Bounds x="156" y="99" width="534" height="389" />
                <cmmndi:CMMNLabel />
            </cmmndi:CMMNShape>
            <cmmndi:CMMNShape id="PlanItem_0nndxko_di" cmmnElementRef="PlanItem_0nndxko">
                <dc:Bounds x="512" y="268" width="100" height="80" />
                <cmmndi:CMMNLabel />
            </cmmndi:CMMNShape>
            <cmmndi:CMMNShape id="PlanItem_0th8d5v_di" cmmnElementRef="PlanItem_0th8d5v">
                <dc:Bounds x="244" y="250" width="36" height="36" />
                <cmmndi:CMMNLabel>
                    <dc:Bounds x="236" y="286" width="51" height="13" />
                </cmmndi:CMMNLabel>
            </cmmndi:CMMNShape>
            <cmmndi:CMMNShape id="EntryCriterion_0i4ja07_di" cmmnElementRef="EntryCriterion_0i4ja07">
                <dc:Bounds x="502" y="294" width="20" height="28" />
                <cmmndi:CMMNLabel />
            </cmmndi:CMMNShape>
            <cmmndi:CMMNEdge id="PlanItemOnPart_125ga5x_di" cmmnElementRef="PlanItemOnPart_125ga5x" targetCMMNElementRef="EntryCriterion_0i4ja07" isStandardEventVisible="true">
                <di:waypoint x="280" y="268" />
                <di:waypoint x="391" y="268" />
                <di:waypoint x="391" y="308" />
                <di:waypoint x="502" y="308" />
                <cmmndi:CMMNLabel>
                    <dc:Bounds x="379" y="276" width="35" height="13" />
                </cmmndi:CMMNLabel>
            </cmmndi:CMMNEdge>
        </cmmndi:CMMNDiagram>
    </cmmndi:CMMNDI>
</cmmn:definitions>
`
export const test_data_cmmn_json = {
  json: {
    '?xml': {
      '@_version': '1.0',
      '@_encoding': 'UTF-8'
    },
    'cmmn:definitions': {
      'cmmn:case': {
        'cmmn:casePlanModel': {
          'cmmn:planItem': [
            {
              'cmmn:entryCriterion': {
                '@_id': 'EntryCriterion_0i4ja07',
                '@_sentryRef': 'Sentry_18pc5du'
              },
              '@_id': 'PlanItem_0nndxko',
              '@_definitionRef': 'Task_14nbr0o'
            },
            {
              '@_id': 'PlanItem_0th8d5v',
              '@_definitionRef': 'EventListener_0poum21'
            }
          ],
          'cmmn:sentry': {
            'cmmn:planItemOnPart': {
              'cmmn:standardEvent': 'occur',
              '@_id': 'PlanItemOnPart_125ga5x',
              '@_sourceRef': 'PlanItem_0th8d5v'
            },
            '@_id': 'Sentry_18pc5du'
          },
          'cmmn:task': {
            '@_id': 'Task_14nbr0o',
            '@_name': 'Task item'
          },
          'cmmn:eventListener': {
            '@_id': 'EventListener_0poum21',
            '@_name': 'Page load'
          },
          '@_id': 'CasePlanModel_0l75tfv',
          '@_name': 'A CasePlanModel'
        },
        '@_id': 'Case_0mbeegm'
      },
      'cmmndi:CMMNDI': {
        'cmmndi:CMMNDiagram': {
          'cmmndi:Size': {
            '@_width': '500',
            '@_height': '500'
          },
          'cmmndi:CMMNShape': [
            {
              'dc:Bounds': {
                '@_x': '156',
                '@_y': '99',
                '@_width': '534',
                '@_height': '389'
              },
              'cmmndi:CMMNLabel': '',
              '@_id': 'DI_CasePlanModel_0l75tfv',
              '@_cmmnElementRef': 'CasePlanModel_0l75tfv'
            },
            {
              'dc:Bounds': {
                '@_x': '512',
                '@_y': '268',
                '@_width': '100',
                '@_height': '80'
              },
              'cmmndi:CMMNLabel': '',
              '@_id': 'PlanItem_0nndxko_di',
              '@_cmmnElementRef': 'PlanItem_0nndxko'
            },
            {
              'dc:Bounds': {
                '@_x': '244',
                '@_y': '250',
                '@_width': '36',
                '@_height': '36'
              },
              'cmmndi:CMMNLabel': {
                'dc:Bounds': {
                  '@_x': '236',
                  '@_y': '286',
                  '@_width': '51',
                  '@_height': '13'
                }
              },
              '@_id': 'PlanItem_0th8d5v_di',
              '@_cmmnElementRef': 'PlanItem_0th8d5v'
            },
            {
              'dc:Bounds': {
                '@_x': '502',
                '@_y': '294',
                '@_width': '20',
                '@_height': '28'
              },
              'cmmndi:CMMNLabel': '',
              '@_id': 'EntryCriterion_0i4ja07_di',
              '@_cmmnElementRef': 'EntryCriterion_0i4ja07'
            }
          ],
          'cmmndi:CMMNEdge': {
            'di:waypoint': [
              {
                '@_x': '280',
                '@_y': '268'
              },
              {
                '@_x': '391',
                '@_y': '268'
              },
              {
                '@_x': '391',
                '@_y': '308'
              },
              {
                '@_x': '502',
                '@_y': '308'
              }
            ],
            'cmmndi:CMMNLabel': {
              'dc:Bounds': {
                '@_x': '379',
                '@_y': '276',
                '@_width': '35',
                '@_height': '13'
              }
            },
            '@_id': 'PlanItemOnPart_125ga5x_di',
            '@_cmmnElementRef': 'PlanItemOnPart_125ga5x',
            '@_targetCMMNElementRef': 'EntryCriterion_0i4ja07',
            '@_isStandardEventVisible': 'true'
          },
          '@_id': 'CMMNDiagram_1'
        }
      },
      '@_xmlns:dc': 'http://www.omg.org/spec/CMMN/20151109/DC',
      '@_xmlns:cmmndi': 'http://www.omg.org/spec/CMMN/20151109/CMMNDI',
      '@_xmlns:cmmn': 'http://www.omg.org/spec/CMMN/20151109/MODEL',
      '@_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@_xmlns:di': 'http://www.omg.org/spec/CMMN/20151109/DI',
      '@_id': 'Definitions_0q2hekz',
      '@_targetNamespace': 'http://bpmn.io/schema/cmmn',
      '@_exporter': 'cmmn-js (https://demo.bpmn.io/cmmn)',
      '@_exporterVersion': '0.20.0'
    }
  }
}
