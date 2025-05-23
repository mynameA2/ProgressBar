import { createRouter, createWebHistory } from 'vue-router'
import ProgressDemo from './../pages/ProgressDemo.vue'
import PieChartPage from './../pages/PieChartPage.vue'


const routes = [
    {
        path: '/',
        name: 'ProgressDemo',
        component: ProgressDemo,
    },
    {
        path: '/pie',
        name: 'PieChartPage',
        component: PieChartPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router