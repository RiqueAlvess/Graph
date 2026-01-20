"use client"

import { useState, useMemo, useEffect, useDeferredValue } from "react"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
// import { VegaChart } from "@/components/VegaChart" // REMOVIDO - agora usa dynamic import
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { getPropertiesByCategory, getDefaultValues } from "@/utils/chartProperties"
import { getAllChartTypes, getCategories } from "@/utils/chartTypes"
import { buildVegaSpec, exportSpecToJSON, getExampleData } from "@/utils/specBuilder"

// Importação dinâmica do VegaChart (evita problemas de SSR)
const VegaChart = dynamic(
  () => import('@/components/VegaChart').then(mod => mod.VegaChart),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="text-sm text-zinc-500">Carregando visualização...</div>
      </div>
    )
  }
)

export default function EditorPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isClient, setIsClient] = useState(false)

  // Estado de configuração do gráfico
  const [chartConfig, setChartConfig] = useState({
    chart_type: "bar_chart",
    ...getDefaultValues()
  })

  // Dados de exemplo
  const [chartData, setChartData] = useState(getExampleData("bar_chart"))

  // Sidebar position
  const [sidebarPosition, setSidebarPosition] = useState("left")

  // Tipo de renderização fixo em canvas
  const renderer = "canvas"

  // Defer do config para melhor performance
  const deferredConfig = useDeferredValue(chartConfig)

  // Autenticação
  useEffect(() => {
    setIsClient(true)
    const userData = localStorage.getItem("user_data")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  // Gera o spec Vega-Lite
  const vegaSpec = useMemo(() => {
    try {
      const spec = buildVegaSpec(deferredConfig, chartData)
      console.log("Generated spec:", JSON.stringify(spec, null, 2))
      console.log("Chart data:", chartData)

      // Validação básica
      if (!spec || !spec.data || !spec.mark) {
        console.error("Spec inválida:", spec)
        return null
      }

      return spec
    } catch (error) {
      console.error("Erro ao gerar spec:", error)
      return null
    }
  }, [deferredConfig, chartData])

  // Exporta JSON
  const exportJson = () => {
    const jsonStr = exportSpecToJSON(vegaSpec)
    navigator.clipboard.writeText(jsonStr)
    toast.success("JSON Copiado!", {
      description: "Especificação Vega-Lite copiada para área de transferência."
    })
  }

  // Download JSON
  const downloadJson = () => {
    const jsonStr = exportSpecToJSON(vegaSpec)
    const blob = new Blob([jsonStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `chart-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success("Download Iniciado!", {
      description: "Arquivo JSON baixado com sucesso."
    })
  }

  // Atualiza configuração
  const updateConfig = (key, value) => {
    setChartConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Atualiza tipo de gráfico
  const updateChartType = (typeId) => {
    setChartConfig(prev => ({
      ...prev,
      chart_type: typeId
    }))
    // Atualiza dados de exemplo baseado no tipo
    setChartData(getExampleData(typeId))
  }

  // Reset configurações
  const resetConfig = () => {
    setChartConfig({
      chart_type: "bar_chart",
      ...getDefaultValues()
    })
    setChartData(getExampleData("bar_chart"))
    toast.info("Configurações Resetadas")
  }

  // Renderiza campo de propriedade
  const renderPropertyField = (propKey, propConfig) => {
    const value = chartConfig[propKey]

    switch (propConfig.type) {
      case "text":
        return (
          <Input
            value={value || ""}
            onChange={(e) => updateConfig(propKey, e.target.value)}
            placeholder={propConfig.label}
          />
        )

      case "textarea":
        return (
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={value || ""}
            onChange={(e) => updateConfig(propKey, e.target.value)}
            placeholder={propConfig.label}
          />
        )

      case "number":
        return (
          <Input
            type="number"
            value={value || propConfig.default || ""}
            onChange={(e) => updateConfig(propKey, Number(e.target.value))}
            placeholder={propConfig.label}
          />
        )

      case "color":
        return (
          <div className="flex gap-2">
            <Input
              type="color"
              className="w-12 h-9 p-1 cursor-pointer"
              value={value || propConfig.default || "#000000"}
              onChange={(e) => updateConfig(propKey, e.target.value)}
            />
            <Input
              className="flex-1 font-mono text-xs"
              value={value || propConfig.default || "#000000"}
              onChange={(e) => updateConfig(propKey, e.target.value)}
              placeholder="#000000"
            />
          </div>
        )

      case "select":
        return (
          <Select
            value={value || propConfig.default || ""}
            onValueChange={(v) => updateConfig(propKey, v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={propConfig.label} />
            </SelectTrigger>
            <SelectContent>
              {propConfig.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "slider":
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>{propConfig.min || 0}</span>
              <span className="font-semibold text-zinc-900">{value || propConfig.default}</span>
              <span>{propConfig.max || 100}</span>
            </div>
            <Slider
              value={[value || propConfig.default || 0]}
              onValueChange={([v]) => updateConfig(propKey, v)}
              min={propConfig.min || 0}
              max={propConfig.max || 100}
              step={propConfig.step || 1}
            />
          </div>
        )

      case "switch":
        return (
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600">{value ? "Ativado" : "Desativado"}</span>
            <Switch
              checked={value || propConfig.default || false}
              onCheckedChange={(checked) => updateConfig(propKey, checked)}
            />
          </div>
        )

      default:
        return null
    }
  }

  // Loading
  if (!isClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mb-4"></div>
          <p className="text-sm text-zinc-600">Carregando editor...</p>
        </div>
      </div>
    )
  }

  const propertiesByCategory = getPropertiesByCategory()
  const allChartTypes = getAllChartTypes()
  const chartCategories = getCategories()

  // Sidebar Component
  const Sidebar = () => (
    <aside className="w-96 bg-white border-r border-zinc-200 flex flex-col z-10 shadow-lg">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-zinc-900 to-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold tracking-tight text-white text-lg">GRAPHITE STUDIO</span>
          <span className="text-[10px] bg-white text-zinc-900 px-2 py-1 rounded-full font-semibold">
            {user.plan}
          </span>
        </div>
        <p className="text-xs text-zinc-300">Editor Low-Code de Gráficos</p>
      </div>

      {/* Configurações */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Tipo de Gráfico */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Tipo de Gráfico
            </Label>
            <Select value={chartConfig.chart_type} onValueChange={updateChartType}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {chartCategories.map((category) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-zinc-500 bg-zinc-50">
                      {category}
                    </div>
                    {allChartTypes
                      .filter((type) => type.category === category)
                      .map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Propriedades Organizadas */}
          <Accordion type="multiple" defaultValue={["Aparência", "Cores", "Dimensões"]} className="w-full">
            {Object.entries(propertiesByCategory).map(([category, properties]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  {category}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2 pb-4">
                  {Object.entries(properties).map(([propKey, propConfig]) => (
                    <div key={propKey} className="space-y-2">
                      <Label className="text-xs text-zinc-600 font-medium">
                        {propConfig.label}
                      </Label>
                      {renderPropertyField(propKey, propConfig)}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t bg-zinc-50 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={exportJson} className="bg-zinc-900 text-white hover:bg-zinc-800">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copiar
          </Button>
          <Button onClick={downloadJson} variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Baixar
          </Button>
        </div>
        <Button onClick={resetConfig} variant="outline" className="w-full">
          Resetar
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            localStorage.clear()
            router.push("/login")
          }}
        >
          Sair
        </Button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar Left */}
      {sidebarPosition === "left" && <Sidebar />}

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-zinc-100/50">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-zinc-900">Editor de Gráficos</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500">Usuário: <span className="font-semibold text-zinc-900">{user.name}</span></span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarPosition(sidebarPosition === "left" ? "right" : "left")}
              className="text-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </Button>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 p-6 flex gap-6 overflow-hidden">
          {/* Chart Preview */}
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-zinc-200 p-6 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-700">Pré-visualização</h3>
              <span className="text-xs text-zinc-400 font-mono">{chartConfig.chart_type}</span>
            </div>
            <div className="flex-1 w-full flex items-center justify-center overflow-auto">
              {vegaSpec ? (
                <VegaChart spec={vegaSpec} renderer={renderer} />
              ) : (
                <div className="text-center text-zinc-500">
                  <p>Erro ao gerar especificação do gráfico</p>
                  <p className="text-xs mt-2">Verifique o console para mais detalhes</p>
                </div>
              )}
            </div>
          </div>

          {/* Code Panel */}
          <div className="w-96 bg-zinc-900 rounded-xl shadow-lg p-5 flex flex-col overflow-hidden">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
                Vega-Lite Spec
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <pre className="text-zinc-300 font-mono text-[11px] leading-relaxed">
                {exportSpecToJSON(vegaSpec)}
              </pre>
            </ScrollArea>
          </div>
        </div>
      </main>

      {/* Sidebar Right */}
      {sidebarPosition === "right" && <Sidebar />}
    </div>
  )
}
