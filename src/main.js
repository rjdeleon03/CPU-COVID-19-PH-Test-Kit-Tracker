import Vue from "vue";
import App from "./App.vue";
import VueFirestore from "vue-firestore";

import router from "./router";
import vuetify from "./plugins/vuetify";
import VueHtml2Canvas from 'vue-html2canvas';
import VueMeta from 'vue-meta'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "regenerator-runtime/runtime.js";

Vue.use(VueHtml2Canvas);

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

// var $ = require("jquery");

Vue.config.productionTip = false;
Vue.use(VueFirestore);

var SocialSharing = require("vue-social-sharing");
Vue.use(SocialSharing);

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount("#app");
