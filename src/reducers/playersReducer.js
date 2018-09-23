import { effects, util } from 'ferp';
import { playerReducer } from './playerReducer.js';

const clamp = (max, value) => Math.min(Math.max(0, value), max);

const integrate = (player, delta) => {
  if (!delta) return player;
  const speed = 9;
  const xDiff = (player.left ? -speed : 0) + (player.right ? speed : 0);
  const yDiff = (player.up ? -speed : 0) + (player.down ? speed : 0);

  return Object.assign({}, player, {
    x: clamp(800, player.x + (xDiff * delta / 100)),
    y: clamp(300, player.y + (yDiff * delta / 100)),
  });
};

export const playersReducer = (message, state) => {
  const reduceOverPlayers = players => (
    players.map(player => playerReducer(player.id)(message, player))
  );

  switch (message.type) {
    case 'ADD_PLAYER':
      return util.combineReducers(reduceOverPlayers(state.concat({
        id: message.playerId,
        sourceType: 'empty',
        gamePadIndex: null,
        up: false,
        left: false,
        right: false,
        down: false,
        x: 0,
        y: 0,
      })));

    case 'REMOVE_PLAYER':
      return util.combineReducers(
        reduceOverPlayers(state.filter(player => player.id !== message.playerId)),
      );

    case 'TICK':
      return [
        state.map(p => integrate(p, message.delta)),
        effects.none(),
      ];

    default:
      return util.combineReducers(reduceOverPlayers(state));
  }
};
