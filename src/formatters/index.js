import renderStylish from './stylish.js';

const formatters = {
  stylish: renderStylish,
};

export default (data, format) => formatters[format](data);
