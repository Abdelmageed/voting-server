import reducer from '../src/reducer'

import {expect} from 'chai'
import {Map, List} from 'immutable'

describe('reducer', ()=> {
  
  it('can be used with Array.reduce()', ()=> {
    const actions = [
    {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
    {type: 'NEXT'},
    {type: 'VOTE', entry: 'Trainspotting'},
    {type: 'VOTE', entry: '28 Days Later'},
    {type: 'VOTE', entry: 'Trainspotting'},
    {type: 'NEXT'}
  ];
  const finalState = actions.reduce(reducer, Map());

  expect(finalState).to.equal(Map({
    winner: 'Trainspotting'
  }));
  });
  
  it('should return an initial state if state was undefined', ()=> {
    const state = undefined,
          action = 'DEFAULT',
          nextState = Map();
    
    expect(reducer(state, action)).to.equal(nextState);
  })
  
  it('should handle SET_ENTRIES', ()=> {
    const state = Map(),
          entries = List.of('Trainspotting'),
          action = {type: 'SET_ENTRIES', entries},
          nextState = Map({
            movies: List.of('Trainspotting')
          });
    
    expect(reducer(state, action)).to.equal(nextState);
  })
  
  it('should handle NEXT', ()=> {
    const state = Map({
      movies: List.of('Trainspotting', '28 Days Later'),
    }),
          action = {type: 'NEXT'},
          nextState = Map({
            movies: List(),
            vote: Map({
              pair: List.of('Trainspotting', '28 Days Later')
            })
          });
    
    expect(reducer(state, action)).to.equal(nextState);
  })
  
  it('should handle VOTE', ()=> {
    const state = Map({
            movies: List(),
            vote: Map({
              pair: List.of('Trainspotting', '28 Days Later')
            })
          }),
          action = {type: 'VOTE', entry: 'Trainspotting'},
          nextState = Map({
            movies: List(),
            vote: Map({
              pair: List.of('Trainspotting', '28 Days Later'),
              tally: Map({
                'Trainspotting': 1
              })
            })
          });
    
    expect(reducer(state, action)).to.equal(nextState);
  })
})