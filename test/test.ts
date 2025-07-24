import { expect } from '@artie-owlet/chifir';

import { solve } from '../src/solve';
import { parseRules } from '../src/util';

const input9 = `
a*168
b*840
c+18
d*648
e*378
f*64
g*90
h*40
i*504
j+16
k*36
l=9
m*160
n+13
o=3
p-6
q-2
r*84
s*30
t*432
u*240
v+14
w=5
x/8
y*168
z-8
0=8
1*30

aaabbcccd
aeebffgcd
heibfggdd
heijklmmm
hiijkknnn
opjjqrnss
tpuuqrvvv
twuurrxxy
tzz0111yy
`.trim();

const result9 = `
746382951
173548629
461725398
237169584
598416732
382974165
825691473
954237816
619853247
`.trim().split('').map((n) => parseInt(n, 10));

describe('solve()', () => {
    it('should solve 9x9', () => {
        const { width, height, blocks } = parseRules(input9);
        const solution = solve(width, height, blocks);
        expect(solution[0]).equal(result9);
    });
});
