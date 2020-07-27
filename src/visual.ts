/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import DataView = powerbi.DataView;
import VisualObjectInstancesToPersist = powerbi.VisualObjectInstancesToPersist
import DataViewPropertyValue = powerbi.DataViewPropertyValue
import VisualObjectInstance = powerbi.VisualObjectInstance
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject
import VisualUpdateType = powerbi.VisualUpdateType

import { VisualSettings } from "./settings";
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;

import * as d3 from "d3";

import { PropertyGroupKeys } from './TilesCollection/interfaces'
import { getPropertyStateNameArr, getObjectsToPersist } from './TilesCollectionUtlities/functions'
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

import {ShapeCollection, ShapeData} from './ShapeCollection'
import { State } from "./TilesCollection/enums";

export class Visual implements IVisual {
    public host: IVisualHost;

    private visualSettings: VisualSettings;

    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;

    public shiftFired: boolean = false

    public visualElement: HTMLElement;

    public shapeCollection: ShapeCollection

    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        this.visualElement = options.element

        this.svg = d3.select(options.element)
            .append('svg')
            .classed('buttonstrip', true);

        this.container = this.svg.append("g")
            .classed('container', true);

        this.shapeCollection = new ShapeCollection()
        this.shapeCollection.svg = this.svg
        this.shapeCollection.container = this.container
        this.shapeCollection.visualElement = options.element
    }

    public getEnumeratedStateProperties(propertyGroup: any, prefix?: string): { [propertyName: string]: DataViewPropertyValue } {
        let properties: { [propertyName: string]: DataViewPropertyValue } = {}
        let groupedKeyNamesArr: PropertyGroupKeys[] = getPropertyStateNameArr(Object.keys(propertyGroup))
        if (groupedKeyNamesArr.length > 0 && propertyGroup["state"]) {
            let state: State = propertyGroup["state"]
            for (let i = 0; i < groupedKeyNamesArr.length; i++) {
                let groupedKeyNames = groupedKeyNamesArr[i]
                if (prefix && (!groupedKeyNames.default || !groupedKeyNames.default.startsWith(prefix)))
                    continue
                switch (state) {
                    case State.all:
                        properties[groupedKeyNames.all] = propertyGroup[groupedKeyNames.all]
                        break
                    case State.selected:
                        properties[groupedKeyNames.selected] = propertyGroup[groupedKeyNames.selected]
                        break
                    case State.unselected:
                        properties[groupedKeyNames.unselected] = propertyGroup[groupedKeyNames.unselected]
                        break
                    case State.hovered:
                        properties[groupedKeyNames.hover] = propertyGroup[groupedKeyNames.hover]
                        break
                    case State.disabled:
                        properties[groupedKeyNames.disabled] = propertyGroup[groupedKeyNames.disabled]
                        break
                }
            }
        }

        return properties
    }

    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        let objectName = options.objectName;
        let objectEnumeration: VisualObjectInstance[] = [];

        let properties: { [propertyName: string]: DataViewPropertyValue } = {}


        const settings: VisualSettings = this.visualSettings || <VisualSettings>VisualSettings.getDefault();
        switch (objectName) {
            case "tileFill":
                properties.state = settings.tileFill.state
                properties.hoverStyling = settings.tileFill.hoverStyling
                properties = { ...properties, ...this.getEnumeratedStateProperties(settings.tileFill) }

                properties.showBgimg = settings.tileFill.showBgimg
                if(properties.showBgimg){
                    properties.img = settings.tileFill.img
                }
                break
            case "tileStroke":
                properties.state = settings.tileStroke.state
                properties.hoverStyling = settings.tileStroke.hoverStyling
                properties = { ...properties, ...this.getEnumeratedStateProperties(settings.tileStroke) }
                break
            case "text": {
                properties.show = settings.text.show
                let filtered = Object.keys(settings.text)
                    .reduce((obj, key) => {
                        obj[key] = settings.text[key]
                        return obj;
                    }, {})

                properties = { ...properties, ...this.getEnumeratedStateProperties(filtered) }
                break
            }
            case "icon":{
                properties.show = settings.icon.show
                let filtered = Object.keys(settings.icon)
                    .reduce((obj, key) => {
                        obj[key] = settings.icon[key]
                        return obj;
                    }, {})


                properties = { ...properties, ...this.getEnumeratedStateProperties(filtered) }
                break
            }
            case "shape": {
                let filtered = Object.keys(settings.shape)
                    .filter(key => !(key.endsWith("Angle") || key.endsWith("Length"))
                        || key == settings.shape.tileShape + "Angle"
                        || key == settings.shape.tileShape + "Length")
                    .reduce((obj, key) => {
                            obj[key] = settings.shape[key]
                            return obj;
                        }, {})
                properties = {...properties, ...filtered}
            }
            case "contentAlignment": {
                let filtered = Object.keys(settings.contentAlignment)
                    .reduce((obj, key) => {
                        obj[key] = settings.contentAlignment[key]
                        return obj;
                    }, {})
                properties = { ...properties, ...this.getEnumeratedStateProperties(filtered) }
                break
            }
            case "effect":{
                properties.shapeRoundedCornerRadius = settings.effect.shapeRoundedCornerRadius
                properties.state = settings.effect.state
                properties.hoverStyling = settings.effect.hoverStyling
                properties.gradient = settings.effect.gradient
                if (settings.effect.gradient){
                    properties.reverseGradient = settings.effect.reverseGradient
                    properties = { ...properties, ...this.getEnumeratedStateProperties(settings.effect, "gradient") }
                }
                properties.shadow = settings.effect.shadow
                if (settings.effect.shadow)
                    properties = { ...properties, ...this.getEnumeratedStateProperties(settings.effect, "shadow") }
                properties.glow = settings.effect.glow
                if (settings.effect.glow)
                    properties = { ...properties, ...this.getEnumeratedStateProperties(settings.effect, "glow") }
                break
            }
            case "content":
                properties.text = settings.content.text
                properties.icon = settings.content.icon
                break
        }
        objectEnumeration.push({
            objectName: objectName,
            properties: properties,
            selector: null
        })
        return objectEnumeration
    }

    public update(options: VisualUpdateOptions) {
       
        if (!(options && options.dataViews && options.dataViews[0]))
            return
        this.visualSettings = VisualSettings.parse(options.dataViews[0]) as VisualSettings
        let objects: powerbi.VisualObjectInstancesToPersist = getObjectsToPersist(this.visualSettings)
        if (objects.merge.length != 0)
            this.host.persistProperties(objects);


            this.shapeCollection.formatSettings.tileStroke = this.visualSettings.tileStroke
            this.shapeCollection.formatSettings.tileFill = this.visualSettings.tileFill
            this.shapeCollection.formatSettings.text = this.visualSettings.text
            this.shapeCollection.formatSettings.icon = this.visualSettings.icon
            this.shapeCollection.formatSettings.shape = this.visualSettings.shape
            this.shapeCollection.formatSettings.contentAlignment = this.visualSettings.contentAlignment
            this.shapeCollection.formatSettings.effect = this.visualSettings.effect

        this.shapeCollection.viewport = {
            height: options.viewport.height,
            width: options.viewport.width,
        }
        
            if (options.type == VisualUpdateType.Resize || options.type == VisualUpdateType.ResizeEnd) {
                this.shapeCollection.onResize()
            } else {
                // if (objects.merge.length == 0) //TODO allow this
                    this.shapeCollection.onDataChange(this.createShapeData())
            }
        }

        public createShapeData(): ShapeData[] {
            let shapeData: ShapeData[] =  [{
                text: this.visualSettings.text.show ? this.visualSettings.content.text : null,
                iconURL: this.visualSettings.icon.show ? this.visualSettings.content.icon :  null, 
                bgimgURL: this.visualSettings.tileFill.showBgimg ? this.visualSettings.tileFill.img : null,
            }];
            return shapeData
        }
    


    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }
}