import { genCombs } from './gen-combs';
import type { NumBlockRule } from './types';

export function solve(gameSize: number, rules: NumBlockRule[]): number[] {
    const solution = new Array<number>(gameSize * gameSize).fill(0);
    const blocks = rules.map((rule) => ({ ...rule, combs: genCombs(gameSize, rule) }));
    return solution;
}
