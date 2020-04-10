import { promisify } from 'util';
import { exec } from 'child_process';
import { readFile, writeFile } from 'fs';

export const run = promisify(exec);
export const read = promisify(readFile);
export const write = promisify(writeFile);
