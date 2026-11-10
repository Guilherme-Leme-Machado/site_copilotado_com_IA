document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos do DOM
    const inputNome = document.getElementById('nomeProfissional');
    const inputHorario = document.getElementById('horarioCorte');
    const selectDias = document.getElementById('diasSemana');
    const inputMetaTelas = document.getElementById('metaTelas');
    const valorMetaTelas = document.getElementById('valorMetaTelas');
    const checkboxesAcoes = document.querySelectorAll('.check-acao');
    const btnGerar = document.getElementById('btnGerar');
    const btnImprimir = document.getElementById('btnImprimir');

    const previewNome = document.getElementById('previewNome');
    const previewHorario = document.getElementById('previewHorario');
    const previewDias = document.getElementById('previewDias');
    const previewListaAcoes = document.getElementById('previewListaAcoes');
    const barraProgresso = document.getElementById('barraProgresso');
    const textoPorcentagem = document.getElementById('textoPorcentagem');
    const cardPlano = document.getElementById('cardPlano');
    const statusMensagem = document.getElementById('statusMensagem');

    // Atualiza o contador de horas do slider visualmente em tempo real
    inputMetaTelas.addEventListener('input', (e) => {
        valorMetaTelas.textContent = e.target.value;
    });

    // Função principal para atualizar o preview do plano com animações
    function atualizarPlano() {
        // 1. Dados básicos
        const nome = inputNome.value.trim() !== '' ? inputNome.value : 'Profissional Desconectado';
        previewNome.textContent = nome;
        previewHorario.textContent = inputHorario.value || '18:00';
        previewDias.textContent = selectDias.value;

        // 2. Preencher lista de ações selecionadas
        previewListaAcoes.innerHTML = '';
        let totalAcoes = checkboxesAcoes.length;
        let acoesSelecionadas = 0;

        checkboxesAcoes.forEach(checkbox => {
            if (checkbox.checked) {
                acoesSelecionadas++;
                const li = document.createElement('li');
                li.className = 'list-group-item bg-transparent px-0 py-1 text-secondary small d-flex align-items-center';
                li.innerHTML = `<span class="text-success me-2 fw-bold">✓</span> ${checkbox.value}`;
                previewListaAcoes.appendChild(li);
            }
        });

        // Adicionar meta de horas livres de telas
        const liMeta = document.createElement('li');
        liMeta.className = 'list-group-item bg-transparent px-0 py-1 text-primary small fw-bold d-flex align-items-center mt-1 border-top pt-2';
        liMeta.innerHTML = `<span class="me-2">🎯</span> Meta diária: ${inputMetaTelas.value}h offline`;
        previewListaAcoes.appendChild(liMeta);

        // 3. Cálculo de porcentagem de compromisso
        const pesoCheckboxes = (acoesSelecionadas / totalAcoes) * 75;
        const pesoSlider = (inputMetaTelas.value / 8) * 25;
        const porcentagem = Math.min(Math.round(pesoCheckboxes + pesoSlider), 100);

        // Atualizar barra de progresso com animação
        barraProgresso.style.width = `${porcentagem}%`;
        textoPorcentagem.textContent = `${porcentagem}%`;

        // Ajustes visuais dinâmicos conforme a pontuação de bem-estar
        if (porcentagem < 40) {
            barraProgresso.className = 'progress-bar transition-progress bg-warning';
            statusMensagem.className = 'alert alert-warning py-2 px-3 small mt-3 mb-0 text-center';
            statusMensagem.innerHTML = '⚠️ Nível moderado. Adicione mais hábitos para blindar sua rotina!';
        } else if (porcentagem < 75) {
            barraProgresso.className = 'progress-bar transition-progress bg-info';
            statusMensagem.className = 'alert alert-info py-2 px-3 small mt-3 mb-0 text-center';
            statusMensagem.innerHTML = '👍 Bom equilíbrio digital alcançado!';
        } else {
            barraProgresso.className = 'progress-bar transition-progress bg-success';
            statusMensagem.className = 'alert alert-success py-2 px-3 small mt-3 mb-0 text-center';
            statusMensagem.innerHTML = '🌟 Excelente! Protocolo altamente protetivo contra o burnout.';
        }

        // Efeito de destaque (flash) no card ao atualizar com sucesso
        cardPlano.classList.add('border-success', 'shadow-lg');
        setTimeout(() => {
            cardPlano.classList.remove('border-success', 'shadow-lg');
        }, 600);
    }

    // Vinculação total do botão "Atualizar Protocolo" e eventos interativos
    btnGerar.addEventListener('click', (e) => {
        e.preventDefault();
        atualizarPlano();

        // Disparar o Modal Dinâmico de Sucesso apenas aqui!
        const modalEl = document.getElementById('modalSucessoGerador');
        if (modalEl) {
            const modalSucesso = new bootstrap.Modal(modalEl);
            modalSucesso.show();
        }

        // Pequena animação extra de feedback no botão
        btnGerar.classList.add('btn-success');
        btnGerar.classList.remove('btn-primary');
        btnGerar.textContent = '✔ Protocolo Atualizado!';
        setTimeout(() => {
            btnGerar.classList.remove('btn-success');
            btnGerar.classList.add('btn-primary');
            btnGerar.textContent = '🔄 Atualizar Protocolo';
        }, 1200);
    });

    // Evento de impressão com isolamento visual do Plano de Bem-Estar
    btnImprimir.addEventListener('click', () => {
        atualizarPlano(); // Garante que está atualizado antes de imprimir
        window.print();
    });

    // Renderização inicial automática ao carregar a página (sem abrir modal)
    atualizarPlano();
});