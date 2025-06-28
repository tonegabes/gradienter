# 🎨 Gerador de Gradientes Tailwind CSS

Uma **Single Page Application (SPA)** em Next.js 14+ que gera 100 cards com gradientes usando apenas **cores oficiais do Tailwind CSS**. Cada card possui proporção 16:9 e exibe as cores Tailwind e classes prontas para usar.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-blue?style=flat-square&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black?style=flat-square)

## ✨ Funcionalidades

### 🎯 Principais
- **100 cards únicos** gerados a cada carregamento
- **Cores Tailwind oficiais** (slate, gray, blue, red, green, etc.)
- **Gradientes Tailwind** com 2-3 cores cada
- **Proporção 16:9** para todos os cards
- **Classes Tailwind** prontas para copiar e usar
- **Direções variadas** (to-r, to-br, to-tl, etc.)

### 🖱️ Interatividade
- **Clique para copiar cores** Tailwind (ex: blue-500, red-400)
- **Clique para copiar classes** completas (ex: bg-gradient-to-r from-blue-500 to-red-400)
- **Hover effects** suaves com animações
- **Feedback visual** ao copiar
- **Interface totalmente responsiva**

### 📱 Responsividade
- **Desktop**: 4 colunas
- **Tablet**: 3 colunas
- **Mobile**: 2 colunas
- **Mobile pequeno**: 1 coluna

## 🚀 Tecnologias Utilizadas

- **Next.js 14+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS (cores utilizadas nos gradientes)
- **shadcn/ui** - Componentes reutilizáveis
- **Inter & Fira Code** - Fontes do Google Fonts

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos
1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd gradienter
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globais
├── components/
│   ├── GradientCard.tsx   # Card individual Tailwind
│   └── GradientGrid.tsx   # Grid de cards
├── lib/
│   └── utils.ts           # Funções utilitárias Tailwind
└── types/
    └── index.ts           # Definições TypeScript
```

## 🎨 Componentes

### `GradientCard`
Renderiza um card individual com:
- Gradiente CSS gerado a partir de cores Tailwind
- Proporção 16:9
- Cores Tailwind listadas (ex: blue-500, red-400)
- Classes Tailwind completas para copiar
- Círculos coloridos representando cada cor
- Botões para copiar cores ou classes

### `GradientGrid`
Organiza os cards em:
- Grid responsivo
- 100 cards por página
- Header com estatísticas
- Footer com informações Tailwind

## 🛠️ Funções Utilitárias

### `generateRandomTailwindColor()`
Gera uma cor Tailwind aleatória válida (ex: "blue-500").

### `generateRandomTailwindGradient()`
Cria configuração completa de gradiente Tailwind com:
- 2-3 cores Tailwind aleatórias
- Direção Tailwind aleatória
- Classes CSS prontas para usar

### `generateCSSFromTailwindColors()`
Converte cores Tailwind para CSS válido para preview.

### `copyToClipboard()`
Copia cores ou classes para área de transferência.

## 🎯 Como Usar

1. **Visualizar Gradientes**: A página carrega automaticamente com 100 gradientes únicos usando cores Tailwind
2. **Copiar Cores**: Clique no botão "Copiar Cores" para copiar as cores Tailwind (ex: blue-500, red-400)
3. **Copiar Classes**: Clique no botão "Copiar Classes" para copiar as classes completas (ex: bg-gradient-to-r from-blue-500 to-red-400)
4. **Usar no Projeto**: Cole as classes diretamente no seu HTML/JSX
5. **Gerar Novos**: Atualize a página (F5) para novos gradientes

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start

# Linting
npm run lint

# Verificação de tipos
npm run type-check
```

## 🎨 Personalização

### Modificar Quantidade de Cards
No arquivo `src/app/page.tsx`:
```tsx
<GradientGrid cardCount={100} /> // Altere o número
```

### Adicionar Novas Cores Tailwind
No arquivo `src/lib/utils.ts`, adicione na constante `TAILWIND_COLORS`:
```tsx
const TAILWIND_COLORS = {
  // ... cores existentes
  newcolor: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
};
```

### Personalizar Direções
Modifique a constante `TAILWIND_DIRECTIONS` em `src/lib/utils.ts`.

## 📊 Performance

- **Geração otimizada** com `useMemo`
- **Cores Tailwind nativas** para melhor performance
- **CSS gerado dinamicamente** apenas para preview
- **Tailwind JIT** para bundle otimizado
- **Fontes otimizadas** do Google Fonts

## 🌟 Destaques Técnicos

- ✅ **100% cores Tailwind** oficiais
- ✅ **Classes prontas** para usar
- ✅ **TypeScript** bem tipado
- ✅ **Mobile-first** design
- ✅ **Acessibilidade** com ARIA labels
- ✅ **Performance** otimizada
- ✅ **Código limpo** e comentado

## 🎨 Cores Tailwind Disponíveis

**Neutras**: slate, gray, zinc, neutral, stone
**Vermelhas**: red, rose
**Laranjas**: orange, amber
**Amarelas**: yellow, lime
**Verdes**: green, emerald, teal
**Azuis**: cyan, sky, blue, indigo
**Roxas**: violet, purple, fuchsia
**Rosas**: pink

Cada cor tem 11 tons: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e Tailwind CSS**
