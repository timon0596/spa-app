<template lang="pug">
.mainpug
	p.colored admin panel
	admin
</template>
<script>
	import admin from "./admin.vue"
	export default {
		data(){
			return {

			}
		},
		components: {
			admin
		}
	}
</script>
<style lang="sass">
.colored
	color: #80ced6
</style>