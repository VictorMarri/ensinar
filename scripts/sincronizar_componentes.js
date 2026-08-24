#!/usr/bin/env node
'use strict';

/**
 * sincronizar_componentes.js — confere (e, se você mandar, propaga) os
 * componentes de assets/ da skill para as trilhas em ~/learning/.
 *
 *   node scripts/sincronizar_componentes.js              # só confere
 *   node scripts/sincronizar_componentes.js --aplicar    # copia o que divergiu
 *   node scripts/sincronizar_componentes.js --skill ./ --trilhas /tmp/trilhas
 *
 * Cada trilha tem a própria cópia de cada componente — não há arquivo
 * compartilhado. Isso é bom (a aula abre offline, a trilha viaja inteira) e é
 * caro: mexeu num componente na skill, todas as trilhas que já o usam ficam
 * pra trás em silêncio, e a aula 3 de uma passa a valer regra diferente da
 * aula 3 da outra. Este script é o md5sum que fazia isso na mão.
 *
 * Duas regras que o script respeita e que não são detalhe:
 *
 * 1. Componente que a trilha não tem NÃO é divergência. A trilha usa o que
 *    precisa; empurrar `decide.css` pra quem nunca desenhou árvore de decisão
 *    só suja a pasta. Ele aparece como "não usa" e o script segue.
 * 2. O `lesson.css` só é conferido/propagado nas trilhas cuja marca de pele
 *    no NOTES.md diz `pele: nova`. Trilha sem a marca guarda o lesson.css
 *    antigo DE PROPÓSITO (regra 6 do SKILL.md): trocar a folha por baixo sem
 *    reabrir as aulas antigas é como a pele quebra sem ninguém ver.
 *
 * Saída: 0 se está tudo em dia, 1 se há divergência (ou se uma cópia falhou no
 * modo --aplicar), 2 se o uso está errado. Sem dependências: só a stdlib.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const SKILL_PADRAO = path.join(os.homedir(), '.claude', 'skills', 'ensinar');
const TRILHAS_PADRAO = path.join(os.homedir(), 'learning');
const MARCA_PELE_NOVA = /^[ \t>*-]*pele\s*:\s*nova\b/im;

// ---------------------------------------------------------------- utilidades

function md5(caminho) {
  return crypto.createHash('md5').update(fs.readFileSync(caminho)).digest('hex');
}

function ehPasta(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function ehArquivo(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

/** A skill: o que veio por --skill, senão a instalada em ~/.claude/skills, e
 *  em último caso a própria cópia de onde este script está rodando (útil pra
 *  quem trabalha direto no repositório do fork). */
function acharSkill(pedida) {
  const candidatos = pedida
    ? [pedida]
    : [SKILL_PADRAO, path.resolve(__dirname, '..')];
  for (const c of candidatos) {
    if (ehPasta(path.join(c, 'assets'))) return path.resolve(c);
  }
  return null;
}

/** Uma trilha é uma pasta direta da raiz que tem `assets/`. Pasta sem assets
 *  é trilha que ainda não gerou aula nenhuma, e não há o que conferir nela. */
function acharTrilhas(raiz) {
  return fs
    .readdirSync(raiz, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => path.join(raiz, d.name))
    .filter((p) => ehPasta(path.join(p, 'assets')))
    .sort();
}

function peleNova(trilha) {
  const notas = path.join(trilha, 'NOTES.md');
  if (!ehArquivo(notas)) return false;
  return MARCA_PELE_NOVA.test(fs.readFileSync(notas, 'utf8'));
}

// -------------------------------------------------------------------- driver

function argumentos(argv) {
  const opcoes = { skill: null, trilhas: null, aplicar: false, ajuda: false, erro: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--aplicar') opcoes.aplicar = true;
    else if (a === '--ajuda' || a === '--help' || a === '-h') opcoes.ajuda = true;
    else if (a === '--skill') {
      opcoes.skill = argv[++i];
      if (!opcoes.skill) opcoes.erro = '--skill precisa de um diretório';
    } else if (a === '--trilhas') {
      opcoes.trilhas = argv[++i];
      if (!opcoes.trilhas) opcoes.erro = '--trilhas precisa de um diretório';
    } else opcoes.erro = `argumento desconhecido: ${a}`;
  }
  return opcoes;
}

function uso() {
  console.error('uso: node scripts/sincronizar_componentes.js [--aplicar] [--skill <dir>] [--trilhas <dir>]');
  console.error('');
  console.error('Sem --aplicar, só confere (md5 de cada componente da skill contra a cópia de cada trilha).');
  console.error(`Padrões: skill ${SKILL_PADRAO}, trilhas ${TRILHAS_PADRAO}`);
  console.error('O lesson.css só entra nas trilhas cujo NOTES.md tem a linha `pele: nova`.');
}

