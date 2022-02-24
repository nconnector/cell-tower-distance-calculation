import express from "express";
import CellTowerLocator from "./CellTowerLocator.js";

const app = express();
const cellTowerLocator = new CellTowerLocator();

app.get("/health-check", (req, res) => {
    res.send("OK!");
});

app.get("/", (req, res) => {
    console.log(req.query);
    const { x, y } = req.query;

    // validate input
    const validateCoordinate = (input) =>
        !isNaN(input) && !isNaN(parseFloat(input));
    if (!validateCoordinate(x) || !validateCoordinate(y)) {
        res.status(400).send(
            "Error: Expected x:number and y:number as query parameters."
        );
        return;
    }

    // compute response
    const { closestTower, distance } = cellTowerLocator.getClosestCellTower(
        x,
        y
    );
    res.send(JSON.stringify({ closestTower, distance }));
});

const port = 80;
app.listen(port, () => {
    console.log(`cell-tower-distance-calculator listening on port ${port}`);
});
