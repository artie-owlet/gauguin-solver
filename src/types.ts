export type Operator = '+' | '-' | '*' | '/' | '=';

export interface NumBlockRule {
    cellIds: number[];
    op: Operator;
    result: number;
}

export interface NumBlock {
    cellIds: number[];
    combs: number[][];
    horzCellIdsIndices: number[][];
    vertCellIdsIndices: number[][];
}
