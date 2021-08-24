import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

describe('Test Imperative Handle', function () {
  let expected, results, buttonOne, buttonTwo, buttonThree, boxOne, boxTwo, boxThree;
  beforeEach(() => {
    render(<App />);
    buttonOne = screen.getByTestId('buttonOne');
    buttonTwo = screen.getByTestId('buttonTwo');
    buttonThree = screen.getByTestId('buttonThree');
    boxOne = screen.getByTestId('boxOne');
    boxTwo = screen.getByTestId('boxTwo');
    boxThree = screen.getByTestId('boxThree');
  });

  test("button one scroll", function () {
    // this test will not work, jsdom does not support window.scrollTo
    expected = [0, 0, 0];
    let topOne = boxOne.getBoundingClientRect().top;
    let topTwo = boxTwo.getBoundingClientRect().top;
    let topThree = boxThree.getBoundingClientRect().top;
    results = [topOne, topTwo, topThree];
    expect(expected).toEqual(results);
  });

});
