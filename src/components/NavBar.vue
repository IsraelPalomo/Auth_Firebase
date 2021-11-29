<template>
	<div class="navbar navbar-dark bg-dark p-2">
		<router-link to="/" class="navbar-brand">Formularios</router-link>
		<div class="d-flex">
			<router-link to="/" class="btn btn-dark" v-if="usuarioAutenticado">Tareas</router-link>
			<router-link to="/registro" class="btn btn-dark" v-if="!usuarioAutenticado"
				>Regitro</router-link
			>
			<router-link to="/login" class="btn btn-dark" v-if="!usuarioAutenticado">Login</router-link>
			<button v-if="usuarioAutenticado" class="btn btn-dark">Cerrar Sesion</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["usuarioAutenticado"]),
	},
};
</script>

<style></style>
