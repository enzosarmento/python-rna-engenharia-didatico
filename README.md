# Documentação Didática: IA e Manipulação de Dados para Engenharia

Este repositório contém um conjunto de documentações didáticas focadas em alunos de engenharia que estão iniciando sua jornada em Manipulação de Dados, Inteligência Artificial e Aprendizado de Máquina. 

O objetivo é fornecer uma base sólida, utilizando bibliotecas padrão da indústria, explicadas de forma clara e com exemplos práticos, indo da manipulação básica até a implementação manual de redes neurais.

---

## 🚀 Fluxo de Aprendizado

Recomendamos seguir esta ordem para uma compreensão completa:

### 1. 📋 [Pandas](pandas.ipynb)
**Foco:** Manipulação de tabelas e análise exploratória.
- Leitura de arquivos ` CSV `.
- Estatísticas descritivas (` head `, ` tail `, ` describe `, ` info `).
- Tratamento de dados faltantes (` NaN `) e substituições.
- Conversão de tipos de dados para análise.

### 2. 🔢 [NumPy](numpy.ipynb)
**Foco:** Computação numérica e álgebra linear (a base da IA).
- Criação de vetores e matrizes (` ndarray `).
- Geração de sequências (` arange `, ` linspace `) e números aleatórios.
- **Broadcasting:** Operações matemáticas eficientes em massa.
- Resolução de sistemas lineares com ` linalg.solve `.

### 3. 📊 [Visualização de Dados](visualizacao_dados.ipynb)
**Foco:** Storytelling com dados usando ` Matplotlib ` e ` Seaborn `.
- Anatomia de um gráfico (Figure, Axes, Labels).
- Histogramas, Boxplots (identificação de *outliers*) e Countplots.
- Uso do parâmetro ` hue ` para análise de múltiplas dimensões.

### 4. 🧠 [Teoria: O Perceptron](perceptron.ipynb)
**Foco:** A base das Redes Neurais Artificiais.
- Arquitetura de um neurônio artificial (Entradas, Pesos, Viés).
- Regra de Aprendizado de Hebb e Fronteira de Decisão.
- Implementação manual do treinamento e função de previsão.

---

## 🏋️ Atividades e Desafios

Os exercícios estão organizados em pastas temáticas e utilizam um sistema de **soluções ocultas** (clique no título para expandir).

### 🚢 [Projeto Titanic](titanic/)
Aplicação prática dos conceitos em um dataset real de sobrevivência.
- **[Análise com NumPy](titanic/exercicio_numpy.ipynb):** Estatísticas de idade e filtragem de passageiros.
- **[Análise com Pandas](titanic/exercicio_pandas.ipynb):** Cálculo da taxa de sobrevivência por classe socioeconômica.
- **[Visualização de Dados](titanic/exercicio_visualizacao.ipynb):** Gráficos de distribuição e correlação entre variáveis.
- **[Desafio Final: Sobrevivendo ao Titanic](titanic/exercicio_sobrevivendo_ao_titanic.ipynb):** 
    - Comparação entre **Perceptron Simples** (Linear) e **Multicamadas** (MLP).
    - Implementações completas em **Python Puro** e **Scikit-Learn**.

### 🌸 [Projeto Íris](iris/)
Classificação clássica de espécies de flores.
- **[Classificação Flor de Íris](iris/exercicio_flor_de_iris.ipynb):** 
    - Desafio multiclasse (Setosa, Versicolor e Virginica).
    - Implementação de Redes Neurais com **Backpropagation** (Retropropagação) em Python puro.
    - Uso profissional de bibliotecas para modelos não lineares.

---

## 🛠️ Metodologia Didática

- **Puro vs Biblioteca:** Sempre que possível, mostramos como a matemática funciona internamente (Python puro) e como os profissionais resolvem no dia a dia (Scikit-Learn).
- **Prática Ativa:** Cada exercício contém uma célula de prática vazia seguida por uma solução detalhada e comentada.
- **Foco em Engenharia:** As explicações utilizam analogias do mundo físico (vigas, sensores, tolerâncias) para facilitar a compreensão.

## ⚙️ Como usar

1. Clone o repositório.
2. Certifique-se de ter as bibliotecas instaladas: ` pip install numpy pandas matplotlib seaborn scikit-learn `.
3. Abra os notebooks sequencialmente em seu editor favorito (VS Code, JupyterLab ou Google Colab).
