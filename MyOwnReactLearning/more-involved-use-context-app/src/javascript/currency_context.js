import React from 'react';

const CURRENCIES = {
  Euro: {
    code: 'EUR',
    label: 'Euro',
    conversionRate: 1,
  },
  Usd: {
    code: 'USD',
    label: 'US Dollar',
    conversionRate: 1.18,
  },
  Yen: {
    code: 'JPY',
    label: 'Japanese Yen',
    conversionRate: 129.42,
  },
  Yuan: {
    code: 'CNY',
    label: 'Chinese Yuan',
    conversionRate: 7.63,
  }
}
const CurrencyContext = React.createContext(null);
const useCurrency = function() {
  return React.useContext(CurrencyContext);
}

const CurrencyProvider = function({ value, children }) {
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export { CurrencyProvider, useCurrency, CurrencyContext, CURRENCIES };