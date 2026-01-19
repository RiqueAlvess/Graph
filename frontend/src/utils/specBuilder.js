/**
 * Constrói specs Vega-Lite a partir de configurações
 */

import { getChartTypeById } from './chartTypes';

/**
 * Constrói uma spec Vega-Lite completa a partir da configuração
 * @param {Object} config - Configuração do gráfico
 * @param {Array} data - Dados a serem visualizados
 * @returns {Object} Spec Vega-Lite
 */
export function buildVegaSpec(config, data = []) {
  const chartType = getChartTypeById(config.chart_type) || { mark: "bar" };

  // Spec base
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: config.description || config.accessibility_description || "",
  };

  // Título
  if (config.title) {
    spec.title = buildTitle(config);
  }

  // Dimensões
  spec.width = config.width === "container" ? "container" : config.width || 400;
  spec.height = config.height || 300;

  // Autosize
  if (config.autosize) {
    spec.autosize = {
      type: config.autosize,
      contains: "padding"
    };
  }

  // Background
  if (config.background) {
    spec.background = config.background;
  }

  // Padding
  if (config.padding !== undefined) {
    spec.padding = config.padding;
  }

  // Dados
  spec.data = buildData(config, data);

  // Transform
  const transform = buildTransform(config);
  if (transform.length > 0) {
    spec.transform = transform;
  }

  // Mark
  spec.mark = buildMark(config, chartType);

  // Encoding
  spec.encoding = buildEncoding(config);

  // Config avançado
  if (config.config_overrides) {
    try {
      const overrides = JSON.parse(config.config_overrides);
      spec.config = overrides;
    } catch (e) {
      console.warn("Config overrides inválido:", e);
    }
  }

  // Layer para gráficos compostos
  if (config.layering) {
    spec.layer = buildLayers(config, chartType, data);
    delete spec.mark;
    delete spec.encoding;
  }

  // Facet
  if (config.facet_rows || config.facet_columns) {
    return buildFacetSpec(spec, config);
  }

  // Repeat
  if (config.repeat_fields) {
    return buildRepeatSpec(spec, config);
  }

  return spec;
}

/**
 * Constrói o objeto de título
 */
function buildTitle(config) {
  const title = {
    text: config.title
  };

  if (config.subtitle) {
    title.subtitle = config.subtitle;
  }

  if (config.font_size) {
    title.fontSize = config.font_size + 4;
  }

  if (config.font) {
    title.font = config.font;
  }

  return title;
}

/**
 * Constrói o objeto de dados
 */
function buildData(config, data) {
  // Se tem URL de fonte de dados
  if (config.data_source) {
    const dataObj = { url: config.data_source };

    if (config.data_format && config.data_format !== "json") {
      dataObj.format = { type: config.data_format };
    }

    return dataObj;
  }

  // Senão, usa os dados fornecidos
  return { values: data };
}

/**
 * Constrói transformações de dados
 */
function buildTransform(config) {
  const transform = [];

  // Filtro
  if (config.filtering) {
    try {
      transform.push({
        filter: config.filtering
      });
    } catch (e) {
      console.warn("Filtro inválido:", e);
    }
  }

  // Binning
  if (config.binning && config.encoding_x) {
    transform.push({
      bin: true,
      field: config.encoding_x,
      as: `${config.encoding_x}_binned`
    });
  }

  // Agregação
  if (config.aggregation && config.aggregation !== "none") {
    transform.push({
      aggregate: [{
        op: config.aggregation,
        field: config.encoding_y,
        as: `${config.encoding_y}_${config.aggregation}`
      }],
      groupby: config.grouping ? config.grouping.split(",").map(s => s.trim()) : [config.encoding_x]
    });
  }

  // Time unit
  if (config.time_unit && config.encoding_x) {
    transform.push({
      timeUnit: config.time_unit,
      field: config.encoding_x,
      as: `${config.encoding_x}_time`
    });
  }

  return transform;
}

/**
 * Constrói o objeto de mark
 */
