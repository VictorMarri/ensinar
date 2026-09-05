#!/usr/bin/env node
'use strict';

/**
 * checar_aula.js — confere os itens MECÂNICOS da checklist de formatos/AULA.md
 * num HTML de aula, antes da conferência manual.
 *
 *   node scripts/checar_aula.js ~/learning/docker/lessons/0001-molde-e-coisa-viva.html
 *   node scripts/checar_aula.js ~/learning/docker/lessons/*.html
 *
 * O script existe porque a checklist tem duas naturezas misturadas: itens que
 * se leem no arquivo (o cabeçalho diz "de ?", o SVG tem hex, a classe é
 * `.score`) e itens que exigem julgamento (a analogia é isomorfa? o desenho
 * ensina antes do texto?). Os primeiros são exatamente os que a gente pula
 * quando a aula ficou boa e a vontade é entregar. Esses o script pega.
 *
 * A posição no mapa é lida dos atributos `data-aula`/`data-de` (ou `data-desvio`)
 * do `.eyebrow`, pra que a frase saia na língua da trilha; sem esses atributos,
 * vale a frase em português ("Aula N de M", "Desvio N · fora do arco").
 *
 * FALHA bloqueia a entrega. AVISO é conferência no olho e NÃO muda o código
 * de saída: são os dois cheques heurísticos (a figura de abertura e a
 * auditoria de coordenadas do SVG), que erram para os dois lados dependendo de
 * como a aula foi montada.
 *
 * Saída: 0 se nenhuma falha, 1 se houve falha (ou arquivo ilegível), 2 se o
 * uso está errado. Sem dependências: só a stdlib do Node.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------- utilidades

/** Apaga o conteúdo dos comentários HTML preservando posições e quebras de
 *  linha, pra que um travessão dentro de <!-- --> não vire falha e os números
 *  de linha continuem valendo. */
function mascararComentarios(html) {
  return html.replace(/<!--[\s\S]*?-->/g, (bloco) =>
    bloco.replace(/[^\n]/g, ' ')
  );
}

function linhaDe(texto, indice) {
  let linha = 1;
  for (let i = 0; i < indice && i < texto.length; i++) {
    if (texto[i] === '\n') linha++;
  }
  return linha;
}

/** Texto visível de um trecho de HTML: sem tags, sem entidade solta, com
 *  espaços colapsados. Serve pra ler o cabeçalho e os <text> do SVG. */
function textoVisivel(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '?')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Todos os elementos cuja lista de classes contém `classe`, com o índice em
 *  que começam. Casamento raso: elemento sem aninhamento do mesmo nome. */
function elementosComClasse(html, classe) {
  const achados = [];
  const re = new RegExp(
    `<([a-z][a-z0-9]*)\\b[^>]*class\\s*=\\s*["'][^"']*\\b${classe}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`,
    'gi'
  );
  let m;
  while ((m = re.exec(html)) !== null) {
    achados.push({ indice: m.index, inteiro: m[0], dentro: m[2] });
  }
  return achados;
}

function blocosSvg(html) {
  const blocos = [];
  const re = /<svg\b[\s\S]*?<\/svg>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocos.push({ indice: m.index, texto: m[0] });
  }
  return blocos;
}

// ------------------------------------------------------------------- cheques

function checarCabecalho(html, achados) {
  const eyebrows = elementosComClasse(html, 'eyebrow');
  if (eyebrows.length === 0) {
    achados.push({
      nivel: 'FALHA',
      check: 'cabecalho',
      detalhe: 'nenhum elemento .eyebrow: a aula não diz onde o aluno está no mapa',
    });
    return;
  }
  const comAtributos = eyebrows.filter((e) => temPosicaoEmAtributo(e));
  if (comAtributos.length > 0) {
    checarPosicaoEmAtributo(html, comAtributos, achados);
    return;
  }
  checarPosicaoNaFrase(html, eyebrows, achados);
}

/** Os três atributos de posição, lidos da tag de abertura do `.eyebrow`. Eles
 *  guardam número e total independentemente da frase, pra que a frase saia na
 *  língua da trilha. */
