<template lang="pug">
.subjects
	form(@submit.prevent="submit($event)").new_subject.dg.gg-1
		.teacher(v-for="t in teachers" @click="addSubTeacher($event)").btn.btn-outline-success
			.teacher__initials {{Object.values(t).splice(0,3).join(" ")}}
		input(name="subject" placeholder="название предмета")
		input(name="subject_teacher" placeholder="преподаватель" @change="inputSubTeacher($event)")
		p преподаватели по данному предмету:
		.subject_teachers {{subject_teachers_str}}
		.err.border.border-danger(v-show="err")
		button(type="submit").submit.new_subject__submit.btn.btn-success.wmin добавить
	.subjects_list.dg.gg-1.jss.mv-1
		.btn.border-primary.border.jss предметы:
		subject(v-for="sub in subjects" :sub="sub" :key="sub.id")
</template>
<script>
	import {mapActions,mapGetters,mapMutations} from "vuex"
	import axios from 'axios'
	import subject from './subject.vue'
	import 'jquery'
	export default {
		data(){
			return{
				err: false,
				subject_teachers: new Set(),
				subject_teachers_str:""
			}
		},
		components:{
			subject
		},
		computed:{
			...mapGetters(['teachers','subjects']),
		},
		methods:{

			submit(e){
				let sub = $('[name="subject"]')
				let _this=this
				if(sub.val()&&this.subject_teachers_str){

					axios.post('/newSubject',{sub: sub.val(),lecturers: this.subject_teachers_str}).then((d)=>{
						if(d.data.type==='error'){
							_this.err=true
							$(_this.$el).find('.err').html(d.data.message)
							throw new Error(d.data.message)
						}else{
							_this.err=false
							$(_this.$el).find('.err').html("")
						}
						
					}).catch((er)=>{
						console.log(er)
					})
				}
				sub.val("")
			
			},
			addSubTeacher(e){
				this.subject_teachers.add($(e.target).text())
				this.subject_teachers_str=[...this.subject_teachers].join(", ")
			},
			inputSubTeacher(e){
				e.target.value?//non empty input
					e.target.value.match(/^\D+\s\D+\s\D+$/)?//validation
						axios.post('/teachers',{teacher: e.target.value})//does this teacher exist in DB
						.then((d)=>{
							if(d.data.length){//add to the Set of teachers
								this.subject_teachers.add(e.target.value)
								this.subject_teachers_str=[...this.subject_teachers].join(", ")
								this.err=false
								$(this.$el).find('.err').html("")
							}else{
								this.err=true
								$(this.$el).find('.err').html("преподаватель не найден")
								throw new Error("преподаватель не найден")
							}
						})
					:null
				:null
				$(e.target).val("")//clear input
			}

		}
	}
</script>
<style lang="sass" scoped>
.teacher
	justify-self: start
</style>