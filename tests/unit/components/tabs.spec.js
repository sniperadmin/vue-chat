import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Tabs from '@/components/Tabs.vue'

let wrapper

describe('Tabs.vue', () => {
	beforeEach(() => {
		Vue.use(Vuetify)
        const vuetify = new Vuetify()
        const localVue = createLocalVue()
        wrapper = shallowMount(Tabs, {
            localVue
        })
    })

	it('should be a vue component', () => {
 		expect(wrapper.vm).toBeTruthy()
	})
})

