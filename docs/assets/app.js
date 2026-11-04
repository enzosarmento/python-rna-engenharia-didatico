// PyEngenharia UESC — Interatividade do Portal Didático (Stitch -> GitHub Pages)
(function () {
  const STORAGE_PROGRESS_KEY = 'pyeng_uesc_completed_notebooks_v1';
  const STORAGE_FONT_KEY = 'pyeng_uesc_reader_lg';
  const TOTAL_NOTEBOOKS = 22;

  // Catálogo rápido para busca global (Ctrl + K ou barra do topo)
  const SEARCH_INDEX = [
    { title: 'Visão Geral & Metodologia Caixa Aberta', category: 'Guia Principal', url: 'index.html#visao-geral', keywords: 'pid uesc metodologia numpy sklearn keras objetivo' },
    { title: 'Instalação Rápida (venv & requirements.txt)', category: 'Guia Principal', url: 'index.html#instalacao', keywords: 'pip install venv python windows linux anaconda colab' },
    { title: 'Estrutura de Pastas do Repositório', category: 'Guia Principal', url: 'index.html#estrutura', keywords: 'pastas diretorios csv datasets titanic iris engenharia' },
    { title: 'Ordem de Estudo (4 Etapas Lineares)', category: 'Guia Principal', url: 'index.html#ordem-de-estudo', keywords: 'trilha sequencia etapas aulas notebooks' },
    { title: 'Teoria Simplificada (Analogias de Engenharia)', category: 'Teoria', url: 'index.html#teoria-simplificada', keywords: 'valvulas pesos bias vies normalizacao backpropagation gradiente momentum tdnn' },
    { title: 'Resultados e Gráficos dos Projetos', category: 'Resultados', url: 'index.html#resultados', keywords: 'graficos hiperplanos oleo ressonancia conservantes impressora 3d mse' },
    { title: 'Troubleshooting (Erros Comuns em Python)', category: 'Suporte', url: 'index.html#troubleshooting', keywords: 'erro modulenotfounderror filenotfounderror nameerror valueerror nan syntaxerror' },
    { title: 'Guia Completo de Instalação (Zero Absoluto)', category: 'Página Dedicada', url: 'instalacao.html', keywords: 'anaconda jupyterlab vscode colab kernel passo a passo' },
    { title: 'Catálogo dos 22 Notebooks Interativos (.ipynb)', category: 'Página Dedicada', url: 'notebooks.html', keywords: 'notebooks colab github exercicios gabarito progresso' },
    { title: '00 — Introdução ao Python para Engenharia', category: 'Etapa 1 • Base', url: 'notebooks.html#nb-00', keywords: 'variaveis listas dicionarios for if def class lei de ohm' },
    { title: '01 — NumPy: Vetores, Matrizes e Sistemas Lineares', category: 'Etapa 1 • Base', url: 'notebooks.html#nb-01', keywords: 'ndarray broadcasting linalg solve matrizes trelicas' },
    { title: '02 & 03 — Pandas: Exploração e Limpeza de Dados Reais', category: 'Etapa 1 • Base', url: 'notebooks.html#nb-02', keywords: 'dataframe series csv groupby nan fillna one-hot encoding' },
    { title: '04 — Visualização Científica (Matplotlib & Seaborn)', category: 'Etapa 1 • Base', url: 'notebooks.html#nb-04', keywords: 'graficos boxplot histplot heatmap outliers correlacao' },
    { title: '05 — Perceptron de Rosenblatt: Teoria e Prática', category: 'Etapa 1 • RNAs', url: 'notebooks.html#nb-05', keywords: 'neuronio pesos bias degrau fronteira linear and or xor' },
    { title: '06 — PMC (MLP) e Algoritmo Backpropagation', category: 'Etapa 1 • RNAs', url: 'notebooks.html#nb-06', keywords: 'multicamadas sigmoide relu regra da cadeia xor gradiente' },
    { title: 'Laboratório Guiado 1 — Sobrevivendo ao Titanic (5 Notebooks)', category: 'Etapa 2 • Titanic', url: 'notebooks.html#etapa-titanic', keywords: 'titanic data leakage sobrevivencia classificacao binaria' },
    { title: 'Laboratório Guiado 2 — Flor de Íris Multiclasse (2 Notebooks)', category: 'Etapa 3 • Íris', url: 'notebooks.html#etapa-iris', keywords: 'iris setosa versicolor virginica one-vs-rest softmax' },
    { title: 'Engenharia — Classificação de Óleo em 3D (Perceptron)', category: 'Etapa 4 • Engenharia', url: 'notebooks.html#eng-oleo', keywords: 'oleo destilacao p1 p2 hiperplanos 3d quimica petroleo' },
    { title: 'Projeto Prático 1 — Ressonância Magnética (PMC 3-10-1)', category: 'Etapa 4 • Engenharia', url: 'notebooks.html#eng-proj1', keywords: 'regressao aproximacao funcoes mse erro relativo keras' },
    { title: 'Projeto Prático 2 — Conservantes & Efeito Momentum', category: 'Etapa 4 • Engenharia', url: 'notebooks.html#eng-proj2', keywords: 'conservantes inercia momentum alpha 0.9 multiclasse' },
    { title: 'Projeto Prático 3 — Séries Temporais com TDNN', category: 'Etapa 4 • Engenharia', url: 'notebooks.html#eng-proj3', keywords: 'series temporais atraso tempo tdnn janela deslizante controle' },
    { title: 'Estudo de Caso — Impressora 3D FDM (ABS/PLA e Tração MPa)', category: 'Etapa 4 • Engenharia', url: 'notebooks.html#eng-3d', keywords: 'manufatura aditiva impressora 3d resistencia tracao gemeos digitais' },
    { title: 'Glossário de Engenharia, Dados e Redes Neurais', category: 'Página Dedicada', url: 'glossario.html', keywords: 'dicionario termos epoca batch overfitting data leakage r2 mae' }
  ];

  // 1. Persistência de tamanho de fonte
  if (localStorage.getItem(STORAGE_FONT_KEY) === '1') {
    document.documentElement.classList.add('reader-lg');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initMobileDrawer();
    initCopyButtons();
    initReaderToolbar();
    initSidebarFilter();
    initProgressTracker();
    initGlobalSearch();
    initScrollSpy();
    initQrModal();
  });

  // Drawer lateral responsivo para telas < 1024px (lg)
  function initMobileDrawer() {
    const btn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('left-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    const closeBtn = document.getElementById('mobile-close-btn');

    if (!btn || !drawer || !backdrop) return;

    const openDrawer = () => {
      drawer.classList.remove('-translate-x-full');
      drawer.classList.add('translate-x-0');
      backdrop.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.add('-translate-x-full');
      drawer.classList.remove('translate-x-0');
      backdrop.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    backdrop.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) closeDrawer();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  // Botões "Copiar" em todos os blocos de código
  function initCopyButtons() {
    document.querySelectorAll('.copy-code-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const codeEl = targetId
          ? document.getElementById(targetId)
          : btn.closest('.code-panel')?.querySelector('code');
        if (!codeEl) return;

        const labelEl = btn.querySelector('.copy-label');
        const originalText = labelEl ? labelEl.textContent : 'Copiar';

        navigator.clipboard.writeText(codeEl.innerText.trim()).then(() => {
          if (labelEl) labelEl.textContent = 'Copiado!';
          btn.classList.add('bg-tertiary-container', 'text-on-tertiary');
          setTimeout(() => {
            if (labelEl) labelEl.textContent = originalText;
            btn.classList.remove('bg-tertiary-container', 'text-on-tertiary');
          }, 1800);
        });
      });
    });
  }

  // Botões de tamanho de fonte (A+) e compartilhar link
  function initReaderToolbar() {
    document.querySelectorAll('.toggle-font-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const isLarge = document.documentElement.classList.toggle('reader-lg');
        localStorage.setItem(STORAGE_FONT_KEY, isLarge ? '1' : '0');
      });
    });

    document.querySelectorAll('.share-page-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalTitle = btn.getAttribute('title') || 'Copiar link';
          btn.setAttribute('title', 'Link copiado!');
          btn.classList.add('bg-tertiary-container', 'text-on-tertiary');
          setTimeout(() => {
            btn.setAttribute('title', originalTitle);
            btn.classList.remove('bg-tertiary-container', 'text-on-tertiary');
          }, 1600);
        });
      });
    });
  }

  // Filtro instantâneo da card-sidebar (igual ao Stitch)
  function initSidebarFilter() {
    const searchInput = document.getElementById('sidebar-search-input');
    const items = document.querySelectorAll('.module-item');
    const emptyState = document.getElementById('sidebar-empty-state');
    if (!searchInput || items.length === 0) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let visible = 0;
      items.forEach((item) => {
        const hay = ((item.getAttribute('data-title') || '') + ' ' + item.textContent).toLowerCase();
        if (hay.includes(query)) {
          item.style.display = 'flex';
          visible++;
        } else {
          item.style.display = 'none';
        }
      });
      if (emptyState) {
        emptyState.classList.toggle('hidden', visible > 0);
        emptyState.classList.toggle('flex', visible === 0);
      }
    });
  }

  // Barra de progresso sincronizada entre páginas via localStorage
  function getCompletedSet() {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) {
      return new Set();
    }
  }

  function saveCompletedSet(setObj) {
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(Array.from(setObj)));
    } catch (_) {}
  }

  function renderProgressUI(completedSet) {
    const count = completedSet.size;
    const pct = Math.round((count / TOTAL_NOTEBOOKS) * 100);

    document.querySelectorAll('[data-progress-label]').forEach((el) => {
      el.textContent = `Progresso: ${count} de ${TOTAL_NOTEBOOKS} notebooks (${pct}%)`;
    });
    document.querySelectorAll('[data-progress-bar]').forEach((el) => {
      el.style.width = `${pct}%`;
    });
    document.querySelectorAll('.nb-check').forEach((chk) => {
      const id = chk.getAttribute('data-nb-id');
      chk.checked = completedSet.has(id);
      const card = chk.closest('.nb-card');
      if (card) {
        card.classList.toggle('ring-1', chk.checked);
        card.classList.toggle('ring-[#10b981]', chk.checked);
      }
    });
  }

  function initProgressTracker() {
    const completed = getCompletedSet();
    renderProgressUI(completed);

    document.querySelectorAll('.nb-check').forEach((chk) => {
      chk.addEventListener('change', () => {
        const id = chk.getAttribute('data-nb-id');
        if (!id) return;
        const current = getCompletedSet();
        if (chk.checked) current.add(id);
        else current.delete(id);
        saveCompletedSet(current);
        renderProgressUI(current);
      });
    });

    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const empty = new Set();
        saveCompletedSet(empty);
        renderProgressUI(empty);
      });
    }
  }

  // Busca global no Header (Ctrl + K)
  function initGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const resultsBox = document.getElementById('global-search-results');
    if (!input || !resultsBox) return;

    const renderResults = (q) => {
      const query = q.toLowerCase().trim();
      if (!query) {
        resultsBox.classList.add('hidden');
        resultsBox.innerHTML = '';
        return;
      }
      const matches = SEARCH_INDEX.filter((entry) =>
        (entry.title + ' ' + entry.category + ' ' + entry.keywords).toLowerCase().includes(query)
      ).slice(0, 7);

      if (matches.length === 0) {
        resultsBox.innerHTML = `
          <div class="p-4 text-center text-on-surface-variant text-sm">
            Nenhum resultado para <strong>"${query.replace(/[<>&"]/g, '')}"</strong>.
            <a href="glossario.html" class="text-secondary font-semibold underline ml-1">Buscar no Glossário</a>
          </div>`;
      } else {
        resultsBox.innerHTML = matches
          .map(
            (m) => `
          <a href="${m.url}" class="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-surface-container-low transition-colors border-b border-surface-container last:border-b-0">
            <div class="min-w-0">
              <div class="font-semibold text-primary text-sm truncate">${m.title}</div>
              <div class="text-xs text-outline">${m.category}</div>
            </div>
            <span class="material-symbols-outlined text-outline text-[18px]">arrow_forward</span>
          </a>`
          )
          .join('');
      }
      resultsBox.classList.remove('hidden');
    };

    input.addEventListener('input', (e) => renderResults(e.target.value));
    input.addEventListener('focus', (e) => {
      if (e.target.value.trim()) renderResults(e.target.value);
    });

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsBox.contains(e.target)) {
        resultsBox.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === 'Escape') {
        resultsBox.classList.add('hidden');
      }
    });
  }

  // Destaca automaticamente a seção visível tanto na sidebar esquerda quanto no Sumário Linear do Guia
  function initScrollSpy() {
    const spyLinks = document.querySelectorAll('[data-spy-target]');
    if (spyLinks.length === 0) return;

    // Agrupa todos os links (sidebar + card de sumário) que apontam para o mesmo ID de seção
    const targetMap = new Map();
    spyLinks.forEach((link) => {
      const id = link.getAttribute('data-spy-target');
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      if (!targetMap.has(id)) {
        targetMap.set(id, { id, el, links: [] });
      }
      targetMap.get(id).links.push(link);
    });

    const groups = Array.from(targetMap.values());
    if (groups.length === 0) return;

    let clickLockUntil = 0;

    const setActiveId = (activeId) => {
      groups.forEach(({ id, links }) => {
        const isActive = id === activeId;
        links.forEach((l) => l.classList.toggle('active', isActive));
      });
    };

    const onScroll = () => {
      if (Date.now() < clickLockUntil) return;

      // Se chegou ao fim da página, destaca a última seção
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (atBottom) {
        setActiveId(groups[groups.length - 1].id);
        return;
      }

      // Usa posição relativa à janela (imune a containers pai / grid)
      const threshold = 150;
      let activeGroup = groups[0];
      for (const group of groups) {
        const rect = group.el.getBoundingClientRect();
        if (rect.top <= threshold) {
          activeGroup = group;
        }
      }
      setActiveId(activeGroup.id);
    };

    // Ao clicar em um item do sumário, atualiza o destaque na hora sem esperar o fim da rolagem suave
    groups.forEach(({ id, links }) => {
      links.forEach((link) => {
        link.addEventListener('click', () => {
          setActiveId(id);
          clickLockUntil = Date.now() + 550;
          setTimeout(onScroll, 600);
        });
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  // Sistema Interativo de QR Code no Navegador (Acesso Mobile & Gerador de Links)
  function initQrModal() {
    const MODAL_ID = 'pyeng-qr-modal';
    let currentSvgData = '';
    let currentUrl = 'https://enzosarmento.github.io/python-rna-engenharia-didatico/';

    // Cria a estrutura HTML do modal se não existir no DOM
    function ensureModalDom() {
      let modal = document.getElementById(MODAL_ID);
      if (modal) return modal;

      modal = document.createElement('div');
      modal.id = MODAL_ID;
      modal.className = 'fixed inset-0 z-50 hidden flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'pyeng-qr-title');

      modal.innerHTML = `
        <div class="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/50 overflow-hidden flex flex-col max-h-[92vh] text-on-surface">
          <!-- Cabeçalho -->
          <div class="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-[24px]">qr_code_2</span>
              </div>
              <div>
                <h3 id="pyeng-qr-title" class="font-headline-sm text-title-md font-bold text-primary leading-tight">Acesso Mobile &amp; Gerador de QR Code</h3>
                <p class="font-label-md text-label-md text-on-surface-variant m-0">Aponte a câmera para abrir ou gere QR Codes para links e apresentações</p>
              </div>
            </div>
            <button id="pyeng-qr-close-btn" class="p-1.5 rounded-lg text-outline hover:text-primary hover:bg-surface-container transition-colors" type="button" aria-label="Fechar janela">
              <span class="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          <!-- Conteúdo com Rolagem -->
          <div class="p-5 sm:p-6 overflow-y-auto space-y-5">
            <!-- Atalhos Oficiais -->
            <div>
              <label class="block font-label-md text-label-md font-semibold text-on-surface-variant mb-2">Atalhos Oficiais do Projeto:</label>
              <div class="flex flex-wrap gap-1.5" id="pyeng-qr-presets">
                <button type="button" data-url="https://enzosarmento.github.io/python-rna-engenharia-didatico/" class="px-3 py-1.5 rounded-lg text-label-md font-medium bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-xs">🌐 Portal Principal</button>
                <button type="button" data-url="CURRENT" class="px-3 py-1.5 rounded-lg text-label-md font-medium bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">📄 Página Atual</button>
                <button type="button" data-url="https://enzosarmento.github.io/python-rna-engenharia-didatico/notebooks.html" class="px-3 py-1.5 rounded-lg text-label-md font-medium bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">📓 22 Notebooks</button>
                <button type="button" data-url="https://enzosarmento.github.io/python-rna-engenharia-didatico/instalacao.html" class="px-3 py-1.5 rounded-lg text-label-md font-medium bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">⚙️ Instalação</button>
                <button type="button" data-url="https://enzosarmento.github.io/python-rna-engenharia-didatico/glossario.html" class="px-3 py-1.5 rounded-lg text-label-md font-medium bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">📚 Glossário</button>
                <button type="button" data-url="https://github.com/enzosarmento/python-rna-engenharia-didatico" class="px-3 py-1.5 rounded-lg text-label-md font-medium bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors">💻 GitHub</button>
              </div>
            </div>

            <!-- Campo de URL Customizada -->
            <div>
              <label for="pyeng-qr-url-input" class="block font-label-md text-label-md font-semibold text-on-surface-variant mb-1.5">Link / URL de Destino (edite ou cole qualquer endereço):</label>
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none">link</span>
                <input id="pyeng-qr-url-input" type="url" class="w-full h-11 pl-10 pr-24 rounded-xl bg-surface-container-low border border-outline-variant/60 font-code-inline text-[13px] text-on-surface focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all" placeholder="https://..." value="${currentUrl}"/>
                <button id="pyeng-qr-copy-url-btn" type="button" class="absolute right-2 px-2.5 py-1 rounded-lg text-label-md font-semibold bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface-variant transition-colors flex items-center gap-1">
                  <span class="material-symbols-outlined text-[15px]">content_copy</span>
                  <span id="pyeng-qr-copy-url-label">Copiar</span>
                </button>
              </div>
            </div>

            <!-- Moldura e Visualização do QR Code -->
            <div class="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
              <div class="relative shrink-0 p-3 bg-white rounded-xl shadow-md border border-slate-200 flex flex-col items-center justify-center">
                <canvas id="pyeng-qr-canvas" width="220" height="220" class="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] block"></canvas>
                <div class="mt-2 text-center">
                  <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span class="material-symbols-outlined text-[13px]">verified</span>
                    Correção Nível H (30%)
                  </span>
                </div>
              </div>

              <div class="flex-1 space-y-3.5 text-center sm:text-left">
                <div>
                  <h4 class="font-title-md text-[15px] font-bold text-primary m-0">Aponte a câmera do celular para abrir</h4>
                  <p class="font-body-md text-[13px] text-on-surface-variant leading-relaxed mt-1">
                    Funciona instantaneamente no aplicativo de câmera padrão do Android e iPhone, sem necessidade de instalar aplicativos adicionais.
                  </p>
                </div>

                <div class="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                  <button id="pyeng-qr-download-png" type="button" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold shadow-xs transition-all">
                    <span class="material-symbols-outlined text-[18px]">download</span>
                    <span>Baixar PNG (1024px)</span>
                  </button>
                  <button id="pyeng-qr-download-svg" type="button" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold border border-outline-variant transition-all">
                    <span class="material-symbols-outlined text-[18px]">polyline</span>
                    <span>Baixar SVG</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Modelos Oficiais para Apresentação -->
            <div class="p-4 rounded-xl bg-primary-fixed/20 border border-primary/15 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary text-[24px] shrink-0">co_present</span>
                <div class="text-[12.5px] text-on-surface text-center sm:text-left">
                  <strong class="text-primary block font-semibold">Vai apresentar no Simpósio ou Defesa de TCC?</strong>
                  Use os modelos prontos em 16:9 ou cartão vertical com créditos da UESC e do PID.
                </div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <a href="assets/img/qrcode_portal_didatico.png" download="qrcode_portal_didatico.png" class="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-[11.5px] font-semibold border border-outline-variant/60 shadow-xs transition-colors">
                  PNG Puro
                </a>
                <a href="assets/img/qrcode_portal_didatico.svg" download="qrcode_portal_didatico.svg" class="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-[11.5px] font-semibold border border-outline-variant/60 shadow-xs transition-colors">
                  SVG Puro
                </a>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      return modal;
    }

    // Atualiza a renderização do QR Code no Canvas
    function updateQr(url) {
      if (!url) return;
      currentUrl = url;
      const modal = ensureModalDom();
      const canvas = modal.querySelector('#pyeng-qr-canvas');
      if (!canvas) return;

      try {
        if (typeof window.PyEngQR === 'function') {
          const qr = window.PyEngQR(url, { errorCorrection: 'H' });
          qr.drawCanvas(canvas, { size: 440, border: 2, fill: '#002444', background: '#ffffff' });
          currentSvgData = qr.toSvg({ size: 1024, border: 2, fill: '#002444', background: 'transparent' });
        } else {
          // Fallback para imagem estática pré-gerada se a biblioteca não estiver carregada
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = 'assets/img/qrcode_portal_didatico.png';
        }
      } catch (err) {
        console.warn('Erro ao gerar QR Code dinâmico:', err);
      }
    }

    function openModal(initialUrl) {
      const modal = ensureModalDom();
      const input = modal.querySelector('#pyeng-qr-url-input');

      const urlToUse = initialUrl || (input ? input.value : currentUrl) || window.location.href;
      if (input) input.value = urlToUse;
      updateQr(urlToUse);

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (input) {
        input.focus();
        input.select();
      }
    }

    function closeModal() {
      const modal = document.getElementById(MODAL_ID);
      if (!modal) return;
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    // Configura eventos da janela modal
    const modal = ensureModalDom();

    // Fechar ao clicar no X ou no fundo escuro
    modal.querySelector('#pyeng-qr-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    // Edição em tempo real da URL
    const urlInput = modal.querySelector('#pyeng-qr-url-input');
    if (urlInput) {
      urlInput.addEventListener('input', (e) => {
        updateQr(e.target.value.trim());
      });
    }

    // Botões de Presets
    const presetsContainer = modal.querySelector('#pyeng-qr-presets');
    if (presetsContainer) {
      presetsContainer.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
          let targetUrl = btn.getAttribute('data-url');
          if (targetUrl === 'CURRENT') {
            targetUrl = window.location.href.split('#')[0];
          }
          if (urlInput) urlInput.value = targetUrl;
          updateQr(targetUrl);

          // Atualiza o estilo visual do preset ativo
          presetsContainer.querySelectorAll('button').forEach((b) => {
            b.className = 'px-3 py-1.5 rounded-lg text-label-md font-medium bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors';
          });
          btn.className = 'px-3 py-1.5 rounded-lg text-label-md font-medium bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-xs';
        });
      });
    }

    // Botão Copiar URL
    const copyUrlBtn = modal.querySelector('#pyeng-qr-copy-url-btn');
    const copyLabel = modal.querySelector('#pyeng-qr-copy-url-label');
    if (copyUrlBtn && copyLabel) {
      copyUrlBtn.addEventListener('click', async () => {
        const text = urlInput ? urlInput.value : currentUrl;
        try {
          await navigator.clipboard.writeText(text);
          const orig = copyLabel.textContent;
          copyLabel.textContent = 'Copiado!';
          copyUrlBtn.classList.add('!bg-emerald-600', '!text-white');
          setTimeout(() => {
            copyLabel.textContent = orig;
            copyUrlBtn.classList.remove('!bg-emerald-600', '!text-white');
          }, 2000);
        } catch (_) {
          urlInput.select();
          document.execCommand('copy');
        }
      });
    }

    // Download PNG em alta resolução (1024 x 1024 px)
    const downloadPngBtn = modal.querySelector('#pyeng-qr-download-png');
    if (downloadPngBtn) {
      downloadPngBtn.addEventListener('click', () => {
        try {
          const exportCanvas = document.createElement('canvas');
          exportCanvas.width = 1024;
          exportCanvas.height = 1024;
          if (typeof window.PyEngQR === 'function') {
            const qr = window.PyEngQR(currentUrl, { errorCorrection: 'H' });
            qr.drawCanvas(exportCanvas, { size: 1024, border: 2, fill: '#002444', background: '#ffffff' });
          } else {
            const srcCanvas = modal.querySelector('#pyeng-qr-canvas');
            const ctx = exportCanvas.getContext('2d');
            ctx.drawImage(srcCanvas, 0, 0, 1024, 1024);
          }
          const link = document.createElement('a');
          link.download = 'qrcode_personalizado.png';
          link.href = exportCanvas.toDataURL('image/png');
          link.click();
        } catch (err) {
          console.error('Falha no download PNG:', err);
        }
      });
    }

    // Download SVG vetorial puro
    const downloadSvgBtn = modal.querySelector('#pyeng-qr-download-svg');
    if (downloadSvgBtn) {
      downloadSvgBtn.addEventListener('click', () => {
        try {
          let svgContent = currentSvgData;
          if (!svgContent && typeof window.PyEngQR === 'function') {
            const qr = window.PyEngQR(currentUrl, { errorCorrection: 'H' });
            svgContent = qr.toSvg({ size: 1024, border: 2, fill: '#002444', background: 'transparent' });
          }
          if (!svgContent) return;

          const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'qrcode_personalizado.svg';
          link.href = url;
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (err) {
          console.error('Falha no download SVG:', err);
        }
      });
    }

    // Conecta todos os botões de abertura presentes nas páginas
    document.querySelectorAll('.open-qr-modal-btn, [data-action="open-qr"]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const initial = trigger.getAttribute('data-qr-url');
        openModal(initial);
      });
    });

    // Registra atalho global no objeto window para fácil invocação
    window.openPyEngQrModal = openModal;
  }
})();


