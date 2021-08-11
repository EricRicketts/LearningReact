import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { SimpleRef } from "./components/simple_ref";
import App from './App';

describe('Testing Refs And Functional Components', function () {
  let results, expected;
  describe('Custom Text Input Component', function () {
    let textInput, focusButton, blurButton, paragraphButton, randomText;
    beforeEach(() => {
      render(<SimpleRef />);
      textInput = screen.getByTestId('textInput');
      focusButton = screen.getByTestId('focusButton');
      blurButton = screen.getByTestId('blurButton');
      paragraphButton = screen.getByTestId('paragraphButton');
      randomText = screen.getByTestId('randomText');
    });

    test('focus input by button click', function () {
      UserEvent.click(focusButton);
      expect(textInput).toHaveFocus();
    });

    test('blur button will disable the focus', function () {
      UserEvent.click(focusButton);
      UserEvent.click(blurButton);
      expect(textInput).not.toHaveFocus();
    });

    test('paragraph button results in random paragraph text', function () {
      expected = [
        'Random Text: Foo Bar', 'Random Text: Fizz Buzz', 'Random Text: Who Chi', 'Random Text: Yit Hat'
      ];
      UserEvent.click(paragraphButton);
      expect(expected).toContain(randomText.textContent);
    });
  });
});

