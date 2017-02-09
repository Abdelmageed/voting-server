import {setEntries, next, vote} from '../src/actions';

import {List, Map} from 'immutable';
import {expect} from 'chai';

describe('Actions', ()=> {
  
  it('creates SET_ENTRIES action', ()=> {
    const entries = List.of('T', 'D');
    expect(setEntries(entries)).to.deep.equal({type: 'SET_ENTRIES', entries});
  });
  
  it('creates NEXT action', ()=> {
    expect(next()).to.deep.equal({type: 'NEXT'});
  });
  
  it('creates VOTE action', ()=> {
    const entry = 'T';
    expect(vote(entry)).to.deep.equal({type: 'VOTE', entry});
  });
})