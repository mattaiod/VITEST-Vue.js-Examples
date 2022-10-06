import { mount } from '@vue/test-utils'
import SpyingComponent from '../src/components/SpyingComponent.vue'
import * as moduleToSpy from './../src/controllers/functions'

it('should call fnInside', () => {
  const wrapper = mount(SpyingComponent)
  const spy = vi.spyOn(moduleToSpy, 'fnInside')
  wrapper.vm.fnOutside()
  expect(spy).toHaveBeenCalled()
})
