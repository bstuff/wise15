// @flow
import * as types from './game.types';

export const moveTo = (number: number) => ({
  type: types.MOVE_TO,
  payload: number,
});

export const stepBack = ({
  type: types.STEP_BACK,
});
