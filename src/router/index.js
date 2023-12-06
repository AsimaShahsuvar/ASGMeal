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
        path: '/arrival',
        name: 'arrival',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/flights/Index.vue'),
    },
    {
        path: '/general',
        name: 'general',
        component: () => import(/* webpackChunkName: "Index.vue" */ '@/pages/general/Index.vue'),
    },
    {
        path: '/shipper',
        name: 'shipper',
        component: () => import(/* webpackChunkName: "Shipper.vue" */ '@/pages/Dictionary/Shipper.vue'),
    },
    {
        path: '/consignee',
        name: 'consignee',
        component: () => import(/* webpackChunkName: "Consignee.vue" */ '@/pages/Dictionary/Consignee.vue'),
    },
    {
        path: '/agent',
        name: 'agent',
        component: () => import(/* webpackChunkName: "Agent.vue" */ '@/pages/Dictionary/Agent.vue'),
    },
    {
        path: '/truck',
        name: 'truck',
        component: () => import(/* webpackChunkName: "Truck.vue" */ '@/pages/Truck/Truck.vue'),
    },
    {
        path: '/company',
        name: 'company',
        component: () => import(/* webpackChunkName: "Company.vue" */ '@/pages/Truck/Company.vue'),
    },
    {
        path: '/uld',
        name: 'uld',
        component: () => import(/* webpackChunkName: "Uld.vue" */ '@/pages/uld/Uld.vue'),
    },
    {
        path: '/linkToUld',
        name: 'linkToUld',
        component: () => import(/* webpackChunkName: "linkToUld.vue" */ '@/pages/uld/linkToUld.vue'),
    },
    {
        path: '/trip',
        name: 'trip',
        component: () => import(/* webpackChunkName: "Trip.vue" */ '@/pages/Trip/Trip.vue'),
    },

    {
        path: '/awb',
        name: 'awb',
        component: () => import(/* webpackChunkName: "Awb.vue" */ '@/pages/awb/Index.vue'),
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


    {path: '/', name: 'dashboard', redirect: {name: 'awb'}},

]

const router = createRouter({
    history: createWebHistory(), routes, linkActiveClass: 'menu-item-active',
})

export default router
