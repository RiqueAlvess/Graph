# Editor de Gráficos Graphite Studio

## 📊 Visão Geral

Editor low-code completo para criação de gráficos Vega-Lite com mais de 100 tipos de gráficos e 140+ propriedades configuráveis.

## 🚀 Funcionalidades

### Tipos de Gráficos Suportados (100+)

Organizados em categorias:

- **Barras**: bar, column, grouped, stacked, normalized, horizontal, vertical, lollipop, range
- **Linhas**: line, multi-line, step, time series, cumulative, radial
- **Áreas**: area, stacked area, normalized area, time series area, polar area
- **Dispersão**: scatter, bubble, dot plot, strip plot, hexbin
- **Distribuição**: histogram, box plot, violin plot, density, ridge plot, Q-Q plot, ECDF
- **Erro**: error bar, error band
- **Temporal**: time series (bar/line/area), calendar heatmap, lag plot, seasonality
- **Circulares**: pie, donut, rose, radar, radial bar
- **Hierárquicos**: treemap, sunburst, icicle, tree, cluster, circle packing, partition
- **Fluxos**: sankey, alluvial, chord, waterfall, funnel
- **Redes**: node-link, force-directed, adjacency matrix
- **Mapas**: choropleth, symbol map, bubble map, dot density, geo scatter, geo heatmap, topojson
- **Heatmaps**: heatmap, correlation heatmap, matrix
- **Combinados**: combo, dual axis, layered
- **Múltiplas**: facet, small multiples, trellis, dashboard
- **Tabelas**: data table, pivot table, summary table, annotated table
- **Indicadores**: text, KPI card, metric, stat, progress, scorecard
- **Interativos**: interactive, brushable, zoomable, linked views, cross-filter
- **Estatística**: regression, trendline, moving average, control chart

### Propriedades Configuráveis (140+)

Organizadas por categoria:

1. **Dados**
   - Fonte de dados (URL/JSON)
   - Formato (JSON, CSV, TSV)
   - Transformações

2. **Dimensões**
   - Largura e altura
   - Auto-dimensionamento
   - Padding

3. **Aparência**
   - Background
   - Título, subtítulo, descrição
   - Tema (default, dark, excel, ggplot2, quartz, vox, fivethirtyeight)

4. **Marca**
   - Tipo (bar, line, point, circle, area, arc, etc.)
   - Orientação
   - Estilo

5. **Cores**
   - Cor principal
   - Preenchimento
   - Contorno
   - Opacidade
   - Esquemas de cores (category10, viridis, inferno, magma, plasma, etc.)

6. **Formas**
   - Tamanho
   - Forma (circle, square, cross, diamond, triangle)
   - Raio dos cantos
   - Raio interno/externo

7. **Linhas**
   - Estilo (solid, dashed, dotted)
   - Espessura
   - Ponta e junção
   - Interpolação (linear, step, basis, cardinal, monotone, natural)
   - Tensão e suavização

8. **Tipografia**
   - Fonte (sans-serif, serif, monospace, Arial, etc.)
   - Tamanho
   - Peso (normal, bold, etc.)
   - Estilo (normal, italic, oblique)
   - Alinhamento
   - Ângulo

9. **Encodings (Mapeamentos)**
   - Eixos X, Y, X2, Y2
   - Cor, tamanho, forma, opacidade
   - Ângulo, raio, texto
   - Detalhe, ordem, tooltip

10. **Transformações de Dados**
    - Empilhamento (zero, normalize, center)
    - Binning
    - Agregação (count, sum, mean, median, min, max, etc.)
    - Agrupamento
    - Ordenação
    - Filtros
    - Unidade de tempo (year, month, week, day, etc.)

11. **Escalas**
    - Tipo (linear, log, pow, sqrt, time, ordinal, band, point)
    - Domínio e intervalo
    - Limitar, arredondar, inverter

