// @flow
import { shuffle, chunk } from 'lodash-es';
import * as types from './game.types';

const initial = {
  rows: shuffle(Array.from(Array(16)).map((e, i) => +i)),
  history: [],
};

type Position = {
  row: number,
  column: number,
}

const getRowAndColumn = (i, arr): Position => {
  const idx = arr.indexOf(i);
  return {
    row: Math.floor(idx / 4),
    column: idx % 4,
  };
};

const canMoveTo = (startPosition: Position, endPosition: Position): boolean => {
  if (startPosition.row === endPosition.row && Math.abs(startPosition.column - endPosition.column) === 1) return true;
  if (startPosition.column === endPosition.column && Math.abs(startPosition.row - endPosition.row) === 1) return true;
  return false;
};

const swapArrayElements = (a, x, y) => {
  const [ min, max ] = [ Math.min(x, y), Math.max(x, y) ];
  return [
    ...a.slice(0, min),
    a[max],
    ...a.slice(min + 1, max),
    a[min],
    ...a.slice(max + 1),
  ];
};

// console.log(
//   swapArrayElements(
//     Array.from(Array(16)).map((e, i) => +i + 1),
//     14,
//     15,
//   ),
// );


export default (state = initial, action) => {
  switch (action.type) {
  case types.MOVE_TO: {
    const { payload }: { payload: number } = action;
    if (payload === 0) break;

    const freePosition = getRowAndColumn(0, state.rows);
    const nextPosition = getRowAndColumn(payload, state.rows);

    if (!canMoveTo(freePosition, nextPosition)) break;

    return {
      ...state,
      history: [
        ...state.history,
        state.rows,
      ],
      rows: swapArrayElements([...state.rows], state.rows.indexOf(0), state.rows.indexOf(payload)),
    };
  }

  case types.STEP_BACK: {
    const { length } = state.history;
    if (length) {
      const rows = state.history[length - 1];
      const history = state.history.slice(0, length - 1);
      return {
        ...state,
        rows,
        history,
      };
    }
    break;
  }
  default:
    return state;
  }
  return state;
};
