import { genCombs } from './gen-combs';
import type { NumBlockRule } from './types';

interface NumBlock {
    cellIds: number[];
    combs: number[][];
}

interface CellBlockItem {
    block: NumBlock;
    index: number;
}

interface Game {
    gameSize: number;
    solution: number[];
    blocks: NumBlock[];
    cellBlocks: Map<number, CellBlockItem>;
}

export function solve(gameSize: number, rules: NumBlockRule[]): number[] | null {
    const game: Game = {
        gameSize,
        solution: new Array<number>(gameSize * gameSize).fill(0);
        blocks: rules.map((rule) => ({
            cellIds: rule.cellIds,
            combs: genCombs(gameSize, rule),
        })),
        cellBlocks: new Map<number, CellBlockItem>(),
    }
    game.solution.forEach((_, id) => {
        const block = game.blocks.find((b) => b.cellIds.includes(id));
        if (block) {
            game.cellBlocks.set(id, {
                block,
                index: block.cellIds.indexOf(id),
            });
        }
    });

    setLastLeftNum(game); // set numbers from "=" blocks
    return solveGame({
        ...game,
        blocks: game.blocks.filter((block) => block.combs.length > 1)
    });
}

function solveGame(game: Game): number[] | null {
    let changed = false;
    while (game.solution.some((v) => v === 0)) {
        changed = removeByDefinedSet(game) || changed;

        if (game.blocks.some((block) => block.combs.length === 0)) {
            return null;
        }

        changed = setLastLeftNum(game) || changed;

        game.blocks = game.blocks.filter((block) => block.combs.length > 1);

        if (!changed) {
        }
    }
    return game.solution;
}

function setLastLeftNum({ solution, blocks }: Game): boolean {
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

// function removeByDefinedSet(gameSize: number, blocks: NumBlock[]): boolean {
//     let changed = false;
//     blocks.forEach((block) => {
//         [block.horzCellIdsIndices, block.vertCellIdsIndices].forEach((indicesList, isVert) => {
//             indicesList.forEach((indices, rowcol) => {
//                 if (indices.length === 0) {
//                     return;
//                 }

//                 const nums = new Set<number>();
//                 block.combs.forEach((comb) => {
//                     indices.forEach((index) => nums.add(comb[index]));
//                 });
//                 if (nums.size !== indices.length) {
//                     return;
//                 }

//                 for (let i = 0; i < gameSize; ++i) {
//                     const cellId = isVert ? i * gameSize + rowcol : rowcol * gameSize + i;
//                     if (block.cellIds.includes(cellId)) {
//                         continue;
//                     }
//                     changed = removeCombs(cellId, Array.from(nums), blocks) || changed;
//                 }
//             });
//         });
//     });
//     return changed;
// }

function removeByDefinedSet({ gameSize, blocks }: Game): boolean {
    for (let setSize = 1; setSize < gameSize - 1; ++setSize) {
    }
}
