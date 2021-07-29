import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import parser from './parsers.js';
import render from './formatters/index.js';

const parse = (filePath) => {
  const fileFormat = (file) => path.extname(file).substring(1);
  const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');

  return parser(fileContent, fileFormat(filePath));
};

const makeNode = (key, type, children = null, oldValue = null, newValue = null) => ({
  key, type, children, oldValue, newValue,
});

const buildTree = (dataFirst, dataSecond) => {
  const keys = _.sortBy([
    ...new Set([...Object.keys(dataFirst), ...Object.keys(dataSecond)]),
  ]);

  return keys
    .map((key) => {
      if (!_.has(dataFirst, key)) {
        return makeNode(key, 'new', null, null, dataSecond[key]);
      }

      if (!_.has(dataSecond, key)) {
        return makeNode(key, 'deleted', null, dataFirst[key]);
      }

      if (_.isPlainObject(dataFirst[key]) && _.isPlainObject(dataSecond[key])) {
        return makeNode(key, 'nested', buildTree(dataFirst[key], dataSecond[key]));
      }

      if (!_.isEqual(dataFirst[key], dataSecond[key])) {
        return makeNode(key, 'changed', null, dataFirst[key], dataSecond[key]);
      }

      return makeNode(key, 'unchanged', null, dataFirst[key]);
    });
};

export default (filePath1, filePath2, format = 'stylish') => render(buildTree(parse(filePath1), parse(filePath2)), format);
