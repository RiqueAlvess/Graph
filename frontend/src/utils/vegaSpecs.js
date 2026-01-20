/**
 * Templates de specs Vega-Lite otimizadas para Power BI/Deneb
 * Seguindo as melhores práticas de compatibilidade
 */

/**
 * Base comum para todas as specs - compatível com Power BI
 */
const getBaseSpec = (config) => ({
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: config.description || "",
  usermeta: { deneb: { build: "1.6.2.1", metaVersion: 1, provider: "vegaLite", providerVersion: "5.16.3" } },
  config: { view: { stroke: "transparent" }, font: "Segoe UI" },
  autosize: { type: "fit", contains: "padding" }
});

/**
 * Column Chart - Spec otimizada para Power BI
 */
export const getColumnChartSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    mark: {
      type: "bar",
      tooltip: true,
      ...(config.cornerRadius && {
        cornerRadiusTopLeft: config.cornerRadius,
        cornerRadiusTopRight: config.cornerRadius
      }),
      ...(config.color && { color: config.color })
    },

    encoding: {
      x: {
        field: config.xField || "category",
        type: "nominal",
        axis: {
          labelAngle: 0,
          title: config.xTitle || null
        }
      },
      y: {
        field: config.yField || "value",
        type: "quantitative",
        axis: {
          title: config.yTitle || null,
          grid: true
        }
      },
      ...(config.colorField && {
        color: {
          field: config.colorField,
          type: "nominal",
          legend: { title: config.colorTitle || null }
        }
      }),
      ...(config.tooltipFields && {
        tooltip: config.tooltipFields.map(f => ({
          field: f.field,
          type: f.type || "quantitative",
          title: f.title || f.field
        }))
      })
    }
  };

  // Remove título se null
  if (!spec.title) delete spec.title;

  return spec;
};

/**
 * Bar Chart (Horizontal) - Spec otimizada para Power BI
 */
export const getBarChartSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    mark: {
      type: "bar",
      tooltip: true,
      orient: "horizontal",
      ...(config.cornerRadius && {
        cornerRadiusEnd: config.cornerRadius
      }),
      ...(config.color && { color: config.color })
    },

    encoding: {
      y: {
        field: config.yField || "category",
        type: "nominal",
        axis: {
          labelAngle: 0,
          title: config.yTitle || null
        },
        sort: config.sort || null
      },
      x: {
        field: config.xField || "value",
        type: "quantitative",
        axis: {
          title: config.xTitle || null,
          grid: true
        }
      },
      ...(config.colorField && {
        color: {
          field: config.colorField,
          type: "nominal"
        }
      })
    }
  };

  if (!spec.title) delete spec.title;
  if (!spec.encoding.y.sort) delete spec.encoding.y.sort;

  return spec;
};

/**
 * Line Chart - Spec otimizada para Power BI
 */
export const getLineChartSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    mark: {
      type: "line",
      point: config.showPoints || false,
      interpolate: config.interpolate || "monotone",
      tooltip: true,
      ...(config.strokeWidth && { strokeWidth: config.strokeWidth }),
      ...(config.color && { color: config.color })
    },

    encoding: {
      x: {
        field: config.xField || "date",
        type: "temporal",
        axis: {
          labelAngle: 0,
          title: config.xTitle || null,
          format: config.xFormat || "%Y-%m-%d"
        }
      },
      y: {
        field: config.yField || "value",
        type: "quantitative",
        axis: {
          title: config.yTitle || null,
          grid: true
        }
      },
      ...(config.colorField && {
        color: {
          field: config.colorField,
          type: "nominal",
          legend: { title: config.colorTitle || null }
        }
      })
    }
  };

  if (!spec.title) delete spec.title;

  return spec;
};

/**
 * Area Chart - Spec otimizada para Power BI
 */
export const getAreaChartSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    mark: {
      type: "area",
      line: config.showLine !== false,
      interpolate: config.interpolate || "monotone",
      tooltip: true,
      opacity: config.opacity || 0.7,
      ...(config.color && { color: config.color })
    },

    encoding: {
      x: {
        field: config.xField || "date",
        type: "temporal",
        axis: {
          labelAngle: 0,
          title: config.xTitle || null
        }
      },
      y: {
        field: config.yField || "value",
        type: "quantitative",
        axis: {
          title: config.yTitle || null,
          grid: true
        },
        ...(config.stack && { stack: config.stack })
      },
      ...(config.colorField && {
        color: {
          field: config.colorField,
          type: "nominal"
        }
      })
    }
  };

  if (!spec.title) delete spec.title;

  return spec;
};

/**
 * Scatter Chart - Spec otimizada para Power BI
 */
export const getScatterChartSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    mark: {
      type: "point",
      filled: true,
      tooltip: true,
      size: config.size || 100,
      ...(config.shape && { shape: config.shape }),
      ...(config.color && { color: config.color })
    },

    encoding: {
      x: {
        field: config.xField || "x",
        type: "quantitative",
        axis: {
          title: config.xTitle || null,
          grid: true
        },
        scale: { zero: false }
      },
      y: {
        field: config.yField || "y",
        type: "quantitative",
        axis: {
          title: config.yTitle || null,
          grid: true
        },
        scale: { zero: false }
      },
      ...(config.sizeField && {
        size: {
          field: config.sizeField,
          type: "quantitative",
          scale: { range: [50, 500] }
        }
      }),
      ...(config.colorField && {
        color: {
          field: config.colorField,
          type: "nominal"
        }
      })
    }
  };

  if (!spec.title) delete spec.title;

  return spec;
};

