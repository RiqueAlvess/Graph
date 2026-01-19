"use client"

import { useEffect, useRef, useState, useDeferredValue } from 'react';
import vegaEmbed from 'vega-embed';

/**
 * Componente otimizado para renderizar gráficos Vega-Lite
 * Usa useDeferredValue para melhor performance com atualizações frequentes
 * Suporta renderização via Canvas (mais performático) ou SVG
 */
export function VegaChart({ spec, renderer = "canvas" }) {
  const containerRef = useRef(null);
  const [view, setView] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Defer das atualizações do spec para evitar re-renders excessivos
  const deferredSpec = useDeferredValue(spec);

  useEffect(() => {
    // Verifica se o container e a spec existem
    if (!containerRef.current || !deferredSpec) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Ajuste fino para garantir que o gráfico preencha o container
    const finalSpec = {
      ...deferredSpec,
      // Garante responsividade se width for "container"
      width: deferredSpec.width === "container" ? "container" : deferredSpec.width || 400,
      height: deferredSpec.height || 300,
      autosize: deferredSpec.autosize || {
        type: "fit",
        contains: "padding"
      },
    };

    // Configurações de embed
    const embedOptions = {
      mode: "vega-lite",
      actions: false, // Remove controles padrão
      renderer: renderer, // Canvas é mais performático, SVG tem melhor qualidade
      hover: true, // Habilita hover
      tooltip: true, // Habilita tooltips
    };

    // Limpa visualização anterior se existir
    if (view) {
      try {
        view.finalize();
      } catch (e) {
        console.warn("Erro ao limpar visualização anterior:", e);
      }
    }

    // Renderiza novo gráfico
    vegaEmbed(containerRef.current, finalSpec, embedOptions)
      .then((result) => {
        setView(result.view);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("Erro ao renderizar Vega:", err);
        setError(err.message);
        setIsLoading(false);
      });

    // Cleanup
    return () => {
      if (view) {
        try {
          view.finalize();
        } catch (e) {
          // Ignora erros no cleanup
        }
      }
    };
  }, [deferredSpec, renderer]);

  // Loading state
  if (isLoading && !view) {
    return (
      <div className="w-full h-full min-h-[300px] bg-white rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mb-2"></div>
          <p className="text-sm text-zinc-500">Renderizando gráfico...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-full min-h-[300px] bg-red-50 rounded-lg flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-red-900 mb-1">Erro ao renderizar gráfico</p>
          <p className="text-xs text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] bg-white rounded-lg overflow-hidden"
      style={{
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.2s ease-in-out'
      }}
    />
  );
}

/**
 * Hook para exportar o gráfico atual
 */
export function useVegaExport(view) {
  const exportToPNG = async () => {
    if (!view) return null;
    try {
      const url = await view.toImageURL('png', 2); // 2x scale para alta qualidade
      return url;
    } catch (e) {
      console.error("Erro ao exportar PNG:", e);
      return null;
    }
  };

  const exportToSVG = async () => {
    if (!view) return null;
    try {
      const url = await view.toImageURL('svg');
      return url;
    } catch (e) {
      console.error("Erro ao exportar SVG:", e);
      return null;
    }
  };

  const downloadImage = async (format = 'png', filename = 'chart') => {
    const exportFunc = format === 'svg' ? exportToSVG : exportToPNG;
    const url = await exportFunc();

    if (url) {
      const link = document.createElement('a');
      link.download = `${filename}.${format}`;
      link.href = url;
      link.click();
    }
  };

  return {
    exportToPNG,
    exportToSVG,
    downloadImage
  };
}
