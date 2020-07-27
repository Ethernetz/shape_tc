/*
 *  Power BI Visualizations
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

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
import * as TileCollectionFormatSettings from "./TilesCollection/FormatSettings"
import { State} from "./TilesCollection/enums";
import { StatesUsed } from "./TilesCollection/interfaces";

export class TileFillSettings extends TileCollectionFormatSettings.TileFillSettings {
  state: State = State.unselected
  statesUsed: StatesUsed = {
    selected: false,
    unselected: true,
    hover: false,
    disabled: false
  }
  public showBgimg: boolean = false
  public img: string = ""
}

export class TileStrokeSettings extends TileCollectionFormatSettings.TileStrokeSettings{
  state: State = State.unselected
  statesUsed: StatesUsed = {
    selected: false,
    unselected: true,
    hover: false,
    disabled: false
  }
}


export class TextSettings extends TileCollectionFormatSettings.TextSettings {
  state: State = State.unselected
  statesUsed: StatesUsed = {
    selected: false,
    unselected: true,
    hover: false,
    disabled: false
  }
}


export class IconSettings extends TileCollectionFormatSettings.IconSettings {
  state: State = State.unselected
  statesUsed: StatesUsed = {
    selected: false,
    unselected: true,
    hover: false,
    disabled: false
  }
}

export class ShapeSettings extends TileCollectionFormatSettings.ShapeSettings{
}


export class ContentAlignmentSettings extends TileCollectionFormatSettings.ContentAlignmentSettings{
  state: State = State.unselected
  statesUsed: StatesUsed = {
    selected: false,
    unselected: true,
    hover: false,
    disabled: false
  }
}

export class EffectSettings extends TileCollectionFormatSettings.EffectSettings {
  state: State = State.unselected
  statesUsed: StatesUsed = {
    selected: false,
    unselected: true,
    hover: false,
    disabled: false
  }
}

export class ContentSettings {
  public text: string = "Shape Text"
  public icon: string = ""
}

export class VisualSettings extends DataViewObjectsParser {
  public tileFill: TileFillSettings = new TileFillSettings();
  public tileStroke: TileStrokeSettings = new TileStrokeSettings();
  public text: TextSettings = new TextSettings();
  public icon: IconSettings = new IconSettings();
  public shape: ShapeSettings = new ShapeSettings();
  public content: ContentSettings = new ContentSettings();
  public contentAlignment: ContentAlignmentSettings = new ContentAlignmentSettings();
  public effect: EffectSettings = new EffectSettings();
}