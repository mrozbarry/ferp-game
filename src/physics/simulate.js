// Shamelessly ripped off from Matt Desl
// https://github.com/mattdesl/verlet-system/blob/master/lib/build.js

import * as point from './types/point.js';
import * as vector from './types/vector.js';

const pointStep = (world, currentPoint) => {
  if (!currentPoint.mass) {
    // TODO: Handle collisions with velocity of vector.create() or 0,0
    return point.setAcceleration(vector.create());
  }

  const acceleration = vector.scale(
    vector.add(
      currentPoint.acceleration,
      world.gravity,
    ),
    currentPoint.mass,
  );

  const nextPoint = point.setAcceleration(
    acceleration,
    currentPoint,
  );

  const velocity = point.getVelocity(world.friction, nextPoint);

  // TODO: use velocity to calculate collisions

  const timeScale = (world.timestep * world.timestep) * 1000;
  const scaledAcceleration = vector.scale(nextPoint.acceleration, timeScale);
  const nextPosition = vector.add(
    vector.add(
      nextPoint.position,
      velocity,
    ),
    scaledAcceleration,
  );

  return point.createFrom(
    nextPosition,
    vector.create(),
    nextPoint,
  );
};

const worldStep = (world) => {
  return {
    ...world,
    points: world.points.map(p => pointStep(world, p)),
    accumulator: world.accumulator - world.timestep,
  };
};

const recursivelyStepWorld = (world, allowedSteps) => {
  if (allowedSteps === 0) return world;
  return recursivelyStepWorld(
    worldStep(world),
    allowedSteps - 1,
  );
};

const worldApplyDelta = (delta, world) => {
  const clampedDelta = Math.min(delta, world.timestep * 3);
  return {
    ...world,
    accumulator: world.accumulator + clampedDelta,
  };
};

export const simulate = (delta, world) => {
  return recursivelyStepWorld(
    worldApplyDelta(delta, world),
    3,
  );
};
