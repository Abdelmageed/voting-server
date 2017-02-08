import {Map, List} from 'immutable'

export const setEntries = (state, entries)=> {
  return state.set('movies', List(entries));
};

export const next = (state)=> {
  let entries = state.get('movies');
  return state
    .merge({
    movies: entries.skip(2),
    vote: Map({
      pair: entries.take(2)
    })
  });
};