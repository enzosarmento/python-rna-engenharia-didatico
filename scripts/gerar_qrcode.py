#!/usr/bin/env python3
"""
gerar_qrcode.py — Sistema de Geração de QR Code para o Portal Didático e Links do Repositório (PID/UESC).

Gera QR Codes em múltiplos formatos:
  1. 'bare': QR Code puro em altíssima resolução (SVG vetorial e PNG).
  2. 'card': Cartão vertical formatado para pôsteres ou painéis.
  3. 'slide': Slide panorâmico no padrão visual dos simpósios (1540 x 600 px, fundo transparente).

Exemplos de uso:
  python scripts/gerar_qrcode.py
  python scripts/gerar_qrcode.py --site
  python scripts/gerar_qrcode.py --github
  python scripts/gerar_qrcode.py --url https://exemplo.com/ --mode bare
  python scripts/gerar_qrcode.py --mode slide --format png
"""

from __future__ import annotations

import argparse
import html
import io
import sys
from pathlib import Path
from typing import Optional

try:
    import qrcode
    from qrcode.constants import ERROR_CORRECT_H
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit(
        "ERRO: A biblioteca 'qrcode' e 'Pillow' são necessárias.\n"
        "Instale com: pip install qrcode[pil] pillow"
    )

# URLs Oficiais Pré-configuradas do Projeto
URL_SITE_PORTAL = "https://enzosarmento.github.io/python-rna-engenharia-didatico/"
URL_GITHUB_REPO = "https://github.com/enzosarmento/python-rna-engenharia-didatico"
URL_NOTEBOOKS = f"{URL_SITE_PORTAL}notebooks.html"
URL_GLOSSARIO = f"{URL_SITE_PORTAL}glossario.html"
URL_INSTALACAO = f"{URL_SITE_PORTAL}instalacao.html"

# Diretórios Padrão
REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUT_DIR = REPO_ROOT / "documentacao-didatica" / "imagens"
DEFAULT_DOCS_IMG_DIR = REPO_ROOT / "docs" / "assets" / "img"

FONT = "Arial, sans-serif"
MONO = "'JetBrains Mono', Consolas, 'DejaVu Sans Mono', monospace"


def criar_matriz_qr(url: str, border: int = 2) -> list[list[bool]]:
    """Gera a matriz booleana do QR Code com nível máximo de correção de erro (H - 30%)."""
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=10,
        border=border,
    )
    qr.add_data(url)
    qr.make(fit=True)
    return qr.get_matrix()


