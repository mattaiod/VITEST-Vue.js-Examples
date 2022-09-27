import { mount } from '@vue/test-utils'
import Playground from '../src/components/Playground.vue'
import { getName } from './../src/controllers/playground'

// -> vitest:
//   - https://vitest.dev/api/
//   - https://testdriven.io/blog/vue-unit-testing/
// -> vue-test-utils:
//   - https://vue-test-utils.vuejs.org/api/
//   - https://lmiller1990.github.io/vue-testing-handbook/

// pnpm test to run this test

describe('Some tests and mocking', () => {
  it('mocks a function imported from a file', () => {
    const mockFn = vi.fn(getName).mockReturnValue('foo')
    expect(mockFn()).toBe('foo')
  })

  it('mocks a function imported from a file with a mock', () => {
    vi.mock('./../src/controllers/playground', () => ({
      getName: vi.fn().mockReturnValue('mocked'),
    }))
    expect(getName()).toBe('mocked')
  })

  it('mounts a component', () => {
    const wrapper = mount(Playground)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('mocks a function in a component', () => {
    const wrapper = mount(Playground)
    const mockFn = vi.fn(wrapper.vm.fnEmpty).mockReturnValue('foo')
    expect(mockFn()).toBe('foo')
  })

  it('mocks a function in a component with a mock', () => {
    vi.mock('./../src/controllers/playground', () => ({
      getName: vi.fn().mockReturnValue('mocked'),
    }))
    const wrapper = mount(Playground)
    expect(wrapper.vm.getNameToMock()).toBe('mocked')
  })

  it('mocks a function in a component with a mock', () => {
    vi.mock('./../src/controllers/user', () => ({
      getName: vi.fn().mockReturnValue('mocked'),
    }))
    const wrapper = mount(Playground)
    expect(wrapper.vm.fnReturningAnImportedFunction()).toBe('mocked')
  })

  it('test a computed', () => {
    const wrapper = mount(Playground)
    expect(wrapper.vm.computedOnePlusOne).toBe(2)
  })

  it('test a varariable after changing', () => {
    const wrapper = mount(Playground)
    wrapper.vm.varToWatch = 4
    expect(wrapper.vm.varToWatch).toBe(4)
  })

  // mount the component Playground with props prop = "triggered"
  it('test a prop', () => {
    const wrapper = mount(Playground, {
      props: {
        propNumber: 10,
      },
    })

    expect(wrapper.vm.propNumber).toBe(10)
  })

  it('test a prop after changing', async () => {
    const wrappers = mount(Playground)
    await wrappers.setProps({ propNumber: 10 })
    expect(wrappers.vm.propNumber).toBe(10)
  })

  it('know if a function was called', () => {
    const wrapper = mount(Playground)
    const spy = vi.spyOn(wrapper.vm, 'fnReturningAnImportedFunction')
    wrapper.vm.fnReturningAnImportedFunction()
    expect(spy).toHaveBeenCalled()
  })

  it('test if a variable has changed after being mutate in watch due to props changing', async () => {
    const wrapper = mount(Playground)
    wrapper.setProps({
      propNumber: 10,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.varSimple).toBe(10)
  })

  it('test a watch due to var changing', async () => {
    const wrapper = mount(Playground)
    wrapper.vm.varToWatch = 15
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.varSimple).toBe(15)
  })

  it('test the value of a variable after mutating', async () => {
    const wrapper = mount(Playground)
    wrapper.vm.varSimple = 15
    expect(wrapper.vm.varSimple).toBe(15)
  })

  it('test if a emit was emited', async () => {
    const wrapper = mount(Playground)
    wrapper.vm.$emit('emitValue')
    expect(wrapper.emitted().emitValue).toBeTruthy()
  })
})
