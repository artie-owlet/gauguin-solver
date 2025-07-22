import type { NumBlockRule } from './types';

export function validateRules(width: number, height: number, rules: NumBlockRule[]): void {
    if (width < 3 || height < 3) {
        throw new Error('Invalid size');
    }
    const allCellIds = new Set<number>();
    rules.forEach((rule, ruleId) => {
        if (rule.result < 0 || Math.floor(rule.result) !== rule.result) {
            throw new Error(`Invalid result ${rule.result} in block ${ruleId}`);
        }
        rule.cellIds.forEach((id) => {
            if (id < 0 || id >= width * height) {
                throw new Error(`Invalid cell id ${id} in block ${ruleId}`);
            }
            if (allCellIds.has(id)) {
                throw new Error(`Duplicate cell id ${id} in block ${ruleId}`);
            }
            allCellIds.add(id);
        });
    });
}
