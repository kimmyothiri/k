import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Checkout from "../views/Checkout.vue"
import Orders from "../views/Orders.vue"

const routes = [
  { path: "/", redirect: "/login" },

  { path: "/login", component: Login },

  { path: "/dashboard", component: Dashboard },

  { path: "/checkout", component: Checkout },

  { path: "/orders", component: Orders }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router