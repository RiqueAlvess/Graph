/**
 * Funcionalidades exclusivas de cada tipo de gráfico
 * Baseado nas capacidades únicas do Vega-Lite para Power BI/Deneb
 */

export const CHART_FEATURES = {
  column_chart: {
    name: "Column Chart",
    features: [
      {
        id: "gradient_conditional",
        label: "Gradiente condicional por valor",
        description: "Gradiente que muda de cor baseado em condições (ex: negativo → vermelho, positivo → verde)",
        config: {
          enabled: false,
          conditions: [
            { test: "datum.value > 0", startColor: "#4CAF50", endColor: "#81C784" },
            { test: "datum.value <= 0", startColor: "#F44336", endColor: "#E57373" }
          ]
        }
      },
      {
        id: "asymmetric_radius",
        label: "Arredondamento assimétrico",
        description: "Topo arredondado, base reta",
        config: {
          enabled: false,
          cornerRadiusTopLeft: 8,
          cornerRadiusTopRight: 8,
          cornerRadiusBottomLeft: 0,
          cornerRadiusBottomRight: 0
        }
      },
      {
        id: "dynamic_baseline",
        label: "Baseline dinâmica",
        description: "Zero customizado para as barras",
        config: {
          enabled: false,
          baseline: 0
        }
      },
      {
        id: "visual_rules",
        label: "Regras visuais por intervalos",
        description: "Linhas de referência não lineares",
        config: {
          enabled: false,
          rules: []
        }
      },
      {
        id: "mark_overlay",
        label: "Overlay de marks",
        description: "Adiciona linha, ponto ou ícone sobre as colunas",
        config: {
          enabled: false,
          overlayType: "point", // point, line, icon
          overlaySize: 50
        }
      },
      {
        id: "variable_width",
        label: "Largura variável por métrica",
        description: "Colunas com larguras diferentes baseadas em valor",
        config: {
          enabled: false,
          widthField: "size"
        }
      },
      {
        id: "cross_filter",
        label: "Filtro cross-visual",
        description: "Seleção filtra outros visuais no Power BI",
        config: {
          enabled: true
        }
      },
      {
        id: "composite_tooltip",
        label: "Tooltips compostos",
        description: "Tooltip com tabela e cálculos",
        config: {
          enabled: false,
          fields: []
        }
      },
      {
        id: "conditional_stroke",
        label: "Stroke interno condicional",
        description: "Contorno que muda baseado no valor",
        config: {
          enabled: false,
          conditions: []
        }
      }
    ]
  },

  bar_chart: {
    name: "Bar Chart",
    features: [
      {
        id: "divergent_bars",
        label: "Barras divergentes",
        description: "Barras que começam de um centro não-zero",
        config: {
          enabled: false,
          centerValue: 0
        }
      },
      {
        id: "dynamic_grouping",
        label: "Agrupamento dinâmico",
        description: "Agrupa dinamicamente baseado em métrica",
        config: {
          enabled: false,
          groupByField: ""
        }
      },
      {
        id: "ranking_highlight",
        label: "Destaque progressivo por ranking",
        description: "Destaca barras por posição no ranking",
        config: {
          enabled: false,
          topN: 5
        }
      },
      {
        id: "smart_labels",
        label: "Labels auto-posicionamento",
        description: "Labels que evitam colisão automaticamente",
        config: {
          enabled: false,
          strategy: "greedy" // greedy, parity
        }
      },
      {
        id: "data_windowing",
        label: "Scroll lógico",
        description: "Janela de dados com scroll real",
        config: {
          enabled: false,
          windowSize: 10
        }
      },
      {
        id: "pattern_fill",
        label: "Padrões visuais",
        description: "Hachuras e padrões por categoria",
        config: {
          enabled: false,
          patterns: [] // stripe, dots, grid
        }
      },
      {
        id: "ghost_bars",
        label: "Ghost bars no hover",
        description: "Barras semi-transparentes no hover",
        config: {
          enabled: false,
          opacity: 0.3
        }
      },
      {
        id: "partial_curves",
        label: "Curvatura parcial",
        description: "Barras com curvatura customizada",
        config: {
          enabled: false,
          curveRadius: 4
        }
      }
    ]
  },

  line_chart: {
    name: "Line Chart",
    features: [
      {
        id: "gradient_along_x",
        label: "Gradiente ao longo do eixo X",
        description: "Gradiente que segue o tempo",
        config: {
          enabled: false,
          startColor: "#4c78a8",
          endColor: "#e45756"
        }
      },
      {
        id: "threshold_color",
        label: "Cor muda ao cruzar threshold",
        description: "Linha muda de cor ao passar de um valor",
        config: {
          enabled: false,
          threshold: 50,
          colorAbove: "green",
          colorBelow: "red"
        }
      },
      {
        id: "conditional_segment",
        label: "Segmentação visual por condição",
        description: "Segmentos diferentes da linha com cores distintas",
        config: {
          enabled: false,
          conditions: []
        }
      },
      {
        id: "conditional_area",
        label: "Área sob linha condicional",
        description: "Área aparece apenas quando condição é verdadeira",
        config: {
          enabled: false,
          condition: ""
        }
      },
      {
        id: "continuous_zoom",
        label: "Zoom e pan contínuos",
        description: "Zoom e pan suaves não discretos",
        config: {
          enabled: false
        }
      },
      {
        id: "persistent_brush",
        label: "Brush persistente",
        description: "Seleção de brush mantém estado",
        config: {
          enabled: false
        }
      },
      {
        id: "progressive_animation",
        label: "Animação progressiva frame-a-frame",
        description: "Linha desenha progressivamente",
        config: {
          enabled: false,
          duration: 1000
        }
      },
      {
        id: "segment_highlight",
        label: "Highlight de segmento",
        description: "Destaca segmentos inteiros, não pontos",
        config: {
          enabled: false
        }
      },
      {
        id: "outlier_detection",
        label: "Detecção visual de outliers",
        description: "Marca outliers automaticamente",
        config: {
          enabled: false,
          threshold: 2 // desvios padrão
        }
      },
      {
        id: "multi_scale",
        label: "Multiescalas reais",
        description: "Múltiplas escalas no mesmo gráfico",
        config: {
          enabled: false,
          scales: []
        }
      }
    ]
  },

  card: {
    name: "Card / KPI",
    features: [
      {
        id: "free_layout",
        label: "Layout interno livre",
        description: "Posicione elementos livremente no card",
        config: {
          enabled: true,
          elements: []
        }
      },
      {
        id: "mixed_elements",
        label: "Elementos mistos",
        description: "Barras, ícones e textos no mesmo card",
        config: {
          enabled: false,
          elements: []
        }
      },
      {
        id: "smooth_counting",
        label: "Animação de contagem suave",
        description: "Números animam suavemente ao mudar",
        config: {
          enabled: false,
          duration: 500
        }
      },
      {
        id: "multi_metric_rules",
        label: "Regras de cor por múltiplas métricas",
        description: "Cor muda baseada em várias métricas",
        config: {
          enabled: false,
          rules: []
        }
      },
      {
        id: "animated_gradient",
        label: "Gradiente animado",
        description: "Gradiente com animação",
        config: {
          enabled: false
        }
      },
      {
        id: "vector_indicators",
        label: "Indicadores visuais vetoriais",
        description: "Ícones e formas vetoriais",
        config: {
          enabled: false,
          indicators: []
        }
      },
      {
        id: "custom_svg_icons",
        label: "Ícones SVG customizados",
        description: "Ícones condicionais em SVG",
        config: {
          enabled: false,
          icons: []
        }
      },
      {
        id: "click_payload",
        label: "Clique com payload customizado",
        description: "Clique envia dados customizados",
        config: {
          enabled: false,
          payload: {}
        }
      },
      {
        id: "chained_states",
        label: "Estados visuais encadeados",
        description: "Estados visuais que dependem uns dos outros",
        config: {
          enabled: false,
          states: []
        }
      },
      {
        id: "mini_dashboard",
        label: "Card composto (mini-dashboard)",
        description: "Múltiplos KPIs em um card",
        config: {
          enabled: false,
          kpis: []
        }
      }
    ]
  },

  table: {
    name: "Table",
    features: [
      {
        id: "cell_heatmap",
        label: "Heatmap por célula",
        description: "Cada célula com escala própria",
        config: {
          enabled: false,
          colorScheme: "blues"
        }
      },
      {
        id: "embedded_sparklines",
        label: "Sparklines reais embutidos",
        description: "Gráficos por linha na tabela",
        config: {
          enabled: false,
          sparklineType: "line" // line, bar, area
        }
      },
      {
        id: "conditional_icons",
        label: "Ícones vetoriais condicionais",
        description: "Ícones que mudam por condição",
        config: {
          enabled: false,
          iconRules: []
        }
      },
      {
        id: "rich_tooltips",
        label: "Tooltips ricos por célula",
        description: "Tooltips detalhados em cada célula",
        config: {
          enabled: false
        }
      },
      {
        id: "mixed_visual",
        label: "Visual misto (texto + gráfico)",
        description: "Colunas com diferentes tipos visuais",
        config: {
          enabled: false,
          columns: []
        }
      },
      {
        id: "sort_independent_rules",
        label: "Regras independentes da ordenação",
        description: "Formatação não afetada pela ordenação",
        config: {
          enabled: false
        }
      },
      {
        id: "logical_pagination",
        label: "Paginação lógica",
        description: "Paginação real dos dados",
        config: {
          enabled: false,
          rowsPerPage: 10
        }
      },
      {
        id: "numeric_range_highlight",
        label: "Destaque por intervalo numérico",
        description: "Destaca células por faixa de valor",
        config: {
          enabled: false,
          ranges: []
        }
      },
      {
        id: "cell_hover_state",
        label: "Estado hover por célula",
        description: "Hover individual em células",
        config: {
          enabled: false
        }
      },
      {
        id: "multi_field_format",
        label: "Formatação multi-campo",
        description: "Formatação baseada em múltiplos campos",
        config: {
          enabled: false,
          formatRules: []
        }
      }
    ]
  },

  matrix: {
    name: "Matrix / Heatmap",
    features: [
      {
        id: "free_hierarchy",
        label: "Hierarquia com layout livre",
        description: "Layout hierárquico customizado",
        config: {
          enabled: false
        }
      },
      {
        id: "true_cross_heatmap",
        label: "Heatmap cruzado verdadeiro",
        description: "Heatmap com correlações cruzadas",
        config: {
          enabled: false
        }
      },
      {
        id: "subtotals_custom",
        label: "Subtotais com regras próprias",
        description: "Subtotais com formatação customizada",
        config: {
          enabled: false,
          subtotalRules: []
        }
      },
      {
        id: "independent_scales",
        label: "Escalas independentes por coluna",
        description: "Cada coluna com sua própria escala",
        config: {
          enabled: false
        }
      },
      {
        id: "intersection_highlight",
        label: "Destaque de interseção",
        description: "Destaca linha + coluna na interseção",
        config: {
          enabled: false
        }
      },
      {
        id: "visual_drilldown",
        label: "Drilldown visual",
        description: "Drilldown sem mudança de página",
        config: {
          enabled: false
        }
      },
      {
        id: "conditional_totals",
        label: "Totais visuais condicionais",
        description: "Totais com regras visuais",
        config: {
          enabled: false
        }
      },
      {
        id: "hierarchical_icons",
        label: "Ícones por nível hierárquico",
        description: "Ícones diferentes por nível",
        config: {
          enabled: false,
          icons: []
        }
      },
      {
        id: "adaptive_layout",
        label: "Layout adaptativo por profundidade",
        description: "Layout muda conforme profundidade",
        config: {
          enabled: false
        }
      },
      {
        id: "cell_cross_filter",
        label: "Cross-filter por célula",
        description: "Clique em célula filtra visuais",
        config: {
          enabled: true
        }
      }
    ]
  },

  pie_chart: {
    name: "Pie Chart",
    features: [
      {
        id: "slice_gradient",
        label: "Gradiente por fatia",
        description: "Cada fatia com gradiente próprio",
        config: {
          enabled: false
        }
      },
      {
        id: "variable_stroke",
        label: "Stroke variável por valor",
        description: "Contorno muda com o valor",
        config: {
          enabled: false
        }
      },
      {
        id: "progressive_explode",
        label: "Explode progressivo por hover",
        description: "Fatia se expande ao passar mouse",
        config: {
          enabled: false,
          explodeDistance: 10
        }
      },
      {
        id: "smart_labels",
        label: "Labels com layout inteligente",
        description: "Labels evitam sobreposição",
        config: {
          enabled: false
        }
      },
      {
        id: "angular_animation",
        label: "Animação angular real",
        description: "Animação de rotação das fatias",
        config: {
          enabled: false,
          duration: 500
        }
      },
      {
        id: "small_slice_rules",
        label: "Regras para fatias pequenas",
        description: "Tratamento especial para fatias pequenas",
        config: {
          enabled: false,
          threshold: 5 // porcentagem
        }
      },
      {
        id: "ranking_opacity",
        label: "Opacidade por ranking",
        description: "Opacidade baseada no tamanho da fatia",
        config: {
          enabled: false
        }
      },
      {
        id: "cumulative_interaction",
        label: "Interação com lógica acumulativa",
        description: "Seleciona fatias acumulativamente",
        config: {
          enabled: false
        }
      },
      {
        id: "dynamic_tooltip_calc",
        label: "Tooltips com cálculos dinâmicos",
        description: "Tooltip com percentuais e cálculos",
        config: {
          enabled: false
        }
      },
      {
        id: "pseudo_3d",
        label: "Sombreamento pseudo-3D",
        description: "Efeito 3D com sombreamento",
        config: {
          enabled: false
        }
      }
    ]
  },

  donut_chart: {
    name: "Donut Chart",
    features: [
      {
        id: "dynamic_center",
        label: "Conteúdo central dinâmico",
        description: "Texto/valor que muda no centro",
        config: {
          enabled: false,
          centerContent: "Total"
        }
      },
      {
        id: "circular_gradient",
        label: "Gradiente circular",
        description: "Gradiente que segue o círculo",
        config: {
          enabled: false
        }
      },
      {
        id: "multiple_rings",
        label: "Múltiplos anéis independentes",
        description: "Vários anéis concêntricos",
        config: {
          enabled: false,
          rings: []
        }
      },
      {
        id: "animated_progress",
        label: "Progresso animado",
        description: "Anel se preenche progressivamente",
        config: {
          enabled: false,
          duration: 1000
        }
      },
      {
        id: "goal_rules",
        label: "Regras de cor por meta",
        description: "Cor muda conforme atingimento de meta",
        config: {
          enabled: false,
          goalValue: 100
        }
      },
      {
        id: "center_vector_icons",
        label: "Ícones centrais vetoriais",
        description: "Ícones SVG no centro",
        config: {
          enabled: false,
          icon: ""
        }
      },
      {
        id: "partial_arc_highlight",
        label: "Highlight de arco parcial",
        description: "Destaca apenas parte do arco",
        config: {
          enabled: false
        }
      },
      {
        id: "animated_inner_stroke",
        label: "Stroke interno animado",
        description: "Contorno interno com animação",
        config: {
          enabled: false
        }
      },
      {
        id: "sector_interaction",
        label: "Interação por setor",
        description: "Cada setor tem interação própria",
        config: {
          enabled: false
        }
      },
      {
        id: "kpi_indicator",
        label: "Donut como indicador KPI",
        description: "Usa donut como gauge de KPI",
        config: {
          enabled: false
        }
      }
    ]
  },

  area_chart: {
    name: "Area Chart",
    features: [
      {
        id: "conditional_area",
        label: "Área condicional",
        description: "Área liga/desliga por condição",
        config: {
          enabled: false,
          condition: ""
        }
      },
      {
        id: "value_dependent_gradient",
        label: "Gradiente dependente do valor",
        description: "Gradiente muda conforme valor",
        config: {
          enabled: false
        }
      },
      {
        id: "hybrid_stacking",
        label: "Empilhamento híbrido",
        description: "Mix de empilhamento e sobreposição",
        config: {
          enabled: false
        }
      },
      {
        id: "temporal_brush",
        label: "Brush temporal real",
        description: "Seleção de período temporal",
        config: {
          enabled: false
        }
      },
      {
        id: "interval_highlight",
        label: "Highlight de intervalo",
        description: "Destaca intervalos específicos",
        config: {
          enabled: false,
          intervals: []
        }
      },
      {
        id: "density_rules",
        label: "Regras visuais por densidade",
        description: "Visual muda por densidade de dados",
        config: {
          enabled: false
        }
      },
      {
        id: "custom_interpolation",
        label: "Interpolação customizada",
        description: "Curvas de interpolação personalizadas",
        config: {
          enabled: false,
          interpolation: "monotone" // linear, monotone, basis, etc
        }
      },
      {
        id: "negative_area",
        label: "Área negativa com estilo próprio",
        description: "Valores negativos com visual diferente",
        config: {
          enabled: false
        }
      },
      {
        id: "temporal_window_animation",
        label: "Animação por janela temporal",
        description: "Animação que segue janelas de tempo",
        config: {
          enabled: false
        }
      },
      {
        id: "smart_cumulative_tooltip",
        label: "Tooltips acumulativos inteligentes",
        description: "Tooltip mostra valores acumulados",
        config: {
          enabled: false
        }
      }
    ]
  },

  scatter_chart: {
    name: "Scatter Chart",
    features: [
      {
        id: "controlled_jitter",
        label: "Jitter controlado",
        description: "Ruído controlado para evitar sobreposição",
        config: {
          enabled: false,
          jitterAmount: 0.5
        }
      },
      {
        id: "custom_svg_shapes",
        label: "Formas SVG customizadas",
        description: "Formas personalizadas para pontos",
        config: {
          enabled: false,
          shapes: []
        }
      },
      {
        id: "real_regression",
        label: "Linhas de regressão reais",
        description: "Regressão linear, logarítmica, etc",
        config: {
          enabled: false,
          regressionType: "linear" // linear, log, poly, exp
        }
      },
      {
        id: "visual_quadrants",
        label: "Quadrantes com regras visuais",
        description: "Divide em quadrantes com formatação",
        config: {
          enabled: false,
          xThreshold: 0,
          yThreshold: 0
        }
      },
      {
        id: "opacity_density",
        label: "Densidade por opacidade",
        description: "Opacidade mostra densidade de pontos",
        config: {
          enabled: false
        }
      },
      {
        id: "continuous_zoom_pan",
        label: "Zoom e pan contínuos",
        description: "Zoom/pan suaves não discretos",
        config: {
          enabled: false
        }
      },
      {
        id: "brush_selection_return",
        label: "Brush com retorno de seleção",
        description: "Brush retorna pontos selecionados",
        config: {
          enabled: false
        }
      },
      {
        id: "temporal_animation",
        label: "Animação temporal",
        description: "Pontos animam ao longo do tempo",
        config: {
          enabled: false
        }
      },
      {
        id: "cluster_highlight",
        label: "Highlight por cluster",
        description: "Destaca clusters de pontos",
        config: {
          enabled: false
        }
      },
      {
        id: "visual_outlier_detection",
        label: "Detecção visual de outliers",
        description: "Marca outliers visualmente",
        config: {
          enabled: false,
          threshold: 2 // desvios padrão
        }
      }
    ]
  }
};

/**
 * Retorna features de um tipo de gráfico específico
 */
export function getChartFeatures(chartType) {
  return CHART_FEATURES[chartType] || { name: chartType, features: [] };
}

/**
 * Retorna todas as features habilitadas para um tipo
 */
export function getEnabledFeatures(chartType, config) {
  const chartFeatures = getChartFeatures(chartType);
  return chartFeatures.features.filter(feature =>
    config[`feature_${feature.id}_enabled`] === true
  );
}

/**
 * Gera configuração padrão para features
 */
export function getDefaultFeatureConfig(chartType) {
  const features = getChartFeatures(chartType);
  const defaultConfig = {};

  features.features.forEach(feature => {
    Object.entries(feature.config).forEach(([key, value]) => {
      defaultConfig[`feature_${feature.id}_${key}`] = value;
    });
  });

  return defaultConfig;
}
