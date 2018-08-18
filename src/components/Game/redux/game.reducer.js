import { shuffle } from 'lodash-es';

const initial = {
  rows: shuffle(Array.from(Array(16)).map((e, i) => +i)),
  history: [],
};

export default (state = initial, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
