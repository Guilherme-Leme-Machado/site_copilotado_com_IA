# O Colaborador Invisível

> **O impacto da IA e da comunicação fluida na saúde mental da Geração Z em equipes híbridas.**

Projeto acadêmico desenvolvido com foco no **uso crítico e auditável de Inteligência Artificial** no desenvolvimento web. O site apresenta um recorte sobre o **futuro do trabalho** e as **dimensões socioemocionais e psicológicas da geração atual**, combinando um artigo científico-divulgativo com três microaplicações interativas.

---

## 1. Visão Geral e Preview

| Item | Informação |
|---|---|
| **Título** | O Colaborador Invisível: O Impacto da IA e da Comunicação Fluida na Saúde Mental da Geração Z |
| **Deploy (GitHub Pages)** | 🔗 `https://guilherme-leme-machado.github.io/site_copilotado_com_IA/` |
| **Repositório** | https://github.com/Guilherme-Leme-Machado/site_copilotado_com_IA |
| **Natureza** | Atividade de faculdade, desenvolvida em dupla com apoio de IA e auditoria crítica |

### Proposta

A transformação digital integrou a IA generativa e a mensageria instantânea (Slack, Teams, WhatsApp) ao centro da rotina corporativa. O projeto investiga o conceito de **"Colaborador Invisível"**: a IA atuando como agente social com quem o trabalhador troca interações constantes, que substituem gradualmente o contato humano direto.

O site discute como isso se conecta a solidão, sobrecarga cognitiva, burnout e retenção de jovens talentos, com base em dados de Gallup, Deloitte, Cigna e estudos acadêmicos. Depois da leitura, o usuário pode **testar a própria realidade** em três ferramentas:

| Página | Ferramenta | O que faz |
|---|---|---|
| `index.html` | **Artigo + 4 gráficos** | Contextualização teórica, dados por geração, Q&A em accordion |
| `simulador_cognitivo.html` | **Simulador de Sobrecarga Cognitiva** | Calcula um índice de fadiga mental (0–100%) a partir de jornada, pausas, uso de IA e fatores de estresse |
| `gerador_de_desconexao.html` | **Gerador de Protocolo de Desconexão** | Monta um plano personalizado de limites digitais com índice de compromisso e exportação em PDF |
| `teste_autopercepcao.html` | **Teste de Autopercepção Socioemocional** | Questionário de 4 itens (escala 1–5) com perfil e feedback imediatos |

### Principais funcionalidades

- Navegação responsiva entre as quatro páginas (Bootstrap *navbar* com *collapse*).
- Quatro gráficos interativos com Chart.js (2 de linha e 2 de pizza).
- Cálculo e feedback em tempo real, sem backend.
- Exportação para PDF via `window.print()` com folha de estilo de impressão dedicada (`@media print`).
- Sumário lateral fixo (*sticky*) e *accordion* de perguntas e respostas na página principal.

---

## 2. Estrutura de Arquivos e Diretórios

```
site_copilotado_com_IA/
├── index.html                      # Artigo principal + gráficos
├── gerador_de_desconexao.html      # Microaplicação 1: Protocolo de Desconexão
├── simulador_cognitivo.html        # Microaplicação 2: Sobrecarga Cognitiva
├── teste_autopercepcao.html        # Microaplicação 3: Autopercepção Socioemocional
├── css/
│   └── styles.css                  # Design tokens, componentes e regras de impressão
├── js/
│   ├── index_chart.js              # Configuração dos 4 gráficos Chart.js
│   ├── gerador_script.js           # Lógica do Gerador de Desconexão
│   ├── simulador_script.js         # Lógica do Simulador Cognitivo
│   └── percepcao_script.js         # Lógica do Teste de Autopercepção
├── AUDITORIA_IA.md                 # Registro de engenharia de prompt e auditoria crítica
└── README.md                       # Este documento
```

---

## 3. Arquitetura de Software e Contratos de Dados

### 3.1 Visão geral

Aplicação **100% client-side** (HTML + CSS + JavaScript puro), sem build nem backend. Cada página é independente e carrega apenas o script de que precisa. Todos os scripts seguem o mesmo padrão:

```
DOMContentLoaded → seleção de elementos → listeners → função de cálculo/render → render inicial
```

### 3.2 Componentes da interface

