import {Map, List} from 'immutable'

export const INITIAL_STATE = Map();

export const setEntries = (state, entries)=> {
  return state.set('movies', List(entries));
};

export const next = (state)=> {
  let entries = state.get('movies'); 
  
  entries = (state.has('vote') &&
             state.get('vote').has('tally'))?
      entries.concat(getWinners(state.get('vote'))) : entries;
  
  return (entries.count() > 1)? 
    state.merge({
    movies: entries.skip(2),
    vote: Map({
      pair: entries.take(2)
    })
    })
    :
    state.remove('vote')
      .remove('movies')
      .merge({
    winner: entries.last()
    });
  
};

export const getWinners = (state)=> {
  let tally = state.get('tally');
  return tally.filter(entry => entry === tally.max()).keySeq();
};

export const vote = (state, entry)=> {
  return state.updateIn(["vote", "tally", entry], 0, entry=> entry + 1);
};