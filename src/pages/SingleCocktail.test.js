import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import SingleCocktail from './SingleCocktail';

jest.mock('../components/Loading', () => {
  return function MockLoading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

global.fetch = jest.fn();

const renderWithRouter = (component, cocktailId = '123') => {
  return render(
    <MemoryRouter initialEntries={[`/cocktail/${cocktailId}`]}>
      <Route path="/cocktail/:id">
        {component}
      </Route>
    </MemoryRouter>
  );
};

const mockApiResponse = {
  drinks: [
    {
      strDrink: 'Mojito',
      strDrinkThumb: 'https://example.com/mojito.jpg',
      strAlcoholic: 'Alcoholic',
      strCategory: 'Cocktail',
      strGlass: 'Highball glass',
      strInstructions: 'Muddle mint leaves with simple syrup and water.',
      strIngredient1: 'Light rum',
      strIngredient2: 'Fresh lime',
      strIngredient3: 'Sugar',
      strIngredient4: 'Mint',
      strIngredient5: 'Soda water'
    }
  ]
};

describe('Componente SingleCocktail', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('deve renderizar Loading inicialmente', async () => {
    fetch.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => mockApiResponse
      }), 100))
    );

    renderWithRouter(<SingleCocktail />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('deve fazer chamada para API com ID correto', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    });

    renderWithRouter(<SingleCocktail />, '123');

    await wait(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=123'
      );
    }, { timeout: 3000 });
  });

  test('deve renderizar informações do cocktail após carregar dados', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    });

    renderWithRouter(<SingleCocktail />);

    await wait(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { name: /mojito/i })).toBeInTheDocument();
    expect(screen.getByAltText(/mojito/i)).toBeInTheDocument();
    
    
    const ingredientsSection = screen.getByText(/ingredients/i);
    expect(ingredientsSection).toBeInTheDocument();
    
    const ingredientsContainer = ingredientsSection.parentElement;
    expect(ingredientsContainer.textContent).toContain('Light rum');
    expect(ingredientsContainer.textContent).toContain('Fresh lime');
    expect(ingredientsContainer.textContent).toContain('Sugar');
    expect(ingredientsContainer.textContent).toContain('Soda water');
    
    const instructionsLabel = screen.getByText(/instructions/i); 
    expect(instructionsLabel).toBeInTheDocument();
    
    expect(screen.getByText(/muddle mint leaves with simple syrup and water/i)).toBeInTheDocument();
    
    expect(screen.getByText(/alcoholic/i)).toBeInTheDocument();
    expect(screen.getByText(/highball glass/i)).toBeInTheDocument();
    expect(screen.getByText(/cocktail/i)).toBeInTheDocument();
  });

  test('deve renderizar mensagem "no cocktail to display" quando API retorna null', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ drinks: null })
    });

    renderWithRouter(<SingleCocktail />);

    await wait(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { 
      name: /no cocktail to display/i 
    })).toBeInTheDocument();
  });

  test('deve renderizar link "back home" com href correto', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    });

    renderWithRouter(<SingleCocktail />);

    await wait(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const backHomeLink = screen.getByRole('link', { name: /back home/i });
    expect(backHomeLink).toBeInTheDocument();
    expect(backHomeLink).toHaveAttribute('href', '/');
    expect(backHomeLink).toHaveClass('btn', 'btn-primary');
  });

  test('deve renderizar apenas ingredientes que existem', async () => {
    const mockResponseWithPartialIngredients = {
      drinks: [
        {
          ...mockApiResponse.drinks[0],
          strIngredient1: 'Rum',
          strIngredient2: 'Lime',
          strIngredient3: null,
          strIngredient4: undefined,
          strIngredient5: ''
        }
      ]
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseWithPartialIngredients
    });

    renderWithRouter(<SingleCocktail />);

    await wait(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const rumElements = screen.getAllByText(/rum/i);
    const limeElements = screen.getAllByText(/lime/i);
    
    expect(rumElements.length).toBeGreaterThan(0);
    expect(limeElements.length).toBeGreaterThan(0);
    
    const ingredientsSection = screen.getByText(/ingredients/i).parentElement;
    expect(ingredientsSection.textContent).not.toContain('null');
    expect(ingredientsSection.textContent).not.toContain('undefined');
  });

  test('deve ter estrutura CSS correta', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    });

    renderWithRouter(<SingleCocktail />);

    await wait(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    const cocktailSection = screen.getByRole('heading', { name: /mojito/i }).closest('section');
    expect(cocktailSection).toHaveClass('section', 'cocktail-section');

    const drinkContainer = cocktailSection.querySelector('.drink');
    expect(drinkContainer).toBeInTheDocument();

    const drinkInfo = drinkContainer.querySelector('.drink-info');
    expect(drinkInfo).toBeInTheDocument();
  });

  test('deve lidar com erro na API', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    renderWithRouter(<SingleCocktail />);

    await wait(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByRole('heading', { 
      name: /no cocktail to display/i 
    })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  test('deve funcionar com diferentes IDs de cocktail', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    });

    renderWithRouter(<SingleCocktail />, '456');

    await wait(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=456'
      );
    });
  });
});