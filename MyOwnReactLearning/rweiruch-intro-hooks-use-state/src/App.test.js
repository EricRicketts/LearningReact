import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import App from './App';

describe("Testing useState", function() {
  let list, addArticleButton, addArticleForm, submitAddArticleForm, results, expected;
  beforeEach(() => {
    render(<App />);
    list = screen.getByTestId('list');
    addArticleButton = screen.getByTestId('addArticleButton');
  });

  describe('Initialization', function () {
    test('List present', function() {
      expected = 4;
      results = list.querySelectorAll('li').length;
      expect(results).toBe(expected);
    });

    test('Add Article Button Present', function() {
      expect(addArticleButton).toBeTruthy();
    });
  });
});
