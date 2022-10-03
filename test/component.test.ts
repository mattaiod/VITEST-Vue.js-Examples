import { config, mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import Playground from '../src/components/Playground.vue'
import Provider from '../src/components/Provider.vue'
import Vue2 from '../src/components/Vue2.vue'
import { AGE, getName } from './../src/controllers/playground'
import { f1 } from './../src/controllers/playground2'

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

  // it('mocks a function in a component with a mock', () => {
  //   vi.mock('./../src/controllers/user', () => ({
  //     getName: vi.fn().mockReturnValue('mocked'),
  //   }))
  //   const wrapper = mount(Playground)
  //   expect(wrapper.vm.fnReturningAnImportedFunction()).toBe('mocked')
  // })

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

  // mount component

  it('mount a component with plugins mocked', async () => {
    // vi.mock('./../src/controllers/playground', () => ({
    //   AGE: 10,
    // }))
    const wrapper = mount(Provider, {
    })
    expect(wrapper.exists()).toBeTruthy()
  })

  // it('know if a function was called', () => {
  //   const wrapper = mount(Playground)
  //   const spy = vi.spyOn(wrapper.vm, 'fnReturningAnImportedFunction')
  //   wrapper.vm.fnReturningAnImportedFunction()
  //   expect(spy).toHaveBeenCalled()
  // })

  // know if the function fn1 is called when the function getName is called
  // it('know if a function was called', async () => {
  //   const fn1 = vi.fn()
  //   getName()
  //   expect(fn1).toHaveBeenCalled()
  // })

  // it('know if a function was called when another function is called', async () => {
  //   const wrapper = mount(Playground)
  //   const spy = vi.spyOn(wrapper.vm, 'fnEmpty')
  //   wrapper.vm.fnWithFnInside()
  //   await wrapper.vm.$nextTick()
  //   expect(spy).toHaveBeenCalled()
  // })

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

  // This a a FRAUDE because you can use a emit not existing
  // it('test if a emit was emited', async () => {
  //   const wrapper = mount(Playground)
  //   // wrapper.vm.$emit('emitValueeeee')
  //   expect(wrapper.emitted()).toHaveProperty('emitValue')
  // })
})

describe('providing / inject', () => {
  it('provide', () => {
    const wrapper = mount(Playground, {
      global: {
        provide: {
          name: 'john',
        },
      },
    })
    expect(wrapper.vm.state.name).toBe('john')
  })

  // test if the component Vu2 emit a event

  it('emitted in option api', () => {
    const wrapper = mount(Vue2)

    expect(wrapper.emitted()).toHaveProperty('greet')
    expect(wrapper.emitted().greet).toHaveLength(2)
    expect(wrapper.emitted().greet[0]).toEqual(['hello'])
    expect(wrapper.emitted().greet[1]).toEqual(['goodbye'])
  })

  // it('test symbol affectation', () => {
  //   const wrapper = mount(Vue2)
  //   expect(wrapper.vm.$options.data()).toBe('age')
  // })

// it('provide symbol', () => {
//   const wrapper = mount(Playground, {
//     global: {
//       provide: {
//         [SURNAME_SYMBOL]: 'john',
//       },
//     },
//   })
//   expect(wrapper.vm.state.surname).toBe('john')
// })
})

// PB NOT RESOLVED
// - vitest crash when in a file there is a variable with value a symbol imported
// - can't know if a function has been called inside a function
// - can't mock a function inside a function in a component if these 2 function are in the same file
// - can't mock a useI18n() in a component