def gerar_svg_bare(
    url: str,
    fill_color: str = "#002444",
    back_color: Optional[str] = "transparent",
    border: int = 2,
    size_px: int = 1000,
) -> str:
    """Gera um arquivo SVG puro do QR Code vetorial com máxima precisão geométrica."""
    matrix = criar_matriz_qr(url, border=border)
    n = len(matrix)

    path_data = []
    for r in range(n):
        for c in range(n):
            if matrix[r][c]:
                path_data.append(f"M{c},{r}h1v1h-1z")
    d_str = "".join(path_data)

    bg_rect = ""
    if back_color and back_color.lower() != "transparent":
        bg_rect = f'  <rect x="0" y="0" width="{n}" height="{n}" fill="{back_color}"/>\n'

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{size_px}" height="{size_px}" viewBox="0 0 {n} {n}">
{bg_rect}  <path d="{d_str}" fill="{fill_color}"/>
</svg>
"""
    return svg


def gerar_png_bare(
    url: str,
    fill_color: str = "#002444",
    back_color: str = "white",
    border: int = 2,
    target_size: int = 1024,
) -> Image.Image:
    """Gera uma imagem PNG de alta resolução do QR Code simples."""
    matrix = criar_matriz_qr(url, border=border)
    n = len(matrix)

    box_size = max(16, target_size // n)
    img_size = n * box_size

    mode = "RGBA" if back_color.lower() == "transparent" else "RGB"
    bg = (255, 255, 255, 0) if mode == "RGBA" else (255, 255, 255)

    im = Image.new(mode, (img_size, img_size), bg)
    draw = ImageDraw.Draw(im)

    for r in range(n):
        for c in range(n):
            if matrix[r][c]:
                x0 = c * box_size
                y0 = r * box_size
                x1 = x0 + box_size
                y1 = y0 + box_size
                draw.rectangle([x0, y0, x1, y1], fill=fill_color)

    if img_size != target_size:
        im = im.resize((target_size, target_size), Image.Resampling.NEAREST)

    return im


def camera_icon_svg(cx: float, cy: float, fill: str = "#1e40af") -> str:
    """Ícone vetorial de câmera fotográfica para substituir emojis de forma consistente."""
    x = cx - 9
    y = cy - 7
    return f"""  <g transform="translate({x:.1f}, {y:.1f})">
    <rect x="0" y="3" width="18" height="12" rx="2.5" fill="{fill}"/>
    <path d="M 5 3 L 7 0.5 L 11 0.5 L 13 3 Z" fill="{fill}"/>
    <circle cx="9" cy="9" r="3.2" fill="#eff6ff" stroke="{fill}" stroke-width="1.2"/>
  </g>"""


def gerar_svg_slide_card(
    url: str,
    titulo: str = "Acesse o Portal Didático",
    subtitulo: str = "Cadernos Interativos · Modelos Neurais · Teoria e Prática em Engenharia",
    fill_color: str = "#002444",
) -> str:
    """Gera um cartão vertical (920 x 1120 px) para slides verticais ou pôsteres."""
    matrix = criar_matriz_qr(url, border=2)
    n = len(matrix)

    W = 920
    H = 1120
    qr_box_size = 540
    qr_x = (W - qr_box_size) / 2
    qr_y = 200

    path_data = []
    scale = (qr_box_size - 40) / n
    offset_x = qr_x + 20
    offset_y = qr_y + 20

    for r in range(n):
        for c in range(n):
            if matrix[r][c]:
                x = offset_x + c * scale
                y = offset_y + r * scale
                path_data.append(f"M{x:.2f},{y:.2f}h{scale:.2f}v{scale:.2f}h-{scale:.2f}z")
    d_str = "".join(path_data)

    display_url = url.replace("https://", "").rstrip("/")

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <defs>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="114%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
      <feOffset in="blur" dx="0" dy="4" result="offsetBlur"/>
      <feComponentTransfer in="offsetBlur" result="shadow">
        <feFuncA type="linear" slope="0.09"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="qrShadow" x="-6%" y="-6%" width="112%" height="116%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur"/>
      <feOffset in="blur" dx="0" dy="3" result="offsetBlur"/>
      <feComponentTransfer in="offsetBlur" result="shadow">
        <feFuncA type="linear" slope="0.08"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <clipPath id="clip-stripe"><rect x="20" y="20" width="{W - 40}" height="{H - 40}" rx="22"/></clipPath>
  </defs>

  <!-- Cartão Principal com Fundo Branco Suave -->
  <rect x="20" y="20" width="{W - 40}" height="{H - 40}" rx="22" fill="url(#cardBg)" stroke="#cbd5e1" stroke-width="1.8" filter="url(#cardShadow)"/>
  <rect x="20" y="20" width="10" height="{H - 40}" fill="#002444" clip-path="url(#clip-stripe)"/>

  <!-- Insígnia Superior -->
  <rect x="{(W - 270) / 2}" y="56" width="270" height="26" rx="13" fill="#002444"/>
  <text x="{W / 2}" y="73" font-family="{FONT}" font-size="11.5" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="0.6">ACESSO DIRETO • SCAN QR CODE</text>

  <!-- Título e Subtítulo -->
  <text x="{W / 2}" y="126" font-family="{FONT}" font-size="28" font-weight="bold" fill="#002444" text-anchor="middle">{html.escape(titulo)}</text>
  <text x="{W / 2}" y="156" font-family="{FONT}" font-size="14" fill="#475569" text-anchor="middle">{html.escape(subtitulo)}</text>

  <!-- Moldura Elevada do QR Code -->
  <rect x="{qr_x}" y="{qr_y}" width="{qr_box_size}" height="{qr_box_size}" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.8" filter="url(#qrShadow)"/>
  <path d="{d_str}" fill="{fill_color}"/>

  <!-- Tag Instrucional com Ícone Vetorial de Câmera -->
  <rect x="{(W - 390) / 2}" y="{qr_y + qr_box_size + 24}" width="390" height="36" rx="18" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.3"/>
{camera_icon_svg(W / 2 - 146, qr_y + qr_box_size + 42, fill="#1e40af")}
  <text x="{W / 2 + 10}" y="{qr_y + qr_box_size + 47}" font-family="{FONT}" font-size="13" font-weight="bold" fill="#1e40af" text-anchor="middle">Aponte a câmera do celular para abrir o site</text>

  <!-- Pílula com o Link Completo -->
  <rect x="{(W - 680) / 2}" y="{qr_y + qr_box_size + 76}" width="680" height="42" rx="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="{W / 2}" y="{qr_y + qr_box_size + 103}" font-family="{MONO}" font-size="13.5" font-weight="bold" fill="#0f172a" text-anchor="middle">{display_url}</text>

  <!-- Linha Divisória de Rodapé -->
  <line x1="60" y1="{H - 146}" x2="{W - 60}" y2="{H - 146}" stroke="#e2e8f0" stroke-width="1.2"/>

  <!-- Rodapé Institucional UESC • PID -->
  <text x="{W / 2}" y="{H - 116}" font-family="{FONT}" font-size="13" font-weight="bold" fill="#002444" text-anchor="middle">UESC — Universidade Estadual de Santa Cruz • Projeto de Iniciação à Docência (PID)</text>
  <text x="{W / 2}" y="{H - 92}" font-family="{FONT}" font-size="12" fill="#475569" text-anchor="middle">Autor: Enzo Fernandes Sarmento • Orientador: Prof. Dr. Elilton Rodrigues Edwards</text>
  <text x="{W / 2}" y="{H - 70}" font-family="{FONT}" font-size="11" fill="#64748b" text-anchor="middle">Engenharia Química • Inteligência Artificial e Ciência de Dados Aplicadas</text>
</svg>
"""
    return svg


