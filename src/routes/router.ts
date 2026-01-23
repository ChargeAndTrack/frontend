import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/LoginPage.vue';
import Home from '@/pages/HomePage.vue';
import Map from '@/pages/MapPage.vue';
import Manage from '@/pages/ManagePage.vue';
import Profile from '@/pages/ProfilePage.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/login', name: "Login", component: Login },
    { path: '/map', name: "Map", component: Map },
    { path: '/manage', name: "Manage", component: Manage },
    { path: '/profile', name: "Profile", component: Profile },
    { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
