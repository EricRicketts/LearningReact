import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { SimpleForwardRef } from "./components/simple_forward_ref";

describe('Simple Forwarded Ref', function () {
  let expected, results, input, button;
  beforeEach(() => {
    render(<SimpleForwardRef />);
    input = screen.getByTestId('forwarded_input');
    button = screen.getByTestId('select_button');
  });

  test("select text", function() {
    input.value = 'abcd';
    userEvent.click(button);
    results = document.getSelection();
    expect(results.constructor.name).toBe('Selection');
  });
});