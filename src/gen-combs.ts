import type { NumBlockRule } from './types';

class RuleError extends Error {
    public constructor(rule: NumBlockRule) {
        super(`Invalid rule ${JSON.stringify(rule)}`);
    }
}

export function genCombs(gameSize: number, rule: NumBlockRule): number[][] {
    const { cellIds, op, result } = rule;
    switch (op) {
        case '+':
            return genAddCombsNonUnique(gameSize, cellIds.length, result).
                filter((comb) => isUnique(gameSize, cellIds, comb));
        case '-':
            if (cellIds.length !== 2) {
                throw new RuleError(rule);
            }
            return genSubCombs(gameSize, result);
        case '*':
            return genMultCombsNonUnique(gameSize, cellIds.length, result).
                filter((comb) => isUnique(gameSize, cellIds, comb));
        case '/':
            if (cellIds.length !== 2) {
                throw new RuleError(rule);
            }
            return genDivCombs(gameSize, result);
    }
    if (cellIds.length !== 1) {
        throw new RuleError(rule);
    }
    return [[result]];
}

function genAddCombsNonUnique(gameSize: number, size: number, result: number): number[][] {
    if (size === 1) {
        if (result > gameSize) {
            return [];
        }
        return [[result]];
    }
    const combs: number[][] = [];
    for (let i = 1; i <= gameSize; ++i) {
        if (i < result) {
            combs.push(...genAddCombsNonUnique(gameSize, size - 1, result - i).
                filter((comb) => comb.length === size - 1).
                map((comb) => [i, ...comb]));
        }
    }
    return combs;
}

function genMultCombsNonUnique(gameSize: number, size: number, result: number): number[][] {
    if (size === 1) {
        if (result > gameSize) {
            return [];
        }
        return [[result]];
    }
    const combs: number[][] = [];
    for (let i = 1; i <= gameSize; ++i) {
        if (result % i === 0) {
            combs.push(...genMultCombsNonUnique(gameSize, size - 1, result / i).
                filter((comb) => comb.length === size - 1).
                map((comb) => [i, ...comb]));
        }
    }
    return combs;
}

function isUnique(gameSize: number, cellIds: number[], comb: number[]): boolean {
    const coors = cellIds.map((id) => [Math.floor(id / gameSize), id % gameSize]);
    for (let i = 0; i < coors.length - 1; ++i) {
        for (let j = i + 1; j < coors.length; ++j) {
            if ((coors[i][0] === coors[j][0] || coors[i][1] === coors[j][1]) && comb[i] === comb[j]) {
                return false;
            }
        }
    }
    return true;
}

function genSubCombs(gameSize: number, result: number): number[][] {
    const combs: number[][] = [];
    for (let a = 1; a < gameSize; ++a) {
        for (let b = a + 1; b <= gameSize; ++b) {
            if (b - a === result) {
                combs.push([a, b]);
                combs.push([b, a]);
            }
        }
    }
    return combs;
}

function genDivCombs(gameSize: number, result: number): number[][] {
    const combs: number[][] = [];
    for (let a = 1; a < gameSize; ++a) {
        for (let b = a + 1; b <= gameSize; ++b) {
            if (b / a === result) {
                combs.push([a, b]);
                combs.push([b, a]);
            }
        }
    }
    return combs;
}
