document.addEventListener('DOMContentLoaded', () => {
    // 1. Criar o botão de alternância de tema na Navbar dinamicamente
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        const themeLi = document.createElement('div');
        themeLi.className = 'nav-item d-flex align-items-center ms-lg-3 mt-2 mt-lg-0 d-print-none';
        themeLi.innerHTML = `
            <button id="themeToggleBtn" class="btn btn-outline-primary btn-sm rounded-pill px-3 transition-smooth d-flex align-items-center gap-2" type="button" aria-label="Alternar tema">
                <span id="themeIcon">🌙</span>
                <span id="themeText" class="small fw-bold">Modo Escuro</span>
            </button>
        `;
        navbarNav.appendChild(themeLi);
    }

    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    // 2. Função para aplicar o tema no <html>
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme_preference', theme);

        if (theme === 'dark') {
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Modo Claro';
            if (themeBtn) {
                themeBtn.classList.remove('btn-outline-primary');
                themeBtn.classList.add('btn-outline-warning');
            }
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeText) themeText.textContent = 'Modo Escuro';
            if (themeBtn) {
                themeBtn.classList.remove('btn-outline-warning');
                themeBtn.classList.add('btn-outline-primary');
            }
        }
    };

    // 3. Carregar preferência salva ou padrão do sistema
    const savedTheme = localStorage.getItem('theme_preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    // 4. Alternar ao clicar no botão
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
});