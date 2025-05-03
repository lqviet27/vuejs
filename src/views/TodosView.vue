<template>
  <div class="todos container">
    <h1>My To-Do List</h1>
    
    <!-- Add new todo form -->
    <div class="add-todo">
      <form @submit.prevent="addTodo">
        <input 
          type="text" 
          v-model="newTodo" 
          placeholder="Add a new task..." 
          class="form-control"
          required
        />
        <button type="submit" class="btn btn-add">Add</button>
      </form>
    </div>
    
    <!-- Todo list -->
    <div v-if="todos.length === 0" class="empty-todos">
      <p>You have no tasks yet. Add one above!</p>
    </div>
    
    <ul v-else class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-content" :class="{ completed: todo.completed }">
          <input 
            type="checkbox" 
            :checked="todo.completed" 
            @change="toggleTodo(todo.id)"
          />
          
          <span v-if="!editingId || editingId !== todo.id" @dblclick="startEditing(todo)">
            {{ todo.text }}
          </span>
          
          <input 
            v-else 
            type="text" 
            v-model="editText" 
            @blur="updateTodo(todo.id)" 
            @keyup.enter="updateTodo(todo.id)"
            @keyup.esc="cancelEditing"
            class="edit-input"
            ref="editField"
          />
        </div>
        
        <div class="todo-actions">
          <button @click="startEditing(todo)" class="btn btn-edit">Edit</button>
          <button @click="deleteTodo(todo.id)" class="btn btn-delete">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TodosView',
  setup() {
    const store = useStore();
    const newTodo = ref('');
    const editingId = ref<number | null>(null);
    const editText = ref('');
    const editField = ref<HTMLInputElement | null>(null);
    
    const todos = computed(() => store.getters.todos);
    
    const addTodo = () => {
      if (newTodo.value.trim()) {
        store.dispatch('addTodo', newTodo.value);
        newTodo.value = '';
      }
    };
    
    const toggleTodo = (id: number) => {
      store.dispatch('toggleTodo', id);
    };
    
    const startEditing = (todo: { id: number, text: string }) => {
      editingId.value = todo.id;
      editText.value = todo.text;
      
      // Focus the input field after the DOM updates
      nextTick(() => {
        if (editField.value) {
          editField.value.focus();
        }
      });
    };
    
    const updateTodo = (id: number) => {
      if (editText.value.trim()) {
        store.dispatch('updateTodo', { id, text: editText.value });
      }
      editingId.value = null;
    };
    
    const cancelEditing = () => {
      editingId.value = null;
    };
    
    const deleteTodo = (id: number) => {
      if (confirm('Are you sure you want to delete this task?')) {
        store.dispatch('deleteTodo', id);
      }
    };
    
    return {
      todos,
      newTodo,
      editingId,
      editText,
      editField,
      addTodo,
      toggleTodo,
      startEditing,
      updateTodo,
      cancelEditing,
      deleteTodo
    };
  }
});
</script>

<style scoped>
.todos {
  max-width: 700px;
  margin: 0 auto;
}

.add-todo {
  margin-bottom: 20px;
}

.add-todo form {
  display: flex;
}

.form-control {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.btn {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

.btn-add {
  background-color: #42b983;
  color: white;
  border-radius: 0 4px 4px 0;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.todo-content input[type="checkbox"] {
  margin-right: 10px;
}

.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-actions {
  display: flex;
}

.btn-edit {
  background-color: #3498db;
  color: white;
  margin-right: 5px;
  border-radius: 4px;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  border-radius: 4px;
}

.edit-input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
}

.empty-todos {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
  color: #6c757d;
}
</style>
