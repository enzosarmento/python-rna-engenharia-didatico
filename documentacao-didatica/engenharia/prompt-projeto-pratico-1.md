# Projeto Prático 1 – Aproximação de Funções com Perceptron Multicamadas (PMC)

> **Notebooks de Resolução:**
> - Parte 1 (Implementação Matemática em NumPy): [`02_projeto1_pmc_regressao_numpy.ipynb`](02_projeto1_pmc_regressao_numpy.ipynb)
> - Parte 2 (Comparativo Industrial Scikit-Learn & Keras): [`03_projeto1_comparacao_sklearn_keras.ipynb`](03_projeto1_comparacao_sklearn_keras.ipynb)

## Descrição do Problema

Para um processador de imagens de ressonância magnética, deseja-se estimar a **energia absorvida** $\{y\}$ do sistema a partir da medição de três grandezas ($x_1, x_2, x_3$). O mapeamento é não linear e difícil de modelar analiticamente; utiliza-se um **Perceptron Multicamadas (PMC)** como aproximador universal de funções.

## Configuração da Rede

- **Entradas:** $x_1, x_2, x_3$ (3 atributos de entrada)
- **Camada oculta:** 10 neurônios
- **Saída:** 1 neurônio ($y$)
- **Função de ativação:** Logística (sigmóide) em todos os neurônios
- **Topologia:** `3-10-1` (ilustrada em [`../imagens/topologia_pmc_3_10_1.svg`](../imagens/topologia_pmc_3_10_1.svg))
- **Algoritmo de aprendizagem:** Backpropagation (Regra Delta Generalizada)
- **Dados:** Treino em [`datasets/projeto-pratico-1.csv`](datasets/projeto-pratico-1.csv) (200 amostras) e Teste em [`datasets/conjunto-testes-projeto-pratico-1.csv`](datasets/conjunto-testes-projeto-pratico-1.csv) (20 amostras), já normalizados.

## Atividades Implementadas

1. **Cinco Treinamentos (`T1` a `T5`):** Pesos iniciais distintos em `[-0,5; +0,5]`, taxa $\eta = 0{,}1$, precisão $\varepsilon = 10^{-6}$ ou `5000` épocas.
2. **Tabela 5.2:** Registro do Erro Quadrático Médio ($E_M$) final e total de épocas de cada treinamento.
3. **Curvas de Convergência:** Gráficos não superpostos dos dois treinamentos com maior número de épocas.
4. **Análise Física da Variabilidade:** Explicação baseada em superfícies de erro não convexas e mínimos locais.
5. **Validação (Tabela 5.3):** Erro relativo médio (%) e variância (%) sobre as 20 amostras de teste.
6. **Seleção de Projeto:** Escolha do treinamento com melhor capacidade de generalização.
