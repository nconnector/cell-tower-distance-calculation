## Endpoint

### getClosestCellTower

retrieves the closest cell tower to given x, y coordinates

-   method: GET
-   url: `/getClosestCellTower`
-   parameters:
    -   x: number
    -   y: number
-   response payload:

```
{
    closestTower:{
        type:string,
        id:string,
        name:string,
        x:number,
        y:number
    },
    distance:number
}
```
