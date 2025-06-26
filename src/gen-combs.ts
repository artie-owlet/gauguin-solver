import type { NumBox } from './types';

const permuts = (() => {
    let combs: number[][] = [];
    for (let i = 0; i < 6; i++) {
        const newCombs: number[][] = [];
        for (let n = 1; n <= 6; ++n) {
            newCombs.push(...combs.filter((comb) => !comb.includes(n)).map((comb) => [...comb, n]));
        }
        combs = newCombs;
    }
    return combs;
})();

export function genCombs(numBox: Omit<NumBox, 'combs'>): number[][] {
}

function genPlusCombs(size: number, result: number): number[][] {
}
