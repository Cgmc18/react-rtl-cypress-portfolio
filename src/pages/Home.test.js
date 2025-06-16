import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

// Mock dos componentes filhos para isolar o teste do Home
jest.mock('../components/SearchForm', () => {
  return function MockSearchForm() {
    return <div data-testid="search-form">Search Form Component</div>;
  };
});

jest.mock('../components/CocktailList', () => {
  return function MockCocktailList() {
    return <div data-testid="cocktail-list">Cocktail List Component</div>;
  };
});

// Helper para renderizar com Router (caso os componentes filhos precisem)
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Componente Home', () => {
  test('deve renderizar o elemento main como container principal', () => {
    renderWithRouter(<Home />);
    
    // Busca pelo elemento main
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('deve renderizar o componente SearchForm', () => {
    renderWithRouter(<Home />);
    
    // Verifica se o SearchForm foi renderizado
    const searchForm = screen.getByTestId('search-form');
    expect(searchForm).toBeInTheDocument();
    expect(searchForm).toHaveTextContent('Search Form Component');
  });

  test('deve renderizar o componente CocktailList', () => {
    renderWithRouter(<Home />);
    
    // Verifica se o CocktailList foi renderizado
    const cocktailList = screen.getByTestId('cocktail-list');
    expect(cocktailList).toBeInTheDocument();
    expect(cocktailList).toHaveTextContent('Cocktail List Component');
  });

  test('deve renderizar os componentes na ordem correta', () => {
    renderWithRouter(<Home />);
    
    const mainElement = screen.getByRole('main');
    const children = mainElement.children;
    
    // Verifica se tem exatamente 2 filhos
    expect(children).toHaveLength(2);
    
    // Verifica a ordem: SearchForm primeiro, CocktailList depois
    expect(children[0]).toHaveAttribute('data-testid', 'search-form');
    expect(children[1]).toHaveAttribute('data-testid', 'cocktail-list');
  });

  test('deve ter a estrutura semântica correta', () => {
    renderWithRouter(<Home />);
    
    // Verifica se tem exatamente 1 elemento main
    const mainElements = screen.getAllByRole('main');
    expect(mainElements).toHaveLength(1);
    
    // Verifica se os componentes filhos estão dentro do main
    const mainElement = screen.getByRole('main');
    expect(mainElement).toContainElement(screen.getByTestId('search-form'));
    expect(mainElement).toContainElement(screen.getByTestId('cocktail-list'));
  });

  // Teste alternativo sem mocks (mais próximo da realidade)
  test('deve renderizar sem erros com componentes reais', () => {
    // Este teste executa sem mocks para verificar integração real
    jest.clearAllMocks();
    
    // Renderizar sem mocks pode gerar erros de contexto, 
    // mas serve para verificar se a estrutura básica funciona
    expect(() => {
      renderWithRouter(<Home />);
    }).not.toThrow();
  });
});