import Vue from "vue";
import App from "./App.vue";
import VueFirestore from "vue-firestore";
import VuePapaParse from "vue-papa-parse";
import VueGoogleCharts from "vue-google-charts";

import router from "./router";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
Vue.use(VueFirestore);
Vue.use(VuePapaParse);
Vue.use(VueGoogleCharts);

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
}).$mount("#app");
