'use strict'

import fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


try {
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf8' });
    const grid = data.trim().split(/[\r\n]+/)



    const word = 'XMAS';
    const wordLength = word.length;
    const rowCount = grid.length;
    const colCount = grid[0].length;
    const directions = [
        [0, 1],   // Right
        [0, -1],  // Left
        [1, 0],   // Down
        [-1, 0],  // Up
        [1, 1],   // Diagonal down-right
        [-1, -1], // Diagonal up-left
        [1, -1],  // Diagonal down-left
        [-1, 1],  // Diagonal up-right
    ];

    function findWordFromPositoon(grid, word, row, col, direction) {
        for (let i = 0; i < wordLength; i++) {
            const newRow = row + i * direction[0];
            const newCol = col + i * direction[1];
            if (newRow < 0 || newRow >= rowCount ||
                newCol < 0 || newCol >= colCount ||
                grid[newRow][newCol] !== word[i]) return false;

        }
        return true
    }

    function countOccurrences(grid, row) {
        let count = 0;
        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < colCount; col++) {
                for (const direction of directions) {
                    if (findWordFromPositoon(grid, word, row, col, direction)) {
                        count++;
                    }

                }
            }
        }
        return count;
    }

    const occurrences = countOccurrences(grid, word);

    console.log(`Part one ans: ${occurrences}`);




} catch (error) {
    console.log(error);


}