import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import VuetifyLogo from '@/components/VuetifyLogo.vue'

let wrapper

describe('VuetifyLogo.vue', () => {
  Vue.use(Vuetify)
  beforeEach(() => {
   const vuetify = new Vuetify()
   const localVue = createLocalVue()
   wrapper = shallowMount(VuetifyLogo,{
    localVue
   })
  })

  it('renders exact props when passed', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