function posicaoEmAtributo(elemento) {
  const tag = elemento.inteiro.slice(0, elemento.inteiro.indexOf('>') + 1);
  const ler = (nome) => {
    const m = tag.match(new RegExp(`\\b${nome}\\s*=\\s*["']([^"']*)["']`, 'i'));
    return m ? m[1].trim() : null;
  };
  return { aula: ler('data-aula'), de: ler('data-de'), desvio: ler('data-desvio') };
}

function temPosicaoEmAtributo(elemento) {
  const p = posicaoEmAtributo(elemento);
  return p.aula !== null || p.de !== null || p.desvio !== null;
}

const inteiroPositivo = (valor) => /^\d+$/.test(valor) && Number(valor) > 0;

/** Erro da posição declarada em atributo, ou null se ela está boa. */
function erroDaPosicao(p) {
  if (p.desvio !== null) {
    return inteiroPositivo(p.desvio)
      ? null
      : `data-desvio="${p.desvio}" não é inteiro positivo`;
  }
  if (p.aula === null) return 'tem data-de mas não tem data-aula: os dois andam juntos';
  if (p.de === null) return 'tem data-aula mas não tem data-de: os dois andam juntos, e "de ?" não existe';
  if (!inteiroPositivo(p.aula)) return `data-aula="${p.aula}" não é inteiro positivo`;
  if (!inteiroPositivo(p.de)) return `data-de="${p.de}" não é inteiro positivo`;
  if (Number(p.aula) > Number(p.de)) {
    return `data-aula="${p.aula}" é maior que data-de="${p.de}": a aula não cabe no mapa que ela declara`;
  }
  return null;
}

function checarPosicaoEmAtributo(html, eyebrows, achados) {
  if (eyebrows.some((e) => erroDaPosicao(posicaoEmAtributo(e)) === null)) return;
  const primeiro = eyebrows[0];
  achados.push({
    nivel: 'FALHA',
    check: 'cabecalho',
    linha: linhaDe(html, primeiro.indice),
    detalhe: `.eyebrow ${erroDaPosicao(posicaoEmAtributo(primeiro))}`,
  });
}

/** Compatibilidade: aula sem os atributos vale pela frase em português. */
function checarPosicaoNaFrase(html, eyebrows, achados) {
  const bom = /Aula\s+\d+\s+de\s+\d+/i;
  const desvio = /Desvio\s+\d+\s*[·|-]\s*fora do arco/i;
  const ok = eyebrows.some((e) => {
    const t = textoVisivel(e.dentro);
    return bom.test(t) || desvio.test(t);
  });
  if (ok) return;

  const primeiro = eyebrows[0];
  const texto = textoVisivel(primeiro.dentro);
  const interrogacao = /Aula\s+\d+\s+de\s+\?/i.test(texto);
  achados.push({
    nivel: 'FALHA',
    check: 'cabecalho',
    linha: linhaDe(html, primeiro.indice),
    detalhe: interrogacao
      ? `.eyebrow diz "${texto}" — "de ?" é confissão de que ninguém escreveu o mapa`
      : `.eyebrow diz "${texto}" — falta "Aula N de M" ou "Desvio N · fora do arco"`,
  });
}

function checarLinksMd(html, achados) {
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const alvo = m[1].split('#')[0].split('?')[0];
    if (/\.md$/i.test(alvo)) {
      achados.push({
        nivel: 'FALHA',
        check: 'link-md',
        linha: linhaDe(html, m.index),
        detalhe: `href aponta pra "${m[1]}" — markdown não renderiza no navegador`,
      });
    }
  }
}

