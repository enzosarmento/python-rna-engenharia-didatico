---
name: stitch-to-pages
description: Constrói um site estático baseado no design exportado do Google Stitch, usando o conteúdo real do repositório, e configura a implantação automática no GitHub Pages sem custos de hospedagem. Use quando o usuário solicitar "fazer o site do repositório", "colocar no ar com GitHub Pages" ou "usar o design do Stitch".
---

# Construir Site do Repositório e Publicar no GitHub Pages

## Objetivo (Goal)
Converter o design HTML/CSS exportado do Google Stitch em um site estático funcional que exibe o conteúdo real do repositório didático (README, notebooks, glossário) de forma amigável para alunos de engenharia, e configurar a implantação automática e gratuita via GitHub Pages.

## Público-Alvo
Estudantes de Engenharia iniciantes em programação. O site deve ser limpo, legível, com blocos de código claros e navegação intuitiva. Não precisa ser idêntico ao Stitch, mas deve usar sua estrutura visual (layout, cores, tipografia) como inspiração.

## Pré-requisitos
- O usuário deve ter exportado o HTML do Stitch (arquivos `.html` com Tailwind CSS embutido) e colocado em uma pasta acessível no repositório (ex: `stitch-export/`).
- O repositório deve ser **público** (GitHub Pages gratuito exige repositório público).

## Instruções (Instructions)

### Etapa 1: Preparar a Estrutura do Site
1. Crie uma pasta `docs/` na raiz do repositório. Esta será a pasta de publicação do GitHub Pages.
2. Se o Stitch exportou múltiplas telas (ex: `home.html`, `content.html`), renomeie a tela principal para `index.html` e mova todos os arquivos HTML/CSS/JS necessários para `docs/`.
3. Analise o HTML exportado do Stitch. Identifique os blocos de layout (sidebar, área de conteúdo, header) e as classes Tailwind utilizadas.

### Etapa 2: Injetar o Conteúdo Real
1. Leia o `README.md` do repositório. Extraia as seções principais (Objetivo, Instalação, Estrutura, Ordem de Estudo, Glossário).
2. Modifique o `index.html` em `docs/` para substituir o conteúdo de exemplo do Stitch pelos textos reais do README. Mantenha a estrutura visual (cores, espaçamentos, tipografia) do Stitch.
3. Para os notebooks: crie uma página separada (ex: `notebooks.html`) em `docs/` que liste os arquivos `.ipynb` com links para visualização. Como o GitHub renderiza notebooks nativamente, os links podem apontar para `https://github.com/enzosarmento/python-rna-engenharia-didatico/blob/main/caminho/do/notebook.ipynb`.
4. Para o glossário: se você criou `GLOSSARIO.md`, crie uma página `glossario.html` em `docs/` com o conteúdo convertido para HTML.
5. **Importante**: Se o Stitch usou Tailwind via CDN, mantenha o link do CDN no `<head>`. Se o CSS foi extraído, certifique-se de que o arquivo `.css` esteja em `docs/`.

### Etapa 3: Adaptação Mobile
1. Verifique se o HTML exportado do Stitch já inclui meta viewport (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`). Se não, adicione.
2. Teste mentalmente: a sidebar deve colapsar em um menu hambúrguer em telas pequenas. Se o Stitch não gerou isso, adicione uma media query simples no CSS ou use as classes responsivas do Tailwind (`md:hidden`, `md:block`, etc.).

### Etapa 4: Configurar GitHub Pages (Deploy Gratuito)
**Opção A (Recomendada): Deploy via branch `main` e pasta `/docs`**
1. No GitHub, vá em **Settings > Pages**.
2. Em "Build and deployment", Source: **Deploy from a branch**.
3. Branch: **main**, Folder: **/docs**.
4. Clique em Save. O site ficará disponível em `https://enzosarmento.github.io/python-rna-engenharia-didatico/` (pode levar alguns minutos).

**Opção B: Deploy via GitHub Actions (se precisar de build)**
1. Crie `.github/workflows/deploy.yml` com o workflow padrão do GitHub para Pages.
2. Use as actions `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4` e `actions/deploy-pages@v4`.
3. Configure a Source em Settings > Pages como **GitHub Actions**.

### Etapa 5: Verificação Final
1. Confirme que o `index.html` está na raiz de `docs/` (obrigatório para GitHub Pages).
2. Verifique se todos os links internos funcionam (ex: link para `notebooks.html` deve existir).
3. Adicione um link para o site no `README.md` do repositório (ex: "🌐 Acesse a versão online: https://...").

## Restrições (Constraints)
- **NUNCA** coloque arquivos `.ipynb` diretamente em `docs/` para "renderizar" — o GitHub Pages não executa notebooks. Use links para o GitHub.
- **NUNCA** use frameworks que exigem build (React, Vue) se o Stitch exportou HTML estático puro. Mantenha simples.
- **SEMPRE** priorize a legibilidade: o site é para estudo, não para demonstração de design.
- **SEMPRE** verifique se o repositório é público antes de configurar Pages (se for privado, o Pages não funcionará no plano gratuito).

## Fluxo de Execução Sugerido
1. Liste os arquivos exportados do Stitch que o usuário forneceu.
2. Apresente um plano: quais páginas criar (`index.html`, `glossario.html`, `notebooks.html`), como mapear o conteúdo do README para cada uma.
3. Após confirmação, crie/edite os arquivos em `docs/`.
4. Configure o GitHub Pages via Settings (Opção A) e informe a URL final.