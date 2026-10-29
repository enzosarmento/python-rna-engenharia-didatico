# Projeto Prático 3 – Predição de Séries Temporais (Sistemas Variantes no Tempo com TDNN)

> **Referência Bibliográfica:** Seção 5.10 do livro *Redes Neurais Artificiais para Engenharia e Ciências Aplicadas* (Ivan Nunes da Silva, Danilo Hernane Spatti e Rogério Andrade Flauzino).

## Descrição do Problema

Um processo dinâmico variante no tempo (como a cotação de uma *commodity* industrial, demanda elétrica horária ou leitura contínua de vibração em máquina rotativa) possui um histórico sequencial de **100 observações** $x(t)$ registradas no arquivo [`datasets/projeto-pratico-3.csv`](datasets/projeto-pratico-3.csv) ($t = 1, 2, \dots, 100$).

Deseja-se prever o comportamento futuro $x(t)$ a partir das $p$ leituras imediatamente anteriores $[x(t-1), x(t-2), \dots, x(t-p)]$ utilizando um **Perceptron Multicamadas (PMC)** configurado como **Rede Neural com Atraso no Tempo (*Time-Delay Neural Network* — TDNN)**, isto é, operando por **janela deslizante** (análogo não linear a um filtro digital FIR / modelo auto-regressivo AR).

## Topologias Candidatas

Serão avaliadas três arquiteturas candidatas (todas com **1 neurônio de saída** $\hat{x}(t)$ e função de ativação **logística/sigmóide** em todas as camadas):

| Arquitetura | Janela de Atrasos ($p$ entradas) | Camada Oculta ($n_1$ neurônios) | Saída | Topologia |
| :--- | :---: | :---: | :---: | :---: |
| **TDNN 1** | $p = 5$ | $n_1 = 10$ | $1$ | `5-10-1` |
| **TDNN 2** | $p = 10$ | $n_1 = 15$ | $1$ | `10-15-1` |
| **TDNN 3** | $p = 15$ | $n_1 = 25$ | $1$ | `15-25-1` |

## Hiperparâmetros de Treinamento

- **Algoritmo:** Backpropagation com *Momentum* (Regra Delta Generalizada)
- **Taxa de aprendizado ($\eta$):** `0,1`
- **Fator de *Momentum* ($\alpha$):** `0,8`
- **Precisão alvo ($\varepsilon$):** $0{,}5 \times 10^{-6}$ (Erro Quadrático Médio)
- **Limite de segurança:** `max_epochs = 5000`

## Atividades Implementadas em [`06_projeto3_series_temporais_pmc.ipynb`](06_projeto3_series_temporais_pmc.ipynb)

1. **Construção das Janelas Deslizantes:** Transformar a série unidimensional $x(1 \dots 100)$ em pares supervisionados $(\mathbf{x}_k, d_k)$ para $p \in \{5, 10, 15\}$.
2. **Três Treinamentos por Topologia (`T1`, `T2`, `T3`):** Inicializar pesos aleatórios distintos em `[-0,5; +0,5]` e registrar o Erro Quadrático Médio ($E_M$) e número de épocas (Tabela 5.6).
3. **Validação em Horizonte Futuro ($t = 101 \dots 120$):** Avaliar os 9 modelos treinados sobre [`datasets/conjunto-testes-projeto-pratico-3.csv`](datasets/conjunto-testes-projeto-pratico-3.csv), calculando **Erro Relativo Médio (%)** e **Variância (%)** (Tabela 5.7).
4. **Curvas de Convergência:** Plotar, em subgráficos separados na mesma figura, a queda do $E_M$ por época do melhor treinamento de cada topologia.
5. **Série Real vs. Estimada:** Plotar os valores reais frente aos previstos pelas três topologias no domínio $t = 101 \dots 120$ (não superpostos entre topologias).
6. **Seleção de Engenharia:** Indicar justificadamente qual topologia (`TDNN 1`, `TDNN 2` ou `TDNN 3`) entrega o melhor compromisso entre parcimônia e generalização.

