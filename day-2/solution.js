'use strict'

import { log } from 'node:console';
import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



try {
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });



    const rows = data.trim().split("\n");
    const number2D = rows.map(row => row.split(' ').map(Number))

    const isAscending = (arr) => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            } else {
                return true;
            }

        }

    }

    const isDescending = (arr) => {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) {
                return false;
            } else {
                return true;
            }

        }
    }

    let sortedCount = 0;



    number2D.forEach(row => {

        console.log('1', isAscending(row));

        if (isAscending(row)) {
            sortedCount++;
        }
        // if (isDescending(row)) {
        //     sortedCount++;
        // }
    });

    console.log(sortedCount);





















} catch (err) {
    console.log(err);
}