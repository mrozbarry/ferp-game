import { util } from 'ferp';

import { gamePadsReducer } from './gamePadsReducer.js';
import { playersReducer } from './playersReducer.js';
import { worldReducer } from './worldReducer.js';
import { canvasReducer } from './canvasReducer.js';

export const mainReducer = (message, state) => util.combineReducers({
  gamePads: gamePadsReducer(state.players)(message, state.gamePads),
  players: playersReducer(message, state.players),
  world: worldReducer(message, state.world),
  canvas: canvasReducer(state.world)(message, state.canvas),
});
