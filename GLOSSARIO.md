# Glossário Didático de Programação, Dados e Redes Neurais para Engenharia

Este glossário traduz cada termo técnico de **Python**, **Ciência de Dados** e **Redes Neurais Artificiais (RNAs)** para a linguagem direta da **Engenharia**, sempre acompanhado de uma analogia física ou industrial.

---

## 1. Fundamentos de Python e Programação

- **Variável (`x = 10`):** Espaço nomeado na memória do computador que guarda um valor (como a pressão `P = 2.5` bar de uma caldeira). Diferente da álgebra no papel, o sinal `=` em Python significa **atribuição** ("guarde o valor da direita dentro do nome à esquerda"), enquanto `==` compara igualdade.
- **Lista (`[10, 20, 30]`):** Sequência flexível de valores guardados em fila. Cada posição tem um **índice** que começa em `0` (o primeiro elemento é `lista[0]`).
- **Dicionário (`{'material': 'ABS', 'temp': 230}`):** Estrutura que associa pares `chave: valor`, funcionando como uma ficha técnica onde você consulta uma propriedade pelo nome em vez da posição numérica.
- **Indentação (Recuo com espaços):** Em Python, os blocos de comandos dentro de um `if`, `for` ou `def` não usam chaves `{}`; eles são delimitados pelo **recuo à esquerda** (padrão de 4 espaços). Alinhar errado gera `IndentationError`.
- **Laço `for` (*Loop*):** Estrutura que repete automaticamente um cálculo para cada item de uma sequência (ex.: calcular a deformação para cada uma das 50 corpos de prova de um ensaio de tração).
- **Função (`def`):** Bloco reutilizável de código que recebe entradas (parâmetros), processa uma fórmula e devolve um resultado (`return`), exatamente como uma função matemática $f(x, y)$ ou sub-rotina de calculadora científica.
- **Classe (`class`) e Objeto:** Uma **classe** é a *planta baixa* (projeto mecânico) que define atributos (dados internos, acessados via `self`) e métodos (ações). Um **objeto** é a *máquina construída* a partir dessa planta (ex.: `mlp = MLP(...)`).
- **Biblioteca / Módulo (`import`):** Conjunto de ferramentas prontas escritas por especialistas. Escrever `import numpy as np` equivale a trazer uma caixa de instrumentos de Álgebra Linear para a bancada e apelidá-la de `np`.

---

## 2. Estruturas e Pré-processamento de Dados

- **CSV (*Comma-Separated Values*):** Arquivo de texto simples onde cada linha representa um registro (ensaio) e as colunas são separadas por vírgulas (`,`) ou ponto e vírgula (`;`). É o formato universal para exportar tabelas do Excel ou aquisitores de dados.
- **Array / `ndarray` (NumPy):** Vetor (1D), matriz (2D) ou tensor (3D+) numérico homogêneo e ultrarrápido do `NumPy`. *Analogia:* Enquanto uma lista Python é uma sacola flexível com objetos variados, o `ndarray` é uma viga de aço padronizada projetada para cálculo matricial pesado.
- **Broadcasting (Transmissão Vetorial):** Capacidade do `NumPy` de aplicar uma operação matemática a todos os elementos de um vetor/matriz de uma só vez sem escrever laços `for` (ex.: `kelvin = celsius + 273.15`).
- **DataFrame (`pandas`):** Tabela inteligente bidimensional com linhas numeradas e colunas nomeadas (aceitando números e textos em colunas diferentes). É o equivalente programável de uma planilha de engenharia capaz de processar milhões de linhas.
- **Series (`pandas`):** Uma única coluna extraída de um `DataFrame` (ex.: `df['age']`).
- **Feature (Atributo / Variável de Entrada, $\mathbf{x}$):** Grandeza medida que alimenta o modelo para que ele tome uma decisão (ex.: temperatura do bico, espessura de parede, acidez). Equivale às **variáveis independentes** de um experimento.
- **Target / Label (Rótulo / Saída Desejada, $d$ ou $y$):** Grandeza que queremos prever ou classificar (ex.: resistência à tração em MPa, pureza do óleo P1/P2). Equivale à **variável dependente** medida em bancada.
- **`NaN` (*Not a Number*) / `pd.NA`:** Marcador padrão para **dado faltante/ausente** (ex.: um sensor que falhou momentaneamente na leitura).
- **Imputação de Dados:** Técnica estatística para preencher valores `NaN` (usando média, mediana ou moda) sem precisar descartar o ensaio inteiro.
- **Outlier (Valor Discrepante):** Ponto muito distante do comportamento típico da amostra — pode indicar um pico real raro ou erro grosseiro de medição/digitação.
- **One-Hot Encoding:** Representação binária vetorial para categorias sem ordem numérica. Se há 3 conservantes (`A`, `B`, `C`), em vez de rotular `1, 2, 3` (o que faria a rede achar erroneamente que `C` vale o triplo de `A`), usamos 3 saídas binárias: `A = [1, 0, 0]`, `B = [0, 1, 0]`, `C = [0, 0, 1]`.
- **Normalização (Min-Max) e Padronização (*StandardScaler* / Z-score):** Reescalonamento das entradas para faixas comparáveis (como `[0, 1]` no Min-Max, ou média `0` e desvio padrão `1` no Z-score: $z = (x - \mu)/\sigma$). *Analogia:* Equivale à **adimensionalização** em Fenômenos de Transporte — impede que uma variável na casa de `250 °C` domine numericamente outra na casa de `0,02 mm`.
- **Divisão Treino / Validação / Teste (*Train-Test Split*):** Separação das amostras em um conjunto para ajustar os pesos (**treino**) e outro inédito guardado a sete chaves para medir o desempenho real (**teste**).
- **Vazamento de Dados (*Data Leakage*):** Erro metodológico grave em que informações do conjunto de teste "vazam" para o treinamento (por exemplo, calcular a média/desvio do `StandardScaler` na tabela inteira *antes* de separar treino e teste). *Analogia:* Calibrar um instrumento usando as próprias amostras cegas da prova de certificação.

