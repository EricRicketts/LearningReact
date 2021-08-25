import React from 'react';
import { reducerNoReset } from "../javascript/reducer_no_reset";
import { initialState } from "../javascript/initializers";

export function CounterNoReset() {
  const [state, dispatch] = React.useReducer(reducerNoReset, initialState);

  return (
    <div data-testid="noReset">
      <p data-testid="noResetP">Count: {state.count}</p>
      <button data-testid="noResetDecBtn" onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button data-testid="noResetIncrBtn" onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
  );
}