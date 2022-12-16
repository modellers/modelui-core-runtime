 // https://nodejs.org/api/packages.html#subpath-exports
 // https://webpack.js.org/guides/package-exports/
import { EventManager } from 'modelui-core-runtime/src/event/Event'

describe('Imports', () => {
  it('libraries', () => {
    expect(EventManager).toBeTruthy()
  })
})
