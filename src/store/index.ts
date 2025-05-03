import { createStore } from 'vuex';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface User {
  username: string;
  password: string;
}

interface State {
  auth: {
    isAuthenticated: boolean;
    currentUser: string | null;
    users: User[];
  };
  todos: Todo[];
}

// Load state from localStorage if available
const savedState = localStorage.getItem('vuex-state');
const initialState: State = savedState ? JSON.parse(savedState) : {
  auth: {
    isAuthenticated: false,
    currentUser: null,
    users: [
      { username: 'demo', password: 'password' } // Default user for testing
    ]
  },
  todos: []
};

const store = createStore<State>({
  state: initialState,
  
  mutations: {
    // Auth mutations
    LOGIN(state, username) {
      state.auth.isAuthenticated = true;
      state.auth.currentUser = username;
    },
    LOGOUT(state) {
      state.auth.isAuthenticated = false;
      state.auth.currentUser = null;
    },
    REGISTER(state, user) {
      state.auth.users.push(user);
      state.auth.isAuthenticated = true;
      state.auth.currentUser = user.username;
    },
    
    // Todo mutations
    ADD_TODO(state, text) {
      state.todos.push({
        id: Date.now(),
        text,
        completed: false
      });
    },
    TOGGLE_TODO(state, id) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    UPDATE_TODO(state, { id, text }) {
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    }
  },
  
  actions: {
    // Auth actions
    login({ commit, state }, credentials) {
      return new Promise((resolve, reject) => {
        const user = state.auth.users.find(
          u => u.username === credentials.username && u.password === credentials.password
        );
        
        if (user) {
          commit('LOGIN', credentials.username);
          resolve(true);
        } else {
          reject('Invalid username or password');
        }
      });
    },
    
    logout({ commit }) {
      commit('LOGOUT');
    },
    
    register({ commit, state }, credentials) {
      return new Promise((resolve, reject) => {
        const userExists = state.auth.users.some(
          u => u.username === credentials.username
        );
        
        if (userExists) {
          reject('Username already exists');
        } else {
          commit('REGISTER', credentials);
          resolve(true);
        }
      });
    },
    
    // Todo actions
    addTodo({ commit }, text) {
      commit('ADD_TODO', text);
    },
    
    toggleTodo({ commit }, id) {
      commit('TOGGLE_TODO', id);
    },
    
    updateTodo({ commit }, payload) {
      commit('UPDATE_TODO', payload);
    },
    
    deleteTodo({ commit }, id) {
      commit('DELETE_TODO', id);
    }
  },
  
  getters: {
    isAuthenticated: state => state.auth.isAuthenticated,
    currentUser: state => state.auth.currentUser,
    todos: state => state.todos
  }
});

// Save state to localStorage whenever it changes
store.subscribe((mutation, state) => {
  localStorage.setItem('vuex-state', JSON.stringify(state));
});

export default store;