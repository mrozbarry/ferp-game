import { effects } from 'ferp';
import * as vector from '../physics/types/vector.js';
import { simulate } from '../physics/simulate.js';

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
        effects.none(),
      ];

    case 'VERLET_ADD_SHAPE':
      return [state, effects.none()];

    case 'VERLET_REMOVE_SHAPE':
      return [state, effects.none()];

    case 'TICK':
      return [
        simulate(message.delta, state),
        effects.none(),
      ];

    default:
      return [state, effects.none()];
  }
};