---

## 3. Arquitetura de Redes Neurais Artificiais

- **Perceptron Simples:** O neurônio artificial clássico proposto por Frank Rosenblatt (1958). Calcula uma combinação linear das entradas e aplica uma função degrau, funcionando apenas para classes **linearmente separáveis**.
- **Pesos Sinápticos ($\mathbf{w}$):** Coeficientes multiplicativos ajustáveis associados a cada entrada. *Analogia:* Funcionam como o **grau de abertura de válvulas** em uma tubulação industrial — quanto maior o módulo do peso, maior a influência daquela variável na decisão final.
- **Viés / *Bias* / Limiar de Ativação ($\theta$ ou $w_0$):** Termo constante somado ao potencial do neurônio (frequentemente implementado fixando uma entrada $x_0 = -1$ multiplicada por $w_0 = \theta$). *Analogia:* É o **parafuso de *offset* (zero) de calibração** de um sensor ou o coeficiente linear $b$ da reta $y = ax + b$, permitindo deslocar a fronteira de decisão para longe da origem.
- **Potencial de Ativação ($u$):** Soma ponderada das entradas pelos pesos descontando o limiar: $u = \sum_{i=1}^{n} w_i x_i - \theta$.
- **Fronteira de Decisão e Separabilidade Linear:** Lugar geométrico onde $u = 0$ (uma reta em 2D, um plano em 3D, um hiperplano em $n$D). Um problema é **linearmente separável** quando um único corte reto separa perfeitamente as classes (como as portas `AND` e `OR`, mas **não** a porta `XOR`).
- **Função de Ativação ($g(u)$):** Transformação matemática aplicada sobre $u$ para gerar a saída do neurônio:
  - **Degrau / Degrau Bipolar:** Saída brusca `{0, 1}` ou `{-1, +1}` (usada no Perceptron simples; derivada nula impede *Backpropagation*).
  - **Logística / Sigmóide ($\sigma(u) = \frac{1}{1 + e^{-u}}$):** Curva suave em formato de "S" contida entre `0` e `1`, contínua e diferenciável, clássica em redes PMC.
  - **ReLU ($\max(0, u)$):** Mantém valores positivos e zera negativos (como um diodo retificador ideal na Eletrônica); evita saturação do gradiente em redes modernas.
  - **Softmax:** Converte o vetor de saídas da última camada em **probabilidades** que somam `1,0` (`100%`), ideal para classificação multiclasse mutuamente exclusiva.
- **PMC / MLP (*Perceptron Multicamadas* / *Multi-Layer Perceptron*):** Rede neural com uma ou mais **camadas ocultas** entre a entrada e a saída. Ao combinar funções não lineares em cascata, atua como um **aproximador universal de funções**, curvando e dobrando fronteiras de decisão.
- **TDNN (*Time-Delay Neural Network* / Rede com Atraso no Tempo):** Um PMC alimentado por uma **janela deslizante** de medidas passadas $[x(t-1), x(t-2), \dots, x(t-p)]$ para prever o valor futuro $x(t)$. *Analogia:* Versão neural não linear de um filtro digital FIR / modelo auto-regressivo (AR) em Controle de Processos.

---

