import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard'
import ResetPassword from './components/ResetPassword'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/resetPassword/:credential',
      name: 'resetPassword',
      component: ResetPassword,
      props: true
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
  ]
})
