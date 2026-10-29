# Projeto Prático 2 – Classificação de Conservantes com Perceptron Multicamadas (PMC)

## Descrição do Problema

Em um processo industrial de bebidas, deseja-se classificar o tipo de conservante (\(A\), \(B\) ou \(C\)) a ser aplicado com base em quatro variáveis reais:

- \(x_1\): teor de água  
- \(x_2\): grau de acidez  
- \(x_3\): temperatura  
- \(x_4\): tensão interfacial  

Foram realizados **148 ensaios de laboratório**. A classificação será feita por uma rede **Perceptron Multicamadas (PMC)** com backpropagation.

## Configuração da Rede

- **Entradas:** \(x_1, x_2, x_3, x_4\) (4 neurônios de entrada)
- **Camada oculta:** 15 neurônios
- **Saída:** 3 neurônios (\(y_1, y_2, y_3\))
- **Função de ativação:** Logística (sigmóide) para todos os neurônios
- **Topologia:** 4-15-3

### Codificação das Saídas

| Conservante | \(y_1\) | \(y_2\) | \(y_3\) |
|-------------|--------|--------|--------|
| A           | 1      | 0      | 0      |
| B           | 0      | 1      | 0      |
| C           | 0      | 0      | 1      |

## Atividades a Serem Implementadas

### 1. Treinamento com Backpropagation Convencional

- Inicialização aleatória dos pesos
- Taxa de aprendizado \(\eta = 0,1\)
- Precisão \(\varepsilon = 10^{-6}\) (erro quadrático médio)
- Critério de parada: \(E_w \leq \varepsilon\) ou número máximo de épocas (ex: 5000)

### 2. Treinamento com Backpropagation + Momentum

- Mesma inicialização de pesos do item 1
- Taxa de aprendizado \(\eta = 0,1\)
- Fator de momentum \(\alpha = 0,9\)
- Precisão \(\varepsilon = 10^{-6}\)

### 3. Gráficos e Tempo de Processamento

- Plotar o erro quadrático médio \(E_w\) por época para ambos os treinamentos
- Os dois gráficos devem ser impressos na mesma página, não superpostos
- Medir e exibir o tempo de processamento de cada treinamento

### 4. Pós-processamento das Saídas

Aplicar arredondamento simétrico:

\[
y_i^{pos} = \begin{cases} 
1, & \text{se } y_i \geq 0.5 \\
0, & \text{se } y_i < 0.5
\end{cases}
\]

### 5. Validação com Conjunto de Teste

Utilizar a o arquivo chamado **`conjunto-testes-projeto-pratico-2.csv`** na pasta datasets (18 amostras) para validar a rede. Calcular a **taxa de acertos (%)** comparando as saídas pós-processadas com os valores desejados (\(d_1, d_2, d_3\)).

## Dados de Treinamento

Os dados de treinamento estão em um arquivo chamado **`projeto-pratico-2.csv`** na pasta datasets contendo as **148 amostras** de ensaios de laboratório.