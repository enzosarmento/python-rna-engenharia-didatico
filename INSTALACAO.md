# Guia de Instalação Passo a Passo (Do Zero Absoluto)

Bem-vindo(a)! Se você cursa Engenharia e **nunca instalou Python nem abriu um terminal na vida**, este guia foi escrito especialmente para você.

Para estudar este repositório, você precisa de duas coisas funcionando juntas (pense nelas como a **oficina** e a **caixa de ferramentas**):
1. **Python + JupyterLab** (a bancada de laboratório onde escrevemos e executamos os cálculos interativamente).
2. **Bibliotecas Científicas** (`numpy`, `pandas`, `matplotlib`, `seaborn`, `scikit-learn`, `tensorflow`), que são os módulos matemáticos prontos listados no arquivo [`requirements.txt`](requirements.txt).

Escolha **apenas UMA** das três opções abaixo conforme a sua preferência:
- **Opção 1 (Recomendada para Iniciantes):** Anaconda + ambiente conda dedicado + JupyterLab.
- **Opção 2 (Leve e Profissional):** Python oficial + VS Code + Ambiente Virtual (`venv`).
- **Opção 3 (Sem Instalar Nada no Computador):** Google Colab (roda direto no navegador de internet).

---

## Opção 1: Anaconda + Ambiente Conda + JupyterLab (Recomendada)

O **Anaconda** é uma distribuição gratuita criada para cientistas e engenheiros. Ela instala o Python, o gerenciador de ambientes **`conda`**, o **Anaconda Navigator** (painel visual) e o **JupyterLab** (interface onde abrimos os arquivos `.ipynb`).

> **Por que criar um ambiente separado?** Um **ambiente conda** é como uma **bancada de laboratório dedicada**: ele guarda uma versão específica do Python e das bibliotecas só para este curso. Assim, nada que você instale aqui quebra outros projetos (ou o próprio Anaconda), e se algo der errado basta apagar o ambiente e recriá-lo em 2 minutos. **Evite instalar pacotes direto no ambiente `base`.**

### Passo 1 — Baixar e instalar o Anaconda
1. Acesse o site oficial: https://www.anaconda.com/download (você pode clicar em *Skip registration* se não quiser criar conta).
2. Baixe o instalador correspondente ao seu sistema operacional (**Windows**, **macOS** ou **Linux**).
3. Execute o instalador mantendo as opções padrão (*Next → I Agree → Just Me → Install*).
   > **Atenção no Windows:** **não** marque a caixa *"Add Anaconda3 to my PATH"* (o próprio instalador avisa que não é recomendado). Usaremos o programa **Anaconda Prompt**, que já vem configurado.
   >
   > **No Linux:** o instalador é um arquivo `.sh`. Execute `bash ~/Downloads/Anaconda3-*-Linux-x86_64.sh`, aceite a licença, confirme o local padrão e responda **`yes`** quando perguntar se deseja inicializar o conda (`conda init`). Depois **feche e reabra o terminal**.
4. **Confirme a instalação:** abra o **Anaconda Prompt** (Windows: menu Iniciar → digite *Anaconda Prompt*) ou o **Terminal** (Linux/macOS) e digite:
   ```bash
   conda --version
   ```
   Se aparecer algo como `conda 24.x.x`, está tudo certo. Repare que o início da linha mostra **`(base)`** — esse é o ambiente padrão do Anaconda.

### Passo 2 — Baixar este repositório para o seu computador
- **Se você usa Git:** no **Anaconda Prompt** / **Terminal**, execute:
  ```bash
  cd Documents
  git clone https://github.com/enzosarmento/python-rna-engenharia-didatico.git
  cd python-rna-engenharia-didatico
  ```
  *(No Windows em português a pasta pode aparecer como `Documentos` no Explorador, mas no terminal o nome real costuma ser `Documents`.)*
