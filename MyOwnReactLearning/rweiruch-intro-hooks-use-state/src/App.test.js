import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import App from './App';

describe("Testing useState", function() {
  let list, addArticleButton, divForConditionalForm, addArticleForm, submitAddArticleForm, results, expected;
  beforeEach(() => {
    render(<App />);
    list = screen.getByTestId('list');
    addArticleButton = screen.getByTestId('addArticleButton');
    divForConditionalForm = screen.getByTestId('conditionalForm');
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

    test("Add Article Form is not present", function() {
      addArticleForm = divForConditionalForm.querySelector('form');
      expect(addArticleForm).toBeFalsy();
    });
  });

  describe('Remove A List Item', function () {
    test('Remove second item from list', function() {
      let listItems = list.querySelectorAll('li');
      let secondListItemRemoveButton = listItems.item(1).querySelector('button');
      userEvent.click(secondListItemRemoveButton);
      expected = 3;
      results = list.querySelectorAll('li').length;
      expect(results).toBe(expected);
    });
  });

  describe('Add A List Item', function () {
    test('Add Item Form Present When Add Article Button Clicked', function() {
        userEvent.click(addArticleButton);
        addArticleForm = divForConditionalForm.querySelector('form');
        expect(addArticleForm).toBeTruthy();
    });
  });
});
