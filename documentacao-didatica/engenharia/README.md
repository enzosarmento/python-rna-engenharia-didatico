# Projetos Práticos de Engenharia com Redes Neurais Artificiais

Esta pasta reúne **aplicações reais de Engenharia** baseadas no livro-texto *Redes Neurais Artificiais para Engenharia e Ciências Aplicadas* (Ivan Nunes da Silva, Danilo Hernane Spatti e Rogério Andrade Flauzino) e em dados experimentais de **Manufatura Aditiva (Impressão 3D FDM)**.

Para facilitar o aprendizado progressivo, os projetos extensos foram **divididos em pares complementares**:
- **Parte A (`_numpy.ipynb`):** Matemática aberta passo a passo em `Python/NumPy`, fiel às equações e tabelas do livro-base.
- **Parte B (`_sklearn_keras.ipynb`):** Resolução do mesmo problema de engenharia com bibliotecas padrão da indústria (`Scikit-Learn` e `TensorFlow/Keras`).

---

## Mapa Linear dos Projetos

### 1. Engenharia Química e de Petróleo — Destilação Fracionada
- **[`01_classificacao_oleo_perceptron.ipynb`](01_classificacao_oleo_perceptron.ipynb)**
  - **Problema:** Classificar amostras de óleo em duas classes de pureza (`P1 = -1` e `P2 = +1`) a partir de três grandezas físico-químicas ($x_1, x_2, x_3$).
  - **Modelo:** Perceptron Simples (3 entradas, 5 inicializações distintas e visualização 3D dos hiperplanos separadores).

### 2. Engenharia Biomédica / Elétrica — Energia Absorvida em Ressonância Magnética
- **Especificação:** [`prompt-projeto-pratico-1.md`](prompt-projeto-pratico-1.md) *(Seção 5.8 do livro-base)*
- **[`02_projeto1_pmc_regressao_numpy.ipynb`](02_projeto1_pmc_regressao_numpy.ipynb):** Aproximação universal de funções com PMC `3-10-1` em `NumPy` puro (5 treinamentos, Tabelas 5.2 e 5.3, análise de mínimos locais).
- **[`03_projeto1_comparacao_sklearn_keras.ipynb`](03_projeto1_comparacao_sklearn_keras.ipynb):** Comparativo com `MLPRegressor` e `Keras` moderno (*Online SGD* vs. *Mini-Batch Adam*).

### 3. Engenharia de Alimentos / Química — Classificação de Conservantes Industriais
- **Especificação:** [`prompt-projeto-pratico-2.md`](prompt-projeto-pratico-2.md) *(Seção 5.9 do livro-base)*
- **[`04_projeto2_pmc_conservantes_numpy.ipynb`](04_projeto2_pmc_conservantes_numpy.ipynb):** Classificação multiclasse (*One-Hot* `A`, `B`, `C`) com PMC `4-15-3`, comparando **Backpropagation Convencional** vs. **Backpropagation + *Momentum* ($\alpha = 0{,}9$)** em tempo, erro e acurácia de teste.
- **[`05_projeto2_comparacao_sklearn_keras.ipynb`](05_projeto2_comparacao_sklearn_keras.ipynb):** Implementação industrial com `MLPClassifier`, `Softmax` e *Cross-Entropy* no `Keras`.

### 4. Engenharia de Controle e Produção — Predição de Séries Temporais (Sistemas Dinâmicos)
- **Especificação:** [`prompt-projeto-pratico-3.md`](prompt-projeto-pratico-3.md) *(Seção 5.10 do livro-base)*
- **[`06_projeto3_series_temporais_pmc.ipynb`](06_projeto3_series_temporais_pmc.ipynb):** Rede Neural com Atraso no Tempo (**TDNN** / Janela Deslizante), comparando 3 topologias (`5-10-1`, `10-15-1` e `15-25-1`) com *Momentum* ($\alpha = 0{,}8$) para prever $t = 101 \dots 120$.

### 5. Engenharia Mecânica e de Materiais — Estudo de Caso em Impressão 3D (`impressora-3d/`)
- **Fonte dos Dados:** Conjunto experimental obtido no **[Kaggle](https://www.kaggle.com/)** (*3D Printer Dataset for Mechanical Engineers* — [`impressora-3d/data.csv`](impressora-3d/data.csv)).
- **[`impressora-3d/01_impressora3d_eda_e_classificacao_material.ipynb`](impressora-3d/01_impressora3d_eda_e_classificacao_material.ipynb):** Física do processo FDM (`ABS` vs. `PLA`, ventilação, rugosidade) e classificação supervisionada sem vazamento de dados.
- **[`impressora-3d/02_impressora3d_predicao_resistencia_mecanica.ipynb`](impressora-3d/02_impressora3d_predicao_resistencia_mecanica.ipynb):** Predição da resistência à tração (MPa), otimização `lbfgs` + Validação Cruzada para amostras laboratoriais pequenas ($N = 50$) e conceito de **Gêmeos Digitais**.
- **[`impressora-3d/printer_dataset.py`](impressora-3d/printer_dataset.py):** Script Python modular autônomo pronto para execução em terminal.