- **Se você não usa Git:** na página do repositório no GitHub (https://github.com/enzosarmento/python-rna-engenharia-didatico), clique no botão verde **`<> Code`** → **`Download ZIP`**. Extraia o `.zip` dentro da sua pasta `Documentos` e, no terminal, entre na pasta extraída:
  ```bash
  cd Documents/python-rna-engenharia-didatico-main
  ```

> **Dica:** para conferir se você está na pasta certa, digite `dir` (Windows) ou `ls` (Linux/macOS). Você deve ver os arquivos `README.md`, `requirements.txt` e a pasta `documentacao-didatica`.

### Passo 3 — Criar e ativar o ambiente conda do curso
Ainda no **Anaconda Prompt** / **Terminal**, crie um ambiente chamado `rna-engenharia` com Python 3.11:
```bash
conda create -n rna-engenharia python=3.11 -y
```
Quando terminar, **ative** o ambiente:
```bash
conda activate rna-engenharia
```
O início da linha do terminal deve mudar de **`(base)`** para **`(rna-engenharia)`**. Isso indica que tudo o que você instalar a partir de agora ficará dentro desta bancada isolada.

<details>
<summary><strong>Prefere fazer pelo painel visual (Anaconda Navigator)? Clique aqui.</strong></summary>

1. Abra o **Anaconda Navigator** no menu Iniciar (ou digite `anaconda-navigator` no terminal).
2. Na barra lateral esquerda, clique em **Environments**.
3. Na parte inferior, clique em **Create** (ícone `+`).
4. Em *Name*, digite `rna-engenharia`; em *Packages*, marque **Python** e escolha a versão **3.11**. Clique em **Create**.
5. Depois de criado, clique na **seta verde ▶** ao lado do nome `rna-engenharia` e escolha **Open Terminal**. Um terminal já com o ambiente ativado será aberto — continue a partir do **Passo 4** (lembre-se de navegar com `cd` até a pasta do repositório).
</details>

### Passo 4 — Instalar as bibliotecas do curso dentro do ambiente
Com o ambiente **`(rna-engenharia)`** ativo e dentro da pasta do repositório, instale todas as dependências listadas em [`requirements.txt`](requirements.txt) (`numpy`, `pandas`, `matplotlib`, `seaborn`, `scikit-learn`, `tensorflow`, `jupyterlab` e `ipykernel`):
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```
> **Por que `pip` e não `conda install`?** O próprio TensorFlow recomenda a instalação via `pip`. Usar o `pip` **dentro** de um ambiente conda ativado é seguro: os pacotes ficam restritos ao ambiente `rna-engenharia`.
>
> A instalação pode levar alguns minutos (o `tensorflow` tem cerca de 500 MB).

### Passo 5 — Registrar o ambiente como Kernel do Jupyter
Este comando faz o ambiente aparecer com um nome amigável no seletor de **Kernel** do JupyterLab e do VS Code:
```bash
python -m ipykernel install --user --name rna-engenharia --display-name "Python (rna-engenharia)"
```

### Passo 6 — Abrir o JupyterLab
Ainda com o ambiente ativo e dentro da pasta do repositório, digite:
```bash
jupyter lab
```
Uma aba abrirá automaticamente no navegador (endereço `http://localhost:8888/lab`). Na barra lateral esquerda do JupyterLab:
1. Dê um duplo clique na pasta `documentacao-didatica`.
2. Dê um duplo clique em `00_introducao_python_engenharia.ipynb`.
3. No canto superior direito do notebook, confira se o Kernel selecionado é **`Python (rna-engenharia)`** (se não for, clique nele e troque).

> **Não feche o terminal** enquanto estiver usando o JupyterLab — ele é o "motor" que executa os cálculos. Para encerrar, salve seus notebooks, volte ao terminal e pressione **`Ctrl + C`** (confirme com `y` se for solicitado).

### Nos próximos dias (uso diário)
Você **não** precisa reinstalar nada. Sempre que for estudar, basta:
```bash
conda activate rna-engenharia
cd Documents/python-rna-engenharia-didatico
jupyter lab
```

### Comandos úteis de manutenção do ambiente
| Objetivo | Comando |
| :--- | :--- |
| Listar todos os ambientes criados | `conda env list` |
| Voltar para o ambiente `base` | `conda deactivate` |
| Ver os pacotes instalados no ambiente ativo | `pip list` |
| Apagar o ambiente e recomeçar do zero (se algo quebrar) | `conda deactivate` e depois `conda env remove -n rna-engenharia` |

---

## Opção 2: Python Oficial + VS Code + Ambiente Virtual (`venv`)

Se você prefere usar o editor **Visual Studio Code (VS Code)** sem instalar o Anaconda completo:

1. **Instale o Python (3.10 a 3.12):** Baixe em https://www.python.org/downloads/.
   - **Importante no Windows:** Na primeira tela do instalador, **marque a caixinha `Add python.exe to PATH`** antes de clicar em *Install Now*.
2. **Instale o VS Code:** Baixe em https://code.visualstudio.com/. Dentro do VS Code, clique no ícone de **Extensões** (barra esquerda) e instale as extensões oficiais **Python** e **Jupyter** (ambas da Microsoft).
3. **Crie um Ambiente Virtual isolado (boa prática de engenharia):**
   Abra a pasta do repositório (`python-rna-engenharia-didatico`) no VS Code (`Arquivo → Abrir Pasta...`), abra o terminal integrado (`Ctrl + '` ou menu `Terminal → Novo Terminal`) e execute:

   **No Linux / macOS:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

   **No Windows (PowerShell):**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
4. Ao abrir qualquer arquivo `.ipynb` no VS Code, clique em **Select Kernel** (canto superior direito) e escolha o ambiente **`.venv`**.

---

## Opção 3: Google Colab (Zero Instalação)

Está em um computador de laboratório da universidade sem permissão de administrador? Use o **Google Colab**:
1. Acesse https://colab.research.google.com/ com sua conta Google.
2. Clique em **Arquivo → Fazer upload de notebook** e selecione o arquivo `.ipynb` desejado (ou abra diretamente pela aba **GitHub** colando o link deste repositório).
3. **Atenção aos arquivos `.csv`:** No Colab, clique no ícone de **Pasta** na barra lateral esquerda e faça upload dos arquivos `.csv` usados na aula (ou clone o repositório inteiro dentro de uma célula inicial executando `!git clone https://github.com/enzosarmento/python-rna-engenharia-didatico.git`).

---

## Como Usar um Notebook Jupyter (`.ipynb`)

Um **Jupyter Notebook** funciona como um memorial de cálculo vivo: ele intercala **células de texto explicativo (Markdown)** e **células de código executável (Python)**.

- **Executar uma célula e avançar para a próxima:** Clique na célula de código e pressione **`Shift + Enter`**.
- **Ordem importa!** Assim como em uma planilha de engenharia ou dedução matemática, as variáveis criadas na Célula 1 são usadas na Célula 2. Se você abrir um notebook e tentar rodar direto a última célula sem ter rodado as anteriores, o Python dirá `NameError: name 'df' is not defined` (pois a tabela ainda não foi carregada na memória).
- **Destravar ou recomeçar do zero:** No menu superior do JupyterLab, clique em **`Kernel → Restart Kernel and Run All Cells...`** para limpar a memória e executar tudo na ordem correta de cima para baixo.

---

## Teste Rápido de Verificação (30 Segundos)

Quer ter certeza de que tudo está funcionando? Crie uma célula de código ou rode no terminal:

```python
import numpy as np
import pandas as pd
import matplotlib
import seaborn as sns
import sklearn

print("Ambiente configurado com sucesso!")
print("NumPy:", np.__version__, "| Pandas:", pd.__version__, "| Scikit-Learn:", sklearn.__version__)
```

Se aparecer `"Ambiente configurado com sucesso!"`, você está pronto(a) para iniciar pelo [`README.md`](README.md)!

