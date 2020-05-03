import Vue from "vue";
import App from "./App.vue";
import VueFirestore from "vue-firestore";
import VuePapaParse from 'vue-papa-parse'

import router from "./router";
import vuetify from "./plugins/vuetify";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;
Vue.use(VueFirestore);
Vue.use(VuePapaParse)

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount("#app");
