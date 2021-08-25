import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

describe('React Reducer Tests', function () {
  let results, expected, buttonReset, buttonDecNoReset, buttonIncrNoReset;
  let buttonDecReset, buttonIncrReset, parNoReset, parReset;
  beforeEach(() => {
    render(<App />);
    buttonReset = screen.getByTestId('resetBtn');
    buttonDecNoReset = screen.getByTestId('noResetDecBtn');
    buttonIncrNoReset = screen.getByTestId('noResetIncrBtn');
    buttonDecReset = screen.getByTestId('resetDecBtn');
    buttonIncrReset = screen.getByTestId('resetIncrBtn');
    parNoReset = screen.getByTestId('noResetP');
    parReset = screen.getByTestId('resetP');
  });

  describe('Reducer No Lazy Initialization', function () {
    test("initialize", function () {
      expect(parNoReset.textContent).toBe("Count: 0");
    });
  });

  describe('Reducer Lazy Initialization', function () {
    test("initialize", function () {
      expect(parReset.textContent).toBe("Count: 0");
    });
  });
});
