import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather application title and search bar', () => {
  render(<App />);
  const titleElement = screen.getByText(/Weather Forecast/i);
  expect(titleElement).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText(/Enter city name/i);
  expect(searchInput).toBeInTheDocument();
});