| Componente | Páginas | Descrição |
|---|---|---|
| **Navbar** | todas | Menu responsivo com item ativo (`.nav-link.active`) |
| **Card de formulário** | 3 ferramentas | Entrada de dados (`.card-hover-effect`, oculto na impressão via `.d-print-none`) |
| **Card de resultado** | 3 ferramentas | Painel com barra de progresso, *badge*, lista e alerta de status |
| **Barra de progresso** | 3 ferramentas | `role="progressbar"` com transição suave (`.transition-progress`) |
| **Canvas de gráfico** | `index.html` | 4 elementos `<canvas>` alimentados pelo Chart.js |
| **Accordion** | `index.html` | Perguntas e Respostas (Bootstrap *collapse*) |

### 3.3 Contratos de dados: datasets dos gráficos (`index_chart.js`)

Todos os gráficos seguem o contrato do Chart.js:

```ts
interface ChartDataset {
  label?: string;
  data: number[];            // valores percentuais (0–100)
  borderColor?: string | string[];
  backgroundColor?: string | string[];
  tension?: number;          // apenas gráficos de linha
  fill?: boolean;
  pointRadius?: number;
  pointStyle?: string;
}
```

| ID do canvas | Tipo | Labels | Dados |
|---|---|---|---|
| `chartSolidaoLinhas` | `line` | Gen Z, Millennials, Gen X, Baby Boomers | **Solidão ontem (%)**: `[27, 21, 15, 10]` · **Preferência totalmente remoto (%)**: `[23, 35, 35, 35]` |
| `chartPreferencaGenZ` | `pie` | Híbrido, Totalmente Remoto, Presencial | `[71, 23, 6]` |
| `chartSaudeMentalLinhas` | `line` | Uso diário de IA, Burnout ativo, Fadiga digital, Intenção de saída (2 anos), Meta alta liderança | **Gen Z**: `[74, 47, 58, 31, 6]` · **Millennials**: `[74, 45, 54, 25, 6]` |
| `chartBurnoutPie` | `pie` | Burnout ativo, Fadiga/Estresse, Sem burnout ativo | `[47, 11, 42]` |

### 3.4 Contratos de dados: objetos de estado das microaplicações

**Simulador Cognitivo** (`simulador_script.js`)

```jsonc
// Entrada (lida do formulário)
{
  "nome": "string",
  "horas": 4,                       // inteiro 4–14 (slider)
  "pausas": "alta | media | rara",
  "ia": "equilibrado | excessivo | nenhum",
  "fatoresAtivos": 0                // contagem de checkboxes .check-fator marcados (0–4)
}

// Saída (renderizada no card)
{
  "pontuacao": 5,                   // inteiro, limitado a [5, 100]
  "nivel": "Baixa Sobrecarga | Atenção Moderada | Alto Risco",
  "recomendacoes": ["string (HTML)"]
}
```

Regras de pontuação:

| Fator | Regra |
|---|---|
| Jornada | `horas > 8` → `+ (horas − 8) × 10` · `horas < 7` → `−5` |
| Pausas | `rara +25` · `media +10` · `alta −10` |
| Uso de IA | `excessivo +20` · `nenhum +10` · `equilibrado −10` |
| Fatores de estresse | `+12` por checkbox marcado |
| Normalização | `clamp(round(soma + 20), 5, 100)` |
| Faixas | `< 40` Baixa · `< 70` Moderada · `≥ 70` Alto Risco |

**Gerador de Desconexão** (`gerador_script.js`)

```jsonc
{
  "nome": "string",                 // fallback: "Profissional Desconectado"
  "horarioCorte": "18:00",          // HH:mm
  "diasSemana": "Segunda a Sexta | Dias Úteis + Finais de Semana | Apenas Dias Úteis",
  "metaTelas": 3,                   // inteiro 1–8 (horas offline por dia)
  "acoes": ["string"]               // value dos checkboxes .check-acao marcados (6 opções)
}
```

Índice de compromisso:

```
porcentagem = min( round( (acoesSelecionadas / 6) × 75 + (metaTelas / 8) × 25 ), 100 )
```

Faixas: `< 40` moderado · `< 75` bom equilíbrio · `≥ 75` excelente.

**Teste de Autopercepção** (`percepcao_script.js`)

```jsonc
{
  "nome": "string",                 // fallback: "Participante"
  "respostas": [1, 5, 3, 2],        // 4 itens, valores 1–5 já normalizados
  "score": 11,                      // soma (4–20)
  "percentual": 55,                 // round(score / 20 × 100)
  "perfil": "Altamente Equilibrado | Moderação / Atenção | Alta Vulnerabilidade"
}
```

- Faixas: `≥ 16` Altamente Equilibrado · `10–15` Moderação/Atenção · `< 10` Alta Vulnerabilidade.
- O botão de cálculo só é habilitado quando as 4 perguntas estão respondidas.

---

## 4. Declaração de Dependências e CDN

