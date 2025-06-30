export type Operator = '+' | '-' | '*' | '/' | '=';

export interface NumBlockRule {
    cellIds: number[];
    op: Operator;
    result: number;
}

export interface NumBlock extends NumBlockRule {
    combs: number[][];
}

export interface Game {
    cells: number[];
    numBoxes: NumBlockRule[];
}
