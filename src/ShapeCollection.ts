import { Visual } from "./visual";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionId = powerbi.extensibility.ISelectionId;


import { TilesCollection } from "./TilesCollection/TilesCollection";
import { Tile } from "./TilesCollection/Tile";
import powerbi from "powerbi-visuals-api";
import { TileData } from "./TilesCollection/TileData";
import * as d3 from "d3";
import { select } from "d3";
import { State } from "./TilesCollection/enums";

// import { sizeTextContainer, styleText, makeTextTransparent } from './d3calls'

export class ShapeCollection extends TilesCollection {
    visual: Visual
    options: VisualUpdateOptions
    tilesData = <ShapeData[]>this.tilesData

    public createTile(i): Tile {
        return new Shape(this, i, this.tilesData, this.formatSettings)
    }
}

export class Shape extends Tile {
    collection = <ShapeCollection>this.collection
    tilesData = <ShapeData[]>this.tilesData
    visual: Visual = this.collection.visual

    get currentState(){
        return State.unselected
    }
}

export class ShapeData extends TileData {
    selectionId?: ISelectionId
}

