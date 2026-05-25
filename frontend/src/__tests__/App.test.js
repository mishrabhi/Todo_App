import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('renders app header', () => {
    render(<App />);
    const header = screen.getByText(/Todo App/i);
    expect(header).toBeInTheDocument();
  });

  test('renders filter buttons', () => {
    render(<App />);
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  test('renders todo form', () => {
    render(<App />);
    const titleInput = screen.getByTestId('title-input');
    expect(titleInput).toBeInTheDocument();
  });
});
