import { genCombs } from './gen-combs';
import type { NumBlock, NumBlockRule } from './types';

export function solve(gameSize: number, rules: NumBlockRule[]): number[] {
    const solution = new Array<number>(gameSize * gameSize).fill(0);
    const blocks: NumBlock[] = rules.map((rule) => ({
        ...rule,
        combs: genCombs(gameSize, rule),
        horzCellIdsIndices: getCellIdsIndices(gameSize, rule.cellIds, true),
        vertCellIdsIndices: getCellIdsIndices(gameSize, rule.cellIds, false),
    }));

    setLastLeftNum(solution, blocks); // set numbers from "=" blocks
    let changed = false;
    do {
        changed = removeBySolvedOne(gameSize, solution, blocks) || changed;

        changed = setLastLeftNum(solution, blocks) || changed;
    } while (changed && solution.some((v) => v === 0));
    return solution;
}

function getCellIdsIndices(gameSize: number, cellIds: number[], isHorz: boolean): number[][] {
    const indices: number[][] = [];
    for (let i = 0; i < gameSize; ++i) {
        indices.push(cellIds.filter((id) => (isHorz ? Math.floor(id / gameSize) : id % gameSize) === i).
            map((id) => cellIds.indexOf(id)));
    }
    return indices;
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

function removeCombs(cellId: number, num: number, blocks: NumBlock[]): void {
    blocks.forEach((block) => {
        const index = block.cellIds.indexOf(cellId);
        if (index < 0) {
            return;
        }
        block.combs = block.combs.filter((comb) => comb[index] !== num);
    });
}

function removeBySolvedOne(gameSize: number, solution: number[], blocks: NumBlock[]): boolean {
    let changed = false;
    solution.forEach((num, cellId) => {
        if (num === 0) {
            return;
        }

        const row = Math.floor(cellId / gameSize);
        for (let i = 0; i < gameSize; ++i) {
            const id = row * gameSize + i;
            if (id === cellId) {
                continue;
            }
            removeCombs(id, num, blocks);
            changed = true;
        }

        const col = cellId % gameSize;
        for (let i = 0; i < gameSize; ++i) {
            const id = i * gameSize + col;
            if (id === cellId) {
                continue;
            }
            removeCombs(id, num, blocks);
            changed = true;
        }
    });
    return changed;
}

function removeByDefinedSet(gameSize: number, blocks: NumBlock[]): boolean {
    let changed = false;
    blocks.forEach((block) => {
        block.horzCellIdsIndices.map((indices, col) => <const>[indices, col]).
            filter(([indices]) => indices.length > 1).
            forEach(([indices, col]) => {
                const nums = new Set<number>();
                block.combs.forEach((comb) => {
                    indices.forEach((index) => {
                    });
                });
            });
    });
    return changed;
}
