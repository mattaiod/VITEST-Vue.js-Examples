import { mount } from '@vue/test-utils'
import { fnReturn0 } from '../src/controllers/functions'
import MockingComponent from '../src/components/MockingComponent.vue'

describe('MOCKING', () => {
  it('mocks a function imported from a file', () => {
    const fnMocked = vi.fn(fnReturn0).mockReturnValue(1)
    expect(fnMocked()).toBe(1)
  })

  it('mocks a function imported in a vue component', () => {
    vi.mock('./../src/controllers/functions', () => ({
      fnReturn0: vi.fn().mockReturnValue(1),
    }))
    const wrapper = mount(MockingComponent)
    expect(wrapper.vm.instancedWith0).toBe(1)
  })
})
