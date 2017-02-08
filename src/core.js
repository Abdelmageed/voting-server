import {Map, List} from 'immutable'

export const setEntries = (state, entries)=> {
  return state.set('movies', List(entries));
};

export const next = (state)=> {
  return state
    .update('movies', movies=> movies.slice(2, 3))
    .set('pair', state.get('movies').slice(0, 2));
}