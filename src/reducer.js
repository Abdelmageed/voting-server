import {vote, next, setEntries, INITIAL_STATE} from './core'

const reducer = (state = INITIAL_STATE, action)=> {
  switch (action.type){
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'VOTE':
      return vote(state, action.entry);
    case 'NEXT':
      return next(state);
  }
      return state;
  
}

export default reducer;