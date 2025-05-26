import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '@/common/utils/test-utils';
import { TestHook } from '../test-hook';

describe('TestHook', () => {
  it('renders the component with correct text', () => {
    renderWithProviders(<TestHook />);

    expect(screen.getByText('Test Hook Component')).toBeInTheDocument();
    expect(screen.getByText('This component is used to test the pre-commit hook.')).toBeInTheDocument();
  });
});
