import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import About from './About';

describe('Componente About', () => {
  test('deve renderizar o título "about us" como heading principal', () => {
    render(<About />);
    
    // Busca pelo heading
    const title = screen.getByRole('heading', { name: /about us/i });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
    expect(title).toHaveClass('section-title');
  });

  test('deve renderizar o parágrafo com conteúdo Lorem ipsum', () => {
    render(<About />);
    
    // Busca pelo texto específico do início do parágrafo
    const paragraph = screen.getByText(/lorem ipsum dolor sit amet consectetur/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });

  test('deve conter o texto completo esperado no parágrafo', () => {
    render(<About />);
    
    // Verifica se palavras-chave específicas estão presentes
    expect(screen.getByText(/molestiae repudiandae architecto/i)).toBeInTheDocument();
    expect(screen.getByText(/placeat ratione hic aspernatur/i)).toBeInTheDocument();
    
    // Verifica o parágrafo completo
    const fullParagraph = screen.getByText(/lorem ipsum dolor sit amet consectetur.*placeat ratione hic aspernatur error blanditiis\?/i);
    expect(fullParagraph).toBeInTheDocument();
  });

  test('deve ter a estrutura semântica correta', () => {
    render(<About />);
    
    // Verifica se tem exatamente 1 heading
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(1);
    
    // Verifica se o heading é de nível 1
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
  });

  test('deve ter as classes CSS corretas para estilização', () => {
    render(<About />);
    
    // Verifica a section principal
    const aboutSection = screen.getByRole('heading', { name: /about us/i }).closest('section');
    expect(aboutSection).toHaveClass('section', 'about-section');
    
    // Verifica a classe do título
    const title = screen.getByRole('heading', { name: /about us/i });
    expect(title).toHaveClass('section-title');
  });

  test('deve ter apenas os elementos esperados (sem elementos extras)', () => {
    const { container } = render(<About />);
    
    // Verifica se a section tem exatamente 2 filhos: h1 + p
    const section = container.querySelector('section');
    expect(section.children).toHaveLength(2);
    
    // Verifica se são os elementos corretos
    expect(section.children[0].tagName).toBe('H1');
    expect(section.children[1].tagName).toBe('P');
  });
});