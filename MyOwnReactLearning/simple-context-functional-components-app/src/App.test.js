import { render, screen } from '@testing-library/react';
import App from './App';

test('demonstrate useContext', () => {
  render(<App />);
  const button = screen.getByTestId("themedButton");
  expect(button.style.color).toBe("rgb(255, 255, 255)");
  expect(button.style.background).toBe("rgb(34, 34, 34)");
});
