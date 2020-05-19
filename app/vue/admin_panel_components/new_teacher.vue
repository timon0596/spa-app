<template lang="pug">
form.new_teacher
	p новый преподаватель
	input(name="first_name" placeholder="имя")
	input(name="second_name" placeholder="фамилия")
	input(name="patronymic" placeholder="отчество")
	.submit.new_teacher__submit.btn.btn-success.wmin(@click="submitTeacher") добавить
</template>
<script>
	import axios from 'axios'
	import 'jquery'
	export default {
		methods:{
			submitTeacher(){
				let fd = new FormData($('.new_teacher')[0])
				const headers = {
				  'Content-Type': 'multipart/form-data'
				}
				console.log(fd)
				if($('input[name="first_name"]').val()){
					axios.post('/newTeacher',fd,{headers}).then((d)=>{
						console.log(d.data)
					})
				}
				$('form.new_teacher input').val("")
			},
		}
	}
</script>
<style lang="sass" scoped>
.new_teacher
	display: grid
	grid-gap: 10px
	width: 50%
</style>