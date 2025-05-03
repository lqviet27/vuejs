<template>
  <div class="login container">
    <h1>Login</h1>
    <div v-if="error" class="error">{{ error }}</div>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          v-model="username" 
          required 
          class="form-control"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          class="form-control"
        />
      </div>
      
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    
    <p class="mt-3">
      Don't have an account? 
      <router-link to="/register">Register</router-link>
    </p>
    
    <div class="demo-info">
      <p><strong>Demo Account:</strong></p>
      <p>Username: demo</p>
      <p>Password: password</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    
    const username = ref('');
    const password = ref('');
    const error = ref('');
    
    const handleLogin = async () => {
      try {
        await store.dispatch('login', {
          username: username.value,
          password: password.value
        });
        router.push('/todos');
      } catch (err) {
        error.value = err as string;
      }
    };
    
    return {
      username,
      password,
      error,
      handleLogin
    };
  }
});
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.error {
  color: #e74c3c;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fadbd8;
  border-radius: 4px;
}

.demo-info {
  margin-top: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}
</style>
