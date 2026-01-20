"use client"

import { useEffect, useRef, useState } from 'react';
import vegaEmbed from 'vega-embed';

export function VegaChart({ spec, renderer = "canvas" }) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !spec) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const renderChart = async () => {
      try {
        // Limpa visualização anterior
        if (viewRef.current) {
          viewRef.current.finalize();
          viewRef.current = null;
        }

        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Pequeno delay para garantir que o DOM está limpo
        await new Promise(resolve => setTimeout(resolve, 50));

        if (!isMounted || !containerRef.current) return;

        console.log("Renderizando spec:", spec);

        // Configurações de embed
        const embedOptions = {
          mode: "vega-lite",
          actions: false,
          renderer: renderer,
          hover: true,
          tooltip: true,
        };

        // Renderiza o gráfico
        const result = await vegaEmbed(containerRef.current, spec, embedOptions);

        if (isMounted) {
          viewRef.current = result.view;
          setIsLoading(false);
          setError(null);
          console.log("Gráfico renderizado com sucesso");
        } else {
          result.view.finalize();
        }
      } catch (err) {
        console.error("Erro ao renderizar Vega:", err);
        if (isMounted) {
          setError(err.message || "Erro desconhecido");
          setIsLoading(false);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
      if (viewRef.current) {
        try {
          viewRef.current.finalize();
          viewRef.current = null;
        } catch (e) {
          console.warn("Erro no cleanup:", e);
        }
      }
    };
  }, [spec, renderer]);

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[300px] bg-white rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 mb-2"></div>
          <p className="text-sm text-zinc-500">Renderizando gráfico...</p>
        </div>
      </div>
    );
  }

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
      className="w-full h-full min-h-[300px]"
      style={{
        position: 'relative',
        minHeight: '400px'
      }}
    />
  );
}
