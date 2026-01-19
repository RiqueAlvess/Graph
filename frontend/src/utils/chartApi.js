/**
 * API para salvar e carregar configurações de gráficos
 * Integração com o backend Fastify
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

/**
 * Salva uma configuração de gráfico
 * @param {Object} config - Configuração do gráfico
 * @param {string} name - Nome do gráfico
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object>} Resposta da API
 */
export async function saveChartConfig(config, name, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/charts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        config,
        created_at: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao salvar configuração:', error)
    throw error
  }
}

/**
 * Carrega todas as configurações de gráficos do usuário
 * @param {string} token - Token de autenticação
 * @returns {Promise<Array>} Lista de configurações
 */
export async function loadChartConfigs(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/charts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar configurações:', error)
    throw error
  }
}

/**
 * Carrega uma configuração específica
 * @param {string} id - ID da configuração
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object>} Configuração
 */
export async function loadChartConfig(id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/charts/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar configuração:', error)
    throw error
  }
}

/**
 * Atualiza uma configuração existente
 * @param {string} id - ID da configuração
 * @param {Object} config - Nova configuração
 * @param {string} name - Novo nome (opcional)
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object>} Resposta da API
 */
export async function updateChartConfig(id, config, name, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/charts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        config,
        updated_at: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error)
    throw error
  }
}

/**
 * Deleta uma configuração
 * @param {string} id - ID da configuração
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object>} Resposta da API
 */
export async function deleteChartConfig(id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/charts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao deletar configuração:', error)
    throw error
  }
}

/**
 * Compartilha uma configuração (gera link público)
 * @param {string} id - ID da configuração
 * @param {string} token - Token de autenticação
 * @returns {Promise<Object>} Link de compartilhamento
 */
export async function shareChartConfig(id, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/charts/${id}/share`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao compartilhar configuração:', error)
    throw error
  }
}

/**
 * Carrega uma configuração compartilhada (sem autenticação)
 * @param {string} shareToken - Token de compartilhamento
 * @returns {Promise<Object>} Configuração
 */
export async function loadSharedChartConfig(shareToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/charts/shared/${shareToken}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Erro ao carregar configuração compartilhada:', error)
    throw error
  }
}

/**
 * Exporta dados de um gráfico
 * @param {Object} spec - Spec Vega-Lite
 * @param {string} format - Formato de exportação (json, csv, tsv)
 * @returns {string} Dados exportados
 */
export function exportChartData(spec, format = 'json') {
  if (!spec.data || !spec.data.values) {
    throw new Error('Sem dados para exportar')
  }

  const data = spec.data.values

  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2)

    case 'csv':
      return convertToCSV(data)

    case 'tsv':
      return convertToTSV(data)

    default:
      throw new Error(`Formato não suportado: ${format}`)
  }
}

/**
 * Converte array de objetos para CSV
 * @param {Array} data - Dados
 * @returns {string} CSV
 */
function convertToCSV(data) {
  if (!data || data.length === 0) return ''

  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(header => {
      const value = row[header]
      // Escapa aspas e vírgulas
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(',')
  )

  return [headers.join(','), ...rows].join('\n')
}

/**
 * Converte array de objetos para TSV
 * @param {Array} data - Dados
 * @returns {string} TSV
 */
function convertToTSV(data) {
  if (!data || data.length === 0) return ''

  const headers = Object.keys(data[0])
  const rows = data.map(row =>
    headers.map(header => row[header]).join('\t')
  )

  return [headers.join('\t'), ...rows].join('\n')
}

/**
 * Valida uma spec Vega-Lite
 * @param {Object} spec - Spec Vega-Lite
 * @returns {Object} { valid: boolean, errors: Array }
 */
export function validateVegaSpec(spec) {
  const errors = []

  // Valida schema
  if (!spec.$schema) {
    errors.push('Schema ($schema) não definido')
  }

  // Valida mark
  if (!spec.mark && !spec.layer && !spec.facet && !spec.repeat) {
    errors.push('Mark, layer, facet ou repeat deve ser definido')
  }

  // Valida encoding
  if (spec.mark && !spec.encoding) {
    errors.push('Encoding deve ser definido quando mark está presente')
  }

  // Valida data
  if (!spec.data && !spec.datasets) {
    errors.push('Data ou datasets deve ser definido')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