function main(argv) {
  const opcoes = argumentos(argv);
  if (opcoes.ajuda || opcoes.erro) {
    if (opcoes.erro) console.error(`erro: ${opcoes.erro}`);
    uso();
    return opcoes.ajuda ? 0 : 2;
  }

  const skill = acharSkill(opcoes.skill);
  if (!skill) {
    console.error(
      `erro: não achei a skill (uma pasta com assets/) em ${opcoes.skill || `${SKILL_PADRAO} nem em ${path.resolve(__dirname, '..')}`}.`
    );
    console.error('Passe o caminho com --skill <dir>.');
    return 2;
  }

  const raiz = path.resolve(opcoes.trilhas || TRILHAS_PADRAO);
  if (!ehPasta(raiz)) {
    console.error(`erro: não achei a pasta das trilhas em ${raiz}. Passe o caminho com --trilhas <dir>.`);
    return 2;
  }

  const componentes = fs
    .readdirSync(path.join(skill, 'assets'), { withFileTypes: true })
    .filter((d) => d.isFile() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();

  if (componentes.length === 0) {
    console.error(`erro: ${path.join(skill, 'assets')} não tem componente nenhum.`);
    return 2;
  }

  const trilhas = acharTrilhas(raiz);

  console.log(`skill:   ${skill}`);
  console.log(`trilhas: ${raiz} (${trilhas.length})`);
  console.log(`modo:    ${opcoes.aplicar ? 'APLICAR (copia da skill pra trilha)' : 'conferir (não escreve nada)'}`);
  console.log('');

  if (trilhas.length === 0) {
    console.log(`nenhuma trilha com assets/ em ${raiz} — nada a conferir.`);
    return 0;
  }

  let divergencias = 0;
  let copiados = 0;
  let erros = 0;
  const peleAntiga = [];

  for (const trilha of trilhas) {
    const nome = path.basename(trilha);
    const nova = peleNova(trilha);
    if (!nova) peleAntiga.push(nome);

    const linhas = [];
    for (const componente of componentes) {
      const naSkill = path.join(skill, 'assets', componente);
      const naTrilha = path.join(trilha, 'assets', componente);

      if (componente === 'lesson.css' && !nova) {
        linhas.push(
          `  pulado    lesson.css — pele antiga (sem \`pele: nova\` no NOTES.md): a folha velha fica de propósito`
        );
        continue;
      }

      if (!ehArquivo(naTrilha)) {
        linhas.push(`  não usa   ${componente}`);
        continue;
      }

      let iguais;
      try {
        iguais = md5(naSkill) === md5(naTrilha);
      } catch (e) {
        erros++;
        linhas.push(`  ERRO      ${componente} — ${e.message}`);
        continue;
      }
      if (iguais) {
        linhas.push(`  ok        ${componente}`);
        continue;
      }

      divergencias++;
      if (opcoes.aplicar) {
        try {
          fs.copyFileSync(naSkill, naTrilha);
          copiados++;
          linhas.push(`  COPIADO   ${componente} — atualizado a partir da skill`);
        } catch (e) {
          erros++;
          linhas.push(`  ERRO      ${componente} — não deu pra copiar: ${e.message}`);
        }
      } else {
        linhas.push(`  DIVERGE   ${componente} — a cópia da trilha não bate com a da skill`);
      }
    }

    console.log(`${nome}${nova ? '' : '  (pele antiga)'}`);
    for (const l of linhas) console.log(l);
    console.log('');
  }

  if (opcoes.aplicar) {
    console.log(`${copiados} componente(s) copiado(s), ${erros} erro(s).`);
  } else {
    console.log(`${divergencias} divergência(s), ${erros} erro(s).`);
    if (divergencias > 0) {
      console.log('Rode de novo com --aplicar pra propagar da skill pras trilhas.');
    }
  }
  if (peleAntiga.length > 0) {
    console.log(
      `lesson.css não conferido em: ${peleAntiga.join(', ')} — trilha sem \`pele: nova\` no NOTES.md fica na pele antiga até ser migrada.`
    );
  }

  // No modo aplicar, divergência resolvida não é falha: falha é cópia que não
  // deu certo. No modo conferir, divergência é exatamente o que se reporta.
  if (erros > 0) return 1;
  return opcoes.aplicar ? 0 : divergencias > 0 ? 1 : 0;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}

module.exports = { main };
