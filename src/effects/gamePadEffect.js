import { effects } from 'ferp';

const cloneGamePad = (gamePad) => {
  if (!gamePad) return null;

  return {
    index: gamePad.index,
    id: gamePad.id,
    connected: gamePad.connected,
    mapping: gamePad.mapping,
    buttons: gamePad.buttons.map(button => ({
      pressed: button.pressed,
      value: button.value,
    })),
    axes: gamePad.axes.map(axis => axis),
  };
};

const getGamePads = () => {
  if (navigator.getGamepads) return navigator.getGamepads();
  return navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : [];
};

const getNewlyConnected = (gamePads, prevGamePads) => (
  gamePads.filter(gp => !prevGamePads.some(pgp => !pgp || pgp.index === gp.index))
);

const getNewlyDisconnected = (gamePads, prevGamePads) => (
  prevGamePads.filter((pgp) => {
    const match = gamePads.find(gp => pgp && gp.index === pgp.index);
    return !match || !match.connected;
  })
);

const getButtonChangeMessages = (gamePad, prevGamePad, downType, upType) => (
  gamePad.buttons.reduce((buttonMemo, button, index) => {
    const prevButton = prevGamePad.buttons[index];
    if (prevButton.pressed === button.pressed) return buttonMemo;
    return buttonMemo.concat({
      type: button.pressed ? downType : upType,
      gamePadIndex: gamePad.index,
      buttonIndex: index,
    });
  }, [])
);

const getAxesChangeMessages = (gamePad, prevGamePad, axesType) => (
  gamePad.axes.reduce((axesMemo, axis, index) => {
    const prevAxis = prevGamePad.axes[index];
    if (prevAxis === axis) return axesMemo;
    return axesMemo
      .concat({
        type: axesType,
        gamePadIndex: gamePad.index,
        axesIndex: index,
        value: axis,
      });
  }, [])
);

const getChangeMessages = (gamePads, prevGamePads, downType, upType, axesType) => (
  gamePads.reduce((messages, gamePad) => {
    const prevGamePad = prevGamePads.find(pgp => pgp && pgp.index === gamePad.index);
    if (!prevGamePad) return messages;

    return messages
      .concat(getButtonChangeMessages(gamePad, prevGamePad, downType, upType))
      .concat(getAxesChangeMessages(gamePad, prevGamePad, axesType));
  }, [])
);

export const gamePadEffect = (
  prevGamePads,
  connectedType = 'GAMEPAD_CONNECTED',
  disconnectedType = 'GAMEPAD_DISCONNECTED',
  downType = 'GAMEPAD_BUTTON_DOWN',
  upType = 'GAMEPAD_BUTTON_UP',
  axesType = 'GAMEPAD_AXES_CHANGE',
) => {
  const gamePads = Array.from(getGamePads())
    .filter(gp => gp !== null)
    .map(cloneGamePad);

  const newlyConnected = getNewlyConnected(gamePads, prevGamePads)
    .map(gp => ({ type: connectedType, gamePad: gp }));

  const newlyDisconnected = getNewlyDisconnected(gamePads, prevGamePads)
    .map(gp => ({ type: disconnectedType, gamePadIndex: gp.index }));

  const changeMessages = getChangeMessages(gamePads, prevGamePads, downType, upType, axesType);

  return effects.batch([
    effects.batch(newlyConnected),
    effects.batch(newlyDisconnected),
    effects.batch(changeMessages),
  ]);
};
