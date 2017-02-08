import {setEntries, next} from '../src/core';
import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('Application Logic', ()=> {
  
  describe('setEntries()', ()=>{
    
    it('should load state with entries', ()=> {
      let state = Map();
      let entries = List.of('Trainspotting', '28 Days Later');
      let expectedNextState = Map({movies: List.of('Trainspotting', '28 Days Later')});
      
      expect(setEntries(state, entries)).to.equal(expectedNextState);
    })
    
    it('should convert to Immutable.List', ()=> {
      
      let state = Map(),
          entries = ['Trainspotting', '28 Days Later'],
          nextExpectedState = Map({
            movies: List.of('Trainspotting', '28 Days Later')
          });
      
      expect(setEntries(state, entries)).to.equal(nextExpectedState);
    });
  });
  
  describe('next()', ()=> {
    
    it('should return the next state with 2 entries removed from movies and placed under pair', ()=> {
      const state = Map({
        movies: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      }),
            nextExpectedState = Map({
              movies: List.of('Sunshine'),
              vote: Map({
                pair: List.of('Trainspotting', '28 Days Later')}
            )});
      
      expect(next(state)).to.equal(nextExpectedState);
    });
  });
});