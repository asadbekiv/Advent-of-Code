'use strict'

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });
    const input = data.trim().split(/[\r\n]+/);
    const result = input.map(line => {
        const [key, values] = line.split(':');

        return {
            key: Number(key.trim()),
            values: values.trim().split(' ').map(Number)
        };

    });

    function canCreateTarget(numbers, target) {
        function helper(index, currentValue) {
            if (index === numbers.length) {
                return currentValue === target;
            }
            if (helper(index + 1, currentValue + numbers[index])) {
                return true;
            }

            if (helper(index + 1, currentValue * numbers[index])) {
                return true;
            }

            const concatinatedValue = parseInt(`${currentValue}${numbers[index]}`, 10);
            if (helper(index + 1, concatinatedValue)) {
                return true;
            };

            return false;
        }

        return helper(1, numbers[0]);
    }

    function canCreateTarget1(numbers, target) {
        function helper(index, currentValue) {
            if (index === numbers.length) {
                return currentValue === target;
            }
            if (helper(index + 1, currentValue + numbers[index])) {
                return true;
            }

            if (helper(index + 1, currentValue * numbers[index])) {
                return true;
            }

            return false;
        }

        return helper(1, numbers[0]);
    }

    let sum = 0;
    let sum1 = 0
    result.forEach(e => {
        if (canCreateTarget(e.values, e.key) === true) {
            sum += e.key;
        }
        if (canCreateTarget1(e.values, e.key) === true) {
            sum1 += e.key;

        }
    })






    console.log(`Part One ans: ${sum1}`);
    console.log(`Part Two ans: ${sum}`);

















} catch (error) {
    console.log(error);


}