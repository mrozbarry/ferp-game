import { app, effects } from 'ferp';

import * as vector from './physics/types/vector.js';

import { mainReducer } from './reducers/mainReducer.js';
import { keyboardSubscription } from './subscriptions/keyboardSubscription';

const initialState = (canvasId) => {
  const canvas = document.getElementById(canvasId);

  return {
    gamePads: [],
    players: [],
    world: {
      points: [],
      gravity: vector.createWith(0.01, 0.01),
      accumulator: 0.0,
      timestep: 1 / 60,
      friction: 0.98,
      min: vector.createWith(-20, -20),
      max: vector.createWith(parseFloat(canvas.width) + 20, parseFloat(canvas.height) + 20),
    },
    canvas,
  };
};

export const createGame = canvasId => app({
  init: () => [
    initialState(canvasId),
    effects.batch([
      {
        type: 'WORLD_POINT_ADD',
        playerId: 0,
        pointId: Math.random().toString(36).slice(0, 7),
        position: vector.createWith(100, 0),
        mass: 5,
      },
      effects.raf({ type: 'TICK' }),
    ]),
  ],
  update: mainReducer,
  subscribe: () => [
    [keyboardSubscription, 'KEY_DOWN', 'KEY_UP'],
  ],
});
