'use strict'
import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


try {
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
    let a = [];
    let b = [];


    const lines = data.trim().split("\n");
    lines.forEach(line => {
        const [left, right] = line.trim().split(/\s+/);
        a.push(parseInt(left));
        b.push(parseInt(right));
    });
    a.sort();
    b.sort();
    // a.sort((x, y) => x - y);
    // b.sort((x, y) => x - y);



    // Part one

    const findAbsDiff = (a, b) => {
        let sum = 0;
        // 1 Find two arrays elements abs and sum them ap
        for (let i = 0; i < a.length; i++) {
            let abs = Math.abs(a[i] - b[i]);
            sum += abs;
        }


        // 2 Return the sum
        return sum;

    }

    console.log(`Part one: ${findAbsDiff(a, b)}`);






    // Part two

    const proccessArray = (a, b) => {
        let sum = 0;
        let countMap = {};
        // 1 numbers in a how many times appear in b
        for (let i = 0; i < b.length; i++) {
            if (countMap[b[i]]) {
                countMap[b[i]]++;

            } else {
                countMap[b[i]] = 1;

            }

        }
        // 2 each number in a multiplied by times appernce
        for (let i = 0; i < a.length; i++) {
            let count = countMap[a[i]] || 0;
            sum += a[i] * count;

        }
        // 3 sum all numbers
        return sum;
    }

    console.log(`Part two ans: ${proccessArray(a, b)}`)


} catch (err) {
    console.log(err);
}










