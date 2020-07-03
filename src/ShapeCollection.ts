import { Visual } from "./visual";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

import { TilesCollection } from "./TilesCollection/TilesCollection";
import { Tile } from "./TilesCollection/Tile";
import powerbi from "powerbi-visuals-api";
import { TileData } from "./TilesCollection/TileData";
import { State } from "./TilesCollection/enums";

export class ShapeCollection extends TilesCollection {
    tilesData = <ShapeData[]>this.tilesData
    public createTile(i): Tile {
        return new Shape(this, i, this.tilesData, this.formatSettings)
    }
}

export class Shape extends Tile {
    collection = <ShapeCollection>this.collection
    tilesData = <ShapeData[]>this.tilesData
    get currentState(){
        return State.unselected
    }
}

export class ShapeData extends TileData {
}

