<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/">Vue To-Do App</router-link>
      </div>
      <div class="navbar-menu">
        <router-link to="/" class="navbar-item">Home</router-link>
        <template v-if="isAuthenticated">
          <router-link to="/todos" class="navbar-item">My Todos</router-link>
          <a href="#" @click.prevent="logout" class="navbar-item">
            Logout ({{ currentUser }})
          </a>
        </template>
        <template v-else>
          <router-link to="/login" class="navbar-item">Login</router-link>
          <router-link to="/register" class="navbar-item">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const currentUser = computed(() => store.getters.currentUser);
    
    const logout = () => {
      store.dispatch('logout');
      router.push('/');
    };
    
    return {
      isAuthenticated,
      currentUser,
      logout
    };
  }
});
</script>

<style scoped>
.navbar {
  background-color: #42b983;
  padding: 15px 0;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-brand a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
}

.navbar-item {
  color: white;
  margin-left: 20px;
  text-decoration: none;
}

.navbar-item:hover {
  text-decoration: underline;
}
</style>
