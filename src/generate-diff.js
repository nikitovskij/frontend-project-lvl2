import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import parser from './parsers.js';

const parse = (filePath) => {
  const fileFormat = (file) => path.extname(file).substring(1);
  const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');

  return parser(fileContent, fileFormat(filePath));
};

export default (filePath1, filePath2) => {
  const first = parse(filePath1);
  const second = parse(filePath2);

  const keys = _.sortBy([
    ...new Set([...Object.keys(first), ...Object.keys(second)]),
  ]);

  const result = keys
    .map((key) => {
      const firstValue = first[key] ?? null;
      const secondValue = second[key] ?? null;

      if (_.has(first, key) && _.has(second, key)) {
        if (firstValue === secondValue) {
          return `    ${key}: ${firstValue}`;
        }

        if (firstValue !== secondValue) {
          return `  - ${key}: ${firstValue}\n  + ${key}: ${secondValue}`;
        }
      }

      if (!_.has(first, key)) {
        return `  + ${key}: ${secondValue}`;
      }

      return `  - ${key}: ${firstValue}`;
    })
    .join('\n');

  return `{\n${result}\n}`;
};
