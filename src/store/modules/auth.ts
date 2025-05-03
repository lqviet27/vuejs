interface User {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
  users: User[];
}

const state: AuthState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  currentUser: localStorage.getItem('currentUser'),
  users: JSON.parse(localStorage.getItem('users') || '[]')
};

const mutations = {
  login(state: AuthState, username: string) {
    state.isAuthenticated = true;
    state.currentUser = username;
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', username);
  },
  logout(state: AuthState) {
    state.isAuthenticated = false;
    state.currentUser = null;
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('currentUser');
  },
  register(state: AuthState, user: User) {
    state.users.push(user);
    localStorage.setItem('users', JSON.stringify(state.users));
  }
};

const actions = {
  login({ commit, state }: any, credentials: User) {
    return new Promise((resolve, reject) => {
      const user = state.users.find(
        (u: User) => 
          u.username === credentials.username && 
          u.password === credentials.password
      );
      
      if (user) {
        commit('login', credentials.username);
        resolve(true);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  },
  logout({ commit }: any) {
    commit('logout');
  },
  register({ commit, state }: any, credentials: User) {
    return new Promise((resolve, reject) => {
      const userExists = state.users.some(
        (u: User) => u.username === credentials.username
      );
      
      if (userExists) {
        reject(new Error('Username already exists'));
      } else {
        commit('register', credentials);
        commit('login', credentials.username);
        resolve(true);
      }
    });
  }
};

const getters = {
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
  currentUser: (state: AuthState) => state.currentUser
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
