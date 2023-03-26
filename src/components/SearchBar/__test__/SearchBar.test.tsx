import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

test('should render input', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const inputElement = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
});

test('should be able to type in input', () => {
  render(<SearchBar onSearch={jest.fn()} />);
  const inputElement = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;
  fireEvent.change(inputElement, { target: { value: 'risotto' } });
  expect(inputElement.value).toBe('risotto');
});
