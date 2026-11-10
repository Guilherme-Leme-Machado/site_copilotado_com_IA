document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos do formulário
    const inputNome = document.getElementById('nomeProfissional');
    const inputHorasTrabalho = document.getElementById('horasTrabalho');
    const valorHorasTrabalho = document.getElementById('valorHorasTrabalho');
    const selectPausas = document.getElementById('frequenciaPausas');
    const selectIA = document.getElementById('usoIA');
    const checkboxesFatores = document.querySelectorAll('.check-fator');
    const btnCalcular = document.getElementById('btnCalcular');
    const btnImprimir = document.getElementById('btnImprimir');

    // Seleção de elementos do painel de diagnóstico
    const previewNome = document.getElementById('previewNome');
    const previewJornada = document.getElementById('previewJornada');
    const previewIA = document.getElementById('previewIA');
    const barraSobrecarga = document.getElementById('barraSobrecarga');
    const textoPontuacao = document.getElementById('textoPontuacao');
    const badgeNivel = document.getElementById('badgeNivel');
    const listaRecomendacoes = document.getElementById('listaRecomendacoes');
    const statusDiagnostico = document.getElementById('statusDiagnostico');
    const cardDiagnostico = document.getElementById('cardDiagnostico');

    // Atualiza o indicador numérico do slider de horas
    inputHorasTrabalho.addEventListener('input', (e) => {
        valorHorasTrabalho.textContent = e.target.value;
    });

    // Função para calcular o índice de sobrecarga e gerar recomendações
    function calcularSobrecarga() {
        const horas = parseInt(inputHorasTrabalho.value, 10);
        const pausas = selectPausas.value;
        const ia = selectIA.value;

        let pontuacao = 0;

        // 1. Cálculo por Horas de Trabalho (Base: 8h)
        if (horas > 8) {
            pontuacao += (horas - 8) * 10;
        } else if (horas < 7) {
            pontuacao -= 5;
        }

        // 2. Fator de Pausas
        if (pausas === 'rara') pontuacao += 25;
        if (pausas === 'media') pontuacao += 10;
        if (pausas === 'alta') pontuacao -= 10;

        // 3. Fator de uso de IA
        if (ia === 'excessivo') pontuacao += 20;
        if (ia === 'nenhum') pontuacao += 10;
        if (ia === 'equilibrado') pontuacao -= 10;

        // 4. Fatores de Estresse Checkboxes
        let fatoresAtivos = 0;
        checkboxesFatores.forEach(check => {
            if (check.checked) {
                fatoresAtivos++;
                pontuacao += 12;
            }
        });

        // Garantir limites entre 0% e 100%
        pontuacao = Math.min(Math.max(Math.round(pontuacao + 20), 5), 100);

        // Atualizar visual da página
        previewNome.textContent = inputNome.value.trim() !== '' ? inputNome.value : 'Profissional Desconectado';
        previewJornada.textContent = `${horas}h/dia`;
        
        const labelsIA = {
            'equilibrado': 'Assistido (Equilibrado)',
            'excessivo': 'Excessivo / Multi-abas',
            'nenhum': 'Manual (Sem IA)'
        };
        previewIA.textContent = labelsIA[ia];

        barraSobrecarga.style.width = `${pontuacao}%`;
        textoPontuacao.textContent = `${pontuacao}%`;

        // Gerar Recomendações Personalizadas
        listaRecomendacoes.innerHTML = '';
        const recomendacoes = [];

        if (horas > 9) {
            recomendacoes.push('🚨 <strong>Redução de Jornada:</strong> Estabeleça um horário rígido de encerramento para conter a expansão de horas.');
        }
        if (pausas === 'rara') {
            recomendacoes.push('⏱️ <strong>Técnica Pomodoro:</strong> Implemente pausas obrigatórias de 5 min a cada 50 min de foco.');
        }
        if (ia === 'excessivo') {
            recomendacoes.push('🧠 <strong>Higiene Cognitiva de IA:</strong> Consolide o uso de prompts e feche abas secundárias de assistentes para reduzir alternância de contexto.');
        } else if (ia === 'nenhum') {
            recomendacoes.push('🤖 <strong>Automação de Rotina:</strong> Adote ferramentas de IA para sumarização de textos e tarefas repetitivas.');
        }
        if (fatoresAtivos >= 2) {
            recomendacoes.push('🔕 <strong>Gestão de Notificações:</strong> Reserve blocos de trabalho assíncrono silenciando canais de comunicação.');
        }

        if (recomendacoes.length === 0) {
            recomendacoes.push('✨ <strong>Manutenção de Hábitos:</strong> Sua rotina atual apresenta excelente equilíbrio entre esforço e recuperação.');
        }

        recomendacoes.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'list-group-item bg-transparent px-0 py-1 text-secondary small';
            li.innerHTML = rec;
            listaRecomendacoes.appendChild(li);
        });

        // Atualização de Status e Badges de Acordo com a Pontuação
        if (pontuacao < 40) {
            barraSobrecarga.className = 'progress-bar transition-progress bg-success';
            badgeNivel.className = 'badge bg-success d-print-inline';
            badgeNivel.textContent = 'Baixa Sobrecarga';
            statusDiagnostico.className = 'alert alert-success py-2 px-3 small mt-3 mb-0 text-center';
            statusDiagnostico.innerHTML = '✅ Baixo risco de esgotamento. Ritmo sustentável!';
        } else if (pontuacao < 70) {
            barraSobrecarga.className = 'progress-bar transition-progress bg-warning text-dark';
            badgeNivel.className = 'badge bg-warning text-dark d-print-inline';
            badgeNivel.textContent = 'Atenção Moderada';
            statusDiagnostico.className = 'alert alert-warning py-2 px-3 small mt-3 mb-0 text-center';
            statusDiagnostico.innerHTML = '⚠️ Atenção: Sinais de fadiga digital detectados. Ajuste suas pausas.';
        } else {
            barraSobrecarga.className = 'progress-bar transition-progress bg-danger';
            badgeNivel.className = 'badge bg-danger d-print-inline';
            badgeNivel.textContent = 'Alto Risco';
            statusDiagnostico.className = 'alert alert-danger py-2 px-3 small mt-3 mb-0 text-center';
            statusDiagnostico.innerHTML = '🚨 Alerta de sobrecarga cognitiva elevada! Recomenda-se descompressão imediata.';
        }

        // Animação de feedback no Card
        cardDiagnostico.classList.add('border-primary', 'shadow-lg');
        setTimeout(() => {
            cardDiagnostico.classList.remove('shadow-lg');
        }, 600);
    }

    // Eventos
    btnCalcular.addEventListener('click', (e) => {
        e.preventDefault();
        calcularSobrecarga();

        // Se existir um modal de confirmação na página, ele abre apenas aqui
        const modalEl = document.getElementById('modalSucessoCognitivo');
        if (modalEl) {
            const modalSucesso = new bootstrap.Modal(modalEl);
            modalSucesso.show();
        }

        btnCalcular.classList.add('btn-success');
        btnCalcular.classList.remove('btn-primary');
        btnCalcular.textContent = '✔ Reescalado com Sucesso!';
        setTimeout(() => {
            btnCalcular.classList.remove('btn-success');
            btnCalcular.classList.add('btn-primary');
            btnCalcular.textContent = '🧮 Calcular Sobrecarga';
        }, 1200);
    });

    btnImprimir.addEventListener('click', () => {
        calcularSobrecarga();
        window.print();
    });

    // Renderização inicial automática sem acionar modais
    calcularSobrecarga();
});