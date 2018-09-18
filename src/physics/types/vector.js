// Shamelessly ripped off from gl-vec2 (still Matt Desl?)
//

export const createWith = (x, y) => {
  const vec = new Float32Array(2);
  vec[0] = x;
  vec[1] = y;
  return vec;
};

export const create = () => createWith(0, 0);

export const add = (a, b) => createWith(
  a[0] + b[0],
  a[1] + b[1],
);

export const sub = (a, b) => createWith(
  a[0] - b[0],
  a[1] - b[1],
);

export const multiply = (a, b) => createWith(
  a[0] * b[0],
  a[1] * b[1],
);

export const scale = (a, b) => createWith(
  a[0] * b,
  a[1] * b,
);

export const sqrLen = (a) => a[0] * a[0] + a[1] * a[1];
