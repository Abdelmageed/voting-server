import {vote, next, setEntries, INITIAL_STATE} from './core';
import {combineReducers} from 'redux'

const reducer = (state = INITIAL_STATE, action)=> {
  switch (action.type){
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'VOTE':
      return state.update('vote', vote => Vote(vote, action));
    case 'NEXT':
      return next(state);
  }
      return state;
  
}

const Vote = (state = INITIAL_STATE, action)=> {
  switch (action.type){
    case 'VOTE':
      return vote(state, action.entry);
  }
  return state;
}

export default reducer;