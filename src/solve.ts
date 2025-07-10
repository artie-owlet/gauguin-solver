import { genCombs } from './gen-combs';
import type { NumBlockRule } from './types';

interface NumBlock {
    cellIds: number[];
    combs: number[][];
}

interface CellInBlock {
    block: NumBlock;
    index: number;
}

interface Game {
    width: number;
    height: number;
    solution: number[];
    blocks: NumBlock[];
    cellIdToBlockMap: Map<number, CellInBlock>;
    horzIndicesCombs: Map<number, number[][]>; // size -> combs
    vertIndicesCombs: Map<number, number[][]>; // size -> combs
}

export function solve(width: number, height: number, rules: NumBlockRule[]): number[] | null {
    const game: Game = {
        width,
        height,
        solution: new Array<number>(width * height).fill(0),
        blocks: rules.map((rule) => ({
            cellIds: rule.cellIds,
            combs: genCombs(Math.max(width, height), rule),
        })),
        cellIdToBlockMap: new Map<number, CellInBlock>(),
        horzIndicesCombs: new Map<number, number[][]>(),
        vertIndicesCombs: new Map<number, number[][]>(),
    }
    game.solution.forEach((_, id) => {
        const block = game.blocks.find((b) => b.cellIds.includes(id));
        if (block) {
            game.cellIdToBlockMap.set(id, {
                block,
                index: block.cellIds.indexOf(id),
            });
        }
    });
    for (let i = 1; i < width; ++i) {
        game.horzIndicesCombs.set(i, getInidicesCombs(i, width));
    }
    for (let i = 1; i < height; ++i) {
        game.vertIndicesCombs.set(i, getInidicesCombs(i, height));
    }

    setLastLeftNum(game); // set numbers from "=" blocks
    return solveGame({
        ...game,
        blocks: game.blocks.filter((block) => block.combs.length > 1)
    });
}

function getInidicesCombs(size: number, max: number, from = 0): number[][] {
    if (size === 1) {
        return new Array(max - from).fill(0).map((_, i) => [i + from]);
    }
    const combs: number[][] = [];
    for (let i = from; i < max - size; ++i) {
        combs.push(...getInidicesCombs(size - 1, max, i + 1).map((comb) => [i, ...comb]));
    }
    return combs;
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

function removeByDefinedSet(game: Game): boolean {
    const possibleNums = game.solution.map((value, id) => {
        const nums = new Set<number>();
        const cellBlock = game.cellIdToBlockMap.get(id);
        if (cellBlock) {
            cellBlock.block.combs.forEach((comb) => nums.add(comb[cellBlock.index]));
        } else {
            nums.add(value);
        }
        return nums;
    });

    let changed = false;
    for (let setSize = 1; setSize < Math.max(game.width, game.height); ++setSize) {
        [false, true].forEach((isVert) => {
            const indicesCombs = (isVert ? game.vertIndicesCombs : game.horzIndicesCombs).get(setSize);
            if (!indicesCombs) {
                return;
            }

            // NOTE: isVert=true - combinations in columns, iterate from 1 to width
            for (let rowcol = 0; rowcol < (isVert ? game.width : game.height); ++rowcol) {
                indicesCombs.forEach((indices) => {
                    const nums = indices.reduce((acc, index) => {
                        const cellId = isVert ? index * game.width + rowcol : rowcol * game.width + index;
                        return acc.union(possibleNums[cellId]);
                    }, new Set<number>());
                    if (nums.size === setSize) {
                    }
                });
            }
        });
    }
    return changed;
}
