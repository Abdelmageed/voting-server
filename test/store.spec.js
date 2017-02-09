import {expect} from 'chai'
import {Map, List} from 'immutable'
import {setEntries} from '../src/actions'
import makeStore from '../src/store'

describe('makeStore()', ()=> {
  
  it('should make a store with the correct reducer', ()=> {
    const store = makeStore();
    
    expect(store.getState()).to.equal(Map());
    
    store.dispatch(setEntries(['Trainspotting', '28 Days Later']));
    
    expect(store.getState()).to.equal(Map({
      movies: List.of('Trainspotting', '28 Days Later')
    }));
  });
});