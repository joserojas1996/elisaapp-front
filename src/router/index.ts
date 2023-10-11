import { createRouter, createWebHistory } from "vue-router";


import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import Dashboard from "../pages/Dashboard/index.vue";
import Page2 from "../pages/Page2.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import Forgot from "../pages/Auth/ForgotPassword.vue";
import Restore from "../pages/Auth/RestorePassword.vue";
import Inventory from "../pages/Inventory/index.vue";
import Profile from "../pages/Profile/index.vue";
import Bitacora from "../pages/ActivityCenter/index.vue";
import Assignment from "../pages/Assignment/index.vue";
import Movement from "../pages/Movement/index.vue";
import CreatedOrUpdate from "../pages/Inventory/CreatedOrUpdate.vue";
import TermsAndConditions from "../pages/TermsAndConditions/index.vue";
import AuthRequired from "../services/AuthRequired";


const routes = [
  {
    path: "/",
    component: SideMenu,
    beforeEnter: AuthRequired,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/inventory",
        name: "inventory",
        component: Inventory,
      },
      {
        path: "/create-or-update",
        name: "create-or-update",
        component: CreatedOrUpdate,
      },
      {
        path: "/profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "/activity-center",
        name: "activity-center",
        component: Bitacora,
      },
      {
        path: "/assignment",
        name: "assignment",
        component: Assignment,
      },
      {
        path: "/movement",
        name: "movement",
        component: Movement,
      },
    ],
  },
  {
    path: "/auth/login",
    name: "login",
    component: Login,
  },
  {
    path: "/auth/register",
    name: "register",
    component: Register,
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: Forgot,
  },
  {
    path: "/password/reset",
    name: "restore-password",
    component: Restore,
  },
  {
    path: "/terms-and-conditions",
    name: "terms-and-conditions",
    component: TermsAndConditions,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

// router.beforeEach(async (to, from, next) => {

//   const isAuthenticated: any = sessionStorage.getItem('auth');
//   console.log(isAuthenticated)
//   next()
// })

export default router;
