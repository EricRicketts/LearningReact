import React from 'react';
import { CurrencyContext } from "../javascript/currency_context";

const Book = function({ item }) {
  const currency = React.useContext(CurrencyContext);
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code
  }).format(item.price * currency.conversionRate);
  return (
    <li data-testid={`listItem${item.id}`}>
      {item.title} - {price}
    </li>
  );
}

export const Books = function({ list }) {
  return (
    <ul>
      {list.map((item) => (<Book key={item.id} item={item} />))}
    </ul>
  );
}