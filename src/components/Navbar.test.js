import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Componente Navbar', () => {
  test('deve renderizar navbar com logo e links de navegação', () => {
    renderWithRouter(<Navbar />);
    
    const logo = screen.getByAltText('cocktail db logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('logo');
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  test('deve ter logo que linka para a página inicial', () => {
    renderWithRouter(<Navbar />);
    
    const logoLink = screen.getByRole('link', { name: /cocktail db logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('deve ter links de navegação com atributos href corretos', () => {
    renderWithRouter(<Navbar />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  test('deve ter as classes CSS corretas', () => {
    renderWithRouter(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('navbar');
    
    const navCenter = navbar.querySelector('.nav-center');
    expect(navCenter).toBeInTheDocument();
    
    const navLinks = navbar.querySelector('.nav-links');
    expect(navLinks).toBeInTheDocument();
  });
});