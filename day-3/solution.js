'use strict'
import fs from 'node:fs/promises';
import path from 'path';
import { idText } from 'typescript';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


try {
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
    const mulRegex = /mul\(\d+,\d+\)/g
    const doRegex = /do\(\)/;
    const dontRegex = /don't\(\)/;
    let mulEnabled = true;
    let mull = data.match(mulRegex);
    let results = [];





    const extractedNums = mull.map(item => {
        const match = item.match(/\d+/g)
        return match ? match.map(Number) : null;
    })

    // Part one : version 1
    const ans = extractedNums.reduce((a, b) => a + b[0] * b[1], 0);
    // console.log(`Part one ans: ${ans}`);

    // Part one : version 2
    const res = (arr) => {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {

            sum += arr[i][0] * arr[i][1]

        }
        return sum;
    }

    console.log(`Part one ans: ${res(extractedNums)}`);



    // Part two 
    const tokens = data.split(/(?=mul\(|do\(\)|don't\(\))/);


    tokens.forEach(token => {

        if (doRegex.test(token)) {
            mulEnabled = true; // Enable mul
        } else if (dontRegex.test(token)) {
            mulEnabled = false; // Disable mul
        }
        if (mulRegex.test(token) && mulEnabled) {

            results.push(token.match(mulRegex)[0]); // Add valid mul instructions
        }
    });
    const extractedNumsPart2 = results.map(item => {
        const match = item.match(/\d+/g)
        return match ? match.map(Number) : null;
    })

    const part2ans = extractedNumsPart2.reduce((a, b) => a + b[0] * b[1], 0);
    console.log(`Part two ans: ${part2ans}`);












} catch (err) {
    console.log(err);
}
