## Tracking & Events

Este documento consolida a camada de tracking do site MOTIN, eventos canônicos atuais, aliases legados, processo de consentimento e plano de migração para limpeza do container GTM.

### Objetivos
1. Garantir confiabilidade (principalmente conversão Whatsapp via popup RD Station)
2. Manter compatibilidade com container GTM legado durante transição
3. Fornecer caminho seguro para desligar eventos antigos sem perder métricas

---
## 1. Consentimento
Chave localStorage: `cookie-consent` (`accepted` habilita envio para GA4 / Ads). 
Eventos ainda podem ser empurrados no `dataLayer`, mas o `gtag('event', ...)` só roda com consentimento.

Exceções sempre permitidas: `consent_update`, `diagnostic`.

---
## 2. Identificadores de Ads
Parâmetros capturados automaticamente em cada page load (quando presentes na URL): `gclid`, `wbraid`, `gbraid`.
Armazenados em `localStorage` (`ads-click-ids`) e anexados a cada evento.

---
## 3. API de Tracking (`lib/tracking.ts`)
Funções:
- `track(event, params)` -> evento canônico
- `trackWithAliases(event, aliases, params)` -> evento + aliases (se legado não estiver desabilitado)
- `captureAdsClickIds()`, `getAdsClickIds()`

Flag de build: `NEXT_PUBLIC_DISABLE_LEGACY_TRACKING=true` desliga aliases (fase final de migração).

---
## 4. Eventos Canônicos & Aliases

| Evento Canônico | Aliases Legados Empurrados* | Motivo / Uso | Parâmetros Principais |
|-----------------|-----------------------------|--------------|------------------------|
| `complete_whatsapp` | `Complete WhatsApp`, `completewhatsapp`, `sendEvent` (com `eventGA4: complete_whatsapp`) | Conversão popup RD (WhatsApp final) | `source`, `detection.mode`, ADS ids |
| (outros eventos de formulário) | podem ter mapeamentos semelhantes quando usados com `trackWithAliases` | Compatibilidade com triggers existentes | específicos do formulário |

*Aliases são omitidos quando `NEXT_PUBLIC_DISABLE_LEGACY_TRACKING=true`.

Estrutura `sendEvent` (legado):
```
{
  event: 'sendEvent',
  category: 'contato',
  eventGA4: 'complete_whatsapp',
  content_type: 'whatsapp',
  ...
}
```

---
## 5. Listener de Conversão RD (`components/rd-popup-conversion-listener.tsx`)
Detecção híbrida:
1. Heurística DOM (palavras-chave multi-idioma)
2. Observação de mutações (MutationObserver)
3. Interceptação de `fetch` e `XMLHttpRequest` para POSTs ao domínio RD (network-level success)
4. Scans escalonados (até 12s) para elementos tardios

Idempotente: dispara apenas uma vez. Metadado `detection.mode` indica o mecanismo que confirmou a conversão.

---
## 6. Fluxo Interno de um Evento
1. Código chama `track` ou listener dispara push manual.
2. `dataLayer` recebe objeto `{ event, ...params, gclid?, wbraid?, gbraid?, timestamp }`.
3. Se consentido: `gtag('event', event, params)` (sem `timestamp`).
4. GTM: triggers de Custom Event capturam nomes (canônico + legados se habilitados) e disparam tags (GA4, Ads, Meta etc.).

---
## 7. Migração (Faseada) para Remoção de Legado
Fase 0 (atual): Empurramos canônico + legados. Garantir que dashboards estejam populando `complete_whatsapp`.

Fase 1:
1. Criar Trigger GTM Custom Event `complete_whatsapp` (se ainda não existir).
2. Duplicar tags GA4/Ads que hoje dependem de `completewhatsapp` ou `sendEvent` e apontar para trigger novo.
3. Publicar container em Workspace de teste.
4. Validar em Preview: ambos (legado + novo) disparam simultaneamente.

Fase 2:
1. Ajustar relatórios / LookerStudio / GA4 Explorations para usar o evento canônico.
2. Monitorar paridade (mínimo 3–7 dias volume estável) entre métricas agregadas do legado e do canônico.

Fase 3:
1. Ativar build com `NEXT_PUBLIC_DISABLE_LEGACY_TRACKING=true` (aliases param param param). 
2. Publicar release e acompanhar se o Trigger novo continua alimentando métricas.

Fase 4:
1. Remover triggers e tags que escutavam apenas `completewhatsapp` ou `sendEvent` (se redundantes).
2. Limpar HTML tags personalizadas desnecessárias.
3. Documentar data da remoção em CHANGELOG interno.

Rollback: basta reverter build sem flag ou remover a env var do deploy para reativar aliases.

---
## 8. QA Checklist (por release que mexe em tracking)
- [ ] Preview GTM mostra `complete_whatsapp` ao enviar popup
- [ ] Não há duplicidade de conversão GA4 (ver DebugView)
- [ ] Ads conversions continuam registrando (aguardar janela normal de processamento > 3h)
- [ ] `debug:tracking` habilitado local mostra payload esperado
- [ ] Consentimento rejeitado impede gtag (ver DevTools Network > collect)

---
## 9. Variáveis de Ambiente
| Variável | Efeito |
|---------|--------|
| `NEXT_PUBLIC_DISABLE_LEGACY_TRACKING` | `true` desliga aliases (fase final). |
| (opcional) `NEXT_PUBLIC_TRACKING_DEBUG` | poderia ser usada futuramente para forçar logs (atualmente usamos `localStorage.setItem('debug:tracking','1')`). |

---
## 10. Extensões Futuras
- Adicionar verificação de spam / campos honeypot antes de eventos de formulário.
- Normalizar naming GA4 para padrão recommended (`generate_lead`, etc.) via mapping interno.
- Incorporar consent mode avançado (ad_storage / analytics_storage granular).

---
## 11. Referências Rápidas
- Arquivo principal: `lib/tracking.ts`
- Listener RD: `components/rd-popup-conversion-listener.tsx`
- Flag de migração: `NEXT_PUBLIC_DISABLE_LEGACY_TRACKING`

---
Atualizado em: 2025-09-19
