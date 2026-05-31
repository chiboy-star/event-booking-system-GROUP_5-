import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorPage from './error';

describe('Error Page', () => {
  it('renders error message', () => {
    const reset = jest.fn();

    render(<ErrorPage error={new Error('Test error')} reset={reset} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('calls reset when button is clicked', async () => {
    const user = userEvent.setup();
    const reset = jest.fn();

    render(<ErrorPage error={new Error('Test error')} reset={reset} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(reset).toHaveBeenCalledTimes(1);
  });
});