/**
 * Pie Chart - Spec otimizada para Power BI
 */
export const getPieChartSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    mark: {
      type: "arc",
      tooltip: true,
      ...(config.innerRadius && { innerRadius: 0 }),
      ...(config.stroke && { stroke: config.stroke })
    },

    encoding: {
      theta: {
        field: config.valueField || "value",
        type: "quantitative",
        stack: true
      },
      color: {
        field: config.categoryField || "category",
        type: "nominal",
        legend: { title: config.legendTitle || null },
        ...(config.colorScheme && {
          scale: { scheme: config.colorScheme }
        })
      },
      tooltip: [
        { field: config.categoryField || "category", type: "nominal" },
        { field: config.valueField || "value", type: "quantitative" }
      ]
    }
  };

  if (!spec.title) delete spec.title;

  return spec;
};

/**
 * Donut Chart - Spec otimizada para Power BI
 */
export const getDonutChartSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    layer: [
      {
        mark: {
          type: "arc",
          innerRadius: config.innerRadius || 50,
          tooltip: true
        },
        encoding: {
          theta: {
            field: config.valueField || "value",
            type: "quantitative",
            stack: true
          },
          color: {
            field: config.categoryField || "category",
            type: "nominal",
            ...(config.colorScheme && {
              scale: { scheme: config.colorScheme }
            })
          }
        }
      }
    ]
  };

  if (!spec.title) delete spec.title;

  return spec;
};

/**
 * Card / KPI - Spec otimizada para Power BI
 */
export const getCardSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },

    transform: [
      {
        aggregate: [{ op: config.aggregation || "sum", field: config.valueField || "value", as: "metric_value" }]
      }
    ],

    mark: {
      type: "text",
      fontSize: config.fontSize || 48,
      fontWeight: config.fontWeight || "bold",
      align: "center",
      baseline: "middle",
      ...(config.color && { color: config.color })
    },

    encoding: {
      text: {
        field: "metric_value",
        type: "quantitative",
        format: config.format || ",.0f"
      }
    }
  };

  return spec;
};

/**
 * Table - Spec otimizada para Power BI
 */
export const getTableSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },

    mark: {
      type: "text",
      align: "left",
      fontSize: config.fontSize || 11
    },

    encoding: {
      y: {
        field: config.rowField || "row",
        type: "ordinal",
        axis: { domain: false, ticks: false }
      },
      x: {
        field: config.columnField || "column",
        type: "ordinal",
        axis: { domain: false, ticks: false }
      },
      text: {
        field: config.valueField || "value",
        type: "nominal"
      }
    }
  };

  return spec;
};

/**
 * Matrix / Heatmap - Spec otimizada para Power BI
 */
export const getMatrixSpec = (config = {}) => {
  const spec = {
    ...getBaseSpec(config),
    data: { name: "dataset" },
    title: config.title ? { text: config.title } : null,

    mark: {
      type: "rect",
      tooltip: true
    },

    encoding: {
      x: {
        field: config.xField || "column",
        type: "ordinal",
        axis: { labelAngle: 0, title: config.xTitle || null }
      },
      y: {
        field: config.yField || "row",
        type: "ordinal",
        axis: { title: config.yTitle || null }
      },
      color: {
        field: config.valueField || "value",
        type: "quantitative",
        scale: { scheme: config.colorScheme || "blues" },
        legend: { title: config.legendTitle || null }
      },
      tooltip: [
        { field: config.xField || "column", type: "ordinal" },
        { field: config.yField || "row", type: "ordinal" },
        { field: config.valueField || "value", type: "quantitative", format: config.format || ",.2f" }
      ]
    }
  };

  if (!spec.title) delete spec.title;

  return spec;
};

/**
 * Retorna spec baseada no tipo de gráfico
 */
export const getSpecByChartType = (chartType, config = {}) => {
  const specMap = {
    column_chart: getColumnChartSpec,
    bar_chart: getBarChartSpec,
    line_chart: getLineChartSpec,
    area_chart: getAreaChartSpec,
    scatter_chart: getScatterChartSpec,
    pie_chart: getPieChartSpec,
    donut_chart: getDonutChartSpec,
    card: getCardSpec,
    table: getTableSpec,
    matrix: getMatrixSpec
  };

  const specFunction = specMap[chartType];
  if (!specFunction) {
    console.warn(`Spec não encontrada para tipo: ${chartType}`);
    return getColumnChartSpec(config);
  }

  return specFunction(config);
};

/**
 * Converte spec para formato de exportação Power BI
 * Remove propriedades desnecessárias e otimiza
 */
export const optimizeSpecForPowerBI = (spec) => {
  const optimized = JSON.parse(JSON.stringify(spec));

  // Remove valores null ou undefined
  const removeNullValues = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        removeNullValues(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    });
  };

  removeNullValues(optimized);

  return optimized;
};

/**
 * Exporta spec como JSON formatado para Power BI
 */
export const exportToPowerBI = (chartType, config = {}) => {
  const spec = getSpecByChartType(chartType, config);
  const optimized = optimizeSpecForPowerBI(spec);
  return JSON.stringify(optimized, null, 2);
};
