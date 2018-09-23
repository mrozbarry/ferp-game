import { util } from 'ferp';

import { gamePadReducer } from './gamePadReducer.js';
import { gamePadEffect } from '../effects/gamePadEffect.js';

export const gamePadsReducer = players => (message, state) => {
  const reduceOverGamePads = gamePads => (
    gamePads.map(gamePad => (
      gamePadReducer(players)(message, gamePad)
    ))
  );

  switch (message.type) {
    case 'GAMEPAD_CONNECTED':
      return util.combineReducers(reduceOverGamePads(state.concat(message.gamePad)));

    case 'GAMEPAD_DISCONNECTED':
      return util.combineReducers(
        reduceOverGamePads(state.filter(gp => gp.index !== message.gamePadIndex)),
      );

    case 'TICK':
      return [
        state,
        gamePadEffect(state),
      ];

    default:
      return util.combineReducers(reduceOverGamePads(state));
  }
};
