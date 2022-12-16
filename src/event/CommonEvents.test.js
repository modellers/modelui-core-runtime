import CommonEvents from './CommonEvents'

describe('CommonEvents', () => {
  it('registerEvents is exported', () => {
    expect(CommonEvents.registerEvents).toBeTruthy()
  })
  it('registerEventApp is exported', () => {
    expect(CommonEvents.registerEventApp).toBeTruthy()
  })
  it('registerEventDebugging is exported', () => {
    expect(CommonEvents.registerEventDebugging).toBeTruthy()
  })
})
