<template lang="pug">
.admin_panel.mh-1.dg.gg-2
	teacher
	subjects
</template>
<script>
	import teacher from "./admin_panel_components/new_teacher.vue"
	import subjects from "./admin_panel_components/subjects.vue"
	export default {

		components:{
			teacher,
			subjects
		}
	}
</script>
<style lang="sass" scoped>

</style>