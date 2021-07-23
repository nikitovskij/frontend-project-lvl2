import yaml from 'js-yaml';

const parsers = {
  yml: (file) => yaml.load(file, 'utf8'),
  yaml: (file) => yaml.load(file, 'utf8'),
  json: (file) => JSON.parse(file, 'utf8'),
};

export default (file, format) => parsers[format](file);