12. **Estatística**
    - Regressão (linear, log, exp, pow, quad, poly)
    - Linha de tendência
    - Tipo de erro (stderr, stdev, ci)
    - Nível de confiança

13. **Layout**
    - Facetas (linhas e colunas)
    - Espaçamento
    - Camadas
    - Repetir campos
    - Small multiples

14. **Geográfico**
    - Projeção (mercator, albersUsa, equalEarth, etc.)
    - Centro, escala, translação
    - Recorte

15. **Interatividade**
    - Hover, click
    - Seleção (single, multi, interval)
    - Brush, zoom, pan
    - Visualizações vinculadas
    - Filtro cruzado

16. **Animação**
    - Duração
    - Easing (linear, quad, cubic, sin, exp, circle, bounce)
    - Transição

17. **Responsividade**
    - Responsivo
    - Renderizador (canvas, svg)

18. **Legenda**
    - Visibilidade
    - Posição (top, bottom, left, right, etc.)
    - Orientação
    - Título, formato
    - Símbolo, gradiente

19. **Anotações**
    - Anotações personalizadas
    - Linhas de referência
    - Bandas de referência
    - Limites

20. **Rótulos**
    - Visibilidade
    - Formato
    - Posição
    - Sobreposição

21. **Exportação**
    - Formato (JSON, PNG, SVG, PDF)

22. **Avançado**
    - Sobrescrever configurações
    - Descrição para acessibilidade
    - ARIA labels

## 🎨 Interface

### Layout

```
┌─────────────┬───────────────────────────┬──────────────┐
│             │     Header                │              │
│             ├───────────────────────────┤              │
│             │                           │              │
│  Sidebar    │   Preview do Gráfico      │  Painel de   │
│  (Config)   │   (Canvas/SVG)            │  Código JSON │
│             │                           │              │
│             │                           │              │
└─────────────┴───────────────────────────┴──────────────┘
```

### Sidebar Configurável

- Pode ser posicionada à **esquerda** ou **direita**
- Botão no header para trocar posição
- Scroll infinito com todas as propriedades
- Organizadas em accordions por categoria

### Preview em Tempo Real

- Atualização automática usando `useDeferredValue` para performance
- Suporte para renderização em **Canvas** (mais rápido) ou **SVG** (melhor qualidade)
- Loading states e error handling

### Painel de Código

- Exibe o JSON Vega-Lite em tempo real
- Syntax highlighting (dark theme)
- Scroll independente

## 🔧 Arquitetura

### Frontend (Next.js)

```
frontend/src/
├── app/
│   └── editor/
│       └── page.jsx          # Página principal do editor
├── components/
│   ├── ui/                   # Componentes shadcn/ui
│   │   ├── accordion.jsx
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── label.jsx
│   │   ├── scroll-area.jsx
│   │   ├── select.jsx
│   │   ├── separator.jsx
│   │   ├── slider.jsx
│   │   ├── switch.jsx
│   │   └── tabs.jsx
│   └── VegaChart.jsx         # Componente otimizado de renderização
└── utils/
    ├── chartProperties.js    # Todas as propriedades disponíveis
    ├── chartTypes.js         # Todos os tipos de gráficos
    └── specBuilder.js        # Construtor de specs Vega-Lite
```

### Backend (Fastify)

```
src/
├── routes/                   # Rotas da API
├── services/                 # Lógicas de negócio
└── utils/                    # Utilitários auxiliares
```

## 📦 Instalação

```bash
# Frontend
cd frontend
npm install @radix-ui/react-accordion @radix-ui/react-scroll-area \
            @radix-ui/react-select @radix-ui/react-separator \
            @radix-ui/react-tabs @radix-ui/react-slider \
            @radix-ui/react-switch lucide-react vega-embed

# Backend (se necessário)
npm install vega-embed
```

## 🚀 Uso

### Acesso

```
http://localhost:3000/editor
```

### Fluxo de Trabalho

