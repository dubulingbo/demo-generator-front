import Vue from 'vue'
import VueRouter from 'vue-router'
import ModelView from '../components/DemoModel.vue'
import ModelDetail from '../components/DemoModelDetail.vue'


Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/model/view'},
    {path: '/model/view', component: ModelView},
    {path: '/model/detail', component: ModelDetail},

]

const router = new VueRouter({
    routes
})

// router.beforeEach((to,from,next) => {
//     // to : 到哪里去
//     // from : 从哪里来
//     // next : 放行
//     // if(to.path === '/login') return next();
//     // let token = window.sessionStorage.getItem("token");
//     // if(!token) return next('/login');
//     next();
// })

export default router
