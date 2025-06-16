import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

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
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('deve renderizar o componente SearchForm', () => {
    renderWithRouter(<Home />);
    
    const searchForm = screen.getByTestId('search-form');
    expect(searchForm).toBeInTheDocument();
    expect(searchForm).toHaveTextContent('Search Form Component');
  });

  test('deve renderizar o componente CocktailList', () => {
    renderWithRouter(<Home />);
    
    const cocktailList = screen.getByTestId('cocktail-list');
    expect(cocktailList).toBeInTheDocument();
    expect(cocktailList).toHaveTextContent('Cocktail List Component');
  });

  test('deve renderizar os componentes na ordem correta', () => {
    renderWithRouter(<Home />);
    
    const mainElement = screen.getByRole('main');
    const children = mainElement.children;
    
    expect(children).toHaveLength(2);
    
    expect(children[0]).toHaveAttribute('data-testid', 'search-form');
    expect(children[1]).toHaveAttribute('data-testid', 'cocktail-list');
  });

  test('deve ter a estrutura semântica correta', () => {
    renderWithRouter(<Home />);
    
    const mainElements = screen.getAllByRole('main');
    expect(mainElements).toHaveLength(1);
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toContainElement(screen.getByTestId('search-form'));
    expect(mainElement).toContainElement(screen.getByTestId('cocktail-list'));
  });
  test('deve renderizar sem erros com componentes reais', () => {
    jest.clearAllMocks();

    expect(() => {
      renderWithRouter(<Home />);
    }).not.toThrow();
  });
});