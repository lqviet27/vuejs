import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import TodosView from '../views/TodosView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodosView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if route requires auth but user is not authenticated
    next({ name: 'login' });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    // Redirect to todos if route is for guests but user is authenticated
    next({ name: 'todos' });
  } else {
    next();
  }
});

export default router;