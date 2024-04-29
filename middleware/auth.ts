import { RouteLocationNormalized } from "vue-router";
import { useCookies } from "vue3-cookies";

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if(process.client) {
        const { $store } = useNuxtApp()
        const { cookies } = useCookies()
        const isLogged: string = cookies.get('token')
        if(!isLogged) $store.dispatch("A_CHANGE_STATE_TOKEN", null)
        if (
            !isLogged &&
            to.path !== "/login" &&
            to.path !== "/registration"
        ) {
            return navigateTo("/login");
        } else if (
            isLogged &&
            (to.path === "/login" || to.path === "/registration")
        ) {
            return navigateTo("/dashboard");
        }
    }




  },
);
