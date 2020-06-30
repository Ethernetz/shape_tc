import powerbi from "powerbi-visuals-api";
import {State} from './TilesCollection/enums'
import { SelectionManagerUnbound } from "./SelectionManagerUnbound";

export interface propertyStateName {
    all: string,
    selected: string,
    unselected: string,
    hover: string
}

export interface propertyStateValue {
    all: string | number,
    selected: string | number,
    unselected: string | number,
    hover: string | number,
}

export interface propertyStatesInput extends propertyStateValue {
    state: State
}

export interface propertyStatesOutput extends propertyStateValue {
    didChange: boolean
}
