import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

describe('Difference generator', () => {
  test('Stylish: `json` format', () => {
    expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile('stylish.txt'));
  });
  test('Stylish: `yml` format', () => {
    expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'))).toEqual(readFile('stylish.txt'));
  });
  test('Plain: `json` format', () => {
    expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('plain.txt'));
  });
  test('Plain: `yml` format', () => {
    expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('plain.txt'));
  });
});
