import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);

const stringify = (value, depth = 0) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = _.keys(value).map((elem) => `${indent(depth)}    ${elem}: ${stringify(value[elem], depth + 1)}`);

  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};

const format = (tree, depth = 0) => {
  const result = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent(depth)}    ${node.key}: ${format(node.children, depth + 1)}`;
      case 'changed':
        return [
          `${indent(depth)}  - ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indent(depth)}  + ${node.key}: ${stringify(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'added':
        return `${indent(depth)}  + ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      case 'deleted':
        return `${indent(depth)}  - ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
      default:
        return `${indent(depth)}    ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
    }
  });

  return `{\n${result.join('\n')}\n${indent(depth)}}`;
};

export default (tree) => format(tree);
