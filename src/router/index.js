import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			ruthProtegee: true,
		},
	},

	{
		path: "/editar/:id",
		name: "Editar",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/Editar.vue"),
		meta: {
			ruthProtegee: true,
		},
	},
	{
		path: "/registro",
		name: "Registro",
		component: () => import("../views/Registro.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	//? Funcion para hacer las rutas protegidas
	if (to.meta.ruthProtegee) {
		if (store.getters.usuarioAutenticado) {
			next();
		} else {
			next("/login");
		}
	} else {
		next();
	}
});

export default router;
