import { mount } from '@vue/test-utils'
import VariableComponent from '../src/components/VariableComponent.vue'

describe('add', () => {
  it('test a computed', () => {
    const wrapper = mount(VariableComponent)
    expect(wrapper.vm.computedOnePlusOne).toBe(2)
  })
})

it('test a varariable after changing', () => {
  const wrapper = mount(VariableComponent)
  wrapper.vm.numberVariable = 1
  expect(wrapper.vm.numberVariable).toBe(1)
})

it('test a prop', () => {
  const wrapper = mount(VariableComponent, {
    props: {
      propNumber: 10,
    },
  })

  expect(wrapper.vm.propNumber).toBe(10)
})

it('test a prop after changing', async () => {
  const wrappers = mount(VariableComponent)
  // WARNING : await required
  await wrappers.setProps({ propNumber: 15 })
  expect(wrappers.vm.propNumber).toBe(15)
})

it('test if a variable has changed after being mutate in watch due to props changing', async () => {
  const wrapper = mount(VariableComponent)
  // WARNING : await required
  await wrapper.setProps({
    propNumber: 20,
  })
  expect(wrapper.vm.numberVariable).toBe(20)
})

