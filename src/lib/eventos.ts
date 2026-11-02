declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    plausible?: (evento: string, opcoes?: { props: Record<string, string> }) => void;
  }
}

// Envia o evento para a ferramenta de medição que estiver instalada (GA4 ou Plausible).
export function registrarEvento(evento: string, dados: Record<string, string> = {}) {
  const completos = { pagina: location.pathname, ...dados };
  window.dataLayer?.push({ event: evento, ...completos });
  window.plausible?.(evento, { props: completos });
  if (import.meta.env.DEV) console.info('[evento]', evento, completos);
}
