<template lang="pug">
.subject
	.subject__header.dg.gafc(@click="show=!show")
		.subject_name.border-bottom.border-right.border-primary {{sub.subject}}
		.subject_lecturers.border-bottom.border-primary {{sub.lecturers}}
	.subject__redactPanel.dg.gg-1(v-show="show")
		input(name="subject_teacher" placeholder="добавить преподавателя" v-model="current_input_lecturer")
		.btn.btn-primary(@click="inputSubTeacher") добавить
		.err
		| все преподаватели: 
		.df.jcfs.fxwr.jcs.all_lecturers
			.lecturer.btn.border.border-primary.m-1(v-for="l in teachers" @click="lecturerClick($event)") {{Object.values(l).slice(0,3).join(" ")}}
</template>
<script>
	import {mapActions,mapGetters,mapMutations} from "vuex"
	import axios from 'axios'
	import 'jquery'
	export default {
		data(){
			return{
				show: false,
				subject_teachers: null,
				subject_teachers_str:"",
				current_input_lecturer:""
			}
		},
		props: ['sub'],
		computed:{
			...mapGetters(['teachers','subjects']),
			getSub(){
				return this.sub
			}
		},
		methods:{
			inputSubTeacher(){
				let val = $(this.$el).find('input').val()
				val?//non empty input
					val.match(/^\D+\s\D+\s\D+$/)?//validation
						axios.post('/teachers',{teacher: val})//does this teacher exist in DB
						.then((d)=>{
							console.log(d.data)
							if(d.data.length){//add to the Set of teachers
								this.subject_teachers.add(val)
								this.subject_teachers_str=[...this.subject_teachers].join(", ")
								this.err=false
								$(this.$el).find('.err').html("")
								return axios.post('/subjectRedact',{teachers: this.subject_teachers_str,subID: this.getSub.id})
							}else{
								this.err=true
								$(this.$el).find('.err').html("преподаватель не найден")
								throw new Error("преподаватель не найден")
							}
						})
					:null
				:null
				$(this.$el).find('input').val("")//clear input
			},
			lecturerClick(e){
				this.current_input_lecturer = $(e.target).text()
			}
		},
		created(){
			this.subject_teachers= new Set([this.getSub.lecturers.split(", ")])
			this.subject_teachers_str=[...this.subject_teachers].join(", ")
		}
	}
</script>
<style lang="sass" scoped>
.subject__header.dg.gafc
	grid-template-columns: 1fr 1fr
</style>