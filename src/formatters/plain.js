import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const format = (tree, ancestors = []) => {
  const lines = tree.map((node) => {
    const nodePath = [...ancestors, node.key].join('.');
    switch (node.type) {
      case 'nested':
        return `${format(node.children, [...ancestors, node.key])}`;
      case 'deleted':
        return `Property '${nodePath}' was removed`;
      case 'added':
        return `Property '${nodePath}' was added with value: ${stringify(node.newValue)}`;
      case 'changed':
        return `Property '${nodePath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      default:
        return null;
    }
  });

  return lines.filter((el) => el).join('\n');
};

export default (tree) => format(tree, []);
