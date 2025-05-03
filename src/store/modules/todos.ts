interface Todo {
  id: number;
  text: string;
  completed: boolean;
  userId: string;
}

interface TodoState {
  todos: Todo[];
}

const state: TodoState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]')
};

const mutations = {
  addTodo(state: TodoState, todo: Todo) {
    state.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(state.todos));
  },
  updateTodo(state: TodoState, updatedTodo: Todo) {
    const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos[index] = updatedTodo;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
  deleteTodo(state: TodoState, id: number) {
    state.todos = state.todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }
};

const actions = {
  addTodo({ commit, rootState }: any, text: string) {
    const userId = rootState.auth.currentUser;
    const todo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      userId
    };
    commit('addTodo', todo);
  },
  updateTodo({ commit }: any, todo: Todo) {
    commit('updateTodo', todo);
  },
  deleteTodo({ commit }: any, id: number) {
    commit('deleteTodo', id);
  }
};

const getters = {
  userTodos: (state: TodoState, getters: any, rootState: any) => {
    const userId = rootState.auth.currentUser;
    return state.todos.filter(todo => todo.userId === userId);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
