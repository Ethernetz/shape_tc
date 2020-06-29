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
import { AlignmentType, TileSizingType, TileLayoutType, TileShape, Direction, IconPlacement, State } from './TilesCollection/enums'
import { ContentSource } from './enums'

export class TileSettings extends TileCollectionFormatSettings.TileSettings {
  public colorA: string = "#262222";
  public strokeA: string = "#000";
  public strokeWidthA: number = 0;
  public transparencyA: number = 0;
}

export class TextSettings extends TileCollectionFormatSettings.TextSettings {
  public colorA: string = "#fff";
  public alignmentA: AlignmentType = AlignmentType.center;
  public fontSizeA: number = 14;
  public fontFamilyA: string = "wf_standard-font, helvetica, arial, sans-serif";
  public hmarginA: number = 0;
  public bmarginA: number = 0;
  public transparencyA: number = 0;
}

export class IconSettings extends TileCollectionFormatSettings.IconSettings {
  public placementA: IconPlacement = IconPlacement.left;
  public widthA: number = 40;
  public hmarginA: number = 10;
  public topMarginA: number = 10;
  public bottomMarginA: number = 10;
  public transparencyA: number = 0;
}

export class LayoutSettings extends TileCollectionFormatSettings.LayoutSettings {
}

export class EffectSettings extends TileCollectionFormatSettings.EffectSettings {

  public shadowColorA: string = "#000"
  public shadowTransparencyA: number = 70
  public shadowDirectionA: Direction = Direction.bottom_right
  public shadowDistanceA: number = 2
  public shadowStrengthA: number = 4
  public glowColorA: string = "#3380FF"
  public glowTransparencyA: number = 0
  public glowStrengthA: number = 2
}

export class ContentSettings {
  public multiselect: boolean = false
  public source: ContentSource = ContentSource.fixed

  public n: number = 1
  public icons: boolean = false
  public text: string = "Shape Text"
  public icon: string = ""
}

export class BgImgSettings{
  public img: string = ""
}

export class VisualSettings extends DataViewObjectsParser {
  public tile: TileSettings = new TileSettings();
  public text: TextSettings = new TextSettings();
  public icon: IconSettings = new IconSettings();
  public layout: LayoutSettings = new LayoutSettings();
  public effects: EffectSettings = new EffectSettings();
  public bgimg: BgImgSettings = new BgImgSettings();
  public content: ContentSettings = new ContentSettings();
}