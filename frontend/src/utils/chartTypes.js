/**
 * Tipos de gráficos suportados - Versão reduzida com foco em Power BI/Deneb
 * Apenas 10 tipos principais com funcionalidades exclusivas via Vega
 */

export const CHART_TYPES = {
  // === GRÁFICOS PRINCIPAIS ===
  main: [
    {
      id: "column_chart",
      label: "Column Chart",
      mark: "bar",
      category: "Principal",
      description: "Gráfico de colunas verticais com funcionalidades avançadas Vega"
    },
    {
      id: "bar_chart",
      label: "Bar Chart",
      mark: "bar",
      category: "Principal",
      description: "Gráfico de barras horizontais com funcionalidades avançadas Vega"
    },
    {
      id: "line_chart",
      label: "Line Chart",
      mark: "line",
      category: "Principal",
      description: "Gráfico de linhas para séries temporais"
    },
    {
      id: "card",
      label: "Card",
      mark: "text",
      category: "Principal",
      description: "Card/KPI com layout customizado"
    },
    {
      id: "table",
      label: "Table",
      mark: "text",
      category: "Principal",
      description: "Tabela com formatação avançada"
    },
    {
      id: "matrix",
      label: "Matrix",
      mark: "rect",
      category: "Principal",
      description: "Matriz/Heatmap com hierarquia"
    },
    {
      id: "pie_chart",
      label: "Pie Chart",
      mark: "arc",
      category: "Principal",
      description: "Gráfico de pizza"
    },
    {
      id: "donut_chart",
      label: "Donut Chart",
      mark: "arc",
      category: "Principal",
      description: "Gráfico de rosca com conteúdo central"
    },
    {
      id: "area_chart",
      label: "Area Chart",
      mark: "area",
      category: "Principal",
      description: "Gráfico de área para visualizar volume"
    },
    {
      id: "scatter_chart",
      label: "Scatter Chart",
      mark: "point",
      category: "Principal",
      description: "Gráfico de dispersão para correlação"
    },
  ],
};

/**
 * Retorna todos os tipos de gráficos em formato flat
 */
export function getAllChartTypes() {
  return Object.values(CHART_TYPES).flat();
}

/**
 * Retorna tipos de gráficos organizados por categoria
 */
export function getChartTypesByCategory() {
  return CHART_TYPES;
}

/**
 * Busca um tipo de gráfico pelo ID
 */
export function getChartTypeById(id) {
  return getAllChartTypes().find(type => type.id === id);
}

/**
 * Busca tipos de gráficos por categoria
 */
export function getChartTypesByCategoryName(categoryName) {
  return getAllChartTypes().filter(type => type.category === categoryName);
}

/**
 * Retorna lista de categorias únicas
 */
export function getCategories() {
  const categories = new Set();
  getAllChartTypes().forEach(type => categories.add(type.category));
  return Array.from(categories).sort();
}
