import {setEntries, next, vote} from '../src/core';
import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('Application Logic', ()=> {
  
  describe('setEntries(state, entries)', ()=>{
    
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
  
  describe('next(state)', ()=> {
    
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
  
  describe('vote(state, entry)', ()=> {
    
    it('should return the state with a tally created for the entry voted on', ()=> {
        
      const state = Map({
              movies: List.of('Sunshine'),
              vote: Map({
                pair: List.of('Trainspotting', '28 Days Later')}
            )}),
            expectedNextState = Map({
              movies: List.of('Sunshine'),
              vote: Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                  'Trainspotting': 1
                })
              })
            });
      
      expect(vote(state, 'Trainspotting')).to.equal(expectedNextState);
    })
    
    it('should increment an existing tally for the entry voted on', ()=> {
      
      const state = Map({
        movies: List.of('Sunshine'),
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
              'Trainspotting': 2,
              '28 Days Later': 2
            })
        })
      }),
            nextExpectedState = Map({
              movies: List.of('Sunshine'),
              vote: Map({
                  pair: List.of('Trainspotting', '28 Days Later'),
                  tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                  })
              })
      });
      
      expect(vote(state, 'Trainspotting')).to.equal(nextExpectedState);
      })
    })
 
});