import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Error from './Error';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Componente Error', () => {
  test('deve renderizar a mensagem de erro correta', () => {
    renderWithRouter(<Error />);
    
    const errorHeading = screen.getByRole('heading', { name: /oops! it's a dead end/i });
    expect(errorHeading).toBeInTheDocument();
    expect(errorHeading.tagName).toBe('H1');
  });

  test('deve renderizar o link "back home" que leva para a página inicial', () => {
    renderWithRouter(<Error />);
    
    const backHomeLink = screen.getByRole('link', { name: /back home/i });
    expect(backHomeLink).toBeInTheDocument();
    expect(backHomeLink).toHaveAttribute('href', '/');
  });

  test('deve ter as classes CSS corretas para estilização', () => {
    renderWithRouter(<Error />);
    
    const errorSection = screen.getByRole('heading', { name: /oops! it's a dead end/i }).closest('section');
    expect(errorSection).toHaveClass('error-page', 'section');
    
    const errorContainer = screen.getByRole('heading', { name: /oops! it's a dead end/i }).closest('div');
    expect(errorContainer).toHaveClass('error-container');
  });

  test('deve ter o botão com as classes de estilo corretas', () => {
    renderWithRouter(<Error />);
    
    const backHomeLink = screen.getByRole('link', { name: /back home/i });
    expect(backHomeLink).toHaveClass('btn', 'btn-primary');
  });

  test('deve ter a estrutura semântica correta', () => {
    renderWithRouter(<Error />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
  });
});