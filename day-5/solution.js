'use strict'

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




try {
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });
    const input = data.trim().split(/[\r\n]+/)
    const rules2D = input.filter(item => item.includes('|')).map(line => line.split("|").map(Number));
    const updates2D = input.filter(item => item.includes(',')).map(line => line.split(",").map(Number));



    function indexRules(rules) {
        const result = {}
        for (const rule of rules) {
            let [left, right] = rule;
            if (result[left] === undefined) {
                result[left] = new Set();
            }
            result[left].add(right)

        }

        return result
    }

    function validateUpdate(update, rulesIndex) {
        for (let i = 0; i < update.length; i++) {
            for (let j = i + 1; j < update.length - 1; j++) {
                const left = update[i];
                const right = update[j];


                if (!rulesIndex[left]?.has(right)) {
                    return false
                }

            }
        }



        return true;
    }


    function midValue(arr) {
        return arr[Math.floor((arr.length / 2))];
    }

    function ans1(rules, updates) {
        let sum = 0;
        const rulesIndex = indexRules(rules);
        const validUpdates = updates.filter(update =>
            validateUpdate(update, rulesIndex)
        )


        const mid = validUpdates.map(midValue)
        mid.forEach(e => {
            sum += e

        });
        return sum;
    }

    function fixUdate(update, rulesIndex) {
        return update.toSorted((a, b) => {
            if (rulesIndex[a]?.has(b)) return -1;
            if (rulesIndex[b]?.has(a)) return 1;
            return 0;
        })
    }

    function ans2(rules, updates) {
        let sum = 0;
        const rulesIndex = indexRules(rules);
        const invaildUpdates = updates.filter(update => !validateUpdate(update, rulesIndex));
        const fixedUpdates = invaildUpdates.map(update => fixUdate(update, rulesIndex));
        const mid = fixedUpdates.map(midValue)
        mid.forEach(e => {
            sum += e

        });
        return sum;
    }

    console.log(`Part one ans: ${ans1(rules2D, updates2D)}`);
    console.log(`Part two ans: ${ans2(rules2D, updates2D)}`);












    // for (const update of updates) {
    //     for (let i = 1; i < update.length; i++) {
    //         console.log(update[0], update[i])






    //     }

    // }

















































} catch (error) {

}