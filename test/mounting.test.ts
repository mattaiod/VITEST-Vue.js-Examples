import { mount } from '@vue/test-utils'
import MountingComponent from '../src/components/MountingComponent.vue'

// WARNING: Vue warning don't make failing the test
describe('MOUNTING', () => {
  // Vitest don't care about props required
  it('mounts a component', () => {
    const wrapper = mount(MountingComponent)
    expect(wrapper.vm).toBeTruthy()
  })
  it('mounts a component with props', () => {
    // Vitest don't care about the type of props
    const wrapper = mount(MountingComponent, {
      props: {
        propNumber: '10',
      },
    })
    // 2 posible ways to test the value of a prop
    expect(wrapper.vm.propNumber).toBe('10')
    expect(wrapper.vm.props.propNumber).toBe('10')
  })
})
