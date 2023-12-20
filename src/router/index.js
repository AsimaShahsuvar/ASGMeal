import {createRouter, createWebHistory} from 'vue-router'
// import FlightEdit from '@/pages/flights/Edit.vue'
// import FlightCreate from '@/pages/flights/Create.vue'

const routes = [
    {
        path: '/login',
        name: 'auth',
        component: () => import(/* webpackChunkName: "Login" */ '@/pages/auth/Login.vue'),
    },
    {
        path: '/checkin',
        name: 'checkin',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/checkin/Index.vue'),
    },
    {
        path: '/dispatcher',
        name: 'dispatcher',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/dispatcher/Index.vue'),
    },
    {
        path: '/supervisor',
        name: 'supervisor',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/supervisor/Index.vue'),
    },
    {
        path: '/cleaning',
        name: 'cleaning',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/Cleaning/Index.vue'),
    },
    {
        path: '/pushback',
        name: 'pushback',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/PushBack/Index.vue'),
    },
    {
        path: '/addsupervisor',
        name: 'addsupervisor',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/AddSupervisor/Index.vue'),
    },
    {
        path: '/company',
        name: 'company',
        component: () => import(/* webpackChunkName: "Company.vue" */ '@/pages/Truck/Company.vue'),
    },
    {
        path: '/checkin',
        name: 'uld',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/checkin/Index.vue'),
    },
    {
        path: '/linkToUld',
        name: 'linkToUld',
        component: () => import(/* webpackChunkName: "linkToUld.vue" */ '@/pages/checkin/linkToUld.vue'),
    },
    {
        path: '/trip',
        name: 'trip',
        component: () => import(/* webpackChunkName: "Trip.vue" */ '@/pages/Trip/Trip.vue'),
    },

    {
        path: '/realflight',
        name: 'realflight',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/realflight/Index.vue'),
    },
    {
        path: '/Inbound',
        name: 'Inbound',
        component: () => import(/* webpackChunkName: "Inbound.vue" */ '@/pages/Flight/Inbound.vue'),
    },
    {
        path: '/Outbound',
        name: 'Outbound',
        component: () => import(/* webpackChunkName: "Outbound.vue" */ '@/pages/Flight/Outbound.vue'),
    },
{
        path: '/ShipmentPlan',
        name: 'ShipmentPlan',
        component: () => import(/* webpackChunkName: "ShipmentPlan.vue" */ '@/pages/Flight/ShipmentPlan.vue'),
    },


    {path: '/', name: 'dashboard', redirect: {name: 'realflight'}},

]

const router = createRouter({
    history: createWebHistory(), routes, linkActiveClass: 'menu-item-active',
})

export default router
