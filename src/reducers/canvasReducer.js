import { types, effects } from 'ferp';
import { demoScene } from '../scenes/demoScene.js';

const { Effect } = types;

export const canvasReducer = world => (message, state) => {
  switch (message.type) {
    case 'SET_CANVAS':
      return [
        message.canvas,
        Effect.none(),
      ];

    case 'TICK':
      demoScene(state, world)
      return [
        state,
        effects.delay.raf('TICK', message.timestamp),
      ];

    default:
      return [
        state,
        Effect.none(),
      ];
  }
};
