import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormPage } from '../FormPage';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.appendChild(modalRoot);

test('should render a card if the form is filled correctly', async function () {
  render(<FormPage />);
  window.URL.createObjectURL = jest.fn();
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  const fileInputElement = screen.getByLabelText(/photo/i) as HTMLInputElement;
  userEvent.upload(fileInputElement, file);
  const titleInputElement = screen.getByLabelText(/title/i) as HTMLInputElement;
  userEvent.type(titleInputElement, 'title');
  const dateInputElement = screen.getByLabelText(/date/i) as HTMLInputElement;
  fireEvent.change(dateInputElement, { target: { value: '2021-10-10' } });
  const commentInputElement = screen.getByLabelText(/comment/i) as HTMLInputElement;
  userEvent.type(commentInputElement, 'comment');
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i,
  }) as HTMLButtonElement;
  userEvent.click(submitButtonElement);
  const titleElement = screen.getByRole('heading', { level: 2 });
  expect(titleElement.textContent).toBe('title');
});
