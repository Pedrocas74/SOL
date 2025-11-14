import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock CSS Modules
jest.mock('../styles/Hero.module.css', () => new Proxy({}, { get: (t, p) => p }));

// Mock lucide-react icon
jest.mock('lucide-react', () => ({
  SquareArrowDown: (props) => <svg data-testid="square-arrow-down" {...props} />,
}));

// Framer-motion mocks
const mockUseTransform = jest.fn((val, _r, output) => output ? output[0] : 0);
const listeners = new Set();
const mockScrollY = {
  on: (event, cb) => {
    if (event === 'change') listeners.add(cb);
    return () => listeners.delete(cb);
  },
  get: () => 0,
};
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: () => (props) => <div {...props} />,
  }),
  useScroll: () => ({ scrollY: mockScrollY }),
  useTransform: (...args) => mockUseTransform(...args),
  useMotionValueEvent: (val, event, cb) => {
    if (event === 'change') {
      // register immediately
      listeners.add(cb);
    }
  },
}));

import Hero from '../Hero';

describe('Hero component', () => {
  beforeEach(() => {
    listeners.clear?.();
    jest.clearAllMocks();
  });

  test('renders heading with SOL text', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/SoL/i);
  });

  test('renders welcome letters WELCOME sequence', () => {
    render(<Hero />);
    const text = screen.getByText(/WELCOME/);
    expect(text).toBeInTheDocument();
  });

  test('renders two arrow icons', () => {
    render(<Hero />);
    const arrows = screen.getAllByTestId('square-arrow-down');
    expect(arrows).toHaveLength(2);
  });

  test('arrows have reduced opacity initially when not moving', () => {
    render(<Hero />);
    const arrows = screen.getAllByTestId('square-arrow-down');
    arrows.forEach((a) => {
      expect(a).toHaveStyle({ opacity: 0.2 });
    });
  });

  test('useMotionValueEvent toggles isMoving when scrollY changes', () => {
    render(<Hero />);
    // simulate scroll change to > 0
    listeners.forEach((cb) => cb(10));
    const arrows = screen.getAllByTestId('square-arrow-down');
    arrows.forEach((a) => {
      expect(a).toHaveStyle({ opacity: 0 });
    });
  });
});
