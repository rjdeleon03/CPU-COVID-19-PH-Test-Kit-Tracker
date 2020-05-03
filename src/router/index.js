import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("@/components/home/Home");
const UpdateTestingCenters = () => import("@/components/update-testing-centers/UpdateTestingCenters");
const UpdateStats = () => import("@/components/update-stats/UpdateStats");

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    // {
    //   path: "/kits/new",
    //   name: "NewEntry",
    //   component: NewEntry
    // },
    // {
    //   path: "/kits/edit/:kit_id",
    //   name: "EditEntry",
    //   component: NewEntry,
    //   props: true
    // },
    {
      path: "/testing-centers/update",
      name: "UpdateTestingCenters",
      component: UpdateTestingCenters
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
