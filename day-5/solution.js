'use strict'

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



try {
    const data = await fs.readFile(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' });
    console.log(data);


} catch (error) {

}