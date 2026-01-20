/**
 * Construtor de especificações Vega-Lite
 * Otimizado para Power BI/Deneb
 */

import { getSpecByChartType, optimizeSpecForPowerBI } from './vegaSpecs';
import { getChartFeatures, getEnabledFeatures } from './chartFeatures';

/**
 * Constrói a especificação Vega-Lite completa compatível com Power BI
 */
export function buildVegaSpec(config, data) {
  // Obtém spec base do tipo de gráfico
  const baseSpec = getSpecByChartType(config.chart_type || 'column_chart', {
    // Configurações gerais
    title: config.title,
    description: config.description,

    // Campos de dados
    xField: config.x_field,
    yField: config.y_field,
    colorField: config.color_field,
    sizeField: config.size_field,
    valueField: config.value_field,
    categoryField: config.category_field,
    rowField: config.row_field,
    columnField: config.column_field,

    // Títulos
    xTitle: config.x_title,
    yTitle: config.y_title,
    colorTitle: config.color_title,
    legendTitle: config.legend_title,

    // Estilos
    color: config.color || config.mark_color,
    cornerRadius: config.corner_radius,
    strokeWidth: config.stroke_width || config.line_width,
    size: config.mark_size || config.size,
    opacity: config.opacity,
    innerRadius: config.inner_radius,

    // Interpolação e forma
    interpolate: config.interpolation,
    shape: config.shape,
    showPoints: config.show_points,
    showLine: config.show_line,

    // Ordenação e empilhamento
    sort: config.sorting && config.sorting !== 'none' ? config.sorting : null,
    stack: config.stacking && config.stacking !== 'none' ? config.stacking : null,

    // Cores
    colorScheme: config.color_scheme,

    // Formatação
    format: config.format || config.y_format,
    xFormat: config.x_format,

    // Agregação (para cards)
    aggregation: config.aggregation && config.aggregation !== 'none' ? config.aggregation : 'sum',

    // Fontes
    fontSize: config.font_size || config.title_font_size,
    fontWeight: config.font_weight,

    // Tooltips
    tooltipFields: config.tooltip_fields || []
  });

  // Aplica features específicas do gráfico
  const specWithFeatures = applyChartFeatures(baseSpec, config);

  // Se dados de exemplo foram fornecidos, adiciona inline
  // Caso contrário, mantém { name: "dataset" } para Power BI
  if (data && data.length > 0 && config.use_example_data) {
    specWithFeatures.data = { values: data };
  }

  // Otimiza para Power BI
  return optimizeSpecForPowerBI(specWithFeatures);
}

/**
 * Aplica features específicas do tipo de gráfico
 */
function applyChartFeatures(spec, config) {
  const chartType = config.chart_type || 'column_chart';
  const enabledFeatures = getEnabledFeatures(chartType, config);

  let enhancedSpec = { ...spec };

  enabledFeatures.forEach(feature => {
    switch (feature.id) {
      // Column Chart Features
      case 'gradient_conditional':
        enhancedSpec = applyConditionalGradient(enhancedSpec, config);
        break;
      case 'asymmetric_radius':
        enhancedSpec = applyAsymmetricRadius(enhancedSpec, config);
        break;
      case 'dynamic_baseline':
        enhancedSpec = applyDynamicBaseline(enhancedSpec, config);
        break;

      // Line Chart Features
      case 'threshold_color':
        enhancedSpec = applyThresholdColor(enhancedSpec, config);
        break;
      case 'continuous_zoom':
        enhancedSpec = applyContinuousZoom(enhancedSpec, config);
        break;

      // Common Features
      case 'cross_filter':
        enhancedSpec = applyCrossFilter(enhancedSpec, config);
        break;

      // Adicione mais features conforme necessário
    }
  });

  return enhancedSpec;
}

/**
 * Aplica gradiente condicional (Column Chart)
 */
function applyConditionalGradient(spec, config) {
  const conditions = config.feature_gradient_conditional_conditions || [];

  if (conditions.length > 0 && spec.mark) {
    spec.encoding = spec.encoding || {};
    spec.encoding.fill = {
      condition: conditions.map(cond => ({
        test: cond.test,
        value: {
          gradient: "linear",
          stops: [
            { offset: 0, color: cond.startColor },
            { offset: 1, color: cond.endColor }
          ],
          x1: 0, y1: 0, x2: 0, y2: 1
        }
      })),
      value: spec.mark.color || "#4c78a8"
    };
  }

  return spec;
}

/**
 * Aplica arredondamento assimétrico
 */
function applyAsymmetricRadius(spec, config) {
  if (spec.mark && typeof spec.mark === 'object') {
    spec.mark.cornerRadiusTopLeft = config.feature_asymmetric_radius_cornerRadiusTopLeft || 0;
    spec.mark.cornerRadiusTopRight = config.feature_asymmetric_radius_cornerRadiusTopRight || 0;
    spec.mark.cornerRadiusBottomLeft = config.feature_asymmetric_radius_cornerRadiusBottomLeft || 0;
    spec.mark.cornerRadiusBottomRight = config.feature_asymmetric_radius_cornerRadiusBottomRight || 0;
  }

  return spec;
}

/**
 * Aplica baseline dinâmica
 */
function applyDynamicBaseline(spec, config) {
  const baseline = config.feature_dynamic_baseline_baseline || 0;

  if (spec.encoding && spec.encoding.y && baseline !== 0) {
    spec.encoding.y.scale = spec.encoding.y.scale || {};
    spec.encoding.y.scale.domain = [baseline, spec.encoding.y.scale.domain?.[1] || 100];
  }

  return spec;
}

