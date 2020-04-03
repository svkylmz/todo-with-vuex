import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        filter: 'all',
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
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
        anyRemaining(state, getters) {
        return getters.remaining != 0;
        },
        todosFiltered(state) {
        if (state.filter == 'all') {
            return state.todos;
        } else if (state.filter == 'active') {
            return state.todos.filter(todo => !todo.completed);
        } else if (state.filter == 'completed') {
            return state.todos.filter(todo => todo.completed);
        }
        return state.todos;
        },
        showClearCompletedButton(state) {
        return state.todos.filter(todo => todo.completed).length > 0;
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false
            })
        },
        deleteTodo(state, index) {
            state.todos.splice(index, 1);
        },
        changeFilter(state, filter) {
            state.filter = filter;
        },
        checkAll(state, checked) {
            state.todos.forEach(todo => (todo.completed = checked));
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed);
        }
        
    }
})