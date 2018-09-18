import { types } from 'ferp';
import * as vector from '../types/vector/js';
import { simulate } from '../physics/simulate.js';

const { Effect } = types;

export const verletReducer = (message, state) => {
  switch (message.type) {
    case 'INIT':
      return [
        {
          timestep: 1000 / 60,
          gravity: vector.create(),
          friction: 0.98,
          bounce: 1,
          points: [],
          constraints: [],
        },
        Effect.none(),
      ];

    case 'VERLET_ADD_SHAPE':
      return [state, Effect.none()];

    case 'VERLET_REMOVE_SHAPE':
      return [state, Effect.none()];

    case 'TICK':
      return [
        simulate(message.delta, state),
        Effect.none(),
      ];

    default:
      return [state, Effect.none()];
  }
}
