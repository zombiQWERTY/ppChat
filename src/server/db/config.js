function setup(type) {
  return `mongodb://localhost/ppchat_${type}`;
}

export const development = setup('development');
export const production  = setup('production');
export const test        = setup('testing');
