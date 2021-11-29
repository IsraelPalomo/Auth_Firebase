import { createStore } from "vuex";
import router from "../router";

export default createStore({
	state: {
		tarea: {
			id: "",
			nombre: "",
			lenguaje: "",
			numero: "",
			importancia: "",
		},
		tareas: [],
		user: null,
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		pushTarea(state, payload) {
			state.tareas.push(payload);
		},
		deleteTarea(state, payload) {
			state.tareas = state.tareas.filter((item) => item.id !== payload);
		},
		setTarea(state, payload) {
			state.tarea = state.tareas.find((item) => item.id === payload);
		},
		updateTarea(state, payload) {
			state.tareas = state.tareas.map((item) => (item.id === payload.id ? payload : item));
		},
		cargar(state, payload) {
			state.tareas = payload;
		},
	},
	actions: {
		async ingresoUsuario({ commit }, user) {
			try {
				const res = await fetch(
					"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvid0QL_LSaZhZdxoDCVYWV1CoGA1ERF0",
					{
						method: "POST",
						body: JSON.stringify({
							email: user.email,
							password: user.password,
							returnSecureToken: true,
						}),
					}
				);
				const data = await res.json();
				console.log(data);
				if (user.error) {
					return console.log("usuario error");
				}
				commit("setUser", data);
				router.push("/");
			} catch (error) {
				console.log(error);
			}
		},
		async registroUsuario({ commit }, user) {
			try {
				const res = await fetch(
					"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvid0QL_LSaZhZdxoDCVYWV1CoGA1ERF0",
					{
						method: "POST",
						body: JSON.stringify({
							email: user.email,
							password: user.password,
							returnSecureToken: true,
						}),
					}
				);
				const data = await res.json();
				console.log(data);
				if (data.error) {
					console.log(data.error);
					return;
				}
				commit("setUser", data);
				router.push("/");
			} catch (error) {
				console.log(error);
			}
		},
		async pushTareas({ commit, state }, tarea) {
			try {
				const res = await fetch(
					`https://fir-2-5b246-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(tarea),
					}
				);
				const data = await res.json();
				console.log(data);
			} catch (error) {
				console.log(error);
			}
			commit("pushTarea", tarea);
		},
		async deleteTareas({ commit, state }, id) {
			try {
				const res = await fetch(
					`https://fir-2-5b246-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,
					{
						method: "DELETE",
					}
				);
				commit("deleteTarea", id);
			} catch (error) {
				console.log(error);
			}
		},
		setTareas({ commit }, id) {
			commit("setTarea", id);
		},
		async updateTareas({ commit, state }, tarea) {
			try {
				const res = await fetch(
					`https://fir-2-5b246-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,
					{
						method: "PATCH",
						body: JSON.stringify(tarea),
					}
				);
				commit("updateTarea", tarea);
				router.push("/");
			} catch (error) {
				console.log(error);
			}
		},
		async cargarFireBase({ commit, state }) {
			try {
				const res = await fetch(
					`https://fir-2-5b246-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`
				);
				const data = await res.json();
				const arrayDatos = [];
				for (const item in data) {
					arrayDatos.push(data[item]);
				}
				commit("cargar", arrayDatos);
			} catch (error) {
				console.log(error);
			}
		},
	},
	modules: {},
});
