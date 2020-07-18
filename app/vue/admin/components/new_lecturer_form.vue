<template lang="pug">
.new-lecturer-form__wrapper
	.card
		.card-header
			| new lecturer
		.card-body
			form.new-lecturer-form
				input.form-control(type='text' placeholder='фамилия' name='surname')
				input.form-control(type='text' placeholder='имя' name='name')
				input.form-control(type='text' placeholder='отчество' name='lastName')
		.card-footer
			.btn.btn-primary(@click='submitNewLecturer') add
</template>
<script>
	import axios from 'axios'
	export default {
		data(){
			return {
				wrongVal: 0
			}
		},
		methods:{
			submitNewLecturer(){
				const $form = $('form.new-lecturer-form')
				$form.children().each((i,el)=>{
					let val = $(el).val()
					val = val.replace(/[0-9]+/g,'').replace(/[\s]+/g,' ')
					if(!val){
						this.wrongVal++
					}
					
				})
				if(this.wrongVal>0){
					this.wrongVal=0
					return
				}
				const bodyFormData = new FormData($form[0])
				// axios({
				// 	    method: 'post',
				// 	    url: '/lecturers',
				// 	    data: bodyFormData,
				// 	    headers: {'Content-Type': 'multipart/form-data' }
				// 	    }).then((res)=>{
				// 	    	console.log(res)

				// 	    })
				$form.children().val('')
				
			}
		}
	}
</script>
<style lang="sass">
</style>
