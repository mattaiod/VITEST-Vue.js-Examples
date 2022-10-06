import { mount } from '@vue/test-utils'
import ProvidingComponent from '../src/components/ProvidingComponent.vue'
import { AGE_SYMBOL } from './../src/controllers/symbol'

it('provide', () => {
  const wrapper = mount(ProvidingComponent, {
    global: {
      provide: {
        [AGE_SYMBOL]: 10,
      },
    },
  })
  expect(wrapper.vm.injectedValue).toBe(10)
})

