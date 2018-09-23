import { effects } from 'ferp';
import { demoScene } from '../scenes/demoScene.js';

export const canvasReducer = world => (message, state) => {
  switch (message.type) {
    case 'SET_CANVAS':
      return [
        message.canvas,
        effects.none(),
      ];

    case 'TICK':
      demoScene(state, world);
      return [
        state,
        effects.raf({ type: 'TICK' }, message.timestamp),
      ];

    default:
      return [
        state,
        effects.none(),
      ];
  }
};
