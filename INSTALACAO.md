# Guia de Instalação Passo a Passo (Do Zero Absoluto)

Bem-vindo(a)! Se você cursa Engenharia e **nunca instalou Python nem abriu um terminal na vida**, este guia foi escrito especialmente para você.

Para estudar este repositório, você precisa de duas coisas funcionando juntas (pense nelas como a **oficina** e a **caixa de ferramentas**):
1. **Python + JupyterLab** (a bancada de laboratório onde escrevemos e executamos os cálculos interativamente).
2. **Bibliotecas Científicas** (`numpy`, `pandas`, `matplotlib`, `seaborn`, `scikit-learn`, `tensorflow`), que são os módulos matemáticos prontos listados no arquivo [`requirements.txt`](requirements.txt).

Escolha **apenas UMA** das três opções abaixo conforme a sua preferência:
- **Opção 1 (Recomendada para Iniciantes):** Anaconda + JupyterLab (instalação visual, já traz quase tudo pronto).
- **Opção 2 (Leve e Profissional):** Python oficial + VS Code + Ambiente Virtual (`venv`).
- **Opção 3 (Sem Instalar Nada no Computador):** Google Colab (roda direto no navegador de internet).

---

## Opção 1: Anaconda + JupyterLab (Recomendada)

O **Anaconda** é um pacote gratuito criado para cientistas e engenheiros. Ao instalá-lo, você recebe automaticamente o Python, o **JupyterLab** (interface onde abrimos os arquivos `.ipynb`) e as principais bibliotecas matemáticas (`numpy`, `pandas`, `matplotlib`, `seaborn` e `scikit-learn`).

### Passo 1 — Baixar e instalar o Anaconda
1. Acesse o site oficial: https://www.anaconda.com/download (você pode clicar em *Skip registration* se não quiser criar conta).
2. Baixe o instalador correspondente ao seu sistema operacional (**Windows**, **macOS** ou **Linux**).
3. Execute o instalador mantendo as opções padrão (*Next → Agree → Just Me → Install*).
   > **Atenção no Windows:** Não precisa marcar a caixa *"Add Anaconda3 to my PATH"* se o instalador avisar que não é recomendado; usaremos o **Anaconda Prompt**, que já configura tudo sozinho.

### Passo 2 — Baixar este repositório para o seu computador
- **Se você usa Git:** Abra o **Anaconda Prompt** (Windows) ou **Terminal** (Linux/macOS) e execute:
  ```bash
  git clone <URL_DO_REPOSITORIO>
  cd rna-engenharia
  ```
- **Se você não usa Git:** Na página inicial deste repositório no GitHub, clique no botão verde **`<> Code`** → **`Download ZIP`**. Extraia a pasta `.zip` dentro da sua pasta `Documentos` (por exemplo: `Documentos/rna-engenharia`).

### Passo 3 — Instalar o pacote complementar (`tensorflow`)
O Anaconda já traz quase tudo, faltando apenas o `tensorflow` (usado nos comparativos avançados de Deep Learning).
1. Abra o programa **Anaconda Prompt** no menu Iniciar (ou o **Terminal** no Linux/macOS).
2. Navegue até a pasta onde você salvou o projeto:
   ```bash
   cd Documentos/rna-engenharia
   ```
   *(Se o seu Windows estiver em inglês, use `cd Documents/rna-engenharia`.)*
3. Instale todas as dependências garantidas pelo arquivo `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

### Passo 4 — Abrir o JupyterLab
Ainda dentro da pasta `rna-engenharia` no **Anaconda Prompt** / **Terminal**, digite:
```bash
jupyter lab
```
Uma aba abrirá automaticamente no seu navegador! Na barra lateral esquerda do JupyterLab:
1. Dê um duplo clique na pasta `documentacao-didatica`.
2. Dê um duplo clique em `00_introducao_python_engenharia.ipynb` para começar seus estudos!

---

## Opção 2: Python Oficial + VS Code + Ambiente Virtual (`venv`)

Se você prefere usar o editor **Visual Studio Code (VS Code)** sem instalar o Anaconda completo:

1. **Instale o Python (3.10 a 3.12):** Baixe em https://www.python.org/downloads/.
   - **Importante no Windows:** Na primeira tela do instalador, **marque a caixinha `Add python.exe to PATH`** antes de clicar em *Install Now*.
2. **Instale o VS Code:** Baixe em https://code.visualstudio.com/. Dentro do VS Code, clique no ícone de **Extensões** (barra esquerda) e instale as extensões oficiais **Python** e **Jupyter** (ambas da Microsoft).
3. **Crie um Ambiente Virtual isolado (boa prática de engenharia):**
   Abra a pasta `rna-engenharia` no VS Code (`Arquivo → Abrir Pasta...`), abra o terminal integrado (`Ctrl + '` ou menu `Terminal → Novo Terminal`) e execute:

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
3. **Atenção aos arquivos `.csv`:** No Colab, clique no ícone de **Pasta** na barra lateral esquerda e faça upload dos arquivos `.csv` usados na aula (ou clone o repositório inteiro dentro de uma célula inicial executando `!git clone <URL_DO_REPOSITORIO>`).

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

