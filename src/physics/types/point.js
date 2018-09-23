import * as vector from './vector.js';

export const create = (position, mass) => ({
  previous: position,
  position,
  acceleration: vector.create(),
  velocity: vector.create(),
  mass,
});

export const createFrom = (position, acceleration, point) => ({
  ...point,
  previous: point.position,
  acceleration,
  position,
});

export const getVelocity = (scale, point) => vector.scale(
  vector.sub(
    point.position,
    point.previous,
  ),
  scale,
);

export const setAcceleration = (acceleration, point) => ({
  ...point,
  acceleration,
});
