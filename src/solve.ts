import { genCombs } from './gen-combs';
import type { NumBlock, NumBlockRule } from './types';

export function solve(gameSize: number, rules: NumBlockRule[]): number[] {
    const solution = new Array<number>(gameSize * gameSize).fill(0);
    const blocks: NumBlock[] = rules.map((rule) => ({ ...rule, combs: genCombs(gameSize, rule) }));
    let changed = false;
    do {
    } while (changed && solution.some((v) => v === 0));
    return solution;
}

function setLastLeftNum(solution: number[], blocks: NumBlock[]): boolean {
    let changed = false;
    blocks.forEach(({ cellIds, combs }) => {
        cellIds.forEach((cellId, index) => {
            if (solution[cellId] !== 0) {
                return;
            }
            const first = combs[0][index];
            if (combs.every((comb) => comb[index] === first)) {
                solution[cellId] = first;
                changed = true;
            }
        });
    });
    return changed;
}

function removeCombs(gameSize: number, solution: number[], blocks: NumBlock[]): boolean {
    let changed = false;
    solution.forEach((cell, cellId) => {
        if (cell === 0) {
            return;
        }
        const row = Math.floor(cellId / gameSize);
        const col = cellId % gameSize;
        for (let i = 0; i < gameSize; ++i) {
            const id = row * gameSize + i;
            if (id === cellId) {
                continue;
            }
        }
    });
}
