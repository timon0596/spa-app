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
  state: {
  	teachers: [],
  	subjects: []
  },
  mutations: {
  	teachers_initial(state,teachers){
  		state.teachers=teachers
  	},
  	subjects_initial(state,teachers){
  		state.subjects=teachers
  	},
  },
  actions: {
  	
  },
  getters: {
  	teachers(state){
  		return state.teachers
  	},
  	subjects(state){
  		return state.subjects
  	}
  }	
})

new Vue({
	el: '.app',
	render: h=>h(main),
	store,
	methods:{
		...mapMutations(['teachers_initial','subjects_initial']),
	},
	mounted(){
		axios.get('/teachers').then((d)=>{
			this.teachers_initial(d.data)
		})
		axios.get('/subjects').then((d)=>{
			this.subjects_initial(d.data)
		})
	}
})