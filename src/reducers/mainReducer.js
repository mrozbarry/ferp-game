import { gamePadsReducer } from './gamePadsReducer.js';
import { playersReducer } from './playersReducer.js';
import { worldReducer } from './worldReducer.js';
import { canvasReducer } from './canvasReducer.js';
import { combineReducers } from './helpers.js';

export const mainReducer = (message, state) => combineReducers({
  gamePads: gamePadsReducer(state.players)(message, state.gamePads),
  players: playersReducer(message, state.players),
  world: worldReducer(message, state.world),
  canvas: canvasReducer(state.world)(message, state.canvas),
});
