import React from 'react';
import { reducer } from "../javascript/reducer";
import { init } from "../javascript/init";

export function Counter({initialCount}) {
  const [state, dispatch] = React.useReducer(reducer, initialCount, init);

  return (
    <div data-testid="reset">
      <p data-testid="resetP">Count: {state.count}</p>
      <button data-testid="resetBtn" onClick={() => dispatch({type: 'reset', payload: initialCount})}>Reset</button>
      <button data-testid="resetDecBtn" onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button data-testid="resetIncrBtn" onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
  );
}