function checarRodape(html, achados) {
  const rodapes = elementosComClasse(html, 'next-up');
  if (rodapes.length === 0) {
    achados.push({
      nivel: 'FALHA',
      check: 'rodape',
      detalhe: 'nenhum .next-up: a aula não tem saída (anterior · mapa · próxima)',
    });
    return;
  }
  const temMapa = rodapes.some((r) =>
    /href\s*=\s*["'][^"']*MAPA\.html/i.test(r.inteiro)
  );
  if (!temMapa) {
    achados.push({
      nivel: 'FALHA',
      check: 'rodape',
      linha: linhaDe(html, rodapes[0].indice),
      detalhe: '.next-up não linka MAPA.html — o mapa é link em toda aula, sempre',
    });
  }
}

function checarHexNoSvg(html, achados) {
  for (const bloco of blocosSvg(html)) {
    const re = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
    let m;
    while ((m = re.exec(bloco.texto)) !== null) {
      // `url(#id)` não é cor: referência interna do SVG.
      if (m.index > 0 && bloco.texto[m.index - 1] === '(') continue;
      achados.push({
        nivel: 'FALHA',
        check: 'hex-no-svg',
        linha: linhaDe(html, bloco.indice + m.index),
        detalhe: `hex "${m[0]}" dentro do <svg> — as cores moram no CSS, pra paleta ser trocável num arquivo só`,
      });
    }
  }
}

function checarTravessao(html, achados) {
  const linhas = new Set();
  for (let i = 0; i < html.length; i++) {
    if (html[i] === '—') linhas.add(linhaDe(html, i));
  }
  for (const linha of [...linhas].sort((a, b) => a - b)) {
    achados.push({
      nivel: 'FALHA',
      check: 'travessao',
      linha,
      detalhe: 'travessão (—) no texto: reestruture com vírgula, dois-pontos, ponto ou ·',
    });
  }
}

function checarClasseScore(html, achados) {
  const re = /class\s*=\s*(["'])([^"']*)\1/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const classes = m[2].split(/\s+/).filter(Boolean);
    for (const c of classes) {
      if (c === 'score') {
        achados.push({
          nivel: 'FALHA',
          check: 'classe-score',
          linha: linhaDe(html, m.index),
          detalhe: 'classe `.score` não existe no lesson.css — o nome certo é `.quiz-score`',
        });
      }
    }
  }
}

function checarTemaEscuro(html, achados) {
  for (const marca of ['prefers-color-scheme', 'data-theme']) {
    let de = 0;
    let i;
    while ((i = html.indexOf(marca, de)) !== -1) {
      achados.push({
        nivel: 'FALHA',
        check: 'tema-escuro',
        linha: linhaDe(html, i),
        detalhe: `"${marca}" na aula — a pele não tem tema escuro, e isso é decisão (regra 6)`,
      });
      de = i + marca.length;
    }
  }
}

/** AVISO: a aula abre com figura? Heurística — depende de como a página foi
 *  montada (cabeçalho dentro de <header>, figura dentro de <section>, aula sem
 *  <h2> nenhum). Por isso avisa, não reprova. */
function checarFiguraDeAbertura(html, achados) {
  const h2 = html.search(/<h2\b/i);
  const figuras = [];
  const re = /<figure\b[\s\S]*?<\/figure>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (/<svg\b/i.test(m[0])) figuras.push(m.index);
  }
  if (figuras.length === 0) {
    achados.push({
      nivel: 'AVISO',
      check: 'figura-de-abertura',
      detalhe: 'nenhuma <figure> com SVG no arquivo — toda aula tem pelo menos um desenho',
    });
    return;
  }
  if (h2 !== -1 && figuras[0] > h2) {
    achados.push({
      nivel: 'AVISO',
      check: 'figura-de-abertura',
      linha: linhaDe(html, h2),
      detalhe:
        'a primeira <figure> com SVG vem depois do primeiro <h2> — a aula deveria abrir pela figura, antes da prosa (confira: pode ser só o jeito como a página foi montada)',
    });
  }
}

/** AVISO: auditoria aproximada de coordenadas. Conta 9px por caractere (o
 *  número da checklist de AULA.md pra mono de 15px) e avisa quando o texto
 *  estoura o limite direito do viewBox. É estimativa grosseira: fonte menor,
 *  tspan e text-anchor mudam a conta. Nunca reprova por isso. */
function checarCoordenadasSvg(html, achados) {
  for (const bloco of blocosSvg(html)) {
    const vb = bloco.texto.match(/viewBox\s*=\s*["']\s*([-\d.]+)[\s,]+([-\d.]+)[\s,]+([-\d.]+)[\s,]+([-\d.]+)\s*["']/i);
    if (!vb) continue;
    const x0 = parseFloat(vb[1]);
    const largura = parseFloat(vb[3]);
    const limite = x0 + largura;

    const re = /<text\b([^>]*)>([\s\S]*?)<\/text>/gi;
    let m;
    while ((m = re.exec(bloco.texto)) !== null) {
      const atributos = m[1];
      const conteudo = textoVisivel(m[2]);
      if (!conteudo) continue;
      const mx = atributos.match(/\bx\s*=\s*["']\s*([-\d.]+)\s*["']/i);
      if (!mx) continue;
      const x = parseFloat(mx[1]);
      const ancora = (atributos.match(/text-anchor\s*=\s*["']\s*(\w+)\s*["']/i) || [, 'start'])[1].toLowerCase();

      const estimado = 9 * conteudo.length;
      let direita;
      if (ancora === 'middle') direita = x + estimado / 2;
      else if (ancora === 'end') direita = x;
      else direita = x + estimado;

      if (direita > limite) {
        achados.push({
          nivel: 'AVISO',
          check: 'coordenadas-svg',
          linha: linhaDe(html, bloco.indice + m.index),
          detalhe: `"${conteudo.slice(0, 40)}" · x=${x} + 9×${conteudo.length} ≈ ${Math.round(direita)} > ${limite} (limite direito do viewBox) — estimativa de 9px/caractere, confira no navegador`,
        });
      }
    }
  }
}

// -------------------------------------------------------------------- driver

function checarArquivo(caminho) {
  const cru = fs.readFileSync(caminho, 'utf8');
  const html = mascararComentarios(cru);
  const achados = [];

  checarCabecalho(html, achados);
  checarLinksMd(html, achados);
  checarRodape(html, achados);
  checarHexNoSvg(html, achados);
  checarTravessao(html, achados);
  checarClasseScore(html, achados);
  checarTemaEscuro(html, achados);
  checarFiguraDeAbertura(html, achados);
  checarCoordenadasSvg(html, achados);

  achados.sort((a, b) => {
    if (a.nivel !== b.nivel) return a.nivel === 'FALHA' ? -1 : 1;
    return (a.linha || 0) - (b.linha || 0);
  });
  return achados;
}

function uso() {
  console.error('uso: node scripts/checar_aula.js <aula.html> [outra.html ...]');
  console.error('');
  console.error('Confere os itens mecânicos da checklist de formatos/AULA.md.');
  console.error('FALHA bloqueia a entrega (saída 1); AVISO é conferência no olho (não muda a saída).');
}

function main(argv) {
  const ajuda = argv.some((a) => a === '--ajuda' || a === '--help' || a === '-h');
  if (ajuda) {
    uso();
    return 0;
  }
  if (argv.length === 0) {
    uso();
    return 2;
  }
  const arquivos = argv;

  let falhas = 0;
  let avisos = 0;
  let erros = 0;

  for (const arquivo of arquivos) {
    const caminho = path.resolve(arquivo);
    let achados;
    try {
      achados = checarArquivo(caminho);
    } catch (e) {
      erros++;
      console.log(arquivo);
      console.log(`  FALHA  arquivo              não deu pra ler: ${e.message}`);
      console.log('');
      continue;
    }

    const f = achados.filter((a) => a.nivel === 'FALHA').length;
    const v = achados.length - f;
    falhas += f;
    avisos += v;

    console.log(arquivo);
    if (achados.length === 0) {
      console.log('  ok     nenhuma falha mecânica');
    }
    for (const a of achados) {
      const local = a.linha ? `linha ${a.linha}: ` : '';
      console.log(`  ${a.nivel}  ${a.check.padEnd(19)} ${local}${a.detalhe}`);
    }
    console.log('');
  }

  const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
  console.log(
    `${plural(arquivos.length, 'arquivo', 'arquivos')} · ${plural(falhas + erros, 'falha', 'falhas')} · ${plural(avisos, 'aviso', 'avisos')}`
  );
  if (falhas + erros > 0) {
    console.log('FALHA bloqueia: a aula volta pra bancada, edita no lugar e roda de novo.');
  }
  if (avisos > 0) {
    console.log('AVISO é heurística (figura de abertura e coordenadas do SVG): confira no olho, não bloqueia.');
  }
  if (falhas + erros === 0) {
    console.log('Passou o que é mecânico. O resto da checklist de AULA.md continua sendo seu.');
  }

  return falhas + erros > 0 ? 1 : 0;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}

module.exports = { checarArquivo };
