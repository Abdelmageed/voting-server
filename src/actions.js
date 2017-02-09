export const setEntries = (entries)=> {
  return {type: 'SET_ENTRIES', entries};
};

export const next = ()=> {
  return {type: 'NEXT'};
};

export const vote = (entry)=> {
  return {type: 'VOTE', entry};
};