function buildMark(config, chartType) {
  const mark = {
    type: config.mark_type || chartType.mark || "bar"
  };

  // Gradiente ou Cor sólida
  if (config.use_gradient && config.gradient_start && config.gradient_end) {
    // Para gradientes, usamos um esquema de cores personalizado
    // Vega-Lite suporta gradientes através de esquemas de cores
    mark.color = {
      gradient: "linear",
      stops: [
        { offset: 0, color: config.gradient_start },
        { offset: 1, color: config.gradient_end }
      ]
    };
  } else if (config.color) {
    mark.color = config.color;
  }

  // Opacidade
  if (config.opacity !== undefined && config.opacity !== 1) {
    mark.opacity = Number(config.opacity);
  }

  // Tamanho
  if (config.size) {
    mark.size = config.size;
  }

  // Stroke
  if (config.stroke) {
    mark.stroke = config.stroke;
  }

  // Fill
  if (config.fill) {
    mark.fill = config.fill;
  }

  // Corner radius
  if (config.corner_radius) {
    mark.cornerRadius = config.corner_radius;
  }

  // Line properties
  if (config.line_width) {
    mark.strokeWidth = config.line_width;
  }

  if (config.line_style && config.line_style !== "solid") {
    mark.strokeDash = config.line_style === "dashed" ? [5, 5] : [2, 2];
  }

  if (config.line_cap && config.line_cap !== "butt") {
    mark.strokeCap = config.line_cap;
  }

  if (config.line_join && config.line_join !== "miter") {
    mark.strokeJoin = config.line_join;
  }

  // Interpolação para linhas
  if ((mark.type === "line" || mark.type === "area") && config.interpolation) {
    mark.interpolate = config.interpolation;
  }

  // Tensão
  if (config.tension !== undefined && config.tension !== 0) {
    mark.tension = config.tension;
  }

  // Orientação
  if (config.mark_orientation) {
    mark.orient = config.mark_orientation;
  }

  // Tooltip
  mark.tooltip = true;

  // Inner/Outer radius para arcs
  if (mark.type === "arc") {
    if (config.inner_radius) {
      mark.innerRadius = config.inner_radius;
    }
    if (config.outer_radius) {
      mark.outerRadius = config.outer_radius;
    }
  }

  return mark;
}

/**
 * Constrói o encoding
 */
function buildEncoding(config) {
  const encoding = {};

  // X axis
  if (config.encoding_x) {
    encoding.x = buildEncodingChannel(config, "x");
  }

  // Y axis
  if (config.encoding_y) {
    encoding.y = buildEncodingChannel(config, "y");
  }

  // X2 axis
  if (config.encoding_x2) {
    encoding.x2 = { field: config.encoding_x2 };
  }

  // Y2 axis
  if (config.encoding_y2) {
    encoding.y2 = { field: config.encoding_y2 };
  }

  // Color
  if (config.encoding_color) {
    encoding.color = {
      field: config.encoding_color,
      type: "nominal",
      scale: config.color_scheme ? { scheme: config.color_scheme } : undefined,
      legend: config.legend_visibility ? buildLegend(config) : null
    };
  }

  // Size
  if (config.encoding_size) {
    encoding.size = {
      field: config.encoding_size,
      type: "quantitative"
    };
  }

  // Shape
  if (config.encoding_shape) {
    encoding.shape = {
      field: config.encoding_shape,
      type: "nominal"
    };
  }

  // Opacity
  if (config.encoding_opacity) {
    encoding.opacity = {
      field: config.encoding_opacity,
      type: "quantitative"
    };
  }

  // Angle (para arc/pie charts)
  if (config.encoding_angle) {
    encoding.theta = {
      field: config.encoding_angle,
      type: "quantitative",
      stack: config.stacking !== "none" ? config.stacking : null
    };
  }

  // Radius
  if (config.encoding_radius) {
    encoding.radius = {
      field: config.encoding_radius,
      type: "quantitative"
    };
  }

  // Text
  if (config.encoding_text) {
    encoding.text = {
      field: config.encoding_text,
      type: config.labels_format ? "quantitative" : "nominal",
      format: config.labels_format || undefined
    };
  }

  // Detail
  if (config.encoding_detail) {
    encoding.detail = {
      field: config.encoding_detail,
      type: "nominal"
    };
  }

  // Order
  if (config.encoding_order) {
    encoding.order = {
      field: config.encoding_order,
      type: "quantitative"
    };
  }

  // Tooltip
  if (config.encoding_tooltip) {
    const tooltipFields = config.encoding_tooltip.split(",").map(f => f.trim());
    encoding.tooltip = tooltipFields.map(field => ({
      field,
      type: "nominal"
    }));
  }

  return encoding;
}

/**
 * Detecta automaticamente o tipo de dado baseado no nome do campo
 */
function detectFieldType(fieldName) {
  if (!fieldName) return "quantitative";

  const nominalFields = ["category", "name", "label", "type", "group", "id"];
  const lowerField = fieldName.toLowerCase();

  // Verifica se é um campo nominal
  if (nominalFields.some(f => lowerField.includes(f))) {
    return "nominal";
  }

  // Verifica se é temporal
  if (lowerField.includes("date") || lowerField.includes("time") || lowerField.includes("year") || lowerField.includes("month")) {
    return "temporal";
  }

  // Default: quantitative
  return "quantitative";
}

/**
 * Constrói um canal de encoding (x ou y)
 */
