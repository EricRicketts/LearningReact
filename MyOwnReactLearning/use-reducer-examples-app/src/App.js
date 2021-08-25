import React from 'react';
import './App.css';
import { CounterNoReset } from "./components/counter_no_reset";
import { Counter } from "./components/counter"
import { initialCount } from "./javascript/initializers";

function App() {
  return (
    <>
      <CounterNoReset />
      <Counter initialCount={initialCount} />
    </>
  )
}

export default App;
