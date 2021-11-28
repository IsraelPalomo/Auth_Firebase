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
	},
	mutations: {
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
		async pushTareas({ commit }, tarea) {
			try {
				const res = await fetch(
					`https://fir-2-5b246-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
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
		async deleteTareas({ commit }, id) {
			try {
				const res = await fetch(
					`https://fir-2-5b246-default-rtdb.firebaseio.com/tareas/${id}.json`,
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
		async updateTareas({ commit }, tarea) {
			try {
				const res = await fetch(
					`https://fir-2-5b246-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
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
		async cargarFireBase({ commit }) {
			try {
				const res = await fetch("https://fir-2-5b246-default-rtdb.firebaseio.com/tareas.json");
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