import {Map, List} from 'immutable'

export const setEntries = (state, entries) => {
  return state.set('movies', List(entries));
};