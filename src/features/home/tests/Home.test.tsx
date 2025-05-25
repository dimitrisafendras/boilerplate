import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '@/common/utils/test-utils';
import Home from '../components/Home';

// Mock the Link component from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('Home Component', () => {
  it('renders the home page with all sections', () => {
    renderWithProviders(<Home />);

    // Check if the title is rendered
    expect(screen.getByText('Project Guidelines')).toBeInTheDocument();

    // Check if the directory structure is rendered
    expect(screen.getByText('Directory Structure')).toBeInTheDocument();

    // Check if all guideline sections are rendered
    expect(screen.getByText('Build Setup')).toBeInTheDocument();
    expect(screen.getByText('Feature-Based Architecture')).toBeInTheDocument();
    expect(screen.getByText('Routing')).toBeInTheDocument();
    expect(screen.getByText('Redux & Redux-Saga')).toBeInTheDocument();
    expect(screen.getByText('MirageJS Mock Server')).toBeInTheDocument();
    expect(screen.getByText('Environment Variables')).toBeInTheDocument();
    expect(screen.getByText('Testing Setup')).toBeInTheDocument();
    expect(screen.getByText('UI Components & Ant Design')).toBeInTheDocument();
    expect(screen.getByText('Code Style & Conventions')).toBeInTheDocument();

    // Check if the example features section is rendered
    expect(screen.getByText('Example Features')).toBeInTheDocument();
    expect(screen.getByText('Users Feature')).toBeInTheDocument();
  });
});
