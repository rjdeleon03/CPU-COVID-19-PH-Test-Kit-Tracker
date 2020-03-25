import Vue from "vue";
import App from "./App.vue";
import VueFirestore from "vue-firestore";

import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(VueFirestore);

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount("#app");
