import '@testing-library/jest-dom';

// Mock next/image if used
jest.mock('next/image', () => (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
});
