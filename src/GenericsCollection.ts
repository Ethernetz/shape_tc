import { Visual } from "./visual";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import ISelectionId = powerbi.extensibility.ISelectionId;


import { TilesCollection } from "./TilesCollection/TilesCollection";
import { Tile } from "./TilesCollection/Tile";
import powerbi from "powerbi-visuals-api";
import { TileData } from "./TilesCollection/TileData";
import * as d3 from "d3";
import { Shape } from "./TilesCollection/shapes";
import { Handle } from "./interfaces";
import { select } from "d3";
import { State } from "./TilesCollection/enums";

// import { sizeTextContainer, styleText, makeTextTransparent } from './d3calls'

export class GenericsCollection extends TilesCollection {
    visual: Visual
    options: VisualUpdateOptions
    tilesData = <GenericData[]>this.tilesData

    public createTile(i): Tile {
        return new Generic(this, i, this.tilesData, this.formatSettings)
    }
}

export class Generic extends Tile {
    collection = <GenericsCollection>this.collection
    tilesData = <GenericData[]>this.tilesData
    visual: Visual = this.collection.visual

    get currentState(){
        return State.all
    }
}

export class GenericData extends TileData {
    selectionId?: ISelectionId
}

