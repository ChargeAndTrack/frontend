import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/LoginPage.vue';
import Home from '@/pages/HomePage.vue';
import Map from '@/pages/MapPage.vue';
import Manage from '@/pages/ManagePage.vue';
import Profile from '@/pages/ProfilePage.vue';
import NotFound from '@/pages/NotFound.vue';
import { useAuthenticationStore } from '@/store/authentication.store';

const routes = [
    { path: '/login', name: "Login", component: Login },
    {
        path: '/',
        children: [
            { path: '', name: "Home", component: Home },
            { path: 'map', name: "Map", component: Map },
            { path: 'manage', name: "Manage", component: Manage },
            { path: 'profile', name: "Profile", component: Profile },
            { path: ':pathMatch(.*)*', component: NotFound }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to) => {
    const authenticationStore = useAuthenticationStore();
    const isAuthenticated: boolean = !!authenticationStore.token;

    if (!isAuthenticated && to.name !== 'Login') {
        return { name: 'Login' };
    }
});

export default router;
