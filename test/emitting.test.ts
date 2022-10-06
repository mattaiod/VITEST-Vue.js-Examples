import { mount } from '@vue/test-utils'
import EmitingComponent from '../src/components/EmitingComponent.vue'

describe('EMITING', () => {
  it('test if a emit exists', () => {
    const wrapper = mount(EmitingComponent)
    expect(wrapper.emitted()).toHaveProperty('basicEmit')
  })

  it('test some emitted', () => {
    const wrapper = mount(EmitingComponent)

    expect(wrapper.emitted()).toHaveProperty('basicEmit')
    expect(wrapper.emitted().basicEmit[0]).toEqual(['payload'])
    expect(wrapper.emitted().basicEmit[1]).toEqual(['payload2'])
  })
})