1. **Selecione o tipo de gráfico** no dropdown principal
2. **Configure as propriedades** usando os accordions na sidebar
3. **Visualize em tempo real** no preview central
4. **Ajuste o renderizador** (Canvas/SVG) conforme necessário
5. **Exporte o JSON** clicando em "Copiar" ou "Baixar"
6. **Use no Power BI** (Deneb) ou qualquer ferramenta que suporte Vega-Lite

### Atalhos

- **Copiar JSON**: Copia para área de transferência
- **Baixar JSON**: Faz download do arquivo `.json`
- **Resetar**: Volta às configurações padrão
- **Trocar Sidebar**: Move sidebar entre esquerda/direita

## 🎯 Performance

### Otimizações Implementadas

1. **useDeferredValue**: Adia atualizações do spec durante digitação rápida
2. **Canvas Rendering**: Usa Canvas por padrão (mais rápido que SVG)
3. **Memoização**: `useMemo` para spec Vega-Lite
4. **Cleanup**: Finaliza views anteriores antes de criar novas
5. **Loading States**: Feedback visual durante renderização
6. **Error Boundaries**: Tratamento de erros na renderização

### Quando Usar Canvas vs SVG

**Canvas (Recomendado)**:
- Gráficos com muitos pontos (>1000)
- Animações e interações frequentes
- Dashboards com múltiplos gráficos
- Prioridade: Performance

**SVG**:
- Gráficos para impressão
- Necessidade de exportar vetorial
- Poucos elementos (<500)
- Prioridade: Qualidade visual

## 📊 Exemplos de Uso

### Gráfico de Barras Simples

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": { "text": "Vendas por Mês" },
  "mark": { "type": "bar", "color": "#4c78a8" },
  "encoding": {
    "x": { "field": "month", "type": "nominal" },
    "y": { "field": "sales", "type": "quantitative" }
  },
  "data": {
    "values": [
      { "month": "Jan", "sales": 28 },
      { "month": "Feb", "sales": 55 }
    ]
  }
}
```

### Scatter Plot com Cores

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "mark": { "type": "point", "tooltip": true },
  "encoding": {
    "x": { "field": "x", "type": "quantitative" },
    "y": { "field": "y", "type": "quantitative" },
    "color": {
      "field": "category",
      "type": "nominal",
      "scale": { "scheme": "category10" }
    }
  }
}
```

### Série Temporal com Linha de Tendência

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "layer": [
    {
      "mark": { "type": "line", "color": "#4c78a8" },
      "encoding": {
        "x": { "field": "date", "type": "temporal" },
        "y": { "field": "value", "type": "quantitative" }
      }
    },
    {
      "mark": { "type": "line", "color": "red", "strokeDash": [5, 5] },
      "transform": [
        { "regression": "value", "on": "date" }
      ],
      "encoding": {
        "x": { "field": "date", "type": "temporal" },
        "y": { "field": "value", "type": "quantitative" }
      }
    }
  ]
}
```

## 🔒 Autenticação

O editor requer autenticação. Se o usuário não estiver logado, será redirecionado para `/login`.

## 🐛 Troubleshooting

### Gráfico não renderiza

1. Verifique o console do browser para erros
2. Confirme que os dados estão no formato correto
3. Teste com dados de exemplo primeiro

### Performance lenta

1. Mude para renderizador Canvas
2. Reduza a quantidade de dados
3. Desabilite animações se não necessárias

### JSON inválido

1. Use o botão "Resetar" para voltar ao estado inicial
2. Verifique erros de sintaxe nos campos de texto
3. Consulte a documentação Vega-Lite: https://vega.github.io/vega-lite/

## 📚 Recursos

- [Vega-Lite Documentation](https://vega.github.io/vega-lite/)
- [Vega-Lite Examples](https://vega.github.io/vega-lite/examples/)
- [Deneb for Power BI](https://deneb-viz.github.io/)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Contribuindo

Este é um projeto interno. Para sugestões ou bugs, contate a equipe de desenvolvimento.

## 📄 Licença

Proprietário - Graphite Studio © 2025
