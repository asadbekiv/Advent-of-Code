// 'use strict'


// import fs from 'node:fs/promises'
// import path from 'node:path'
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// try {
//     const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });
//     const arr = [];
//     let modifiedData = [];
//     const input = data.trim().split('').forEach(e => arr.push(parseInt(e)));




//     function individualBlocks(arr) {
//         let count = -1;

//         for (let i = 0; i < arr.length; i++) {
//             if (i % 2 === 0) {
//                 count = count + 1;
//                 arr[i] = String(count).repeat(arr[i]);

//             } else {
//                 arr[i] = 'x'.repeat(arr[i]);

//             }

//         }




//         return arr.join("").split("");



//     }








//     function helper(arr) {



//         let p_free = 0;
//         let p_file = arr.length - 1;
//         while (true) {
//             while (p_free < p_file && arr[p_free] !== 'x') {
//                 p_free += 1;

//             }
//             while (p_free < p_file && arr[p_file] === 'x') {
//                 p_file -= 1;

//             }

//             if (p_free >= p_file) {
//                 return;

//             }

//             arr[p_free], arr[p_file] = arr[p_file], arr[p_free]

//         }

//     }

//     let result = individualBlocks(arr);
//     helper(result);




















// } catch (error) {
//     console.log(error);


// }



'use strict';

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function processFile() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });
        const arr = data.trim().split('').map(Number);




        function individualBlocks(arr) {
            let count = -1;

            for (let i = 0; i < arr.length; i++) {
                if (i % 2 === 0) {
                    count += 1;
                    arr[i] = String(count).repeat(arr[i]);
                } else {
                    arr[i] = 'x'.repeat(arr[i]);
                }
            }

            return arr.join('').split('');
        }

        function rearrange(arr) {
            let p_free = 0;
            let p_file = arr.length - 1;

            while (p_free < p_file) {
                while (p_free < p_file && arr[p_free] !== 'x') p_free++;
                while (p_free < p_file && arr[p_file] === 'x') p_file--;

                if (p_free <= p_file) {
                    [arr[p_free], arr[p_file]] = [arr[p_file], arr[p_free]];
                }
            }
        }
        // function checkSum(arg) {


        //     let modefiledArr = [];
        //     let sum = 0;

        //     let arr = arg.split("").map((e) => {
        //         if (e !== "x") {
        //             modefiledArr.push(parseInt(e));
        //         }
        //     });

        //     for (let i = 0; i < modefiledArr.length; i++) {

        //         sum = sum + i * modefiledArr[i]

        //     }
        //     return sum;
        // }

        function checkSum(arg) {
            return arg
                .split('')
                .reduce((sum, val, index) => (val !== 'x' ? sum + index * parseInt(val) : sum), 0);
        }

        let result = individualBlocks(arr);
        rearrange(result);

        const checksum = checkSum(result.join(''));

        console.log('Checksum:', checksum)
        // 6463499258318
        // 91411296588
        // console.log(checkSum(result.join('')));

        // console.log(result.join(''));
    } catch (error) {
        console.error('Error:', error);
    }
}

processFile();
