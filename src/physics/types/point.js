import * as vector from './vector.js';

export const create = (position, mass) => {
  return {
    previous: position,
    position,
    acceleration: vector.create(),
    velocity: vector.create(),
    mass,
  }
};

export const createFrom = (position, acceleration, point) => {
  return {
    ...point,
    previous: point.position,
    acceleration,
    position,
  };
};

export const getVelocity = (scale, point) => {
  return vector.scale(
    vector.sub(
      point.position,
      point.previous,
    ),
    scale,
  );
}

export const setAcceleration = (acceleration, point) => {
  return {
    ...point,
    acceleration,
  };
};
