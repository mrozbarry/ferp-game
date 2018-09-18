import { types } from 'ferp';

import { simulate } from '../physics/simulate.js';
import { pointReducer } from './pointReducer.js';
import { combineReducers } from './helpers.js';
import * as point from '../physics/types/point.js';

const { Effect } = types;

export const worldReducer = (message, state) => {
  switch (message.type) {
    case 'TICK':
      return (() => {
        const nextWorld = simulate(message.delta, state);
        return [
          nextWorld,
          Effect.none(),
        ];
      })();

    case 'WORLD_POINT_ADD':
      return [
        {
          ...state,
          points: state.points.concat({
            ...point.create(message.position, message.mass || 1),
            id: message.pointId,
            playerId: message.playerId,
          }),
        },
        Effect.none(),
      ];

    default:
      return (() => {
        const result = combineReducers(
          state.points.map(ent => pointReducer(message, ent))
        );

        return [
          {
            ...state,
            points: result[0],
          },
          Effect.map([
            result[1],
          ]),
        ];
      })();
  }
};
