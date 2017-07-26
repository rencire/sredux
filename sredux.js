function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }

  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}


const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;
  
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({}); // dummy dispatch

  return { getState, dispatch, subscribe};
};





const store = createStore(counter);

store.subscribe(() => {
  document.body.innerText = store.getState();
});


const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render(); // calling once to render initial state

document.addEventListener('click', () => {
  store.dispatch({ type : 'INCREMENT'})
});
