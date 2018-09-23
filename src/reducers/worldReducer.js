import { effects, util } from 'ferp';

import { simulate } from '../physics/simulate.js';
import { pointReducer } from './pointReducer.js';
import * as point from '../physics/types/point.js';

export const worldReducer = (message, state) => {
  switch (message.type) {
    case 'TICK':
      return (() => {
        const nextWorld = simulate(message.delta, state);
        return [
          nextWorld,
          effects.none(),
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
        effects.none(),
      ];

    default:
      return (() => {
        const result = util.combineReducers(
          state.points.map(ent => pointReducer(message, ent)),
        );

        return [
          {
            ...state,
            points: result[0],
          },
          effects.batch([
            result[1],
          ]),
        ];
      })();
  }
};
