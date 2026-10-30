# Desafios Práticos: Projeto Titanic

Bem-vindo(a) à bateria de exercícios aplicados sobre o histórico conjunto de dados do naufrágio do **RMS Titanic (1912)**, obtido na plataforma **[Kaggle](https://www.kaggle.com/)**. Aqui você colocará em prática, degrau por degrau, tudo o que estudou nos Módulos `01` a `06` da trilha base.

---

## Dicionário de Variáveis do Dataset

Os arquivos estão armazenados em [`../arquivos-csv/`](../arquivos-csv/):

| Coluna | Significado | Observação de Engenharia de Dados |
| :--- | :--- | :--- |
| `pclass` | Classe socioeconômica do bilhete (`1`, `2` ou `3`) | Forte indicador de localização do camarote no convés. |
| `survived` | Variável alvo (`1` = sobreviveu, `0` = não sobreviveu) | Presente no treino; omitida em `titanic_exercise.csv`. |
| `name` | Nome completo incluindo pronome de tratamento (`Mr.`, `Miss.`, `Master.`) | Útil para estimar faixa etária quando `age` está ausente. |
| `sex` | Gênero (`male` ou `female`) | Precisa ser convertido em `0`/`1` antes da Rede Neural. |
| `age` | Idade em anos | Contém valores `'?'` / `NaN` que exigem conversão e imputação. |
| `sibsp` / `parch` | Irmãos/cônjuges (`sibsp`) e pais/filhos (`parch`) a bordo | Combinados formam o tamanho da família (`sibsp + parch + 1`). |
| `fare` | Valor pago pela passagem (em libras esterlinas £) | Possui assimetria forte (*outliers* na 1ª classe). |
| `embarked` | Porto de embarque (`S`, `C` ou `Q`) | Variável categórica nominal. |
| `boat` / `body` | Número do bote salva-vidas / identificação de corpo | **Proibido usar em modelos preditivos!** São dados pós-evento (*Data Leakage*). |

---

## Ordem Recomendada dos Exercícios

1. **[`01_exercicio_numpy.ipynb`](01_exercicio_numpy.ipynb)** — Estatísticas descritivas, limpeza de `NaN` com máscaras booleanas e filtragem vetorial usando exclusivamente `NumPy`.
2. **[`02_exercicio_pandas.ipynb`](02_exercicio_pandas.ipynb)** — Agrupamento (`groupby`) por classe socioeconômica e exportação de relatórios `.csv`.
3. **[`03_exercicio_visualizacao.ipynb`](03_exercicio_visualizacao.ipynb)** — Análise visual de distribuições (`histplot`), contagens (`countplot`) e tarifas (`boxplot`).
4. **[`04_desafio_titanic_parte1_perceptron.ipynb`](04_desafio_titanic_parte1_perceptron.ipynb)** — *Desafio de Classificação Linear:* Engenharia de Atributos sem vazamento de dados + implementação do **Perceptron Simples** em `Scikit-Learn` e em `Python/NumPy Puro`.
5. **[`05_desafio_titanic_parte2_mlp.ipynb`](05_desafio_titanic_parte2_mlp.ipynb)** — *Desafio Não Linear:* Evolução para o **Perceptron Multicamadas (PMC / MLP)** com *Backpropagation* em `Scikit-Learn` e em `Python/NumPy Puro`, comparando o ganho de acurácia frente ao modelo linear.

> **Metodologia de Estudo:** Todos os gabaritos estão recolhidos em blocos expansíveis (`Clique aqui para ver o gabarito comentado`). Tente escrever sua própria solução na célula de prática antes de abrir a resposta!
