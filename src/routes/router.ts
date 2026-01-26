import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/LoginPage.vue';
import Home from '@/pages/HomePage.vue';
import Map from '@/pages/MapPage.vue';
import Manage from '@/pages/ManagePage.vue';
import Profile from '@/pages/ProfilePage.vue';
import Forbidden from '@/pages/Forbidden.vue';
import NotFound from '@/pages/NotFound.vue';
import { useAuthenticationStore } from '@/store/authentication.store';

const routes = [
    { path: '/login', name: "Login", component: Login },
    {
        path: '/',
        meta: { requiresAuthentication: true },
        children: [
            { path: '', name: "Home", component: Home },
            { path: 'map', name: "Map", component: Map },
            { path: 'manage', name: "Manage", component: Manage, meta: { role: "admin" } },
            { path: 'profile', name: "Profile", component: Profile },
            { path: 'forbidden', name: "Forbidden", component: Forbidden },
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

    if (to.meta.requiresAuthentication && !isAuthenticated) {
        return { name: 'Login' };
    }

    if (to.meta.role === "admin" && !authenticationStore.isAdmin()) {
        return { name: 'Forbidden' };
    }
});

export default router;
