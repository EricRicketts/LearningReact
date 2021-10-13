import React from 'react';
import { DATA } from "./javascript/data";
import { CURRENCIES, CurrencyContext } from "./javascript/currency_context";
import { CurrencyButtons } from "./components/currency_buttons";
import { Books } from "./components/books";
import './App.css';

function App() {
  const [currency, setCurrency] = React.useState(CURRENCIES.Euro);
  return (
    <CurrencyContext.Provider value={currency}>
      <CurrencyButtons onChange={setCurrency}>
        <Books list={DATA} />
      </CurrencyButtons>
    </CurrencyContext.Provider>
  );
}

export default App;
