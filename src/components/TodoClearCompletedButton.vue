<template>
    <div>
        <transition name="fade">
            <button
                class="clear-completed-btn"
                v-if="showClearCompletedButton"
                @click="clearCompleted"
            >
                Clear Completed
            </button>
        </transition>
      </div>
</template>

<script>
export default {
    props: {
        showClearCompletedButton: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        clearCompleted() {
            eventBus.$emit('clearCompletedTodos');
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>