def gerar_svg_slide_panoramico(
    url: str,
    fill_color: str = "#002444",
) -> str:
    """
    Gera um slide panorâmico 16:9 completo (1540 x 568 px) com fundo 100% transparente,
    combinando perfeitamente com os outros 4 diagramas de simpósio do repositório.
    """
    matrix = criar_matriz_qr(url, border=2)
    n = len(matrix)

    W = 1540
    H = 568
    pad = 16
    y0 = pad
    H_card = H - 2 * pad  # 536

    wL = 840
    gap = 24
    wR = W - 2 * pad - gap - wL  # 644
    xL = pad
    xR = pad + wL + gap

    display_url = url.replace("https://", "").rstrip("/")

    # Painel Direito: container e escala do QR Code
    qr_box = 356
    qr_cx = xR + wR / 2
    qr_x = qr_cx - qr_box / 2
    qr_y = y0 + 88

    scale = (qr_box - 32) / n
    offset_x = qr_x + 16
    offset_y = qr_y + 16

    path_data = []
    for r in range(n):
        for c in range(n):
            if matrix[r][c]:
                x = offset_x + c * scale
                y = offset_y + r * scale
                path_data.append(f"M{x:.2f},{y:.2f}h{scale:.2f}v{scale:.2f}h-{scale:.2f}z")
    d_str = "".join(path_data)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <defs>
    <filter id="panelShadow" x="-4%" y="-4%" width="108%" height="112%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
      <feOffset in="blur" dx="0" dy="3" result="offsetBlur"/>
      <feComponentTransfer in="offsetBlur" result="shadow">
        <feFuncA type="linear" slope="0.09"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="qrBoxShadow" x="-6%" y="-6%" width="112%" height="116%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
      <feOffset in="blur" dx="0" dy="2.5" result="offsetBlur"/>
      <feComponentTransfer in="offsetBlur" result="shadow">
        <feFuncA type="linear" slope="0.08"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="cardBgLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8faff"/>
    </linearGradient>
    <linearGradient id="cardBgRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f6fbf8"/>
    </linearGradient>
    <clipPath id="clip-left"><rect x="{xL}" y="{y0}" width="{wL}" height="{H_card}" rx="18"/></clipPath>
    <clipPath id="clip-right"><rect x="{xR}" y="{y0}" width="{wR}" height="{H_card}" rx="18"/></clipPath>
  </defs>

  <!-- ================= PAINEL ESQUERDO: CONTEÚDO E REPOSITÓRIO ================= -->
  <rect x="{xL}" y="{y0}" width="{wL}" height="{H_card}" rx="18" fill="url(#cardBgLeft)" filter="url(#panelShadow)"/>
  <rect x="{xL}" y="{y0}" width="9" height="{H_card}" fill="#002444" clip-path="url(#clip-left)"/>
  <rect x="{xL}" y="{y0}" width="{wL}" height="{H_card}" rx="18" fill="none" stroke="#cbd5e1" stroke-width="1.6"/>

  <!-- Insígnia Esquerda -->
  <rect x="{xL + 28}" y="{y0 + 20}" width="230" height="24" rx="12" fill="#002444"/>
  <text x="{xL + 28 + 115}" y="{y0 + 36}" font-family="{FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">PORTAL DIDÁTICO • ACESSO ABERTO</text>

  <!-- Título e Subtítulo -->
  <text x="{xL + 28}" y="{y0 + 74}" font-family="{FONT}" font-size="22" font-weight="bold" fill="#102a43">Integração de Redes Neurais à Engenharia</text>
  <text x="{xL + 28}" y="{y0 + 94}" font-family="{FONT}" font-size="13" fill="#486581">Material Didático Aberto, Modelagem Computacional e Inteligência Artificial</text>
  <line x1="{xL + 28}" y1="{y0 + 108}" x2="{xL + wL - 28}" y2="{y0 + 108}" stroke="#dde6f0" stroke-width="1.3"/>

  <!-- 4 Cartões de Destaques dos Recursos Disponíveis -->
  <g transform="translate({xL + 28}, {y0 + 124})">
    <!-- Bloco 1 -->
    <rect x="0" y="0" width="380" height="88" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
    <rect x="14" y="14" width="36" height="36" rx="8" fill="#e0f2fe"/>
    <text x="32" y="38" font-family="{FONT}" font-size="18" font-weight="bold" fill="#0369a1" text-anchor="middle">22</text>
    <text x="62" y="32" font-family="{FONT}" font-size="14" font-weight="bold" fill="#0f172a">Cadernos Jupyter (.ipynb)</text>
    <text x="62" y="52" font-family="{FONT}" font-size="12" fill="#475569">Passo a passo didático do zero ao avançado</text>
    <text x="62" y="68" font-family="{FONT}" font-size="11" fill="#64748b">Fundamentos, Perceptron, PMC e Redes Industriais</text>

    <!-- Bloco 2 -->
    <rect x="404" y="0" width="380" height="88" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
    <rect x="418" y="14" width="36" height="36" rx="8" fill="#fef3c7"/>
    <text x="436" y="37" font-family="{FONT}" font-size="16" font-weight="bold" fill="#b45309" text-anchor="middle">⚙️</text>
    <text x="466" y="32" font-family="{FONT}" font-size="14" font-weight="bold" fill="#0f172a">Aplicações na Engenharia</text>
    <text x="466" y="52" font-family="{FONT}" font-size="12" fill="#475569">Casos reais com dados experimentais</text>
    <text x="466" y="68" font-family="{FONT}" font-size="11" fill="#64748b">Destilação de óleo, impressoras 3D e conservantes</text>

    <!-- Bloco 3 -->
    <rect x="0" y="104" width="380" height="88" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
    <rect x="14" y="118" width="36" height="36" rx="8" fill="#dcfce7"/>
    <text x="32" y="141" font-family="{FONT}" font-size="16" font-weight="bold" fill="#15803d" text-anchor="middle">🔬</text>
    <text x="62" y="136" font-family="{FONT}" font-size="14" font-weight="bold" fill="#0f172a">Backprop, Scikit-learn &amp; Keras</text>
    <text x="62" y="156" font-family="{FONT}" font-size="12" fill="#475569">Implementação caixa aberta vs. alto nível</text>
    <text x="62" y="172" font-family="{FONT}" font-size="11" fill="#64748b">Comparações de convergência, épocas e MSE</text>

    <!-- Bloco 4 -->
    <rect x="404" y="104" width="380" height="88" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3"/>
    <rect x="418" y="118" width="36" height="36" rx="8" fill="#f1f5f9"/>
    <text x="436" y="141" font-family="{FONT}" font-size="16" font-weight="bold" fill="#475569" text-anchor="middle">📚</text>
    <text x="466" y="136" font-family="{FONT}" font-size="14" font-weight="bold" fill="#0f172a">Glossário Técnico (34 Conceitos)</text>
    <text x="466" y="156" font-family="{FONT}" font-size="12" fill="#475569">Busca interativa instantânea e rigor formal</text>
    <text x="466" y="172" font-family="{FONT}" font-size="11" fill="#64748b">Definições matemáticas e computacionais claras</text>
  </g>

  <!-- Rodapé Institucional UESC -->
  <rect x="{xL + 28}" y="{H - pad - 96}" width="{wL - 56}" height="76" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.2"/>
  <text x="{xL + 46}" y="{H - pad - 68}" font-family="{FONT}" font-size="13" font-weight="bold" fill="#002444">UESC — Universidade Estadual de Santa Cruz • Projeto de Iniciação à Docência (PID)</text>
  <text x="{xL + 46}" y="{H - pad - 48}" font-family="{FONT}" font-size="12" fill="#475569">Discente: Enzo Fernandes Sarmento (efsarmento.cic@uesc.br) • Orientador: Prof. Dr. Elilton Rodrigues Edwards</text>
  <text x="{xL + 46}" y="{H - pad - 30}" font-family="{FONT}" font-size="11" fill="#64748b">Departamento de Ciências Exatas e Tecnológicas (DCET) • Ilhéus – Bahia</text>

  <!-- ================= PAINEL DIREITO: QR CODE EM DESTAQUE ================= -->
  <rect x="{xR}" y="{y0}" width="{wR}" height="{H_card}" rx="18" fill="url(#cardBgRight)" filter="url(#panelShadow)"/>
  <rect x="{xR}" y="{y0}" width="9" height="{H_card}" fill="#16a34a" clip-path="url(#clip-right)"/>
  <rect x="{xR}" y="{y0}" width="{wR}" height="{H_card}" rx="18" fill="none" stroke="#cbd5e1" stroke-width="1.6"/>

  <!-- Insígnia Direita -->
  <rect x="{xR + 24}" y="{y0 + 20}" width="206" height="24" rx="12" fill="#15803d"/>
  <text x="{xR + 24 + 103}" y="{y0 + 36}" font-family="{FONT}" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">SCAN &amp; ACESSE NO CELULAR</text>

  <text x="{xR + 24}" y="{y0 + 72}" font-family="{FONT}" font-size="20" font-weight="bold" fill="#102a43">Aponte a Câmera para Abrir</text>
  <text x="{xR + 24}" y="{y0 + 90}" font-family="{FONT}" font-size="12.5" fill="#486581">Acesso instantâneo a todos os cadernos e guias</text>
  <line x1="{xR + 24}" y1="{y0 + 104}" x2="{xR + wR - 24}" y2="{y0 + 104}" stroke="#dde6f0" stroke-width="1.3"/>

  <!-- Moldura Elevada do QR Code Centralizado -->
  <rect x="{qr_x:.1f}" y="{qr_y + 24:.1f}" width="{qr_box:.1f}" height="{qr_box:.1f}" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.8" filter="url(#qrBoxShadow)"/>
  <g transform="translate(0, 24)">
    <path d="{d_str}" fill="{fill_color}"/>
  </g>

  <!-- Link Direto Monospaçado -->
  <rect x="{xR + 24}" y="{H - pad - 60}" width="{wR - 48}" height="42" rx="12" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
  <text x="{xR + wR / 2}" y="{H - pad - 34}" font-family="{MONO}" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">{display_url}</text>
</svg>
"""
    return svg


def render_svg_to_png(svg_path: Path, png_path: Path, width: int = 2560) -> bool:
    """Renderiza SVG para PNG de altíssima resolução usando GdkPixbuf."""
    try:
        import gi
        gi.require_version("GdkPixbuf", "2.0")
        from gi.repository import GdkPixbuf

        pb = GdkPixbuf.Pixbuf.new_from_file_at_scale(str(svg_path), width, -1, True)
        pb.savev(str(png_path), "png", [], [])
        return True
    except Exception as e:
        print(f"Aviso: GdkPixbuf não pôde renderizar SVG para PNG: {e}")
        return False


def imprimir_qr_terminal(url: str) -> None:
    """Exibe o QR Code diretamente em caracteres ASCII no terminal."""
    try:
        qr = qrcode.QRCode(border=1)
        qr.add_data(url)
        qr.make(fit=True)
        buf = io.StringIO()
        qr.print_ascii(out=buf, invert=True)
        print("\n" + "=" * 54)
        print("  PRÉ-VISUALIZAÇÃO NO TERMINAL (Pode ser escaneado agora):")
        print("=" * 54)
        print(buf.getvalue())
        print("=" * 54 + "\n")
    except Exception:
        pass


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Sistema de Geração de QR Code para o Portal Didático e Links do Repositório (PID/UESC)."
    )
    group_url = parser.add_mutually_exclusive_group()
    group_url.add_argument(
        "--url", "-u",
        type=str,
        default=URL_SITE_PORTAL,
        help=f"URL customizada para o QR code (padrão: {URL_SITE_PORTAL})",
    )
    group_url.add_argument(
        "--site",
        action="store_const",
        const=URL_SITE_PORTAL,
        dest="url",
        help="Gera para o Portal Didático no GitHub Pages",
    )
    group_url.add_argument(
        "--github",
        action="store_const",
        const=URL_GITHUB_REPO,
        dest="url",
        help="Gera para o Repositório GitHub",
    )
    group_url.add_argument(
        "--notebooks",
        action="store_const",
        const=URL_NOTEBOOKS,
        dest="url",
        help="Gera para a página dos 22 Notebooks",
    )
    group_url.add_argument(
        "--glossario",
        action="store_const",
        const=URL_GLOSSARIO,
        dest="url",
        help="Gera para o Glossário Técnico",
    )

    parser.add_argument(
        "--mode", "-m",
        choices=["bare", "card", "slide", "all"],
        default="all",
        help="Modo de saída: 'bare' (só o QR Code), 'card' (cartão vertical), 'slide' (slide 16:9 de simpósio), ou 'all' (todos).",
    )
    parser.add_argument(
        "--format", "-f",
        choices=["svg", "png", "all"],
        default="all",
        help="Formato de arquivo: 'svg', 'png' ou 'all' (ambos).",
    )
    parser.add_argument(
        "--output-dir", "-o",
        type=Path,
        default=DEFAULT_OUT_DIR,
        help=f"Diretório de destino (padrão: {DEFAULT_OUT_DIR})",
    )
    parser.add_argument(
        "--docs",
        action="store_true",
        help="Salva também uma cópia dos arquivos bare em docs/assets/img/ para uso no portal web.",
    )
    parser.add_argument(
        "--name", "-n",
        type=str,
        default=None,
        help="Nome base dos arquivos de saída (sem extensão).",
    )
    parser.add_argument(
        "--color",
        type=str,
        default="#002444",
        help="Cor dos módulos do QR Code em hexadecimal (padrão: #002444).",
    )
    parser.add_argument(
        "--size",
        type=int,
        default=1024,
        help="Tamanho do PNG bare em pixels (padrão: 1024).",
    )
    parser.add_argument(
        "--no-terminal",
        action="store_true",
        help="Desativa a impressão do QR Code em ASCII no terminal.",
    )

    return parser.parse_args()


def main() -> None:
    args = parse_args()
    url = args.url
    out_dir: Path = args.output_dir
    out_dir.mkdir(parents=True, exist_ok=True)

    if args.name:
        base_name = args.name
    else:
        if url == URL_SITE_PORTAL:
            base_name = "qrcode_portal_didatico"
        elif url == URL_GITHUB_REPO:
            base_name = "qrcode_repositorio_github"
        elif url == URL_NOTEBOOKS:
            base_name = "qrcode_notebooks"
        elif url == URL_GLOSSARIO:
            base_name = "qrcode_glossario"
        else:
            base_name = "qrcode_personalizado"

    print("\n" + "=" * 62)
    print("  SISTEMA DE GERAÇÃO DE QR CODE • PYENGENHARIA UESC")
    print("=" * 62)
    print(f"🔗 URL Destino : {url}")
    print(f"📁 Pasta Saída : {out_dir}")
    print(f"🎨 Modo        : {args.mode}")
    print(f"🖼️ Formato     : {args.format}")
    print("=" * 62)

    gerados: list[Path] = []

    # 1. Modo Bare (QR Code limpo)
    if args.mode in ("bare", "all"):
        if args.format in ("svg", "all"):
            svg_bare = gerar_svg_bare(url, fill_color=args.color, back_color="transparent")
            out_svg = out_dir / f"{base_name}.svg"
            out_svg.write_text(svg_bare, encoding="utf-8")
            gerados.append(out_svg)

            if args.docs:
                DEFAULT_DOCS_IMG_DIR.mkdir(parents=True, exist_ok=True)
                docs_svg = DEFAULT_DOCS_IMG_DIR / f"{base_name}.svg"
                docs_svg.write_text(svg_bare, encoding="utf-8")
                gerados.append(docs_svg)

        if args.format in ("png", "all"):
            png_bare = gerar_png_bare(url, fill_color=args.color, target_size=args.size)
            out_png = out_dir / f"{base_name}.png"
            png_bare.save(str(out_png), "PNG")
            gerados.append(out_png)

            if args.docs:
                DEFAULT_DOCS_IMG_DIR.mkdir(parents=True, exist_ok=True)
                docs_png = DEFAULT_DOCS_IMG_DIR / f"{base_name}.png"
                png_bare.save(str(docs_png), "PNG")
                gerados.append(docs_png)

    # 2. Modo Card (Cartão Vertical 920 x 1120 px)
    if args.mode in ("card", "all"):
        card_name = f"{base_name}_card" if args.mode == "all" else base_name
        svg_card = gerar_svg_slide_card(url, fill_color=args.color)
        out_card_svg = out_dir / f"{card_name}.svg"
        out_card_svg.write_text(svg_card, encoding="utf-8")
        gerados.append(out_card_svg)

        if args.format in ("png", "all"):
            out_card_png = out_dir / f"{card_name}.png"
            render_svg_to_png(out_card_svg, out_card_png, width=1840)
            gerados.append(out_card_png)

    # 3. Modo Slide (Slide Panorâmico 16:9 no padrão dos outros slides: 1540 x 568 px)
    if args.mode in ("slide", "all"):
        slide_name = f"{base_name}_slide" if args.mode == "all" else base_name
        svg_slide = gerar_svg_slide_panoramico(url, fill_color=args.color)
        out_slide_svg = out_dir / f"{slide_name}.svg"
        out_slide_svg.write_text(svg_slide, encoding="utf-8")
        gerados.append(out_slide_svg)

        if args.format in ("png", "all"):
            out_slide_png = out_dir / f"{slide_name}.png"
            render_svg_to_png(out_slide_svg, out_slide_png, width=2560)
            gerados.append(out_slide_png)

    # Exibe no terminal para leitura imediata
    if not args.no_terminal:
        imprimir_qr_terminal(url)

    print("✅ Arquivos gerados com sucesso:")
    for p in gerados:
        size_kb = p.stat().st_size / 1024
        print(f"  • {p.name} ({size_kb:.1f} KB)")
        print(f"    file://{p.resolve()}")

    print("\n💡 Dica de Apresentação:")
    print("  • Use '*_slide.png' para preencher o último slide 16:9 inteiro da apresentação.")
    print("  • Use '*_card.png' caso queira colocar um cartão compacto na lateral de um slide ou pôster.")
    print("  • Use '*.svg' ou '*.png' (bare) para colar o QR code puro em qualquer documento.")


if __name__ == "__main__":
    main()
