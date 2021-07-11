import { render, screen } from '@testing-library/react';
import App from './App';

test ('renders without crashing', () => {
  render(<App />);
});

test('renders app name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Open TableTop RPG/i);
  expect(nameElement).toBeInTheDocument();
});
