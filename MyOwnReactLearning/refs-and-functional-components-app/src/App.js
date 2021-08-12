import './App.css';
import React from 'react';
import { SimpleRef } from "./components/simple_ref";
import { CallbackRefDynamicChild } from "./components/callback_ref_dynamic_child";

function App() {
  return (
    <main>
      <SimpleRef />
      <CallbackRefDynamicChild />
    </main>
  )
}

export default App;
