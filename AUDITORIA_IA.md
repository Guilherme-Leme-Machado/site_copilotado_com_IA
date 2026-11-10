# Relatório de Auditoria de Inteligência Artificial e Refatoração Técnica

### 1. Engenharia de Prompt (Entrada)

* **Ferramenta utilizada:** Google Gemini 3 Flash (Web)

* **Contexto e Prompts Completo Submetidos:**

> **Prompt 1 (Gerador de Protocolo de Desconexão):**
>
> *"gere um codigo html dentro do main desse arquivo usando responsividade com o bootstrap ja linkado, utilize tambem o javascript para uma pagina mais animada e interativa. todo script do javascript deve estar em um arquivo separado, segue agora o tema. Gerador de Protocolo de Desconexão: Ferramenta interativa onde o profissional configura suas metas de limites digitais e exporta/imprime seu plano de bem-estar."*

> **Prompt 2 (Refatoração & Exportação Limitada em PDF):**
>
> *"realize melhorias esta pagina pois esta sem funcionabilidade na opção de Atualize Protocolo, coloque tambem mais animações funcionais e preencha com mais funções de descoxão, quero tbm que só de monstre da exportação do PDF as informações visiveis do Plano de-Bem estar"*

> **Prompt 3 (Simulador de Sobrecarga Cognitiva):**
>
> *"seguindo esta mesma estrutura da pagina Aplique esse tema: Simulador/Calculadora de Sobrecarga Cognitiva e Equilíbrio Laboral: O usuário preenche hábitos de trabalho remoto, pausas e uso de IA, recebendo um diagnóstico pontuado com recomendações personalizadas"*

> **Prompt 4 (Teste de Autopercepção Socioemocional):**
>
> *"continuando sobre a mesma pagina e estrutura, plicque esses temas: Teste de Autopercepção Socioemocional: Questionário interativo baseado em escalas psicológicas validadas (com barra de progresso visual, cálculo dinâmico de score e feedback descritivo imediato)"*

> **Prompt 5 (Design System, Dark/Light Mode e Modais Dinâmicos):**
>
> *"Sistema de alternância de tema Claro/Escuro (Dark/Light Mode) com manipulação de classes no DOM e persistência no navegador via localStorage. Animações CSS com @keyframes e efeitos visuais modernos (ex.: Glassmorphism com backdrop-filter, cards com efeito de profundidade, modais dinâmicos disparados por eventos contextuais). Gere agora para mim seguindo os detalhes acima, aplicando nas 4 paginas e separando os codigos css e javascript em arquivos"*

---

### 2. Resposta Bruta da IA (Código Inicial Gerado)

Abaixo estão trechos representativos do código gerado inicialmente pelo modelo antes da intervenção e auditoria da dupla:

#### Trecho JS Bruto com Chamada de Modal Indevida (`js/gerador_script.js` - Inicial):

```javascript
// Função principal para atualizar o preview do plano com animações
function atualizarPlano() {
    // 1. Dados básicos
    const nome = inputNome.value.trim() !== '' ? inputNome.value : 'Profissional Desconectado';
    previewNome.textContent = nome;

    // ... cálculo de porcentagem e atualização de interface ...

    // FALHA: Injeção automática do modal dentro da função de renderização geral
    const modalSucesso = new bootstrap.Modal(document.getElementById('modalSucesso'));
    modalSucesso.show();
}

// Renderização inicial automática ao carregar a página
atualizarPlano();
```

#### Trecho CSS Bruto Sem Suporte a Conflitos no Dark Mode (`css/styles.css` - Inicial):

```css
[data-theme="dark"] {
    --primary-color: #60a5fa;
    --surface-bg: rgba(30, 41, 59, 0.75);
    --text-main: #f8fafc;
}

/* Faltava sobrescrever classes utilitárias rígidas do Bootstrap como .text-dark, .bg-light e .alert-info */
```

---

### 3. Auditoria Crítica da Dupla (Diagnóstico Técnico de Falhas)

Durante o processo de testes e revisão do código gerado pela IA, a dupla identificou os seguintes débitos técnicos e alucinações de escopo:

1. **Invocação de Modais Dinâmicos em Escopo Incorreto (Loop de Abertura do Modal):**
   * **Diagnóstico:** A IA posicionou a instanciação e abertura do `bootstrap.Modal` (`modalSucesso.show()`) diretamente dentro da função genérica de recálculo/renderização (`atualizarPlano()`).
   * **Impacto:** Como essa função é chamada no evento `DOMContentLoaded` e a cada `input` em sliders/checkboxes, o modal dinâmico abria automaticamente na cara do usuário ao carregar a página ou ao alterar qualquer opção, inviabilizando a navegação.

