<template>
	<section class="registro">
		<h1>Ingreso de Usuario</h1>
		<form @submit.prevent="procesarFormulario">
			<input type="email" placeholder="email" class="form-control m-2" v-model.trim="email" />
			<input type="password" placeholder="password" class="form-control m-2" v-model.trim="pass1" />

			<button type="submit" class="btn btn-primary" :disabled="bloquear">Ingresar</button>
		</form>
	</section>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return {
			email: "",
			pass1: "",
		};
	},
	methods: {
		...mapActions(["ingresoUsuario"]),
	},
	computed: {
		bloquear() {
			if (!this.email.includes("@")) {
				return true;
			}
			if (this.pass1.length > 5) {
				return false;
			}
			return true;
		},
		procesarFormulario() {
			this.ingresoUsuario({ email: this.email, password: this.pass1 });
			this.email = "";
			this.pass1 = "";
		},
	},
};
</script>

<style lang="scss" scoped>
.registro {
	text-align: center;
	width: 30rem;
	max-width: 50rem;
	margin: 0 auto;
	background-color: #323232;
	padding: 2rem;
	margin-top: 10rem;
	border-radius: 15px;

	h1 {
		color: white;
		margin-bottom: 3rem;
	}
	form {
		input {
			max-width: 15rem;
			width: 60%;
			margin: 1rem auto 0 auto;
			display: inline-block;
		}
		button {
			display: block;
			margin: 3rem auto 0 auto;
		}
	}
}
</style>
