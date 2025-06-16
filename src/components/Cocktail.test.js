import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cocktail from './Cocktail';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const mockCocktailData = {
  id: '123',
  name: 'Mojito',
  glass: 'Highball glass',
  info: 'A refreshing mint cocktail',
  image: 'https://example.com/mojito.jpg'
};

describe('Componente Cocktail', () => {
  test('deve renderizar todas as informações do cocktail', () => {
    renderWithRouter(
      <Cocktail 
        id={mockCocktailData.id}
        name={mockCocktailData.name}
        glass={mockCocktailData.glass}
        info={mockCocktailData.info}
        image={mockCocktailData.image}
      />
    );
    
    const cocktailName = screen.getByRole('heading', { name: /mojito/i });
    expect(cocktailName).toBeInTheDocument();
    expect(cocktailName.tagName).toBe('H3');
    
    const glassType = screen.getByRole('heading', { name: /highball glass/i });
    expect(glassType).toBeInTheDocument();
    expect(glassType.tagName).toBe('H4');
    
    const cocktailInfo = screen.getByText(/a refreshing mint cocktail/i);
    expect(cocktailInfo).toBeInTheDocument();
    expect(cocktailInfo.tagName).toBe('P');
  });

  test('deve renderizar a imagem com src e alt corretos', () => {
    renderWithRouter(
      <Cocktail {...mockCocktailData} />
    );
    
    const cocktailImage = screen.getByAltText(/mojito/i);
    expect(cocktailImage).toBeInTheDocument();
    expect(cocktailImage).toHaveAttribute('src', mockCocktailData.image);
    expect(cocktailImage.tagName).toBe('IMG');
  });

  test('deve renderizar link de detalhes com URL correta', () => {
    renderWithRouter(
      <Cocktail {...mockCocktailData} />
    );
    
    const detailsLink = screen.getByRole('link', { name: /details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/cocktail/${mockCocktailData.id}`);
  });

  test('deve ter as classes CSS corretas para estilização', () => {
    renderWithRouter(
      <Cocktail {...mockCocktailData} />
    );
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('cocktail');
    
    const detailsLink = screen.getByRole('link', { name: /details/i });
    expect(detailsLink).toHaveClass('btn', 'btn-primary', 'btn-details');
  });

  test('deve ter estrutura semântica correta', () => {
    renderWithRouter(
      <Cocktail {...mockCocktailData} />
    );
    
    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    
    const headings = screen.getAllByRole('heading');
    expect(headings).toHaveLength(2);
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
  });

  test('deve funcionar com props diferentes', () => {
    const differentCocktailData = {
      id: '456',
      name: 'Margarita',
      glass: 'Cocktail glass',
      info: 'Classic tequila cocktail with lime',
      image: 'https://example.com/margarita.jpg'
    };

    renderWithRouter(
      <Cocktail {...differentCocktailData} />
    );
    
    expect(screen.getByRole('heading', { name: /margarita/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /cocktail glass/i })).toBeInTheDocument();
    expect(screen.getByText(/classic tequila cocktail with lime/i)).toBeInTheDocument();
    expect(screen.getByAltText(/margarita/i)).toHaveAttribute('src', differentCocktailData.image);
    expect(screen.getByRole('link', { name: /details/i })).toHaveAttribute('href', '/cocktail/456');
  });

  test('deve lidar com props undefined sem quebrar', () => {
    expect(() => {
      renderWithRouter(
        <Cocktail 
          id="123"
          name="Test Cocktail"
          glass={undefined}
          info={undefined}
          image={undefined}
        />
      );
    }).not.toThrow();
    
    expect(screen.getByRole('heading', { name: /test cocktail/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /details/i })).toBeInTheDocument();
  });
});