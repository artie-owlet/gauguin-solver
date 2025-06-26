export type Operator = '+' | '-' | '*' | '/' | '=';

export interface NumBox {
    cellIds: number[];
    op: Operator;
    result: number;
    combs: number[][];
}

export interface Game {
    cells: number[];
    numBoxes: NumBox[];
}
