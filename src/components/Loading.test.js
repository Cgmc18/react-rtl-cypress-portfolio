import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Componente Loading', () => {
  test('deve renderizar o elemento de loading com a classe correta', () => {
    render(<Loading />);
    
    const { container } = render(<Loading />);
    const loaderElement = container.querySelector('.loader');
    
    expect(loaderElement).toBeInTheDocument();
  });

  test('deve renderizar uma div como elemento raiz', () => {
    const { container } = render(<Loading />);
    
    const firstChild = container.firstChild;
    expect(firstChild.tagName).toBe('DIV');
    expect(firstChild).toHaveClass('loader');
  });

  test('deve ter a estrutura HTML esperada', () => {
    const { container } = render(<Loading />);
    
    expect(container.children).toHaveLength(1);
    
    const loaderDiv = container.firstChild;
    expect(loaderDiv).toHaveClass('loader');
  });
});