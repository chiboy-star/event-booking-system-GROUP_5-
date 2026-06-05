import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('Not Found Page', () => {
  it('renders 404 message', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders missing page text', () => {
    render(<NotFound />);

    expect(
      screen.getByText(/does not exist/i)
    ).toBeInTheDocument();
  });
});
