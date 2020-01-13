import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { firebase } from '../fb';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeRouteEnter: (to: any, from: any, next: any) => {
      next((vm: any) => {
        firebase.auth().onAuthStateChanged((user: any) => {
          if (user) {
            // eslint-disable-next-line callback-return
            next()
          } else {
            vm.$router.push('/login')
          }
        })
      })
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
