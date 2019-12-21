import { shallowMount } from '@vue/test-utils'
import VuetifyLogo from '@/components/VuetifyLogo.vue'

describe('VuetifyLogo.vue', () => {
  it('renders exact props when passed', () => {
    const height = 50
    const wrapper = shallowMount(VuetifyLogo, {
      propsData: { height }
    })
    expect(wrapper.props().height).toBe(height)
  })
})
