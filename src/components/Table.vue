<template>
    <table class="table">
        <tr>
            <th
                v-for="headerItem in headerItems"
                :key="headerItem"
                class="col"
                @click="sortBy(headerItem)"
            >
                <span>{{ headerItem.toUpperCase() }}</span>
                <input
                    class="filter"
                    v-if="headerItem === 'name'"
                    v-model="filter"
                    @click.stop="null"
                    @input="handleFilterInput($event)"
                />
                <div :class="getIconClass(headerItem)" />
            </th>
        </tr>
        <tr
            v-for="building in buildings"
            :key="building.id"
            class="row"
            @click="requestClosestCellTower(building.x, building.y)"
        >
            <td class="col">{{ building.type }}</td>
            <td class="col">{{ building.id }}</td>
            <td class="col">{{ building.name }}</td>
            <td class="col">{{ building.x }}</td>
            <td class="col">{{ building.y }}</td>
        </tr>
    </table>
    <!-- Modal will only be rendered if there is a closestTower object -->
    <Modal
        v-if="closestTower"
        v-show="modalVisible"
        @close-modal="modalVisible = false"
    >
        <CellTower :tower="closestTower" :distance="closestTowerDistance" />
    </Modal>
</template>

<script>
import Server from "../server/server";
import Modal from "./Modal.vue";
import CellTower from "./CellTower.vue";
export default {
    name: "TableComponent",
    components: { Modal, CellTower },
    data() {
        return {
            server: new Server(),
            modalVisible: false,
            filter: "",
            sortKey: null,
            sortAscending: true,
            headerItems: ["type", "id", "name", "x", "y"],
            numericFields: ["x", "y"],
            buildings: [],
            buildingsFiltered: [],
            buildingsRaw: [
                {
                    type: "Building",
                    id: "B1",
                    name: "General hospital",
                    x: 1300,
                    y: 560,
                },
                {
                    type: "Building",
                    id: "B2",
                    name: "Firehall",
                    x: -350,
                    y: 1100,
                },
                {
                    type: "Building",
                    id: "B3",
                    name: "University",
                    x: -890,
                    y: -1300,
                },
                {
                    type: "Building",
                    id: "B4",
                    name: "Central library",
                    x: 470,
                    y: 1010,
                },
                {
                    type: "Building",
                    id: "B5",
                    name: "Secondary school",
                    x: 1550,
                    y: 850,
                },
                {
                    type: "Building",
                    id: "B6",
                    name: "Primary school",
                    x: 1450,
                    y: 950,
                },
                {
                    type: "Building",
                    id: "B7",
                    name: "City Hall",
                    x: -600,
                    y: 200,
                },
            ],
            closestTower: null,
        };
    },
    mounted() {
        this.buildings = this.buildingsRaw;
        this.buildingsFiltered = this.buildingsRaw;
    },
    methods: {
        getIconClass(key) {
            const sortDirection = this.sortAscending
                ? "ascending"
                : "descending";
            return ["sort-icon", this.sortKey === key ? sortDirection : ""];
        },
        requestClosestCellTower(x, y) {
            const { closestTower, distance } = this.server.getClosestCellTower(
                x,
                y
            );
            this.closestTower = closestTower;
            this.closestTowerDistance = distance;
            this.modalVisible = true;
        },
        sortBy(key, reSort) {
            if (!reSort) {
                // reset sort direction if sorting by new key
                if (this.sortKey !== key) {
                    this.sortAscending = true;
                    this.sortKey = key;
                } else {
                    // reset sort after ascending and descending
                    if (!this.sortAscending) {
                        this.sortReset();
                        return;
                    }
                    // enable descending order
                    this.sortAscending = false;
                }
            }

            let sortingFunction;
            if (this.numericFields.includes(key)) {
                sortingFunction = this.sortAscending
                    ? (a, b) => a[this.sortKey] - b[this.sortKey]
                    : (a, b) => b[this.sortKey] - a[this.sortKey];
            } else {
                const ascending = (a, b) =>
                    `${a[this.sortKey]}`.localeCompare(`${b[this.sortKey]}`);
                const descending = (a, b) =>
                    `${b[this.sortKey]}`.localeCompare(`${a[this.sortKey]}`);
                sortingFunction = this.sortAscending ? ascending : descending;
            }
            this.buildings = [...this.buildingsFiltered].sort(sortingFunction);
        },
        sortReset() {
            this.sortKey = null;
            this.sortAscending = true;
            this.buildings = this.buildingsFiltered;
        },
        handleFilterInput(event) {
            this.filter = event.target.value.toLowerCase();
            this.buildingsFiltered = this.buildingsRaw.filter((building) =>
                building.name.toLowerCase().includes(this.filter)
            );
            this.sortBy(undefined, true);
        },
    },
};
</script>

<style scoped lang="scss">
$border-color: rgba(0, 0, 0, 0.2);
$border: 1px solid $border-color;
table {
    cursor: pointer;
    user-select: none;
    box-shadow: 0.2em 0.2em 0.8em 0.2em $border-color;
    border-spacing: 0;
}
tr {
    display: grid;
    grid-template-columns: 2fr 1fr 4fr 1fr 1fr;
    border-bottom: $border;
    &:first-child {
        border-top: $border;
    }
}
th {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
th,
td {
    padding: 0.5em 1em;
    border-right: $border;
    &:first-child {
        border-left: $border;
    }
}
.sort-icon {
    height: 1.5em;
    width: 1.5em;
    background-image: url("https://img.icons8.com/plumpy/24/000000/sort.png");
    background-size: cover;
    opacity: 0.2;
    &.ascending {
        opacity: 1;
    }
    &.descending {
        opacity: 1;
        transform: rotate(180deg);
    }
}
.filter {
    width: calc(min(8em, 10vw));
    height: 1.2em;
    padding-left: 0.2em;
}
</style>
