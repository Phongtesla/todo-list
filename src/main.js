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

// render page title
const DEFAULT_TITLE = "Task List";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
