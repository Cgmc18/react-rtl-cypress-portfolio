# React Testing Portfolio - RTL & Cypress

**Portfolio demonstrando testes automatizados** em aplicação React com Jest, React Testing Library e Cypress.

## 🧪 **Foco: Testes**

- ✅ **Testes Unitários**: Jest + React Testing Library
- ✅ **Testes E2E**: Cypress  
- ✅ **Mocking**: APIs e Context
- ✅ **User Interactions**: Formulários e navegação
- ✅ **Async Testing**: API calls e loading states

## 🏗️ **Executar Testes**

### **Testes Unitários**
```bash
# Rodar todos os testes unitários
npm test

# Testes específicos
npm test Navbar.test.js
```

### **Estrutura de Testes**
```
src/
├── components/
│   ├── Navbar.test.js          # Navegação e roteamento
│   ├── Loading.test.js         # Estados de carregamento
│   ├── Cocktail.test.js        # Props e dados dinâmicos
│   ├── CocktailList.test.js    # Context API e renderização condicional
│   └── SearchForm.test.js      # Interações do usuário e formulários
└── pages/
    ├── Home.test.js            # Composição de componentes
    ├── About.test.js           # Conteúdo estático
    ├── Error.test.js           # Páginas de erro
    └── SingleCocktail.test.js  # Async/await, API calls e useParams
```

### **Testes E2E**
```bash
npx cypress open           # Interface
npx cypress run            # Headless
```

## 🚀 **Como Executar o Projeto**

### **Pré-requisitos**
- Node.js
- npm

### **Setup**
```bash
# Instalar dependências
npm install

# Executar aplicação (para testes E2E)
npm start
```

## 📊 **Aplicação de Exemplo**

A aplicação (busca de cocktails) serve como **base para demonstrar os testes**:
- Busca por cocktails via API
- Navegação entre páginas
- Estados de loading e erro
- Formulários e interações

**API utilizada**: TheCocktailDB (para dados reais nos testes)