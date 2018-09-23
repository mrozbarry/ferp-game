import { effects } from 'ferp';

export const forceReducer = (keyBinding, downValue = 1.0, upValue = 0.0) => {
  const keyDown = `KEY_DOWN/${keyBinding}`;
  const keyUp = `KEY_UP/${keyBinding}`;

  return (message, state) => {
    const matcher = [message.type, message.key].join('/');

    switch (matcher) {
      case keyDown:
        return [downValue, effects.none()];

      case keyUp:
        return [upValue, effects.none()];

      default:
        return [state, effects.none()];
    }
  };
};
