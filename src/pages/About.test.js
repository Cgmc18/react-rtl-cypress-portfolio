import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from './About';

describe('Componente About', () => {
  test('deve renderizar o título "about us" como heading principal', () => {
    render(<About />);
    
    const title = screen.getByRole('heading', { name: /about us/i });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
    expect(title).toHaveClass('section-title');
  });

  test('deve renderizar o parágrafo com conteúdo Lorem ipsum', () => {
    render(<About />);
    
    const paragraph = screen.getByText(/lorem ipsum dolor sit amet consectetur/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });

  test('deve conter o texto completo esperado no parágrafo', () => {
    render(<About />);
    
    expect(screen.getByText(/molestiae repudiandae architecto/i)).toBeInTheDocument();
    expect(screen.getByText(/placeat ratione hic aspernatur/i)).toBeInTheDocument();
    
    const fullParagraph = screen.getByText(/lorem ipsum dolor sit amet consectetur.*placeat ratione hic aspernatur error blanditiis\?/i);
    expect(fullParagraph).toBeInTheDocument();
  });

  test('deve ter a estrutura semântica correta', () => {
    render(<About />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
    
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  test('deve ter as classes CSS corretas para estilização', () => {
    render(<About />);
    
    const aboutSection = screen.getByRole('heading', { name: /about us/i }).closest('section');
    expect(aboutSection).toHaveClass('section', 'about-section');
    
    const title = screen.getByRole('heading', { name: /about us/i });
    expect(title).toHaveClass('section-title');
  });

  test('deve ter apenas os elementos esperados', () => {
    const { container } = render(<About />);
    
    const section = container.querySelector('section');
    expect(section.children).toHaveLength(2);
    
    expect(section.children[0].tagName).toBe('H1');
    expect(section.children[1].tagName).toBe('P');
  });
});