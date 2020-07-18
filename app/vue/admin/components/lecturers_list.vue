<template lang="pug">
.my-3.p-3.bg-white.rounded.shadow-sm
	h6.border-bottom.border-gray.pb-2.mb-0 список преподавателей
	.media.text-muted.pt-3(v-for="item in items" :key="item.id")
		svg.bd-placeholder-img.mr-2.rounded(width='32' height='32' xmlns='http://www.w3.org/2000/svg' preserveaspectratio='xMidYMid slice' focusable='false' role='img' aria-label='Placeholder: 32x32')
			title Placeholder
			rect(width='100%' height='100%' fill='#007bff')
			text(x='50%' y='50%' fill='#007bff' dy='.3em') 32x32
		.media-body.pb-3.mb-0.small.lh-125.border-bottom.border-gray
			.d-flex.justify-content-between.align-items-center.w-100
				strong.text-gray-dark {{`${item.name} ${item.surname}`}}
				a(href='#') Follow
			span.d-block @username
	small.d-block.text-right.mt-3
		a(href='#' @click="getAllLecturers") All suggestions
</template>
<script>
	import axios from 'axios'
	import {mapActions,mapGetters,mapMutations} from "vuex"
	export default {
		data(){
			return{
			}
		},
		methods: {
			...mapGetters(['get_lecturers']),
			getAllLecturers(){
				axios.get('/lecturers').then((res)=>{
				})
			}
		},
		computed:{
			items(){
				return this.get_lecturers()
			}
		}
	}
</script>
<style lang="sass" scoped>

</style>