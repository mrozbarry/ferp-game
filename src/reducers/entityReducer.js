import { effects, util } from 'ferp';

import { forceReducer } from './forceReducer.js';
import { pointReducer } from './pointReducer.js';

const upForceReducer = forceReducer('ArrowUp', 1);
const rightForceReducer = forceReducer('ArrowRight', 1);
const downForceReducer = forceReducer('ArrowDown', -1);
const leftForceReducer = forceReducer('ArrowLeft', -1);

// TODO: Should be in it's own file
const pointsReducer = (message, state) => util.combineReducers(
  state.map(pnt => pointReducer(message, pnt)),
);

// TODO: Build a full reducer, need to decide on what a constraint looks like
const constraintsReducer = (message, state) => [
  state,
  effects.none(),
];

export const entityReducer = (message, state) => [
  util.combineReducers({
    id: [state.id, effects.none()],
    points: pointsReducer(message, state.points),
    constraints: constraintsReducer(message, state.constraints),
    forces: util.combineReducers({
      up: upForceReducer(message, state.forces.up),
      right: rightForceReducer(message, state.forces.right),
      down: downForceReducer(message, state.forces.down),
      left: leftForceReducer(message, state.forces.left),
    }),
  }),
  effects.none(),
];
