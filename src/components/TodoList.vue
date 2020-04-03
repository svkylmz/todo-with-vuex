<template>
  <div>
    <input 
      type="text" 
      class="todo-input" 
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    >
    <transition-group
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        class="todo-item-group"
      >
        <div class="todo-item">
          <input type="checkbox" v-model="todo.completed">
          <div class="titleClass" :class="{ completed : todo.completed }">{{ todo.title }}</div>
        </div>
        <div class="remove-item" @click="removeTodo(index)">&times;</div>
      </div>
    </transition-group>
    <div class="check-all-container">
      <TodoItemsCheckAll :anyRemaining="anyRemaining"/>
      <TodoItemsRemaining :remaining="remaining"/>
    </div>
    <div class="check-all-container">
      <TodoFilter />
      <TodoClearCompletedButton :showClearCompletedButton="showClearCompletedButton"/>
    </div>
  </div>
</template>

<script>
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoItemsCheckAll from './TodoItemsCheckAll';
import TodoFilter from './TodoFilter';
import TodoClearCompletedButton from './TodoClearCompletedButton';

export default {
  components: {
    TodoItemsCheckAll,
    TodoItemsRemaining,
    TodoFilter,
    TodoClearCompletedButton
  },
  data() {
    return {
      newTodo: '',
      filter: 'all',
      idForTodo: 3,
      todos: [
        {
          'id': 1,
          'title': 'Finish vue task',
          'completed': false,
        },
        {
          'id': 2,
          'title': 'Huawei work project',
          'completed': false
        }
      ]
    }
  },
  created() {
    eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked));
    eventBus.$on('filterChanged', (filter) => this.filter = filter);
    eventBus.$on('clearCompletedTodos', () => this.clearCompleted());
  },
  beforeDestroy() {
    eventBus.$off('checkAllChanged', (checked) => this.checkAllTodos(checked));
    eventBus.$off('filterChanged', (filter) => this.filter = filter);
    eventBus.$off('clearCompletedTodos', () => this.clearCompleted());
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == 'all') {
        return this.todos;
      }
      else if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed);
      }
      else if (this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed);
      }

      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      })

      this.newTodo = '';
      this.idForTodo++;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

$dark: #787d8a;
$text: #4d5766;
$danger: #f08080;
$outline1: #6bb3cf;
$outline2: #beedff;

.todo-input {
  width: 100%;
  padding: 10px 14px;
  margin: 0 5px;
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid whitesmoke;

  &:focus {
    outline-color: $outline1;
  }
}

.todo-item-group {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $text;
  padding: 10px;
  animation-duration: 0.3s;
}

.todo-item {
  display: flex;
  align-items: center;

  .titleClass {
    padding-left: 10px;
  }
}

.completed {
  text-decoration: line-through;
  color: $dark;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  color: gray;

  &:hover {
    color: $danger;
  }
}

.check-all-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid $dark;
  padding-top: 14px;
  margin-bottom: 14px;
  margin-right: 5px;
  margin-left: 5px;
  color: $dark;
}

button {
  font-size: 14px;
  border: 1px solid #6bb3cf;
  appearance: none;
  margin: 2px;
  cursor: pointer;

  &:hover {
    background: lightblue;
  }

  &:focus {
    outline: none;
  }
}

.active {
  border: 2px solid #6bb3cf;
  background: lightblue;
}

.clear-completed-btn {
  font-size: 14px;
  border: 1px solid $danger;
  appearance: none;
  margin: 2px;
  cursor: pointer;

  &:hover {
    background: $danger;
    color: white;
  }
}
</style>
