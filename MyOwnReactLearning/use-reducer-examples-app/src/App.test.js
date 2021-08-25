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
    test("initialize non-lazy", function () {
      expect(parNoReset.textContent).toBe("Count: 0");
    });

    test("increment non-lazy", function () {
      for (let i = 0; i < 3; i += 1) {
        userEvent.click(buttonIncrNoReset);
      }
      expect(parNoReset.textContent).toBe("Count: 3");
    });

    test("decrement non-lazy", function () {
      for (let i = 0; i < 3; i += 1) {
        userEvent.click(buttonIncrNoReset);
      }
      userEvent.click(buttonDecNoReset);
      expect(parNoReset.textContent).toBe("Count: 2");
    });
  });

  describe('Reducer Lazy Initialization', function () {
    test("initialize lazy", function () {
      expect(parReset.textContent).toBe("Count: 0");
    });

    test("increment lazy", function () {
      for (let i = 0; i < 3; i += 1) {
        userEvent.click(buttonIncrReset);
      }
      expect(parReset.textContent).toBe("Count: 3");
    });

    test("decrement lazy", function () {
      for (let i = 0; i < 3; i += 1) {
        userEvent.click(buttonIncrReset);
      }
      userEvent.click(buttonDecReset);
      expect(parReset.textContent).toBe("Count: 2");
    });

    test("reset", function() {
      for (let i = 0; i < 3; i += 1) {
        userEvent.click(buttonIncrReset);
      }
      userEvent.click(buttonReset);
      expect(parReset.textContent).toBe("Count: 0");
    });
  });
});
