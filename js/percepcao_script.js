document.addEventListener('DOMContentLoaded', () => {
    const inputNome = document.getElementById('nomeUsuario');
    const selectsScore = document.querySelectorAll('.score-input');
    const btnCalcular = document.getElementById('btnCalcularTeste');
    const btnImprimir = document.getElementById('btnImprimirTeste');

    const previewNomeUser = document.getElementById('previewNomeUser');
    const statusPreenchimento = document.getElementById('statusPreenchimento');
    const textoScore = document.getElementById('textoScore');
    const barraProgresso = document.getElementById('barraProgressoTeste');
    const badgePerfil = document.getElementById('badgePerfil');
    const textoFeedback = document.getElementById('textoFeedback');
    const cardResultado = document.getElementById('cardResultado');

    // Função apenas para verificar se todas as opções foram marcadas e liberar o botão
    function verificarPreenchimento() {
        let respondidas = 0;
        selectsScore.forEach(select => {
            if (select.value !== "") {
                respondidas++;
            }
        });

        const total = selectsScore.length;
        const progressoParcial = Math.round((respondidas / total) * 100);

        barraProgresso.style.width = `${progressoParcial}%`;
        statusPreenchimento.textContent = `Respondidas: ${respondidas}/${total}`;

        if (respondidas === total) {
            btnCalcular.disabled = false;
            btnCalcular.className = 'btn btn-primary w-100 fw-bold py-2 shadow-sm pulse-button mt-2';
            btnCalcular.textContent = '📊 Calcular Diagnóstico Socioemocional';
            textoFeedback.innerHTML = '✨ Todas as questões foram respondidas! Clique no botão para gerar o resultado.';
        } else {
            btnCalcular.disabled = true;
            btnCalcular.className = 'btn btn-secondary w-100 fw-bold py-2 shadow-sm mt-2';
            btnCalcular.textContent = `🔒 Responda todas as perguntas (${respondidas}/${total})`;
            
            badgePerfil.className = 'badge bg-secondary d-print-inline';
            badgePerfil.textContent = 'Pendente';
            textoScore.textContent = '0 / 20';
            btnImprimir.disabled = true;
        }
    }

    // Função principal que calcula o diagnóstico
    function calcularTeste() {
        const nome = inputNome.value.trim() !== '' ? inputNome.value : 'Participante';
        previewNomeUser.textContent = nome;

        let somaScores = 0;
        selectsScore.forEach(select => {
            somaScores += parseInt(select.value, 10);
        });

        const porcentagemTotal = Math.round((somaScores / 20) * 100);
        textoScore.textContent = `${somaScores} de 20 pontos (${porcentagemTotal}%)`;
        barraProgresso.style.width = `${porcentagemTotal}%`;
        statusPreenchimento.textContent = 'Concluído com Sucesso';
        btnImprimir.disabled = false;

        if (somaScores >= 16) {
            barraProgresso.className = 'progress-bar bg-success transition-progress';
            badgePerfil.className = 'badge bg-success d-print-inline';
            badgePerfil.textContent = 'Altamente Equilibrado';
            textoFeedback.innerHTML = `🌟 <strong>Excelente Autopercepção:</strong> Você demonstra forte resiliência emocional, excelente desconexão mental pós-expediente e controle saudável sobre o uso de tecnologias.`;
        } else if (somaScores >= 10) {
            barraProgresso.className = 'progress-bar bg-info transition-progress';
            badgePerfil.className = 'badge bg-info text-dark d-print-inline';
            badgePerfil.textContent = 'Moderação / Atenção';
            textoFeedback.innerHTML = `👍 <strong>Equilíbrio Moderado:</strong> Seu perfil indica estabilidade em alguns aspectos, mas com tendência a absorver picos de fadiga digital.`;
        } else {
            barraProgresso.className = 'progress-bar bg-danger transition-progress';
            badgePerfil.className = 'badge bg-danger d-print-inline';
            badgePerfil.textContent = 'Alta Vulnerabilidade';
            textoFeedback.innerHTML = `🚨 <strong>Alerta de Sobrecarga Emocional:</strong> Indicadores apontam forte desgaste socioemocional e ansiedade digital.`;
        }

        cardResultado.classList.add('border-success', 'shadow-lg');
        setTimeout(() => {
            cardResultado.classList.remove('shadow-lg');
        }, 600);
    }

    // Escutadores de eventos
    selectsScore.forEach(select => {
        select.addEventListener('change', verificarPreenchimento);
    });

    inputNome.addEventListener('input', () => {
        if (inputNome.value.trim() !== '') {
            previewNomeUser.textContent = inputNome.value;
        }
    });

    btnCalcular.addEventListener('click', (e) => {
        e.preventDefault();
        calcularTeste();

        // Dispara o modal dinâmico apenas ao clicar no botão
        const modalEl = document.getElementById('modalSucessoPercepcao');
        if (modalEl) {
            const modalSucesso = new bootstrap.Modal(modalEl);
            modalSucesso.show();
        }

        btnCalcular.classList.add('btn-success');
        btnCalcular.classList.remove('btn-primary');
        btnCalcular.textContent = '✔ Resultados Gerados!';
        setTimeout(() => {
            btnCalcular.classList.remove('btn-success');
            btnCalcular.classList.add('btn-primary');
            btnCalcular.textContent = '📊 Recalcular Diagnóstico';
        }, 1200);
    });

    btnImprimir.addEventListener('click', () => {
        window.print();
    });

    // Verificação inicial
    verificarPreenchimento();
});