import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("@/components/home/Home");
const UpdateTestingCenters = () => import("@/components/update-testing-centers/UpdateTestingCenters");
const UpdateTestingRankings = () => import("@/components/update-testing-rankings/UpdateTestingRankings");
const UpdateStats = () => import("@/components/update-stats/UpdateStats");
const EditTestingCenter = () => import("@/components/edit-testing-center/EditTestingCenter");

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
      path: "/testing-data/update",
      name: "UpdateTestingCenters",
      component: UpdateTestingCenters
    },
    {
      path: "/testing-centers/edit/:testing_center_id",
      name: "EditTestingCenter",
      component: EditTestingCenter
    },
    {
      path: "/testing-rankings/update",
      name: "UpdateTestingRankings",
      component: UpdateTestingRankings
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
