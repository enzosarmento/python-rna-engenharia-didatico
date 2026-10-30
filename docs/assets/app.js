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
})();

