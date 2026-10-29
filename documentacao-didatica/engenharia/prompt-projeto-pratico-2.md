# Projeto Prático 2 – Classificação de Conservantes com Perceptron Multicamadas (PMC)

> **Notebooks de Resolução:**
> - Parte 1 (Backpropagation Convencional vs. Momentum em NumPy): [`04_projeto2_pmc_conservantes_numpy.ipynb`](04_projeto2_pmc_conservantes_numpy.ipynb)
> - Parte 2 (Comparativo Industrial Scikit-Learn & Keras): [`05_projeto2_comparacao_sklearn_keras.ipynb`](05_projeto2_comparacao_sklearn_keras.ipynb)

## Descrição do Problema

Em um processo industrial de bebidas, deseja-se classificar automaticamente o tipo de conservante (`A`, `B` ou `C`) a partir de quatro variáveis físico-químicas medidas em **148 ensaios de laboratório** ([`datasets/projeto-pratico-2.csv`](datasets/projeto-pratico-2.csv)):
- $x_1$: teor de água
- $x_2$: grau de acidez
- $x_3$: temperatura
- $x_4$: tensão interfacial

## Configuração da Rede e Codificação *One-Hot*

- **Topologia:** `4-15-3` (4 entradas, 15 neurônios ocultos, 3 neurônios de saída com ativação logística/sigmóide)

| Conservante | $d_1$ | $d_2$ | $d_3$ |
| :---: | :---: | :---: | :---: |
| **A** | `1` | `0` | `0` |
| **B** | `0` | `1` | `0` |
| **C** | `0` | `0` | `1` |

## Atividades Implementadas

1. **Treinamento 1 (Backpropagation Convencional):** $\eta = 0{,}1$, $\alpha = 0{,}0$, $\varepsilon = 10^{-6}$ (máx. `5000` épocas).
2. **Treinamento 2 (Backpropagation + *Momentum*):** Mesmos pesos iniciais do Treinamento 1, $\eta = 0{,}1$, fator de *momentum* $\alpha = 0{,}9$, $\varepsilon = 10^{-6}$.
3. **Gráficos e Tempo de CPU:** Comparação lado a lado (não superposta) da queda do $E_M$ e tempo de execução.
4. **Pós-processamento Simétrico:** $y_i^{\text{pos}} = 1$ se $y_i \ge 0{,}5$, e $0$ caso contrário.
5. **Validação Comparativa:** Avaliação de **ambos os modelos** sobre as 18 amostras inéditas de [`datasets/conjunto-testes-projeto-pratico-2.csv`](datasets/conjunto-testes-projeto-pratico-2.csv).
