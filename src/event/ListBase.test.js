import ListBase from './ListBase'

describe('ListBase', () => {
  it('is exported', () => {
    expect(ListBase.triggers).toBeTruthy()
    expect(ListBase.events).toBeTruthy()
    expect(ListBase.StateList).toBeTruthy()
    expect(ListBase.ListBase).toBeTruthy()
  })
})
