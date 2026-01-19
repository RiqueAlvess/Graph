/**
 * Todos os tipos de gráficos suportados
 * Organizados por categoria
 */

export const CHART_TYPES = {
  // === GRÁFICOS DE BARRAS ===
  bars: [
    { id: "bar_chart", label: "Gráfico de Barras", mark: "bar", category: "Barras" },
    { id: "column_chart", label: "Gráfico de Colunas", mark: "bar", category: "Barras" },
    { id: "grouped_bar_chart", label: "Barras Agrupadas", mark: "bar", category: "Barras" },
    { id: "stacked_bar_chart", label: "Barras Empilhadas", mark: "bar", category: "Barras" },
    { id: "normalized_bar_chart", label: "Barras Normalizadas", mark: "bar", category: "Barras" },
    { id: "horizontal_bar_chart", label: "Barras Horizontais", mark: "bar", category: "Barras" },
    { id: "vertical_bar_chart", label: "Barras Verticais", mark: "bar", category: "Barras" },
    { id: "lollipop_chart", label: "Gráfico Lollipop", mark: "point", category: "Barras" },
    { id: "range_bar_chart", label: "Barras de Intervalo", mark: "bar", category: "Barras" },
  ],

  // === GRÁFICOS DE LINHA ===
  lines: [
    { id: "line_chart", label: "Gráfico de Linhas", mark: "line", category: "Linhas" },
    { id: "multi_line_chart", label: "Múltiplas Linhas", mark: "line", category: "Linhas" },
    { id: "step_line_chart", label: "Linha em Degraus", mark: "line", category: "Linhas" },
    { id: "time_series_line_chart", label: "Série Temporal (Linha)", mark: "line", category: "Linhas" },
    { id: "cumulative_line_chart", label: "Linha Cumulativa", mark: "line", category: "Linhas" },
    { id: "radial_line_chart", label: "Linha Radial", mark: "line", category: "Linhas" },
  ],

  // === GRÁFICOS DE ÁREA ===
  areas: [
    { id: "area_chart", label: "Gráfico de Área", mark: "area", category: "Áreas" },
    { id: "stacked_area_chart", label: "Área Empilhada", mark: "area", category: "Áreas" },
    { id: "normalized_area_chart", label: "Área Normalizada", mark: "area", category: "Áreas" },
    { id: "time_series_area_chart", label: "Série Temporal (Área)", mark: "area", category: "Áreas" },
    { id: "polar_area_chart", label: "Área Polar", mark: "arc", category: "Áreas" },
  ],

  // === GRÁFICOS DE DISPERSÃO ===
  scatter: [
    { id: "scatter_plot", label: "Gráfico de Dispersão", mark: "point", category: "Dispersão" },
    { id: "bubble_chart", label: "Gráfico de Bolhas", mark: "circle", category: "Dispersão" },
    { id: "dot_plot", label: "Dot Plot", mark: "point", category: "Dispersão" },
    { id: "strip_plot", label: "Strip Plot", mark: "tick", category: "Dispersão" },
    { id: "hexbin_chart", label: "Hexbin", mark: "rect", category: "Dispersão" },
  ],

  // === DISTRIBUIÇÕES ===
  distributions: [
    { id: "histogram", label: "Histograma", mark: "bar", category: "Distribuição" },
    { id: "binned_histogram", label: "Histograma Agrupado", mark: "bar", category: "Distribuição" },
    { id: "box_plot", label: "Box Plot", mark: "boxplot", category: "Distribuição" },
    { id: "violin_plot", label: "Violin Plot", mark: "area", category: "Distribuição" },
    { id: "density_plot", label: "Densidade", mark: "area", category: "Distribuição" },
    { id: "ridge_plot", label: "Ridge Plot", mark: "area", category: "Distribuição" },
    { id: "qq_plot", label: "Q-Q Plot", mark: "point", category: "Distribuição" },
    { id: "ecdf_plot", label: "ECDF", mark: "line", category: "Distribuição" },
  ],

  // === GRÁFICOS COM ERRO ===
  error: [
    { id: "error_bar_chart", label: "Barras de Erro", mark: "point", category: "Erro" },
    { id: "error_band_chart", label: "Banda de Erro", mark: "area", category: "Erro" },
  ],

  // === SÉRIES TEMPORAIS ===
  timeSeries: [
    { id: "time_series_bar_chart", label: "Série Temporal (Barras)", mark: "bar", category: "Temporal" },
    { id: "calendar_heatmap", label: "Heatmap de Calendário", mark: "rect", category: "Temporal" },
    { id: "time_heatmap", label: "Heatmap Temporal", mark: "rect", category: "Temporal" },
    { id: "lag_plot", label: "Lag Plot", mark: "point", category: "Temporal" },
    { id: "seasonality_chart", label: "Sazonalidade", mark: "line", category: "Temporal" },
  ],

  // === GRÁFICOS CIRCULARES ===
  circular: [
    { id: "pie_chart", label: "Gráfico de Pizza", mark: "arc", category: "Circular" },
    { id: "donut_chart", label: "Gráfico de Rosca", mark: "arc", category: "Circular" },
    { id: "rose_chart", label: "Rose Chart", mark: "arc", category: "Circular" },
    { id: "radar_chart", label: "Gráfico Radar", mark: "line", category: "Circular" },
    { id: "radial_bar_chart", label: "Barras Radiais", mark: "arc", category: "Circular" },
  ],

  // === HIERÁRQUICOS ===
  hierarchical: [
    { id: "treemap", label: "Treemap", mark: "rect", category: "Hierárquico" },
    { id: "sunburst_chart", label: "Sunburst", mark: "arc", category: "Hierárquico" },
    { id: "icicle_chart", label: "Icicle", mark: "rect", category: "Hierárquico" },
    { id: "tree_chart", label: "Árvore", mark: "rule", category: "Hierárquico" },
    { id: "cluster_chart", label: "Cluster", mark: "circle", category: "Hierárquico" },
    { id: "circle_packing_chart", label: "Circle Packing", mark: "circle", category: "Hierárquico" },
    { id: "partition_chart", label: "Partition", mark: "rect", category: "Hierárquico" },
  ],

  // === FLUXOS ===
  flows: [
    { id: "sankey_chart", label: "Sankey", mark: "rect", category: "Fluxo" },
    { id: "alluvial_chart", label: "Alluvial", mark: "area", category: "Fluxo" },
    { id: "chord_diagram", label: "Diagrama de Cordas", mark: "arc", category: "Fluxo" },
    { id: "waterfall_chart", label: "Waterfall", mark: "bar", category: "Fluxo" },
    { id: "funnel_chart", label: "Funil", mark: "bar", category: "Fluxo" },
  ],

  // === REDES E GRAFOS ===
  networks: [
    { id: "node_link_chart", label: "Node-Link", mark: "circle", category: "Rede" },
    { id: "force_directed_graph", label: "Grafo Force-Directed", mark: "circle", category: "Rede" },
    { id: "adjacency_matrix", label: "Matriz de Adjacência", mark: "rect", category: "Rede" },
  ],

  // === MAPAS ===
  maps: [
    { id: "choropleth_map", label: "Mapa Coroplético", mark: "geoshape", category: "Mapa" },
    { id: "symbol_map", label: "Mapa de Símbolos", mark: "circle", category: "Mapa" },
    { id: "bubble_map", label: "Mapa de Bolhas", mark: "circle", category: "Mapa" },
    { id: "dot_density_map", label: "Mapa de Densidade", mark: "circle", category: "Mapa" },
    { id: "geo_scatter_map", label: "Dispersão Geográfica", mark: "point", category: "Mapa" },
    { id: "geo_heatmap", label: "Heatmap Geográfico", mark: "rect", category: "Mapa" },
    { id: "topojson_map", label: "Mapa TopoJSON", mark: "geoshape", category: "Mapa" },
  ],

  // === HEATMAPS ===
  heatmaps: [
    { id: "heatmap", label: "Heatmap", mark: "rect", category: "Heatmap" },
    { id: "correlation_heatmap", label: "Heatmap de Correlação", mark: "rect", category: "Heatmap" },
    { id: "matrix_chart", label: "Matriz", mark: "rect", category: "Heatmap" },
  ],

  // === OUTROS ===
  others: [
    { id: "waffle_chart", label: "Waffle", mark: "square", category: "Outros" },
    { id: "stacked_column_chart", label: "Colunas Empilhadas", mark: "bar", category: "Outros" },
    { id: "pareto_chart", label: "Pareto", mark: "bar", category: "Outros" },
  ],

  // === COMBINADOS ===
  combo: [
    { id: "combo_chart", label: "Gráfico Combinado", mark: "bar", category: "Combinado" },
    { id: "dual_axis_chart", label: "Eixo Duplo", mark: "line", category: "Combinado" },
    { id: "layered_chart", label: "Camadas", mark: "bar", category: "Combinado" },
  ],

  // === MÚLTIPLAS VISUALIZAÇÕES ===
  multiples: [
    { id: "facet_chart", label: "Facetas", mark: "bar", category: "Múltiplas" },
    { id: "small_multiples", label: "Small Multiples", mark: "line", category: "Múltiplas" },
    { id: "trellis_chart", label: "Trellis", mark: "bar", category: "Múltiplas" },
    { id: "dashboard_view", label: "Dashboard", mark: "bar", category: "Múltiplas" },
  ],

  // === TABELAS ===
  tables: [
    { id: "data_table", label: "Tabela de Dados", mark: "text", category: "Tabelas" },
    { id: "pivot_table", label: "Tabela Dinâmica", mark: "text", category: "Tabelas" },
    { id: "summary_table", label: "Tabela Resumo", mark: "text", category: "Tabelas" },
    { id: "annotated_table", label: "Tabela Anotada", mark: "text", category: "Tabelas" },
  ],

  // === INDICADORES ===
  indicators: [
    { id: "text_chart", label: "Texto", mark: "text", category: "Indicadores" },
    { id: "kpi_card", label: "KPI Card", mark: "text", category: "Indicadores" },
    { id: "metric_card", label: "Métrica", mark: "text", category: "Indicadores" },
    { id: "stat_card", label: "Estatística", mark: "text", category: "Indicadores" },
    { id: "progress_card", label: "Progresso", mark: "bar", category: "Indicadores" },
    { id: "scorecard", label: "Scorecard", mark: "text", category: "Indicadores" },
  ],

  // === INTERATIVOS ===
  interactive: [
    { id: "interactive_chart", label: "Gráfico Interativo", mark: "point", category: "Interativo" },
    { id: "brushable_chart", label: "Com Brush", mark: "point", category: "Interativo" },
    { id: "zoomable_chart", label: "Com Zoom", mark: "line", category: "Interativo" },
    { id: "linked_views", label: "Visualizações Vinculadas", mark: "bar", category: "Interativo" },
    { id: "cross_filter_dashboard", label: "Dashboard com Cross-Filter", mark: "bar", category: "Interativo" },
  ],

  // === ANÁLISE ESTATÍSTICA ===
  statistical: [
    { id: "regression_chart", label: "Regressão", mark: "line", category: "Estatística" },
    { id: "trendline_chart", label: "Linha de Tendência", mark: "line", category: "Estatística" },
    { id: "moving_average_chart", label: "Média Móvel", mark: "line", category: "Estatística" },
    { id: "control_chart", label: "Gráfico de Controle", mark: "line", category: "Estatística" },
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
