# -*- coding: utf-8 -*-
"""
Módulo Didático: Análise e Classificação de Parâmetros de Impressão 3D (FDM)
===========================================================================

Este script autônomo em Python demonstra o fluxo completo e sem vazamento de dados
(Data Leakage) para carregar o conjunto experimental `data.csv` (50 corpos de prova
impressos em ABS e PLA), gerar gráficos exploratórios em português e comparar
classificadores supervisionados (KNN, MLP do Scikit-Learn e Rede Neural Keras).

Como executar no terminal (a partir desta pasta):
    python3 printer_dataset.py
"""

from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier


def carregar_dados_impressora(caminho_csv: Path) -> pd.DataFrame:
    """Lê o arquivo CSV separado por vírgula e codifica colunas categóricas."""
    # Lê o arquivo usando o separador padrão ',' (corrigido do antigo sep=';')
    df = pd.read_csv(caminho_csv, sep=",")

    # Converte altura de camada (mm -> centésimos de mm) e alongamento para escala percentual
    df["layer_height"] = df["layer_height"] * 100.0
    df["elongation"] = df["elongation"] * 100.0

    # Codificação binária: ABS = 0, PLA = 1
    df["material"] = df["material"].map({"abs": 0, "pla": 1})

    # Codificação binária do padrão de preenchimento: grid = 0, honeycomb (colmeia) = 1
    df["infill_pattern"] = df["infill_pattern"].map({"grid": 0, "honeycomb": 1})

    return df


def plotar_relacoes_fisicas(df: pd.DataFrame) -> None:
    """Gera gráficos 2D e 3D relacionando parâmetros de processo e propriedades mecânicas."""
    abs_df = df[df["material"] == 0]
    pla_df = df[df["material"] == 1]

    # Gráfico 1: Velocidade da ventoinha vs. Resistência à tração
    plt.figure(figsize=(8, 5))
    plt.scatter(
        abs_df["fan_speed"], abs_df["tension_strenght"],
        color="crimson", label="ABS (sensível a resfriamento brusco)", alpha=0.75
    )
    plt.scatter(
        pla_df["fan_speed"], pla_df["tension_strenght"],
        color="seagreen", label="PLA (beneficiado pela ventilação)", alpha=0.75
    )
    plt.title("Efeito da Ventilação na Resistência à Tração (ABS vs. PLA)")
    plt.xlabel("Velocidade da Ventoinha (%)")
    plt.ylabel("Resistência à Tração (MPa)")
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.legend()
    plt.tight_layout()
    plt.show()

    # Gráfico 2: Altura de camada vs. Rugosidade superficial
    plt.figure(figsize=(8, 5))
    plt.scatter(
        abs_df["layer_height"], abs_df["roughness"],
        color="royalblue", label="ABS", alpha=0.8
    )
    plt.scatter(
        pla_df["layer_height"], pla_df["roughness"],
        color="darkorange", label="PLA", alpha=0.8
    )
    plt.title("Altura de Camada vs. Rugosidade Superficial")
    plt.xlabel("Altura de Camada (x 0,01 mm)")
    plt.ylabel("Rugosidade Superficial (µm)")
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.legend()
    plt.tight_layout()
    plt.show()

    # Gráfico 3: Espaço tridimensional (Densidade x Espessura de Parede x Tração)
    fig = plt.figure(figsize=(9, 6))
    ax = fig.add_subplot(111, projection="3d")
    ax.scatter(
        df["infill_density"], df["wall_thickness"], df["tension_strenght"],
        c=df["material"], cmap="coolwarm", s=50, edgecolors="k"
    )
    ax.set_title("Relação 3D: Preenchimento, Parede e Resistência à Tração")
    ax.set_xlabel("Densidade de Preenchimento (%)")
    ax.set_ylabel("Espessura da Parede (mm)")
    ax.set_zlabel("Resistência à Tração (MPa)")
    plt.tight_layout()
    plt.show()


def treinar_e_avaliar_modelos(df: pd.DataFrame) -> None:
    """Treina KNN e Rede Neural sem vazamento de dados (split ANTES do scaler)."""
    y = df["material"].values
    X = df.drop(["material"], axis=1).values

    # 1. Divisão Treino/Teste ANTES da normalização (evita Data Leakage!)
    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X, y, test_size=0.30, random_state=42, stratify=y
    )

    # 2. Normalização Min-Max calibrada exclusivamente no conjunto de treino
    scaler = MinMaxScaler()
    X_train = scaler.fit_transform(X_train_raw)
    X_test = scaler.transform(X_test_raw)

    # 3. Avaliação do classificador KNN variando k de 1 a 14
    scores_knn = []
    for k in range(1, 15):
        knn = KNeighborsClassifier(n_neighbors=k)
        knn.fit(X_train, y_train)
        acc = knn.score(X_test, y_test)
        scores_knn.append(acc)
        print(f"KNN (k={k:2d}) -> Acurácia no teste: {acc * 100:.2f}%")

    plt.figure(figsize=(8, 4))
    plt.plot(range(1, 15), scores_knn, marker="o", color="teal")
    plt.title("Sensibilidade do KNN ao Número de Vizinhos (k)")
    plt.xlabel("Número de vizinhos (k)")
    plt.ylabel("Acurácia no Teste")
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.tight_layout()
    plt.show()

    # 4. Rede Neural MLP (Scikit-Learn) para classificação binária ABS (0) vs PLA (1)
    mlp = MLPClassifier(
        hidden_layer_sizes=(16, 8),
        activation="relu",
        solver="lbfgs",  # Otimizador ideal para conjuntos pequenos (N=50)
        max_iter=1000,
        random_state=42,
    )
    mlp.fit(X_train, y_train)
    acc_mlp = mlp.score(X_test, y_test)
    print(f"\nRede Neural MLP (Scikit-Learn) -> Acurácia no teste: {acc_mlp * 100:.2f}%")

    # 5. Exemplo de predição para uma nova peça ensaiada (normalizando com o mesmo scaler!)
    amostra_nova = np.array([[
        4.0,   # layer_height * 100 (0.04 mm)
        5.0,   # wall_thickness (mm)
        60.0,  # infill_density (%)
        0.0,   # infill_pattern (0 = grid)
        232.0, # nozzle_temperature (°C — típico de ABS!)
        74.0,  # bed_temperature (°C)
        90.0,  # print_speed (mm/s)
        100.0, # fan_speed (%)
        150.0, # roughness (µm)
        30.0,  # tension_strenght (MPa)
        200.0, # elongation * 100 (%)
    ]])
    amostra_norm = scaler.transform(amostra_nova)
    classe_prevista = int(mlp.predict(amostra_norm)[0])
    nome_material = "ABS" if classe_prevista == 0 else "PLA"
    print(f"Predição para a nova amostra ensaiada: Material identificado = {nome_material} (classe {classe_prevista})")


if __name__ == "__main__":
    pasta_atual = Path(__file__).resolve().parent
    arquivo_dados = pasta_atual / "data.csv"
    tabela = carregar_dados_impressora(arquivo_dados)
    plotar_relacoes_fisicas(tabela)
    treinar_e_avaliar_modelos(tabela)
