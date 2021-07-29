import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const formatters = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

export default (data, format) => formatters[format](data);
