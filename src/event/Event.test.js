import Event from './Event'

describe('Event', () => {
  it('is exported', () => {
    expect(Event.EventManager).toBeTruthy()
    expect(Event.getTransformFunction).toBeTruthy()
  })
})
