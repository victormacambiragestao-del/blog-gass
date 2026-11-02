const url = import.meta.env.PUBLIC_SUPABASE_URL;
const chave = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const leadsAtivos = Boolean(url && chave);

export interface Lead {
  tipo: 'diagnostico' | 'newsletter';
  consentimento: boolean;
  nome?: string;
  empresa?: string;
  whatsapp?: string;
  email?: string;
  segmento?: string;
  faturamento?: string;
  desafio?: string;
  material?: string;
  origem?: string;
}

export async function salvarLead(lead: Lead) {
  if (!leadsAtivos) return false;
  try {
    const resposta = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: chave,
        Authorization: `Bearer ${chave}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(lead),
    });
    return resposta.ok;
  } catch {
    return false;
  }
}
