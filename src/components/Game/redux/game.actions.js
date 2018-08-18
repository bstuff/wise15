// @flow
import * as types from './game.types';

export const moveTo = (payload: number) => ({
  type: types.MOVE_TO,
  payload,
});

export type Direction = 'up' | 'right' | 'down' | 'left';

export const move = (payload: Direction) => ({
  type: types.MOVE,
  payload,
});

export const stepBack = ({
  type: types.STEP_BACK,
});

export const testWin = ({
  type: types.TEST_WIN,
});

export const reset = ({
  type: types.RESET,
});
