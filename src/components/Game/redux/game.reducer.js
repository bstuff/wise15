// @flow
import { shuffle } from 'lodash-es';
import sgn from 'permutation-parity';
import * as types from './game.types';
import { type Direction } from './game.actions';

const initRows = () => {
  let rows = shuffle(Array.from(Array(16)).map((e, i) => +i + 1));
  while (sgn(rows) === -1) {
    rows = shuffle(Array.from(Array(16)).map((e, i) => +i + 1));
  }
  return rows;
};

const initial = {
  rows: initRows(),
  history: [],
  finish: false,
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

const getNextPosition = (cur: Position, direction: Direction): Position => {
  switch (direction) {
  case 'left':
    return cur.column > 0 ? ({
      ...cur,
      column: cur.column - 1,
    }) : cur;
  case 'right':
    return cur.column < 3 ? ({
      ...cur,
      column: cur.column + 1,
    }) : cur;
  case 'up':
    return cur.row > 0 ? ({
      ...cur,
      row: cur.row - 1,
    }) : cur;
  case 'down':
    return cur.row < 3 ? ({
      ...cur,
      row: cur.row + 1,
    }) : cur;
  default:
    return cur;
  }
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

const isFinish = (arr: number[]): boolean => {
  for (let i = 0; i < 15; i += 1) {
    if (arr[i + 1] < arr[i]) return false;
  }
  return true;
};

const processMove = (state, cur: Position, next: Position) => {
  if (!canMoveTo(cur, next)) return state;

  const rows = swapArrayElements([...state.rows], state.rows.indexOf(16), 4 * next.row + next.column);

  const finish = isFinish(rows);

  if (finish) setTimeout(() => alert('вы выиграли'), 16);

  return {
    ...state,
    history: [
      ...state.history,
      state.rows,
    ],
    rows,
    finish,
  };
};


// console.log(isFinish([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0 ]));

// console.log(
//   swapArrayElements(
//     Array.from(Array(16)).map((e, i) => +i + 1),
//     14,
//     15,
//   ),
// );


export default (state: typeof initial = initial, action: Object) => {
  if (action.type === types.RESET) return { ...initial };
  if (state.finish) return state;

  switch (action.type) {
  case types.MOVE: {
    const freePosition = getRowAndColumn(16, state.rows);
    const nextPosition = getNextPosition(freePosition, action.payload);

    return processMove(state, freePosition, nextPosition);
  }
  case types.MOVE_TO: {
    const { payload }: { payload: number } = action;
    if (payload === 16) break;

    const freePosition = getRowAndColumn(16, state.rows);
    const nextPosition = getRowAndColumn(payload, state.rows);

    return processMove(state, freePosition, nextPosition);
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

  case types.TEST_WIN: {
    return {
      ...state,
      rows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 15 ],
      history: [],
      finish: false,
    };
  }

  default:
    return state;
  }
  return state;
};
