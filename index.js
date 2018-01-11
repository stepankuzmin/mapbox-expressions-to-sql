const formatValue = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'number':
      return `${value}`;
    default:
      return value;
  }
};

const operators = {
  has: key => `${key} IS NOT NULL`,
  '!has': key => `${key} IS NULL`,
  '==': (key, value) => `${key} = ${formatValue(value)}`,
  '!=': (key, value) => `${key} <> ${formatValue(value)}`,
  '>': (key, value) => `${key} > ${formatValue(value)}`,
  '>=': (key, value) => `${key} >= ${formatValue(value)}`,
  '<': (key, value) => `${key} < ${formatValue(value)}`,
  '<=': (key, value) => `${key} <= ${formatValue(value)}`,
  in: (key, ...values) => `${key} IN (${values.map(formatValue).join(', ')})`,
  '!in': (key, ...values) => `${key} NOT IN (${values.map(formatValue).join(', ')})`,
  all: (...operands) => operands.join(' AND '),
  any: (...operands) => operands.join(' OR ')
};

const parse = (expression) => {
  if (!Array.isArray(expression)) {
    return expression;
  }

  const [operator, ...operands] = expression;
  const fn = operators[operator];

  if (!fn) {
    throw new Error(`Unknown operator "${operator}"`);
  }

  return fn(...operands.map(parse));
};

module.exports = parse;
