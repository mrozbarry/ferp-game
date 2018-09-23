import { effects } from 'ferp';

export const playerReducer = id => (message, state) => {
  if (message.playerId !== id) return [state, effects.none()];

  switch (message.type) {
    case 'SOURCE_CHANGE':
      return [
        Object.assign({}, state, {
          sourceType: message.sourceType,
          gamePadIndex: null,
          up: false,
          down: false,
          left: false,
          right: false,
        }),
        effects.none(),
      ];

    case 'ASSIGN_GAMEPAD_INDEX':
      return [
        Object.assign({}, state, {
          sourceType: 'gamepad',
          gamePadIndex: message.gamePadIndex,
          up: false,
          down: false,
          left: false,
          right: false,
        }),
        effects.none(),
      ];

    case 'INPUT_DOWN':
      return [
        Object.assign({}, state, {
          [message.key]: true,
        }),
        effects.none(),
      ];

    case 'INPUT_UP':
      return [
        Object.assign({}, state, {
          [message.key]: false,
        }),
        effects.none(),
      ];

    default:
      return [
        state,
        effects.none(),
      ];
  }
};
