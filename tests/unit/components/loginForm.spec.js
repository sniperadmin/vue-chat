import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import LoginForm from '@/components/LoginForm.vue'

let wrapper

describe('Login Form', () => {
    Vue.use(Vuetify)
    beforeEach(() => {
        const vuetify = new Vuetify()
        const locaVue = createLocalVue()
        wrapper = shallowMount(LoginForm, {
            localVue
        })
    })

    it('should be a vue component', () => {
        expext(wrapper.vm).toBeTruthy()
    })
})

