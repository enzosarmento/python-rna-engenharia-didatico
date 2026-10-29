# Desafio Multiclasse: Classificação da Flor de Íris

O conjunto de dados **Iris** (introduzido pelo estatístico Ronald Fisher em 1936) é o "Olá, Mundo!" universal da classificação multiclasse em Aprendizado de Máquina.

Para a **Engenharia**, embora o exemplo clássico venha da botânica, a matemática é **exatamente a mesma** usada para classificar **3 tipos de falhas em rolamentos**, **3 graus de pureza química** ou **3 conservantes industriais** (como veremos na pasta [`../engenharia/`](../engenharia/README.md))!

---

## O Problema e os Dados

Cada amostra mede quatro dimensões geométricas da flor (em centímetros):
1. `sepal_length` — Comprimento da sépala
2. `sepal_width` — Largura da sépala
3. `petal_length` — Comprimento da pétala
4. `petal_width` — Largura da pétala

A partir dessas 4 medidas ($x_1, x_2, x_3, x_4$), devemos identificar a espécie (`class`) dentre três possibilidades:
- **`Iris-setosa`** (linearmente separável das demais!)
- **`Iris-versicolor`** (apresenta fronteira não linear / sobreposição parcial com a *virginica*)
- **`Iris-virginica`**

Arquivos utilizados (em [`../arquivos-csv/`](../arquivos-csv/)):
- `iris_train.csv`: Amostras rotuladas para treinar e validar seu classificador.
- `iris_exercise.csv`: Amostras sem rótulo para gerar as previsões finais em `.csv`.

---

## Ordem dos Notebooks

1. **[`01_desafio_iris_parte1_perceptron.ipynb`](01_desafio_iris_parte1_perceptron.ipynb)** — Inspeção visual da geometria das 3 espécies e classificação linear multiclasse (*One-vs-Rest*) com **Perceptron Simples** (`Scikit-Learn` vs. `Python/NumPy Puro`).
2. **[`02_desafio_iris_parte2_mlp.ipynb`](02_desafio_iris_parte2_mlp.ipynb)** — Codificação **One-Hot Encoding** (`[1,0,0]`, `[0,1,0]`, `[0,0,1]`) e fronteiras curvas com **Perceptron Multicamadas (MLP)** e *Backpropagation* (`Scikit-Learn` vs. `Python/NumPy Puro` com *bias*).

