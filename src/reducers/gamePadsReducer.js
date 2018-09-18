import { gamePadReducer } from './gamePadReducer.js';
import { combineReducers } from './helpers.js';
import { gamePadEffect } from '../effects/gamePadEffect.js';

const gamePadsReducer = players => (message, state) => {
  const reduceOverGamePads = gamePads => (
    gamePads.map(gamePad => (
      gamePadReducer(players)(message, gamePad)
    ))
  );

  switch (message.type) {
    case 'GAMEPAD_CONNECTED':
      return combineReducers(reduceOverGamePads(state.concat(message.gamePad)));

    case 'GAMEPAD_DISCONNECTED':
      return combineReducers(
        reduceOverGamePads(state.filter(gp => gp.index !== message.gamePadIndex)),
      );

    case 'TICK':
      return [
        state,
        gamePadEffect(state),
      ];

    default:
      return combineReducers(reduceOverGamePads(state));
  }
};

module.exports = {
  gamePadsReducer,
};