2. **Conflito de Contraste e Classes Nativas no Dark Mode (Texto Invisível / Preto):**
   * **Diagnóstico:** O seletor `:root` / `[data-theme="dark"]` foi criado corretamente, porém a IA omitiu a sobrescrita das classes nativas do Bootstrap como `.text-dark`, `.bg-light`, `.alert-info` e labels de formulários.
   * **Impacto:** O fundo das cartas ficava escuro enquanto o texto permanecia com a cor preta padrão (`#000`), tornando os títulos, labels e feedbacks ilegíveis no modo escuro.

3. **Inexistência de Trava de Submissão no Teste Socioemocional:**
   * **Diagnóstico:** O botão de calcular permitia o acionamento via clique antes que todos os itens fossem preenchidos.
   * **Impacto:** Resultados parciais incorretos e inconsistência na exibição de relatórios.

4. **Regras de Exportação em PDF Parciais (`@media print`):**
   * **Diagnóstico:** O código inicial incluía o comando `window.print()`, mas sem ocultar a navbar, footers e formulários secundários durante a impressão nas páginas de *Cognição* e *Percepção*.

---

### 4. Refatoração Manual e Intervenção da Dupla

Para solucionar as falhas diagnosticadas, a dupla reestruturou a lógica de eventos JavaScript e estendeu a folha de estilos CSS.

#### A. Correção do Escopo de Disparo dos Modais Dinâmicos (`js/gerador_script.js`, `js/simulador_script.js`, `js/percepcao_script.js`)

O disparo do modal foi removido das funções de renderização contínua e isolado exclusivamente nos manipuladores do evento `click` dos botões de submissão:

```javascript
// Refatoração manual: O modal é acionado APENAS no clique deliberado do usuário
btnGerar.addEventListener('click', (e) => {
    e.preventDefault();
    atualizarPlano();

    // Disparo dinâmico condicional do modal dinâmico
    const modalEl = document.getElementById('modalSucesso');
    if (modalEl) {
        const modalSucesso = new bootstrap.Modal(modalEl);
        modalSucesso.show();
    }

    // Feedback visual temporário no botão
    btnGerar.classList.add('btn-success');
    btnGerar.classList.remove('btn-primary');
    btnGerar.textContent = '✔ Protocolo Atualizado!';
    setTimeout(() => {
        btnGerar.classList.remove('btn-success');
        btnGerar.classList.add('btn-primary');
        btnGerar.textContent = '🔄 Atualizar Protocolo';
    }, 1200);
});
```

#### B. Sobrescrita de Classes Nativas do Bootstrap para Dark Mode (`css/styles.css`)

Inclusão de seletores de especificidade para neutralizar classes utilitárias do Bootstrap no tema escuro:

```css
/* Sobrescrita manual para garabtir visibilidade no Tema Escuro */
[data-theme="dark"] .text-dark,
[data-theme="dark"] h1, [data-theme="dark"] h2, [data-theme="dark"] h3,
[data-theme="dark"] h4, [data-theme="dark"] h5, [data-theme="dark"] h6,
[data-theme="dark"] label, [data-theme="dark"] .form-label,
[data-theme="dark"] #previewNome, [data-theme="dark"] #previewNomeUser {
    color: #f8fafc !important;
}

[data-theme="dark"] .bg-light,
[data-theme="dark"] #conteudoProtocolo,
[data-theme="dark"] #conteudoDiagnostico,
[data-theme="dark"] #conteudoRelatorio {
    background-color: rgba(15, 23, 42, 0.6) !important;
    border-color: #334155 !important;
    color: #f8fafc !important;
}
```

#### C. Isolamento de Impressão PDF Global (`@media print`)

Ajuste unificado no CSS para garantir exportação limpa em todas as 4 páginas:

```css
@media print {
    body * { visibility: hidden; }
    #cardDiagnostico, #cardDiagnostico *,
    #cardPlano, #cardPlano *,
    #cardResultado, #cardResultado * {
        visibility: visible;
    }
    #cardDiagnostico, #cardPlano, #cardResultado {
        position: absolute; left: 0; top: 0; width: 100%;
        border: none !important; box-shadow: none !important;
        background: #fff !important; color: #000 !important;
    }
    .d-print-none { display: none !important; }
}
```

#### D. Justificativa Técnica e Aprendizados:

* **Gerenciamento de Estado de Eventos no DOM:** A IA tende a agrupar lógica de atualização de interface com gatilhos de efeitos colaterais (como alertas e modais). Separar a função pura de cálculo/atualização da função de manipulação de evento (`eventListener`) foi crucial para o correto funcionamento da aplicação.
* **Sobrescrita de Frameworks CSS:** O uso de variáveis CSS em `:root` não invalida automaticamente regras utilitárias diretas de bibliotecas como o Bootstrap (ex.: `.text-dark`). É necessário criar regras explícitas para garantir a legibilidade em Dark Mode.
* **Persistência de Tema:** A implementação do script `js/theme_toggle.js` unificou a preferência do usuário via `localStorage`, aplicando a classe no elemento raiz (`<html data-theme="...">`) antes da renderização do body.