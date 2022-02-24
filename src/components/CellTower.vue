<template>
    <div class="cell-tower">
        <div>Closest Cell tower: {{ tower.id }}</div>
        <div>Name: {{ tower.name }}</div>
        <div>Coordinates (x, y): {{ tower.x }}, {{ tower.y }}</div>
        <div>Distance: {{ distance }}</div>
    </div>
</template>

<script>
export default {
    name: "CellTower",
    props: {
        tower: Object,
        distance: Number,
    },
};
</script>

<style scoped lang="scss">
.cell-tower {
    display: grid;
}
</style>
