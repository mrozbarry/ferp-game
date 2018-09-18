import * as ferp from 'ferp';

import * as vector from './physics/types/vector.js';

import { mainReducer } from './reducers/mainReducer.js';
import { keyboardSubscription } from './subscriptions/keyboardSubscription';

const { Effect } = ferp.types;
const { delay } = ferp.effects;

const initialState = canvasId => ({
  gamePads: [],
  players: [],
  world: {
    points: [],
    gravity: vector.createWith(0, 0.01),
    accumulator: 0.0,
    timestep: 1 / 60,
    friction: 0.98,
  },
  canvas: document.getElementById(canvasId),
});

export const createGame = (canvasId) => ferp.app({
  init: () => [
    initialState(canvasId),
    Effect.map([
      Effect.immediate({
        type: 'WORLD_POINT_ADD',
        playerId: 0,
        pointId: Math.random().toString(36).slice(0, 7),
        position: vector.createWith(100, 0),
        mass: 5,
      }),
      delay.raf('TICK'),
    ]),
  ],
  update: mainReducer,
  subscribe: () => [
    [keyboardSubscription, 'KEY_DOWN', 'KEY_UP'],
  ]
});
