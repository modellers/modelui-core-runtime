import LayoutComponent from './LayoutComponent'

describe('LayoutComponent', () => {
  it('is exported', () => {
    expect(LayoutComponent.events).toBeTruthy()
    expect(LayoutComponent.triggers).toBeTruthy()
    expect(LayoutComponent.options).toBeTruthy()
    expect(LayoutComponent.config).toBeTruthy()
    expect(LayoutComponent.LayoutComponent).toBeTruthy()
  })
})
