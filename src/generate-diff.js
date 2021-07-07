import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';

const parse = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Resource ${filePath} does not exist`);
  }

  return JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));
};

export default (filePath1, filePath2) => {
  const first = parse(filePath1);
  const second = parse(filePath2);

  const keys = _.sortBy([
    ...new Set([...Object.keys(first), ...Object.keys(second)]),
  ]);

  const result = keys.map((key) => {
    if (_.has(first, key) && _.has(second, key)) {
      if (first[key] === second[key]) {
        return `    ${key}: ${first[key]}`;
      }

      if (first[key] !== second[key]) {
        return `  - ${key}: ${first[key]}\n  + ${key}: ${second[key]}`;
      }
    }

    if (!_.has(first, key)) {
      return `  + ${key}: ${second[key]}`;
    }

    return `  - ${key}: ${first[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};
