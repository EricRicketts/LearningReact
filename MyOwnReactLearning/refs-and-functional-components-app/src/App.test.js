import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { SimpleRef } from "./components/simple_ref";
import { CallbackRefDynamicChild } from "./components/callback_ref_dynamic_child";
import userEvent from "@testing-library/user-event";

describe('Testing Refs And Functional Components', function () {
  let results, expected;
  describe('Functional Component Using Simple Ref', function () {
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

  describe('Functional Component Using Callback Ref', function () {
    let firstTextInput, secondTextInput, buttonShowNextInput, buttonHideNextInput;
    let firstInputFocusButton, firstInputBlurButton;
    beforeEach(() => {
      render(<CallbackRefDynamicChild />);
      firstTextInput = screen.queryByTestId('firstInputText');
      secondTextInput = screen.queryByTestId('secondInputText');
      buttonShowNextInput = screen.queryByTestId('buttonShowNextInput');
      buttonHideNextInput = screen.queryByTestId('buttonHideNextInput');
      firstInputFocusButton = screen.queryByTestId('firstInputFocusButton');
      firstInputBlurButton = screen.queryByTestId('firstInputBlurButton');
    });

    test('initialization', function () {
      expected = [true, true, true, false, false, false];
      results = [
        !!firstTextInput, !!buttonShowNextInput, !!buttonHideNextInput,
        !!secondTextInput, !!firstInputFocusButton, !!firstInputBlurButton
      ];
      expect(results).toEqual(expected);
    });

    test('new inputs and buttons present', function () {
      UserEvent.click(buttonShowNextInput);
      [secondTextInput, firstInputFocusButton, firstInputBlurButton] = [
        screen.queryByTestId('secondInputText'), screen.queryByTestId('firstInputFocusButton'),
        screen.queryByTestId('firstInputBlurButton')
      ];
      expected = [true, true, true];
      results = [!!secondTextInput, !!firstInputFocusButton, !!firstInputBlurButton];
      expect(results).toEqual(expected);
    });

    test('new inputs have focus and an entry', function () {
      UserEvent.click(buttonShowNextInput);
      secondTextInput = screen.queryByTestId('secondInputText');
      expect(secondTextInput).toHaveFocus();
      expect(secondTextInput.value).toBe('I have come into existence.');
    });

    test('new inputs can be removed by hide button', function () {
      userEvent.click(buttonShowNextInput);
      userEvent.click(buttonHideNextInput);
      expected = [false, false, false];
      [secondTextInput, firstInputFocusButton, firstInputBlurButton] = [
        screen.queryByTestId('secondTextInput'), screen.queryByTestId('firstInputFocusButton'),
        screen.queryByTestId('firstInputBlurButton')
      ];
      results = [!!secondTextInput, !!firstInputFocusButton, !!firstInputBlurButton];
      expect(results).toEqual(expected);
    });

    test('new button focus the first input', function () {
      userEvent.click(buttonShowNextInput);
      firstInputFocusButton = screen.queryByTestId('firstInputFocusButton');
      expect(firstTextInput).not.toHaveFocus();
      userEvent.click(firstInputFocusButton);
      expect(firstTextInput).toHaveFocus();
    });

    test('new button blur the first input', function () {
      userEvent.click(buttonShowNextInput);
      firstInputFocusButton = screen.queryByTestId('firstInputFocusButton');
      firstInputBlurButton = screen.queryByTestId('firstInputBlurButton');
      userEvent.click(firstInputFocusButton);
      userEvent.click(firstInputBlurButton);
      expect(firstTextInput).not.toHaveFocus();
    });
  });
});

