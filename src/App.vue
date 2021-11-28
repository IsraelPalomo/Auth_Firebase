<template>
	<router-view />
</template>

<script>
import { mapActions } from "vuex";
export default {
	methods: {
		...mapActions(["cargarFireBase"]),
	},
	created() {
		this.cargarFireBase();
	},
};
</script>
<style lang="scss">
a {
	color: #000;
	text-decoration: none;
}
body {
	overflow-x: hidden;

	@keyframes gradient-animation {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
}
</style>
