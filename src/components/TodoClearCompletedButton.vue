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
    computed: {
        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton;
        }
    },
    methods: {
        clearCompleted() {
            this.$store.commit('clearCompleted');
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
