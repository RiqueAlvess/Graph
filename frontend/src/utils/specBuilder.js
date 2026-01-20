/**
 * Constrói a especificação Vega-Lite completa
 */
export function buildVegaSpec(config, data) {
  const spec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    description: config.description || "",
    title: {
      text: config.title || "Novo Gráfico",
      fontSize: config.title_font_size || 16,
      font: config.title_font || "sans-serif"
    },
    width: config.width || 400,
    height: config.height || 300,
    background: config.background || "#ffffff",
    data: {
      values: data
    },
    mark: {
      type: getMarkType(config.chart_type),
      color: config.mark_color || "#4c78a8",
      ...(config.mark_size && { size: config.mark_size }),
      ...(config.stroke_width && { strokeWidth: config.stroke_width }),
      ...(config.mark_orient && { orient: config.mark_orient }),
      tooltip: config.tooltip !== false
    },
    encoding: buildEncoding(config, data)
  }

  // Só adiciona transform se realmente necessário
  const transforms = buildTransforms(config, data)
  if (transforms && transforms.length > 0) {
    spec.transform = transforms
  }

  return spec
}

/**
 * Determina o tipo de mark baseado no chart_type
 */
function getMarkType(chartType) {
  const markMap = {
    'bar_chart': 'bar',
    'horizontal_bar_chart': 'bar',
    'line_chart': 'line',
    'area_chart': 'area',
    'scatter_plot': 'point',
    'pie_chart': 'arc',
    'donut_chart': 'arc',
  }
  return markMap[chartType] || 'bar'
}

/**
 * Constrói o objeto encoding com tipos corretos
 */
function buildEncoding(config, data) {
  const encoding = {}

  // Detecta automaticamente os campos se não especificados
  const firstRow = data[0] || {}
  const fields = Object.keys(firstRow)

  // Configuração do eixo X
  const xField = config.x_field || fields[0]
  if (xField) {
    const xType = config.x_type || detectFieldType(data, xField)

    encoding.x = {
      field: xField,
      type: xType,
      ...(config.x_title && { title: config.x_title }),
      ...(xType === 'quantitative' && config.x_scale_nice !== false && {
        scale: { nice: true }
      }),
      axis: {
        labelFontSize: config.axis_label_font_size || 12,
        titleFontSize: config.axis_title_font_size || 14,
        labelAngle: config.x_label_angle || 0
      }
    }

    // Só adiciona timeUnit se o tipo for temporal E tiver configurado
    if (xType === 'temporal' && config.x_time_unit) {
      encoding.x.timeUnit = config.x_time_unit
    }
  }

  // Configuração do eixo Y
  const yField = config.y_field || fields[1]
  if (yField) {
    const yType = config.y_type || detectFieldType(data, yField)

    encoding.y = {
      field: yField,
      type: yType,
      ...(config.y_title && { title: config.y_title }),
      ...(yType === 'quantitative' && config.y_scale_nice !== false && {
        scale: { nice: true }
      }),
      axis: {
        labelFontSize: config.axis_label_font_size || 12,
        titleFontSize: config.axis_title_font_size || 14,
        labelAngle: config.y_label_angle || 0
      }
    }

    // Só adiciona timeUnit se o tipo for temporal E tiver configurado
    if (yType === 'temporal' && config.y_time_unit) {
      encoding.y.timeUnit = config.y_time_unit
    }
  }

  // Adiciona cor se configurado
  if (config.color_field) {
    const colorType = config.color_type || detectFieldType(data, config.color_field)
    encoding.color = {
      field: config.color_field,
      type: colorType
    }
  }

  return encoding
}

/**
 * Detecta automaticamente o tipo de campo baseado nos dados
 */
function detectFieldType(data, fieldName) {
  if (!data || data.length === 0) {
    return 'nominal'
  }

  const sampleValue = data[0][fieldName]

  // Verifica se é data
  if (sampleValue instanceof Date) {
    return 'temporal'
  }

  // Verifica se é string de data
  if (typeof sampleValue === 'string') {
    const dateFormats = [
      /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
      /^\d{4}-\d{2}/, // YYYY-MM
      /^\d{4}\/\d{2}\/\d{2}/, // YYYY/MM/DD
    ]

    if (dateFormats.some(format => format.test(sampleValue))) {
      return 'temporal'
    }
  }

  // Verifica se é número
  if (typeof sampleValue === 'number') {
    return 'quantitative'
  }

  // Caso contrário, assume categórico
  return 'nominal'
}

/**
 * Constrói transforms (só quando necessário)
 */
function buildTransforms(config, data) {
  const transforms = []

  // Só adiciona timeUnit transform se for temporal E tiver configurado
  if (config.x_type === 'temporal' && config.x_time_unit) {
    const xField = config.x_field || Object.keys(data[0] || {})[0]
    transforms.push({
      timeUnit: config.x_time_unit,
      field: xField,
      as: `${xField}_time`
    })
  }

  if (config.y_type === 'temporal' && config.y_time_unit) {
    const yField = config.y_field || Object.keys(data[0] || {})[1]
    transforms.push({
      timeUnit: config.y_time_unit,
      field: yField,
      as: `${yField}_time`
    })
  }

  return transforms
}

/**
 * Exporta spec como JSON formatado
 */
export function exportSpecToJSON(spec) {
  return JSON.stringify(spec, null, 2)
}

/**
 * Retorna dados de exemplo baseado no tipo de gráfico
 */
export function getExampleData(chartType) {
  const examples = {
    bar_chart: [
      { category: "A", value: 28 },
      { category: "B", value: 55 },
      { category: "C", value: 43 },
      { category: "D", value: 91 },
      { category: "E", value: 81 },
      { category: "F", value: 53 }
    ],
    horizontal_bar_chart: [
      { category: "A", value: 28 },
      { category: "B", value: 55 },
      { category: "C", value: 43 },
      { category: "D", value: 91 },
      { category: "E", value: 81 },
      { category: "F", value: 53 }
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
    scatter_plot: [
      { x: 28, y: 35 },
      { x: 55, y: 42 },
      { x: 43, y: 58 },
      { x: 91, y: 23 },
      { x: 81, y: 67 },
      { x: 53, y: 44 }
    ],
  }

  return examples[chartType] || examples.bar_chart
}
