import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../Form';

test('should upload a file', function () {
  render(<Form onSubmit={jest.fn()} />);
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const fileInputElement = screen.getByLabelText(/photo/i) as HTMLInputElement;
  userEvent.upload(fileInputElement, file);
  expect(fileInputElement.files?.item(0)).toBe(file);
  expect(fileInputElement.files).toHaveLength(1);
});

test('submit button should be disabled at first and enabled after typing', function () {
  render(<Form onSubmit={jest.fn()} />);
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i,
  }) as HTMLButtonElement;
  expect(submitButtonElement).not.toHaveClass('active');
  const titleInputElement = screen.getByLabelText(/title/i) as HTMLInputElement;
  userEvent.type(titleInputElement, 'title');
  expect(submitButtonElement).toHaveClass('active');
});

test('should show error message and disable submit button', async function () {
  render(<Form onSubmit={jest.fn()} />);
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i,
  }) as HTMLButtonElement;
  const checkboxInputElement = screen.getByRole('checkbox', {
    name: /vegan/i,
  }) as HTMLInputElement;
  userEvent.click(checkboxInputElement);
  const errorMessageElement = await screen.findByText(/if the dish is vegan/i);
  expect(errorMessageElement).toBeInTheDocument();
  expect(submitButtonElement).not.toHaveClass('active');
});
