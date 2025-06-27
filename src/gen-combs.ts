import type { NumBox } from './types';

const GAME_SIZE = 6;

export function genCombs({ cellIds, op, result}: Omit<NumBox, 'combs'>): number[][] {
    switch (op) {
        case '+':
            return genAddCombsNonUnique(cellIds.length, result).filter((comb) => isUnique(cellIds, comb));
        case '-':
            return genSubCombs(result);
        case '*':
            return genMultCombsNonUnique(cellIds.length, result).filter((comb) => isUnique(cellIds, comb));
        case '/':
            return genDivCombs(result);
    }
    return [[result]];
}

function genAddCombsNonUnique(size: number, result: number): number[][] {
    if (size === 1) {
        return [[result]];
    }
    const combs: number[][] = [];
    for (let i = 1; i <= GAME_SIZE; ++i) {
        if (i < result) {
            combs.push(...genAddCombsNonUnique(size - 1, result - i).map((comb) => [i, ...comb]));
        }
    }
    return combs;
}

function genMultCombsNonUnique(size: number, result: number): number[][] {
    if (size === 1) {
        return [[result]];
    }
    const combs: number[][] = [];
    for (let i = 1; i <= GAME_SIZE; ++i) {
        if (result % i === 0) {
            combs.push(...genMultCombsNonUnique(size - 1, result / i).map((comb) => [i, ...comb]));
        }
    }
    return combs;
}

function isUnique(cellIds: number[], comb: number[]): boolean {
    const coors = cellIds.map((id) => [Math.floor(id / GAME_SIZE), id % GAME_SIZE]);
    for (let i = 0; i < coors.length - 1; ++i) {
        for (let j = i + 1; j < coors.length; ++j) {
            if ((coors[i][0] === coors[j][0] || coors[i][1] === coors[j][1]) && comb[i] === comb[j]) {
                return false;
            }
        }
    }
    return true;
}

function genSubCombs(result: number): number[][] {
    const combs: number[][] = [];
    for (let a = 1; a < GAME_SIZE; ++a) {
        for (let b = a + 1; b <= GAME_SIZE; ++b) {
            if (b - a === result) {
                combs.push([a, b]);
                combs.push([b, a]);
            }
        }
    }
    return combs;
}

function genDivCombs(result: number): number[][] {
    const combs: number[][] = [];
    for (let a = 1; a < GAME_SIZE; ++a) {
        for (let b = a + 1; b <= GAME_SIZE; ++b) {
            if (b / a === result) {
                combs.push([a, b]);
                combs.push([b, a]);
            }
        }
    }
    return combs;
}