| Biblioteca | Versão | Origem | Uso |
|---|---|---|---|
| **Bootstrap CSS** | 5.3.8 | jsDelivr | Grid, componentes, utilitários e tema |
| **Bootstrap JS (bundle)** | 5.3.8 | jsDelivr | Navbar *collapse* e accordion (inclui Popper) |
| **Chart.js** | última 4.x (`@latest`) | jsDelivr | Gráficos da página principal |
| **Inter** (Google Fonts) | 400–700 | Google Fonts | Tipografia base |

### Justificativa técnica de compatibilidade cross-browser

- **Bootstrap 5.3.8** dispensa jQuery, suporta os navegadores *evergreen* (Chrome, Edge, Firefox, Safari) e entrega *reboot* consistente entre eles. Os arquivos são carregados com **SRI** (`integrity`) e `crossorigin="anonymous"`, o que garante integridade do recurso vindo de CDN.
- **Chart.js** renderiza em `<canvas>` (suporte universal) e é responsivo por padrão (`responsive: true`).
- **jsDelivr** serve os arquivos com HTTP/2, cache global e alta disponibilidade, sem exigir instalação local.
- **Fonte Inter** com *fallback* para `system-ui, -apple-system, sans-serif`, evitando quebra de layout se a fonte não carregar.
- **CSS** usa variáveis nativas (`:root`), `cubic-bezier` e `@media print`, todos suportados pelos navegadores modernos.


---

## 5. Matriz de Rastreabilidade e Colaboração

### 5.1 Divisão de tarefas da dupla

| Entrega | Responsável | Arquivos | Commits / PRs |
|---|---|---|---|
| Pesquisa e redação do artigo | **Guilherme Leme** | `index.html` | `#hash` |
| Gráficos Chart.js | **Guilherme Leme** | `js/index_chart.js` | `#hash` |
| Simulador Cognitivo | **Paulo Gutemberg** | `simulador_cognitivo.html`, `js/simulador_script.js` | `#hash` |
| Gerador de Desconexão | **Paulo Gutemberg** | `gerador_de_desconexao.html`, `js/gerador_script.js` | `#hash` |
| Teste de Autopercepção | **Paulo Gutemberg** | `teste_autopercepcao.html`, `js/percepcao_script.js` | `#hash` |
| Estilização global e impressão | **Guilherme Leme** | `css/styles.css` | `#hash` |
| Auditoria de IA | **Dupla** | `AUDITORIA_IA.md` | `#hash` |
| Documentação e deploy | **Dupla** | `README.md`, GitHub Pages | `#hash` |

### 5.2 Uso de IA e auditoria

O projeto foi **copilotado por IA** e submetido a **auditoria crítica manual**. O processo completo está em [`AUDITORIA_IA.md`](./AUDITORIA_IA.md), organizado em:

1. **Engenharia de Prompt**: ferramenta, prompt completo e restrições técnicas.
2. **Resposta bruta da IA**: código inicial gerado.
3. **Auditoria crítica**: falhas, débitos técnicos, acessibilidade (ARIA) e métodos obsoletos identificados.
4. **Refatoração manual**: código final e justificativa técnica.

### 5.3 Referências bibliográficas

Dados e conceitos apresentados no artigo foram extraídos de:

- **Gallup** (2025/2026): solidão no trabalho e preferência por modelo de trabalho.
- **CoworkingCafe** (2026): preferências de trabalho remoto e híbrido por geração.
- **Tang et al. (2023)**. *Journal of Applied Psychology*: interação com IA, solidão, insônia e consumo de álcool.
- **Ashfaq et al.**: mensageria instantânea e descolamento psicológico.
- **Deloitte** (2025/2026): burnout, retenção e ambições de liderança da Gen Z e dos Millennials.
- **Cigna** (2024/2026) e **BetterUp**: indicadores de saúde mental e fadiga.
- Referenciais teóricos: *Job Demands-Resources Model*, *Teoria Evolutiva da Solidão* e *Modelo de Afiliação Social*.

---

## Como executar localmente

```bash
git clone https://github.com/Guilherme-Leme-Machado/site_copilotado_com_IA.git
cd site_copilotado_com_IA
# Abra index.html no navegador.
```

## Limitações conhecidas

- O **Teste de Autopercepção** e o **Simulador** são ferramentas **educativas**, não instrumentos clínicos nem diagnósticos validados. Em caso de sofrimento psíquico, procure um profissional de saúde.
- Os resultados não são salvos: ao recarregar a página, os dados são perdidos.

---

© 2026 · Projeto acadêmico · Guilherme Leme e Paulo Gutemberg