## 4. Treinamento, Otimização e Métricas

- **Época (*Epoch*):** Um ciclo completo em que **todas** as amostras do conjunto de treinamento passaram pela rede uma vez.
- **Batch, Mini-Batch e Aprendizado Online (*Stochastic*):** Define *quando* as válvulas (pesos) são ajustadas:
  - **Online / Estocástico (`batch_size = 1`):** Ajusta os pesos imediatamente após **cada amostra** individual (padrão usado nas implementações manuais do livro-base).
  - **Batch Completo:** Acumula o erro da tabela inteira e faz um único ajuste por época.
  - **Mini-Batch (ex.: `batch_size = 16` ou `32`):** Ajusta os pesos a cada pequeno pacote de amostras, equilibrando estabilidade numérica e velocidade vetorial.
- **Regra de Hebb / Regra de Aprendizado do Perceptron:** Princípio supervisionado de correção por erro usado no Perceptron: $\mathbf{w} \leftarrow \mathbf{w} + \eta (d - y)\mathbf{x}$ ("se acertou, não mexa; se errou, ajuste proporcionalmente ao erro e à entrada"). *(Nota: Na neurociência, o postulado original de Hebb de 1949 é não supervisionado; o livro-base adota o termo "regra de Hebb" em sentido amplo para a regra de Rosenblatt).*
- **Erro Quadrático Médio (*MSE — Mean Squared Error*):** Média dos quadrados dos erros entre valor desejado e previsto. Penaliza fortemente erros grandes, análogo à energia dissipada ($e^2$).
- **Gradiente Descendente (*Gradient Descent*):** Método numérico iterativo que calcula as derivadas parciais do erro em relação aos pesos ($\nabla E$) e dá um passo no sentido oposto ao gradiente (sentido de maior descida). *Analogia:* Uma esfera solta na encosta de um vale montanhoso buscando o fundo de menor energia potencial.
- **Taxa de Aprendizado (*Learning Rate*, $\eta$):** Constante positiva (ex.: `0.01` ou `0.1`) que multiplica o passo de atualização dos pesos. *Analogia:* Tamanho do passo ao descer uma escada no escuro — passos gigantes causam oscilação/divergência; passos microscópicos levam horas para chegar lá embaixo.
- **Backpropagation (Retropropagação do Erro / Regra Delta Generalizada):** Algoritmo que aplica a **Regra da Cadeia do Cálculo Diferencial** de trás para frente (da camada de saída rumo às camadas ocultas), descobrindo a parcela de culpa ($\delta$) de cada neurônio interno no erro final.
- **Momentum ($\alpha$):** Fração (ex.: `0.8` ou `0.9`) da atualização anterior de pesos somada à atualização atual: $\Delta \mathbf{W}(t) = \eta \delta \mathbf{x}^T + \alpha \Delta \mathbf{W}(t-1)$. *Analogia:* **Inércia mecânica** da esfera que desce a montanha — o embalo acumulado acelera a descida em corredores suaves e ajuda a escapar de pequenos buracos (mínimos locais).
- **Adam (*Adaptive Moment Estimation*):** Otimizador moderno que ajusta automaticamente uma taxa de aprendizado individual para cada peso combinando *Momentum* e escala adaptativa dos gradientes.
- **Overfitting (Sobreajuste) vs. Underfitting (Subajuste):**
  - **Underfitting:** Modelo simples demais (ex.: tentar ajustar uma reta a uma curva senoidal); erra tanto no treino quanto no teste.
  - **Overfitting:** Modelo complexo demais ou treinado em excesso em poucos dados; "decora" até o ruído experimental do treino (`erro ≈ 0`), mas falha em amostras novas no teste.
- **Regularização (`alpha` / L2) e `Dropout`:** Freios contra *overfitting*. A regularização L2 penaliza pesos exageradamente altos; o `Dropout` desliga aleatoriamente uma fração de neurônios a cada passo de treino para forçar redundância robusta na rede.
- **Métricas de Avaliação:**
  - **Acurácia (*Accuracy*):** Porcentagem total de classificações corretas (`acertos / total * 100%`).
  - **MAE (*Mean Absolute Error*):** Média do erro absoluto $|d - y|$, expressa na mesma unidade física da variável (ex.: `±2,5 MPa`).
  - **Erro Relativo Médio (%):** Média de $\frac{|d - y|}{|d|} \times 100\%$, medindo o desvio percentual típico em engenharia.
  - **Coeficiente de Determinação ($R^2$):** Mede quanto da variância do fenômeno físico o modelo explica (`1,0` = ajuste perfeito; `0,0` = equivale a chutar sempre a média; negativo = pior que a média).

