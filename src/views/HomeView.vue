<template>
  <div class="home">
    <div class="container">
      <h1>Welcome to Vue.js To-Do App</h1>
      <p class="subtitle">A simple application for beginners learning Vue.js</p>
      
      <div class="cta">
        <router-link v-if="!isAuthenticated" to="/login" class="btn btn-primary">
          Login
        </router-link>
        <router-link v-if="!isAuthenticated" to="/register" class="btn btn-secondary">
          Register
        </router-link>
        <router-link v-if="isAuthenticated" to="/todos" class="btn btn-primary">
          My To-Dos
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    
    return {
      isAuthenticated
    };
  }
});
</script>

<style scoped>
.home {
  text-align: center;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 40px 0;
}

.feature {
  flex: 1;
  min-width: 250px;
  padding: 25px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature h3 {
  color: #42b983;
  margin-bottom: 15px;
}

.cta {
  margin-top: 40px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  margin: 0 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}
</style>