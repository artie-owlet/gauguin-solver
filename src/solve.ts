import { genCombs } from './gen-combs';
import type { NumBlock, NumBlockRule } from './types';

export function solve(gameSize: number, rules: NumBlockRule[]): number[] | null {
    const solution = new Array<number>(gameSize * gameSize).fill(0);
    const blocks: NumBlock[] = rules.map((rule) => ({
        cellIds: rule.cellIds,
        combs: genCombs(gameSize, rule),
        horzCellIdsIndices: getCellIdsIndices(gameSize, rule.cellIds, true),
        vertCellIdsIndices: getCellIdsIndices(gameSize, rule.cellIds, false),
    }));

    setLastLeftNum(solution, blocks); // set numbers from "=" blocks
    return solveRecursively(gameSize, solution, blocks.filter((block) => block.combs.length > 1));
}

function getCellIdsIndices(gameSize: number, cellIds: number[], isHorz: boolean): number[][] {
    const indices: number[][] = [];
    for (let i = 0; i < gameSize; ++i) {
        indices.push(cellIds.filter((id) => (isHorz ? Math.floor(id / gameSize) : id % gameSize) === i).
            map((id) => cellIds.indexOf(id)));
    }
    return indices;
}

function solveRecursively(gameSize: number, solution: number[], blocks: NumBlock[]): number[] | null {
    let changed = false;
    while (solution.some((v) => v === 0)) {
        // changed = removeBySolved(gameSize, solution, blocks) || changed;
        changed = removeByDefinedSet(gameSize, blocks) || changed;

        if (blocks.some((block) => block.combs.length === 0)) {
            return null;
        }

        changed = setLastLeftNum(solution, blocks) || changed;

        blocks = blocks.filter((block) => block.combs.length > 1);

        if (!changed) {
        }
    }
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

// function removeBySolved(gameSize: number, solution: number[], blocks: NumBlock[]): boolean {
//     let changed = false;
//     solution.forEach((num, cellId) => {
//         if (num === 0) {
//             return;
//         }

//         const row = Math.floor(cellId / gameSize);
//         for (let i = 0; i < gameSize; ++i) {
//             const id = row * gameSize + i;
//             if (id === cellId) {
//                 continue;
//             }
//             changed = removeCombs(id, num, blocks) || changed;
//         }

//         const col = cellId % gameSize;
//         for (let i = 0; i < gameSize; ++i) {
//             const id = i * gameSize + col;
//             if (id === cellId) {
//                 continue;
//             }
//             changed = removeCombs(id, num, blocks) || changed;
//         }
//     });
//     return changed;
// }

function removeByDefinedSet(gameSize: number, blocks: NumBlock[]): boolean {
    let changed = false;
    blocks.forEach((block) => {
        [block.horzCellIdsIndices, block.vertCellIdsIndices].forEach((indicesList, isVert) => {
            indicesList.forEach((indices, rowcol) => {
                if (indices.length === 0) {
                    return;
                }

                const nums = new Set<number>();
                block.combs.forEach((comb) => {
                    indices.forEach((index) => nums.add(comb[index]));
                });
                if (nums.size !== indices.length) {
                    return;
                }

                for (let i = 0; i < gameSize; ++i) {
                    const cellId = isVert ? i * gameSize + rowcol : rowcol * gameSize + i;
                    if (block.cellIds.includes(cellId)) {
                        continue;
                    }
                    changed = removeCombs(cellId, Array.from(nums), blocks) || changed;
                }
            });
        });
    });
    return changed;
}

// TODO: map cellId to block
function removeCombs(cellId: number, nums: number[], blocks: NumBlock[]): boolean {
    return blocks.reduce((removed, block) => {
        const index = block.cellIds.indexOf(cellId);
        if (index < 0) {
            return removed;
        }
        const prevLen = block.combs.length;
        block.combs = block.combs.filter((comb) => !nums.includes(comb[index]));
        return removed + prevLen - block.combs.length;
    }, 0) > 0;
}
