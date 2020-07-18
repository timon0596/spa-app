import Vue from 'vue'
import Vuex from 'vuex'
import vuerouter from 'vue-router'
import main from './vue/main.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './test.sass'
import './test2.sass'

import {mapActions,mapGetters,mapMutations} from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
  state: () => ({
      lecturers: {}
  }),
  mutations: {
  	lecturers_initial(state,lecturers){
  		state.lecturers=lecturers
  	},
  },
  actions: {
  	fetch_lecturers ({ commit }, id) {
            // return the Promise via `store.dispatch()` so that we know
            // when the data has been fetched
            return axios.get('/lecturers').then(res => {
              commit('lecturers_initial', res.data)
            })
          }
  },
  getters: {
  	get_lecturers(state){
  		return state.lecturers
  	},
  }	
})

new Vue({
	el: '.app',
	render: h=>h(main),
	store,
	methods:{
		...mapMutations(['lecturers_initial']),
    ...mapActions(['fetch_lecturers']),
    ...mapGetters(['get_lecturers']),
	},
	async mounted(){
		await this.fetch_lecturers()

	}
})