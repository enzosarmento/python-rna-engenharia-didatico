# Projeto Prático 1 – Aproximação de Funções com Perceptron Multicamadas (PMC)

## Descrição do Problema

Para um processador de imagens de ressonância magnética, deseja-se estimar a **energia absorvida** \(\{y\}\) do sistema a partir da medição de três grandezas:

- \(x_1\)
- \(x_2\)
- \(x_3\)

O mapeamento é complexo e difícil de obter por técnicas convencionais. Será utilizado um **Perceptron Multicamadas (PMC)** como aproximador universal de funções.

## Configuração da Rede

- **Entradas:** \(x_1, x_2, x_3\) (3 neurônios de entrada)
- **Camada oculta:** 10 neurônios
- **Saída:** 1 neurônio (\(y\))
- **Função de ativação:** Logística (sigmóide) para todos os neurônios
- **Topologia:** 3-10-1
- **Algoritmo de aprendizagem:** Backpropagation (regra Delta generalizada)

### Observação

Todas as saídas já estão **normalizadas**.

## Atividades a Serem Implementadas

### 1. Executar Cinco Treinamentos

- Inicializar as matrizes de pesos com **valores aleatórios apropriados** em cada treinamento.
- Reiniciar o gerador de números aleatórios em cada treinamento (se necessário) para modificar os valores iniciais.
- Taxa de aprendizado \(\eta = 0,1\)
- Precisão \(\varepsilon = 10^{-6}\) (erro quadrático médio)
- Critério de parada: \(E_M \leq \varepsilon\) ou número máximo de épocas (ex: 5000)

### 2. Registrar Resultados na Tabela 5.2

Para cada um dos 5 treinamentos, registrar:

- Erro quadrático médio final
- Número total de épocas

**Tabela 5.2 – Resultados dos treinamentos**

| Treinamento | Erro quadrático médio | Número total de épocas |
|-------------|----------------------|------------------------|
| 1° (T1)     |                      |                        |
| 2° (T2)     |                      |                        |
| 3° (T3)     |                      |                        |
| 4° (T4)     |                      |                        |
| 5° (T5)     |                      |                        |

### 3. Gráficos dos Dois Treinamentos com Maior Número de Épocas

- Para os dois treinamentos com **maior número de épocas** (da tabela acima)
- Traçar os gráficos do **erro quadrático médio** \(E_M\) em função de cada época
- Imprimir os dois gráficos numa mesma página, **não superpostos**

### 4. Explicação da Variabilidade dos Resultados

Fundamentado na tabela do item 2, explicar de forma detalhada por que tanto o **erro quadrático médio** quanto o **número total de épocas** variam de treinamento para treinamento.

### 5. Validação com Conjunto de Teste

Para **todos os 5 treinamentos**, aplicar o conjunto de teste **`conjunto-testes-projeto-pratico-1.csv`** e calcular:

- **Erro relativo médio (%)** entre os valores desejados e os fornecidos pela rede
- **Variância (%)** do erro relativo

### 6. Seleção da Melhor Configuração

Com base na análise da tabela do item 5, indicar qual dos treinamentos (T1, T2, T3, T4 ou T5) oferece a **melhor generalização** para o sistema de ressonância magnética.

