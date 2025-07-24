/* eslint-disable no-console */
import { readFileSync } from 'fs';

import { solve } from './solve';
// import type { NumBlockRule, Operator } from './types';
import { parseRules, printSolution } from './util';

// const WIDTH = 9;
// const HEIGHT = 7;

const input = readFileSync('./input9s.txt');
// const rules = input.toString().split('\n').
//     map((line) => line.trim()).
//     filter((line) => line.length > 0).
//     map((line, index) => {
//         const res = (/^([0-9,]+)([+\-*/=])([0-9]+)$/g).exec(line);
//         if (!res) {
//             throw new Error(`Invalid rule on line ${index}`);
//         }
//         return {
//             cellIds: res[1].split(',').map((id) => parseInt(id, 10)),
//             op: <Operator>res[2],
//             result: parseInt(res[3], 10),
//         } satisfies NumBlockRule;
//     });

const { width, height, blocks } = parseRules(input.toString());

const result = solve(width, height, blocks);
if (result.length === 0) {
    console.error('No solutions');
} else {
    result.forEach((sol, index) => {
        console.log(`#${index + 1}`);
        printSolution(sol, width, height);
    });
}
