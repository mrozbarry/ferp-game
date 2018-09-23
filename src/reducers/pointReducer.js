import { effects } from 'ferp';

import * as point from '../physics/types/point.js';
import * as vector from '../physics/types/vector.js';

const SPEED = 1.0;

export const pointReducer = (message, state) => {
  switch (message.type) {
    case 'KEY_DOWN':
      return (() => {
        const xLeft = message.key === 'ArrowLeft' ? -SPEED : 0;
        const xRight = message.key === 'ArrowRight' ? SPEED : 0;
        const yUp = message.key === 'ArrowUp' ? -SPEED : 0;
        const yDown = message.key === 'ArrowDown' ? SPEED : 0;

        const force = vector.add(
          state.acceleration,
          vector.createWith(
            xLeft + xRight,
            yUp + yDown,
          ),
        );

        return [
          point.setAcceleration(force, state),
          effects.none(),
        ];
      })();

    default:
      return [state, effects.none()];
  }
};
