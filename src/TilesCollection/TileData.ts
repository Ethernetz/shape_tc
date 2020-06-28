import {ContentFormatType} from './enums'
export class TileData{
    text?: string = "Text"
    textSecondary?: string
    iconURL?: string
    isSelected?: boolean
    isHovered?: boolean
    contentFormatType?: ContentFormatType
}