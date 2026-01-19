/**
 * Todas as propriedades disponíveis para configuração de gráficos
 * Organizadas por categoria para facilitar a criação da UI
 */

export const CHART_PROPERTIES = {

  // === APARÊNCIA GERAL ===
  appearance: {
    background: { type: "color", label: "Fundo", default: "#ffffff", category: "Aparência" },
    title: { type: "text", label: "Título", default: "Novo Gráfico", category: "Aparência" },
    subtitle: { type: "text", label: "Subtítulo", default: "", category: "Aparência" },
    description: { type: "textarea", label: "Descrição", default: "", category: "Aparência" },
    theme: { type: "select", label: "Tema", options: ["default", "dark", "excel", "ggplot2", "quartz", "vox", "fivethirtyeight"], default: "default", category: "Aparência" },
  },

  // === TIPO DE MARCA ===
  mark: {
    mark_type: { type: "select", label: "Tipo de Marca", options: ["bar", "line", "point", "circle", "square", "area", "rect", "rule", "text", "tick", "trail", "arc", "geoshape"], default: "bar", category: "Marca" },
    mark_orientation: { type: "select", label: "Orientação", options: ["horizontal", "vertical"], default: "vertical", category: "Marca" },
    mark_style: { type: "text", label: "Estilo", default: "", category: "Marca" },
  },

  // === CORES E PREENCHIMENTO ===
  colors: {
    use_gradient: { type: "switch", label: "Usar Gradiente", default: false, category: "Cores" },
    gradient_start: { type: "color", label: "Cor Inicial do Gradiente", default: "#4c78a8", category: "Cores" },
    gradient_end: { type: "color", label: "Cor Final do Gradiente", default: "#e45756", category: "Cores" },
    gradient_direction: { type: "select", label: "Direção do Gradiente", options: ["horizontal", "vertical", "diagonal"], default: "horizontal", category: "Cores" },
    color: { type: "color", label: "Cor", default: "#4c78a8", category: "Cores" },
    fill: { type: "color", label: "Preenchimento", default: "", category: "Cores" },
    stroke: { type: "color", label: "Contorno", default: "", category: "Cores" },
    opacity: { type: "slider", label: "Opacidade", min: 0, max: 1, step: 0.1, default: 1, category: "Cores" },
    color_scheme: { type: "select", label: "Esquema de Cores", options: ["category10", "accent", "dark2", "paired", "pastel1", "pastel2", "set1", "set2", "set3", "blues", "greens", "greys", "oranges", "purples", "reds", "viridis", "inferno", "magma", "plasma", "cividis", "turbo", "rainbow", "sinebow"], default: "category10", category: "Cores" },
  },

  // === FORMAS E TAMANHOS ===
  shapes: {
    size: { type: "number", label: "Tamanho", default: 50, category: "Formas" },
    shape: { type: "select", label: "Forma", options: ["circle", "square", "cross", "diamond", "triangle-up", "triangle-down", "triangle-left", "triangle-right"], default: "circle", category: "Formas" },
    corner_radius: { type: "number", label: "Raio do Canto", default: 0, category: "Formas" },
    inner_radius: { type: "number", label: "Raio Interno", default: 0, category: "Formas" },
    outer_radius: { type: "number", label: "Raio Externo", default: 100, category: "Formas" },
  },

  // === LINHAS ===
  lines: {
    line_style: { type: "select", label: "Estilo de Linha", options: ["solid", "dashed", "dotted"], default: "solid", category: "Linhas" },
    line_width: { type: "number", label: "Espessura", default: 2, category: "Linhas" },
    line_cap: { type: "select", label: "Ponta da Linha", options: ["butt", "round", "square"], default: "butt", category: "Linhas" },
    line_join: { type: "select", label: "Junção", options: ["miter", "round", "bevel"], default: "miter", category: "Linhas" },
    interpolation: { type: "select", label: "Interpolação", options: ["linear", "step", "step-before", "step-after", "basis", "cardinal", "monotone", "natural"], default: "linear", category: "Linhas" },
    tension: { type: "slider", label: "Tensão", min: 0, max: 1, step: 0.1, default: 0, category: "Linhas" },
    smoothing: { type: "switch", label: "Suavização", default: false, category: "Linhas" },
  },

  // === ESTILOS ESPECÍFICOS ===
  specificStyles: {
    point_style: { type: "text", label: "Estilo de Ponto", default: "", category: "Estilos" },
    area_style: { type: "text", label: "Estilo de Área", default: "", category: "Estilos" },
    bar_style: { type: "text", label: "Estilo de Barra", default: "", category: "Estilos" },
    symbol_style: { type: "text", label: "Estilo de Símbolo", default: "", category: "Estilos" },
    text_style: { type: "text", label: "Estilo de Texto", default: "", category: "Estilos" },
  },

  // === TEXTO E FONTES ===
  typography: {
    font: { type: "select", label: "Fonte", options: ["sans-serif", "serif", "monospace", "Arial", "Helvetica", "Times New Roman", "Courier", "Verdana", "Georgia"], default: "sans-serif", category: "Tipografia" },
    font_size: { type: "number", label: "Tamanho da Fonte", default: 12, category: "Tipografia" },
    font_weight: { type: "select", label: "Peso", options: ["normal", "bold", "lighter", "bolder", "100", "200", "300", "400", "500", "600", "700", "800", "900"], default: "normal", category: "Tipografia" },
    font_style: { type: "select", label: "Estilo", options: ["normal", "italic", "oblique"], default: "normal", category: "Tipografia" },
    text_align: { type: "select", label: "Alinhamento", options: ["left", "center", "right"], default: "center", category: "Tipografia" },
    text_baseline: { type: "select", label: "Linha Base", options: ["top", "middle", "bottom", "alphabetic"], default: "middle", category: "Tipografia" },
    text_angle: { type: "number", label: "Ângulo", default: 0, category: "Tipografia" },
  },

  // === TOOLTIP ===
  tooltip: {
    tooltip_content: { type: "textarea", label: "Conteúdo", default: "", category: "Tooltip" },
    tooltip_format: { type: "text", label: "Formato", default: "", category: "Tooltip" },
  },

  // === EIXOS ===
  axes: {
    axis_x_title: { type: "text", label: "Título do Eixo X", default: "", category: "Eixos" },
    axis_y_title: { type: "text", label: "Título do Eixo Y", default: "", category: "Eixos" },
    encoding_x: { type: "text", label: "Campo do Eixo X", default: "category", category: "Eixos" },
    encoding_y: { type: "text", label: "Campo do Eixo Y", default: "value", category: "Eixos" },
    encoding_color: { type: "text", label: "Campo de Cor", default: "", category: "Eixos" },
    encoding_size: { type: "text", label: "Campo de Tamanho", default: "", category: "Eixos" },
  },

  // === TRANSFORMAÇÕES DE DADOS ===
  transformations: {
    stacking: { type: "select", label: "Empilhamento", options: ["none", "zero", "normalize", "center"], default: "none", category: "Transformações" },
    binning: { type: "switch", label: "Agrupamento em Bins", default: false, category: "Transformações" },
    aggregation: { type: "select", label: "Agregação", options: ["none", "count", "sum", "mean", "average", "median", "min", "max", "stdev", "variance"], default: "none", category: "Transformações" },
    grouping: { type: "text", label: "Agrupar Por", default: "", category: "Transformações" },
    sorting: { type: "select", label: "Ordenação", options: ["ascending", "descending", "none"], default: "none", category: "Transformações" },
    filtering: { type: "textarea", label: "Filtro", default: "", category: "Transformações" },
    time_unit: { type: "select", label: "Unidade de Tempo", options: ["year", "quarter", "month", "week", "day", "dayofweek", "date", "hours", "minutes", "seconds", "milliseconds"], default: "year", category: "Transformações" },
  },

  // === ESCALAS ===
  scales: {
    scale_type: { type: "select", label: "Tipo de Escala", options: ["linear", "log", "pow", "sqrt", "symlog", "time", "utc", "ordinal", "band", "point"], default: "linear", category: "Escalas" },
    scale_domain: { type: "text", label: "Domínio", default: "", category: "Escalas" },
    scale_range: { type: "text", label: "Intervalo", default: "", category: "Escalas" },
    scale_clamp: { type: "switch", label: "Limitar", default: false, category: "Escalas" },
    scale_nice: { type: "switch", label: "Arredondar", default: true, category: "Escalas" },
    scale_reverse: { type: "switch", label: "Inverter", default: false, category: "Escalas" },
  },


  // === LAYOUT E FACETAS ===
  layout: {
    facet_rows: { type: "text", label: "Facetas - Linhas", default: "", category: "Layout" },
    facet_columns: { type: "text", label: "Facetas - Colunas", default: "", category: "Layout" },
    facet_spacing: { type: "number", label: "Espaçamento", default: 10, category: "Layout" },
    layering: { type: "switch", label: "Camadas", default: false, category: "Layout" },
    layer_order: { type: "text", label: "Ordem das Camadas", default: "", category: "Layout" },
    repeat_fields: { type: "text", label: "Repetir Campos", default: "", category: "Layout" },
    small_multiples_layout: { type: "select", label: "Layout de Múltiplos", options: ["grid", "horizontal", "vertical"], default: "grid", category: "Layout" },
  },

  // === GEO ===
  geo: {
    geo_projection: { type: "select", label: "Projeção", options: ["mercator", "albersUsa", "azimuthalEqualArea", "azimuthalEquidistant", "conicConformal", "conicEqualArea", "conicEquidistant", "equalEarth", "equirectangular", "gnomonic", "naturalEarth1", "orthographic", "stereographic", "transverseMercator"], default: "mercator", category: "Geo" },
    geo_center: { type: "text", label: "Centro", default: "[0, 0]", category: "Geo" },
    geo_scale: { type: "number", label: "Escala", default: 100, category: "Geo" },
    geo_translate: { type: "text", label: "Translação", default: "[0, 0]", category: "Geo" },
    geo_clip: { type: "switch", label: "Recortar", default: true, category: "Geo" },
  },

  // === INTERATIVIDADE ===
  interaction: {
    interaction_enabled: { type: "switch", label: "Habilitar Interação", default: true, category: "Interação" },
    hover_effect: { type: "switch", label: "Efeito Hover", default: true, category: "Interação" },
    click_action: { type: "select", label: "Ação de Clique", options: ["none", "select", "filter", "highlight"], default: "none", category: "Interação" },
    selection_type: { type: "select", label: "Tipo de Seleção", options: ["single", "multi", "interval"], default: "single", category: "Interação" },
    selection_fields: { type: "text", label: "Campos de Seleção", default: "", category: "Interação" },
    selection_bindings: { type: "textarea", label: "Bindings", default: "", category: "Interação" },
    brush: { type: "switch", label: "Brush", default: false, category: "Interação" },
    zoom: { type: "switch", label: "Zoom", default: false, category: "Interação" },
    pan: { type: "switch", label: "Pan", default: false, category: "Interação" },
    linked_views: { type: "switch", label: "Visualizações Vinculadas", default: false, category: "Interação" },
    cross_filter: { type: "switch", label: "Filtro Cruzado", default: false, category: "Interação" },
  },

  // === ANIMAÇÃO ===
  animation: {
    animation_enabled: { type: "switch", label: "Habilitar Animação", default: false, category: "Animação" },
    animation_duration: { type: "number", label: "Duração (ms)", default: 300, category: "Animação" },
    animation_easing: { type: "select", label: "Easing", options: ["linear", "quad", "cubic", "sin", "exp", "circle", "bounce"], default: "cubic", category: "Animação" },
    transition: { type: "text", label: "Transição", default: "", category: "Animação" },
  },

  // === RESPONSIVIDADE ===
  responsive: {
    responsive: { type: "switch", label: "Responsivo", default: true, category: "Responsividade" },
    renderer: { type: "select", label: "Renderizador", options: ["canvas", "svg"], default: "canvas", category: "Responsividade" },
  },

  // === LEGENDA ===
  legend: {
    legend_visibility: { type: "switch", label: "Mostrar Legenda", default: true, category: "Legenda" },
    legend_position: { type: "select", label: "Posição", options: ["top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right", "none"], default: "right", category: "Legenda" },
    legend_orientation: { type: "select", label: "Orientação", options: ["horizontal", "vertical"], default: "vertical", category: "Legenda" },
    legend_title: { type: "text", label: "Título", default: "", category: "Legenda" },
    legend_format: { type: "text", label: "Formato", default: "", category: "Legenda" },
    legend_symbol: { type: "select", label: "Símbolo", options: ["circle", "square", "cross", "diamond", "triangle-up", "triangle-down"], default: "circle", category: "Legenda" },
    legend_gradient: { type: "switch", label: "Gradiente", default: false, category: "Legenda" },
  },

  // === ANOTAÇÕES ===
  annotations: {
    annotations: { type: "textarea", label: "Anotações", default: "", category: "Anotações" },
    reference_lines: { type: "textarea", label: "Linhas de Referência", default: "", category: "Anotações" },
    reference_bands: { type: "textarea", label: "Bandas de Referência", default: "", category: "Anotações" },
    thresholds: { type: "text", label: "Limites", default: "", category: "Anotações" },
  },

  // === RÓTULOS ===
  labels: {
    labels_visibility: { type: "switch", label: "Mostrar Rótulos", default: false, category: "Rótulos" },
    labels_format: { type: "text", label: "Formato", default: "", category: "Rótulos" },
    labels_position: { type: "select", label: "Posição", options: ["top", "middle", "bottom", "left", "right"], default: "top", category: "Rótulos" },
    labels_overlap: { type: "select", label: "Sobreposição", options: ["greedy", "parity", "false"], default: "greedy", category: "Rótulos" },
  },

  // === EXPORTAÇÃO ===
  export: {
    export_format: { type: "select", label: "Formato de Exportação", options: ["json", "png", "svg", "pdf"], default: "json", category: "Exportação" },
  },

  // === AVANÇADO ===
  advanced: {
    config_overrides: { type: "textarea", label: "Sobrescrever Config", default: "", category: "Avançado" },
    accessibility_description: { type: "textarea", label: "Descrição para Acessibilidade", default: "", category: "Avançado" },
    aria_labels: { type: "textarea", label: "ARIA Labels", default: "", category: "Avançado" },
  },
};

/**
 * Retorna todas as propriedades em formato flat
 */
export function getAllProperties() {
  const allProps = {};
  Object.values(CHART_PROPERTIES).forEach(category => {
    Object.assign(allProps, category);
  });
  return allProps;
}

/**
 * Retorna propriedades organizadas por categoria
 */
export function getPropertiesByCategory() {
  const byCategory = {};

  Object.entries(CHART_PROPERTIES).forEach(([key, properties]) => {
    const categoryName = properties[Object.keys(properties)[0]]?.category || key;

    if (!byCategory[categoryName]) {
      byCategory[categoryName] = {};
    }

    Object.assign(byCategory[categoryName], properties);
  });

  return byCategory;
}

/**
 * Retorna os valores default de todas as propriedades
 */
export function getDefaultValues() {
  const defaults = {};
  const allProps = getAllProperties();

  Object.entries(allProps).forEach(([key, config]) => {
    defaults[key] = config.default;
  });

  return defaults;
}
