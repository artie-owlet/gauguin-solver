import type { NumBlockRule, Operator } from './types';

/* eslint-disable no-console */
export function printSolution(sol: number[], w: number, h: number): void {
    for (let i = 0; i < h; ++i) {
        console.log(sol.slice(i * w, i * w + w).join(''));
    }
    console.log('------');
}

export function parseNumBlockRules(input: string): NumBlockRule[] {
    return input.split('\n').
        map((line) => line.trim()).
        filter((line) => line.length > 0).
        map((line, index) => {
            const res = (/^([0-9,]+)([+\-*/=])([0-9]+)$/g).exec(line);
            if (!res) {
                throw new Error(`Invalid rule on line ${index}`);
            }
            return {
                cellIds: res[1].split(',').map((id) => parseInt(id, 10)),
                op: <Operator>res[2],
                result: parseInt(res[3], 10),
            };
        });
}
