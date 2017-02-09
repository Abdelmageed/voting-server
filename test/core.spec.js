import {setEntries, next, vote, getWinners} from '../src/core';
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
    
    it('should return the next state with the winning entry(ies) from the last vote placed at the end of entries and the loser is removed before preparing the next pair', ()=> {
      let state = Map({
        movies: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 5,
            '28 Days Later': 4
          })
        })
      }),
          expectedNextState = Map({
        movies: List(),
        vote: Map({
          pair: List.of('Sunshine', 'Trainspotting')
        })
      });
      
      expect(next(state)).to.equal(expectedNextState);
    });
    
    it('should return the next state with the winner if only one entry is left in all entries', ()=> {
      const state = Map({
        movies: List(),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 5,
            '28 Days Later': 4
          })
        })
      }),
        expectedNextState = Map({
        winner: 'Trainspotting'
      });
      
      expect(next(state)).to.equal(expectedNextState);
    })
  });
  
  describe('getWinners(vote)', ()=> {
    
    it('should return both entries on tie', ()=> {
      const vote = Map({
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 4
        })
      }),
            expectedWinners = List.of('Trainspotting', '28 Days Later');
      
      expect(getWinners(vote)).to.equal(expectedWinners);
    })
    
    it('should return the winner', ()=> {
      const vote = Map({
        tally: Map({
          'Trainspotting': 5,
          '28 Days Later': 4
        })
      }),
            expectedWinners = List.of('Trainspotting');
      
      expect(getWinners(vote)).to.equal(expectedWinners);
    })
  })
  
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