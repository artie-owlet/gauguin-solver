import type { NumBlockRule, Operator } from './types';

/* eslint-disable no-console */
export function printSolution(sol: number[], w: number, h: number): void {
    for (let i = 0; i < h; ++i) {
        console.log(sol.slice(i * w, i * w + w).join(''));
    }
    console.log('------');
}

export function parseNumBlockRules(input: string): NumBlockRule[] {
    return input.split('\n').
        map((line) => line.trim()).
        filter((line) => line.length > 0).
        map((line, index) => {
            const res = (/^([0-9,]+)([+\-*/=])([0-9]+)$/g).exec(line);
            if (!res) {
                throw new Error(`Invalid rule on line ${index}`);
            }
            return {
                cellIds: res[1].split(',').map((id) => parseInt(id, 10)),
                op: <Operator>res[2],
                result: parseInt(res[3], 10),
            };
        });
}

interface Rules {
    width: number;
    height: number;
    blocks: NumBlockRule[];
}

export function parseRules(input: string): Rules {
    const [blockRules, field] = input.split('\n\n');

    const blocks = new Map<string, NumBlockRule>();
    blockRules.split('\n').forEach((line, index) => {
        const res = (/^([0-9A-Za-z])([+\-*/=])([0-9]+)$/g).exec(line);
        if (!res) {
            throw new Error(`Invalid rule on line ${index}`);
        }
        blocks.set(res[1], {
            cellIds: [],
            op: <Operator>res[2],
            result: parseInt(res[3], 10),
        });
    });

    const rows = field.split('\n').filter((row) => row.length > 0);
    const height = rows.length;
    const width = rows[0].length;
    if (rows.some((row) => row.length !== width)) {
        throw new Error('Field rows have different lengths');
    }
    rows.forEach((row, rowIndex) => {
        row.split('').forEach((char, index) => {
            const block = blocks.get(char);
            if (!block) {
                throw new Error(`Unknown block ${char} at (${rowIndex}, ${index})`);
            }
            block.cellIds.push(rowIndex * width + index);
        });
    });

    return {
        width,
        height,
        blocks: Array.from(blocks.values()),
    };
}
