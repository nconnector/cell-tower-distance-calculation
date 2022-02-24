<template>
    <Table />
</template>

<script>
import Table from "./components/Table.vue";

export default {
    name: "App",
    components: {
        Table,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    display: flex;
    margin-top: max(10em);
    align-items: center;
    justify-content: center;
    font-size: calc(min(2vw, 12pt));
}
</style>
