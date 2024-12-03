'use strict'

import { log } from 'node:console';
import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



try {
    // Read data from input.txt file
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
    // Split each line
    const rows = data.trim().split("\n");
    // Convert data(numbers) into 2D array
    const number2D = rows.map(row => row.split(' ').map(Number))


    // Part one

    // Finds Ascending sub arrays in number2D array and returns true or false
    const isAscending = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            const diff = arr[i + 1] - arr[i];
            if (diff < 1 || diff > 3) return false;
            if (diff <= 0) return false;

        }

        return true;

    }
    // Finds Descending sub arrays in number2D array and returns true or false
    const isDescending = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            const diff = arr[i] - arr[i + 1];
            if (diff < 1 || diff > 3) return false;
            if (diff <= 0) return false;

        }
        return true;
    }
    // Intilize var to count number of sub arrays
    let sortedCount = 0;
    // Loops number2D arrays and gives each sub array to 2 function
    number2D.forEach(row => {
        if (isAscending(row) || isDescending(row)) {
            sortedCount++;
        }

    });
    console.log(`Part one ans: ${sortedCount}`);


    // Part two

    const canBe = (arg) => {

        const isDescending = (arr) => {
            for (let i = 0; i < arr.length - 1; i++) {
                const diff = arr[i] - arr[i + 1];
                if (diff < 1 || diff > 3) return false;
                if (diff <= 0) return false;

            }
            return true;
        }

        const isAscending = (arr) => {
            for (let i = 0; i < arr.length - 1; i++) {
                const diff = arr[i + 1] - arr[i];
                if (diff < 1 || diff > 3) return false;
                if (diff <= 0) return false;

            }

            return true;

        }



        // Loops every element in sub array
        for (let i = 0; i < arg.length; i++) {
            const modefiedSequence = arg.slice(0, i).concat(arg.slice(i + 1));
            if (isAscending(modefiedSequence) || isDescending(modefiedSequence)) {
                return true;
            }

        }


        return false;

    }

    const countModefiedSeq = (data) => {
        let count = 0;
        data.forEach(row => {
            if (canBe(row)) {
                count++;
            }

        })

        return count;
    }

    console.log(`Part two ans: ${countModefiedSeq(number2D)}`);





} catch (err) {
    console.log(err);
}