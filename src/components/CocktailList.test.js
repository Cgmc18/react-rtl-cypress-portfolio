import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CocktailList from './CocktailList';

const mockContextValue = {
  cocktails: [],
  loading: false
};

jest.mock('../context', () => ({
  useGlobalContext: () => mockContextValue
}));

jest.mock('./Cocktail', () => {
  return function MockCocktail({ id, name }) {
    return <div data-testid={`cocktail-${id}`}>{name}</div>;
  };
});

jest.mock('./Loading', () => {
  return function MockLoading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const updateMockContext = (newValues) => {
  Object.assign(mockContextValue, newValues);
};

describe('Componente CocktailList', () => {
  beforeEach(() => {
    updateMockContext({
      cocktails: [],
      loading: false
    });
  });

  test('deve renderizar o componente Loading quando loading é true', () => {
    updateMockContext({
      cocktails: [],
      loading: true
    });

    renderWithRouter(<CocktailList />);
    
    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveTextContent('Loading...');
  });

  test('deve renderizar mensagem "no cocktails matched" quando não há cocktails', () => {
    updateMockContext({
      cocktails: [],
      loading: false
    });

    renderWithRouter(<CocktailList />);
    
    const noResultsMessage = screen.getByRole('heading', { 
      name: /no cocktails matched your search criteria/i 
    });
    expect(noResultsMessage).toBeInTheDocument();
    expect(noResultsMessage.tagName).toBe('H2');
    expect(noResultsMessage).toHaveClass('section-title');
  });

  test('deve renderizar lista de cocktails quando há dados disponíveis', () => {
    const mockCocktails = [
      { id: '1', name: 'Mojito', glass: 'Highball', info: 'Mint cocktail', image: 'mojito.jpg' },
      { id: '2', name: 'Margarita', glass: 'Cocktail glass', info: 'Tequila cocktail', image: 'margarita.jpg' },
      { id: '3', name: 'Daiquiri', glass: 'Cocktail glass', info: 'Rum cocktail', image: 'daiquiri.jpg' }
    ];

    updateMockContext({
      cocktails: mockCocktails,
      loading: false
    });

    renderWithRouter(<CocktailList />);
    
    const sectionTitle = screen.getByRole('heading', { name: /cocktails/i });
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle.tagName).toBe('H2');
    expect(sectionTitle).toHaveClass('section-title');

    expect(screen.getByTestId('cocktail-1')).toBeInTheDocument();
    expect(screen.getByTestId('cocktail-2')).toBeInTheDocument();
    expect(screen.getByTestId('cocktail-3')).toBeInTheDocument();

    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Daiquiri')).toBeInTheDocument();
  });

  test('deve ter a estrutura CSS correta quando renderiza cocktails', () => {
    const mockCocktails = [
      { id: '1', name: 'Mojito', glass: 'Highball', info: 'Mint cocktail', image: 'mojito.jpg' }
    ];

    updateMockContext({
      cocktails: mockCocktails,
      loading: false
    });

    renderWithRouter(<CocktailList />);
    
    const section = screen.getByRole('heading', { name: /cocktails/i }).closest('section');
    expect(section).toHaveClass('section');

    const cocktailsCenter = section.querySelector('.cocktails-center');
    expect(cocktailsCenter).toBeInTheDocument();
  });

  test('deve renderizar quantidade correta de cocktails', () => {
    const scenarios = [
      { count: 1, cocktails: [{ id: '1', name: 'Test1' }] },
      { count: 3, cocktails: [
        { id: '1', name: 'Test1' },
        { id: '2', name: 'Test2' },
        { id: '3', name: 'Test3' }
      ]},
      { count: 5, cocktails: Array.from({ length: 5 }, (_, i) => ({
        id: String(i + 1),
        name: `Test${i + 1}`
      }))}
    ];

    scenarios.forEach(({ count, cocktails }) => {
      updateMockContext({
        cocktails,
        loading: false
      });

      const { unmount } = renderWithRouter(<CocktailList />);
      
      const cocktailElements = screen.getAllByText(/Test\d+/);
      expect(cocktailElements).toHaveLength(count);
      
      unmount();
    });
  });

  test('deve priorizar loading sobre outras condições', () => {
    updateMockContext({
      cocktails: [{ id: '1', name: 'Test' }],
      loading: true
    });

    renderWithRouter(<CocktailList />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /cocktails/i })).not.toBeInTheDocument();
  });
});