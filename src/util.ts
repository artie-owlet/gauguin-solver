/* eslint-disable no-console */
export function printSolution(sol: number[], w: number, h: number): void {
    for (let i = 0; i < h; ++i) {
        console.log(sol.slice(i * w, i * w + w).join(''));
    }
    console.log('------');
}