function buildEncodingChannel(config, axis) {
  const field = axis === "x" ? config.encoding_x : config.encoding_y;

  // Detecta automaticamente o tipo de dado
  const autoType = detectFieldType(field);

  const channel = {
    field,
    type: autoType,
  };

  // Type baseado em agregação ou dados
  if (config.aggregation && config.aggregation !== "none") {
    channel.aggregate = config.aggregation;
    channel.type = "quantitative"; // Agregações sempre retornam valores quantitativos
  }

  // Binning
  if (config.binning && axis === "x") {
    channel.bin = true;
  }

  // Time unit
  if (config.time_unit) {
    channel.timeUnit = config.time_unit;
    channel.type = "temporal";
  }

  // Stack
  if (config.stacking && config.stacking !== "none") {
    channel.stack = config.stacking;
  }

  // Sort
  if (config.sorting && config.sorting !== "none") {
    channel.sort = config.sorting;
  }

  // Scale
  if (config.scale_type || config.scale_domain || config.scale_range) {
    channel.scale = {};

    if (config.scale_type && config.scale_type !== "linear") {
      channel.scale.type = config.scale_type;
    }

    if (config.scale_domain) {
      try {
        channel.scale.domain = JSON.parse(config.scale_domain);
      } catch (e) {
        console.warn("Domain inválido:", e);
      }
    }

    if (config.scale_range) {
      try {
        channel.scale.range = JSON.parse(config.scale_range);
      } catch (e) {
        console.warn("Range inválido:", e);
      }
    }

    if (config.scale_clamp) {
      channel.scale.clamp = true;
    }

    if (config.scale_nice !== undefined) {
      channel.scale.nice = config.scale_nice;
    }

    if (config.scale_reverse) {
      channel.scale.reverse = true;
    }
  }

  // Axis
  channel.axis = {
    labelFontSize: config.font_size || 12,
    titleFontSize: (config.font_size || 12) + 2,
    labelAngle: axis === "x" ? config.text_angle || 0 : 0
  };

  // Adiciona título personalizado do eixo
  if (axis === "x" && config.axis_x_title) {
    channel.axis.title = config.axis_x_title;
  } else if (axis === "y" && config.axis_y_title) {
    channel.axis.title = config.axis_y_title;
  }

  return channel;
}

/**
 * Constrói configuração de legenda
 */
function buildLegend(config) {
  const legend = {};

  if (config.legend_position && config.legend_position !== "none") {
    legend.orient = config.legend_position;
  }

  if (config.legend_title) {
    legend.title = config.legend_title;
  }

  if (config.legend_format) {
    legend.format = config.legend_format;
  }

  if (config.legend_symbol && config.legend_symbol !== "circle") {
    legend.symbolType = config.legend_symbol;
  }

  return legend;
}

/**
 * Constrói spec com facetas
 */
function buildFacetSpec(baseSpec, config) {
  const facetSpec = {
    $schema: baseSpec.$schema,
    data: baseSpec.data,
    facet: {},
    spec: {
      mark: baseSpec.mark,
      encoding: baseSpec.encoding
    }
  };

  if (config.facet_rows) {
    facetSpec.facet.row = { field: config.facet_rows, type: "nominal" };
  }

  if (config.facet_columns) {
    facetSpec.facet.column = { field: config.facet_columns, type: "nominal" };
  }

  if (config.facet_spacing) {
    facetSpec.spacing = config.facet_spacing;
  }

  return facetSpec;
}

/**
 * Constrói spec com repeat
 */
function buildRepeatSpec(baseSpec, config) {
  const fields = config.repeat_fields.split(",").map(f => f.trim());

  return {
    $schema: baseSpec.$schema,
    repeat: { row: fields },
    spec: {
      ...baseSpec,
      data: baseSpec.data
    }
  };
}

/**
 * Constrói layers para gráficos compostos
 */
function buildLayers(config, chartType, data) {
  const layers = [];

  // Layer base
  layers.push({
    mark: buildMark(config, chartType),
    encoding: buildEncoding(config)
  });

  // Reference lines
  if (config.reference_lines) {
    try {
      const lines = JSON.parse(config.reference_lines);
      lines.forEach(line => {
        layers.push({
          mark: "rule",
          encoding: {
            y: { datum: line.value }
          }
        });
      });
    } catch (e) {
      console.warn("Reference lines inválidas:", e);
    }
  }

  return layers;
}

/**
 * Exporta spec para JSON
 */
export function exportSpecToJSON(spec) {
  return JSON.stringify(spec, null, 2);
}

/**
 * Dados de exemplo baseados no tipo de gráfico
 */
export function getExampleData(chartType) {
  // Dados genéricos
  const genericData = [
    { category: "A", value: 28 },
    { category: "B", value: 55 },
    { category: "C", value: 43 },
    { category: "D", value: 91 },
    { category: "E", value: 81 },
    { category: "F", value: 53 }
  ];

  // Dados temporais
  const timeData = [
    { date: "2024-01", value: 28 },
    { date: "2024-02", value: 55 },
    { date: "2024-03", value: 43 },
    { date: "2024-04", value: 91 },
    { date: "2024-05", value: 81 },
    { date: "2024-06", value: 53 }
  ];

  // Dados para scatter/bubble
  const scatterData = [
    { x: 10, y: 20, category: "A", size: 100 },
    { x: 20, y: 35, category: "B", size: 150 },
    { x: 30, y: 25, category: "C", size: 80 },
    { x: 40, y: 50, category: "A", size: 200 },
    { x: 50, y: 45, category: "B", size: 120 },
    { x: 60, y: 30, category: "C", size: 90 }
  ];

  if (!chartType) return genericData;

  if (chartType.includes("time") || chartType.includes("temporal")) {
    return timeData;
  }

  if (chartType.includes("scatter") || chartType.includes("bubble")) {
    return scatterData;
  }

  return genericData;
}
