export type Operator = '+' | '-' | '*' | '/' | '=';

export interface NumBlockRule {
    cellIds: number[];
    op: Operator;
    result: number;
}