/**
 * Aplica mudança de cor por threshold (Line Chart)
 */
function applyThresholdColor(spec, config) {
  const threshold = config.feature_threshold_color_threshold || 50;
  const colorAbove = config.feature_threshold_color_colorAbove || "green";
  const colorBelow = config.feature_threshold_color_colorBelow || "red";

  if (spec.encoding) {
    spec.encoding.color = {
      condition: {
        test: `datum.${config.y_field || 'value'} > ${threshold}`,
        value: colorAbove
      },
      value: colorBelow
    };
  }

  return spec;
}

/**
 * Aplica zoom e pan contínuos
 */
function applyContinuousZoom(spec, config) {
  spec.params = spec.params || [];

  spec.params.push({
    name: "grid",
    select: "interval",
    bind: "scales"
  });

  return spec;
}

/**
 * Habilita cross-filter (compatível com Power BI)
 */
function applyCrossFilter(spec, config) {
  // Cross-filter é nativo no Power BI quando usando Deneb
  // Apenas garantimos que tooltip está habilitado
  if (spec.mark && typeof spec.mark === 'object') {
    spec.mark.tooltip = true;
  }

  return spec;
}

/**
 * Detecta automaticamente o tipo de campo baseado nos dados
 */
export function detectFieldType(data, fieldName) {
  if (!data || data.length === 0) {
    return 'nominal';
  }

  const sampleValue = data[0][fieldName];

  // Verifica se é data
  if (sampleValue instanceof Date) {
    return 'temporal';
  }

  // Verifica se é string de data
  if (typeof sampleValue === 'string') {
    const dateFormats = [
      /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
      /^\d{4}-\d{2}/, // YYYY-MM
      /^\d{4}\/\d{2}\/\d{2}/, // YYYY/MM/DD
    ];

    if (dateFormats.some(format => format.test(sampleValue))) {
      return 'temporal';
    }
  }

  // Verifica se é número
  if (typeof sampleValue === 'number') {
    return 'quantitative';
  }

  // Caso contrário, assume categórico
  return 'nominal';
}

/**
 * Retorna dados de exemplo baseado no tipo de gráfico
 */
export function getExampleData(chartType) {
  const examples = {
    column_chart: [
      { category: "A", value: 28 },
      { category: "B", value: 55 },
      { category: "C", value: 43 },
      { category: "D", value: 91 },
      { category: "E", value: 81 },
      { category: "F", value: 53 }
    ],
    bar_chart: [
      { category: "A", value: 28 },
      { category: "B", value: 55 },
      { category: "C", value: 43 },
      { category: "D", value: 91 },
      { category: "E", value: 81 }
    ],
    line_chart: [
      { date: "2024-01", value: 28 },
      { date: "2024-02", value: 55 },
      { date: "2024-03", value: 43 },
      { date: "2024-04", value: 91 },
      { date: "2024-05", value: 81 },
      { date: "2024-06", value: 53 }
    ],
    area_chart: [
      { date: "2024-01", value: 28 },
      { date: "2024-02", value: 55 },
      { date: "2024-03", value: 43 },
      { date: "2024-04", value: 91 },
      { date: "2024-05", value: 81 },
      { date: "2024-06", value: 53 }
    ],
    scatter_chart: [
      { x: 28, y: 35 },
      { x: 55, y: 42 },
      { x: 43, y: 58 },
      { x: 91, y: 23 },
      { x: 81, y: 67 },
      { x: 53, y: 44 }
    ],
    pie_chart: [
      { category: "A", value: 28 },
      { category: "B", value: 55 },
      { category: "C", value: 43 },
      { category: "D", value: 35 }
    ],
    donut_chart: [
      { category: "A", value: 28 },
      { category: "B", value: 55 },
      { category: "C", value: 43 },
      { category: "D", value: 35 }
    ],
    card: [
      { value: 1250000 }
    ],
    table: [
      { row: "Row 1", column: "Col A", value: "Value 1A" },
      { row: "Row 1", column: "Col B", value: "Value 1B" },
      { row: "Row 2", column: "Col A", value: "Value 2A" },
      { row: "Row 2", column: "Col B", value: "Value 2B" }
    ],
    matrix: [
      { row: "A", column: "X", value: 28 },
      { row: "A", column: "Y", value: 55 },
      { row: "B", column: "X", value: 43 },
      { row: "B", column: "Y", value: 91 }
    ]
  };

  return examples[chartType] || examples.column_chart;
}

/**
 * Exporta spec como JSON formatado para Power BI
 */
export function exportSpecToJSON(spec) {
  return JSON.stringify(spec, null, 2);
}

/**
 * Exporta spec pronta para usar no Deneb (Power BI)
 */
export function exportForDeneb(chartType, config = {}, includeData = false) {
  const data = includeData ? getExampleData(chartType) : null;
  const spec = buildVegaSpec({ ...config, chart_type: chartType, use_example_data: includeData }, data);

  return {
    spec: exportSpecToJSON(spec),
    config: {
      instructions: "Para usar no Power BI:",
      steps: [
        "1. Adicione o visual 'Deneb' ao seu relatório",
        "2. Selecione os campos necessários no painel de campos",
        "3. Cole esta especificação no editor Deneb",
        "4. O visual irá se conectar automaticamente aos dados do Power BI"
      ],
      notes: [
        "- Cross-filtering está habilitado automaticamente",
        "- Tooltips nativos do Power BI funcionam normalmente",
        "- Drill-down e hierarquias são preservados"
      ]
    }
  };
}
