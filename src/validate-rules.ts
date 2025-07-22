import type { NumBlockRule } from './types';

export function validateRules(width: number, height: number, blocks: NumBlockRule[]): void {
    if (width < 3 || height < 3) {
        throw new Error('Invalid size');
    }
    const allCellIds = new Set<number>();
    blocks.forEach((block, blockId) => {
        if (block.result < 0 || Math.floor(block.result) !== block.result) {
            throw new Error(`Invalid result ${block.result} in block ${blockId}`);
        }
        block.cellIds.forEach((id) => {
            if (id < 0 || id >= width * height) {
                throw new Error(`Invalid cell id ${id} in block ${blockId}`);
            }
            if (allCellIds.has(id)) {
                throw new Error(`Duplicate cell id ${id} in block ${blockId}`);
            }
            allCellIds.add(id);
        });
    });
}
