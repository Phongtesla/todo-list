import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// vue router
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);
export const router = new VueRouter({
  mode: "history",
  routes,
});

// vuex store
import { store } from "./store";

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
