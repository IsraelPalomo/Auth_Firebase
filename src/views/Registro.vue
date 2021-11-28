<template>
	<section class="registro">
		<h1>Registro de Usuario</h1>
		<form>
			<input type="email" placeholder="email" class="form-control m-2" v-model.trim="email" />
			<input type="password" placeholder="password" class="form-control m-2" v-model.trim="pass1" />
			<input type="password" placeholder="password" class="form-control m-2" v-model.trim="pass2" />
			<button type="submit" class="btn btn-primary" :disabled="bloquear">Registrar</button>
		</form>
	</section>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			pass1: "",
			pass2: "",
		};
	},
	computed: {
		bloquear() {
			if (!this.email.includes("@")) {
				return true;
			}
			if (this.pass1.length > 5 && this.pass1 === this.pass2) {
				return false;
			}
			return true;
		},
	},
};
</script>

<style lang="scss" scoped>
.registro {
	text-align: center;
	width: 50%;
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
	input {
		max-width: 15rem;
		margin: 1rem auto 0 auto;
		display: inline-block;
	}
	button {
		display: block;
		margin: 3rem auto 0 auto;
	}
}
</style>
