<template lang="pug">
.admin_panel.mh-1.dg.gg-2
	NewLecturerForm
	LecturersList
</template>
<script>
	import NewLecturerForm from './components/new_lecturer_form.vue'
	import LecturersList from './components/lecturers_list.vue'
	export default {
		components:{
			NewLecturerForm,
			LecturersList
		}
	}
</script>
<style lang="sass" scoped>

</style>