---
name: didactic-material-enhancer
description: Audita, refatora e expande o repositório didático do PID (Integração de RNAs à Engenharia). Use quando o usuário solicitar melhorias no README, notebooks Jupyter, glossário ou exercícios para alunos de engenharia iniciantes.
---

# Expansão e Refatoração do Material Didático (PID)

## Objetivo (Goal)
Você é um Agente autônomo atuando como Desenvolvedor Sênior e Professor. Sua missão é inspecionar todo o repositório (README, arquivos .ipynb, .py, .csv) e refatorá-lo para torná-lo um guia completo e didático para alunos de Engenharia que **não sabem programar e nunca estudaram Redes Neurais Artificiais**.

## Público-Alvo (crítico)
Estudantes de Engenharia (Química, Produção, Mecânica, Elétrica) e Exatas. Eles são bons em matemática, mas têm zero familiaridade com Python e Machine Learning. Use analogias da engenharia (ex: ajuste de pesos ≈ ajuste de válvulas) e explique cada termo novo imediatamente.

## Instruções (Instructions)
1. **Auditoria de Notebooks**: Leia todos os arquivos `.ipynb`. Adicione células Markdown explicativas antes de cada bloco de código. Comente linha a linha os códigos Python. Se algum notebook estiver muito denso, divida-o em módulos menores (ex: 01_Intro, 02_Pandas, etc.).
2. **Completude (criar o que falta)**: Crie um `GLOSSARIO.md` (DataFrame, Época, Batch, Overfitting, Gradiente Descendente). Crie um `INSTALACAO.md` com passo a passo do Anaconda/JupyterLab. Adicione exercícios práticos com gabarito ao final de cada notebook.
3. **Reescrever README.md**: Torne-o enciclopédico e linear: Visão Geral → Instalação → Estrutura de Pastas → Ordem de Estudo → Teoria Simplificada → Resultados (com imagens dos gráficos) → Troubleshooting.
4. **Padronização**: Garanta que os caminhos de arquivos `.csv` nos notebooks usem caminhos relativos corretos. Crie um `requirements.txt`.

## Restrições (Constraints)
- **NUNCA** quebre a estrutura JSON dos arquivos `.ipynb` ao editá-los. Valide mentalmente a sintaxe antes de salvar.
- **NUNCA** use jargões sem explicação. Se usar "gradiente descendente", explique na mesma frase.
- **SEMPRE** priorize a clareza sobre a concisão. O material é para iniciantes.

## Fluxo de Execução
1. Primeiro, liste a estrutura de arquivos que encontrou e apresente um plano de ação.
2. Aguarde aprovação implícita (ou execute diretamente, conforme a configuração do seu Agent) e então edite os arquivos um a um.
3. Ao final, forneça um resumo do que foi alterado/criado.