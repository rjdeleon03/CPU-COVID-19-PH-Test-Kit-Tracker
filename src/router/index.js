import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/login/Login";
import Home from "@/components/home/Home";
import NewEntry from "@/components/new-entry/NewEntry";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/new",
      name: "NewEntry",
      component: NewEntry
    }
  ]
});

export default router;
