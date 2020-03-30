import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/login/Login";
import Home from "@/components/home/Home";
import NewEntry from "@/components/new-entry/NewEntry";
import UpdateStats from "@/components/update-stats/UpdateStats";

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
      path: "/kits/new",
      name: "NewEntry",
      component: NewEntry
    },
    {
      path: "/kits/edit/:kit_id",
      name: "EditEntry",
      component: NewEntry,
      props: true
    },
    {
      path: "/stats/update",
      name: "UpdateStats",
      component: UpdateStats
    },
    {
      path: "*",
      redirect: "/"
    },
  ]
});

export default router;
