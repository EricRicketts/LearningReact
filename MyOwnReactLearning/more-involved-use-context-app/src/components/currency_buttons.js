import { CURRENCIES } from "../javascript/currency_context";

const CurrencyButton = function({ onClick, children }) {
  return (
    <button type="button" data-testid={children} onClick={onClick}>
      {children}
    </button>
  )
}

const CurrencyButtons = function({ onChange }) {
  return Object.values(CURRENCIES).map((item) => (
    <CurrencyButton key={item.label} onClick={() => onChange(item)}>
      {item.label}
    </CurrencyButton>
  ));
}

export { CurrencyButtons };