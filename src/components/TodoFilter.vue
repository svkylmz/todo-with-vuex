<template>
    <div>
        <button 
            :class="{ active: filter == 'all' }" 
            @click="changeFilter('all')"
        >
            All
        </button>
        <button 
            :class="{ active: filter == 'active' }" 
            @click="changeFilter('active')"
        >
            Active
        </button>
        <button 
            :class="{ active: filter == 'completed' }" 
            @click="changeFilter('completed')"
        >
            Completed
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        filter() {
            return this.$store.state.filter;
        }
    },
    methods: {
        changeFilter(filter) {
            this.$store.dispatch('changeFilter', filter);
        }
    }
}
</script>
