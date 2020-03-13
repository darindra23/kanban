import Vue from "vue";
import App from "./App.vue";
import GSignInButton from "vue-google-signin-button";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(GSignInButton);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  render: Element => Element(App)
}).$mount("#app");
