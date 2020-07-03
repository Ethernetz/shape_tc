export interface PropertyGroupKeys {
    default: string,
    all: string,
    selected: string,
    unselected: string,
    hover: string
}

export interface PropertyGroupValues {
    default: string | number,
    all: string | number,
    selected: string | number,
    unselected: string | number,
    hover: string | number,
}

export interface Viewport {
    height: number;
    width: number;
}


export interface Handle{
    buttonXPos: number,
    buttonYPos: number,
    buttonWidth: number,
    buttonHeight: number,
    xPos: number,
    yPos: number,
    axis: string,
    propName: string,
    disp: number,
    z: number,
    handleFocused: boolean,
}

export interface boundingBox{
    xPos: number,
    yPos: number,
    width: number,
    height: number
}