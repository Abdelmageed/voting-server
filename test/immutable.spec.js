import {expect} from 'chai';
import {List, Map} from 'immutable'

describe('immutability', ()=>{
  
  describe('a number', ()=>{
    
    function increment(number) {
      return number + 1;
    }
    
    it('is immutable', ()=>{
      let state = 42;
      let nextState = increment(state);
      
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });
  
  describe('a list', ()=>{
    
    function addItem(currentState, item){
      return currentState.push(item);
    }
    
    it('is immutable', ()=> {
      let state = List.of('item1', 'item2');
      let nextState = addItem(state, 'item3');
      
      expect(state).to.equal(List.of('item1', 'item2'));
      expect(nextState).to.equal(List.of('item1', 'item2', 'item3'));
    });
  });
  
  describe('a map', ()=> {
    
    it('it is immutable', ()=> {
      
      function addItem(currentState, item){
        return currentState.update('items', items => items.push(item));
      };
      
      let state = Map({
        items: List.of('item1', 'item2')
      });
      let nextState = addItem(state, 'item3');
      
      expect(state).to.equal(Map({items: List.of('item1', 'item2')}));
      expect(nextState).to.equal(Map({items: List.of('item1', 'item2', 'item3')}));
    });
  });
});