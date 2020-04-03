<template>
  <div id="app" class="container">
    <img 
      class="todo-logo" 
      alt="Todo logo" 
      src="./assets/logo.png"
    >
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto Slab', serif;
}

#app {
  font-size: 24px;
  margin-top: 30px;
}

.container {
  max-width: 600px;
  margin: auto;
}

.todo-logo {
  display: flex;
  justify-content: center;
  margin: 20px auto;
  height: 120px;
}
</style>
