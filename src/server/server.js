class Server {
    constructor() {
        this.cellTowerData = [
            {
                type: "Cell Tower",
                id: "C1",
                name: "Bell NW",
                x: 2200,
                y: 1720,
            },
            {
                type: "Cell Tower",
                id: "C2",
                name: "Bell SW",
                x: -1090,
                y: 1400,
            },
            {
                type: "Cell Tower",
                id: "C3",
                name: "Bell SW",
                x: 760,
                y: -1360,
            },
            {
                type: "Cell Tower",
                id: "C4",
                name: "Bell SE",
                x: -1410,
                y: -450,
            },
            {
                type: "Cell Tower",
                id: "C5",
                name: "Rogers NW1",
                x: 2300,
                y: 1710,
            },
            {
                type: "Cell Tower",
                id: "C6",
                name: "Rogers NW2",
                x: 50,
                y: 2080,
            },
            {
                type: "Cell Tower",
                id: "C7",
                name: "Rogers SE",
                x: -1410,
                y: -450,
            },
            {
                type: "Cell Tower",
                id: "C8",
                name: "Freedom SW",
                x: 1100,
                y: -1200,
            },
            {
                type: "Cell Tower",
                id: "C9",
                name: "Freedom NE",
                x: -1090,
                y: 1400,
            },
            {
                type: "Cell Tower",
                id: "C10",
                name: "TELUS SE1",
                x: -1740,
                y: -50,
            },
            {
                type: "Cell Tower",
                id: "C11",
                name: "TELUS SE2",
                x: -2300,
                y: -350,
            },
        ];
    }

    /**
     * This method is a mock-up for a server call (axios.get, fetch, or similar)
     * In production setting, an asynchronous GET request would be sent to `${url}/getClosestCellTower/?x=${X}&y=${y}`
     *
     * The reason for this mock-up is to allow demonstration of required functionality deployed as a static website
     * You may find server implementation (Express.js) of this endpoint in /back-end branch of this repository
     *
     */
    getClosestCellTower(x, y) {
        // map distances to all towers
        const distanceArray = this.cellTowerData.map((tower, index) => {
            const dx = x - tower.x;
            const dy = y - tower.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            return { index, distance };
        });

        // sort towers by distance
        distanceArray.sort((a, b) => a.distance - b.distance);
        console.log(distanceArray);

        // find index and distance of the closest tower
        const closestTowerIndex = distanceArray[0].index;
        const distance =
            Math.round((distanceArray[0].distance + Number.EPSILON) * 100) /
            100;

        // get closest tower by index
        const closestTower = this.cellTowerData[closestTowerIndex];

        return { closestTower, distance };
    }
}

export default Server;
