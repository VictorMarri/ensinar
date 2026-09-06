'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { checarArquivo } = require('./checar_aula');

function checar(cabecalho) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'checar-aula-'));
  const arquivo = path.join(dir, 'aula.html');
  fs.writeFileSync(
    arquivo,
    `${cabecalho}<nav class="next-up"><a href="MAPA.html">Mapa</a></nav><figure><svg></svg></figure>`
  );
  try {
    return checarArquivo(arquivo).filter((a) => a.check === 'cabecalho');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test('aceita classe e posição com valores sem aspas', () => {
  assert.deepEqual(checar('<p class=eyebrow data-aula=2 data-de=7>Lesson 2 of 7</p>'), []);
});

test('não confunde sufixos de outros atributos com os atributos de posição', () => {
  assert.equal(
    checar('<p class="eyebrow" data-x-data-aula="2" data-x-data-de="7">Lesson 2 of 7</p>').length,
    1
  );
});

test('não lê posição escrita dentro do valor de outro atributo', () => {
  assert.equal(
    checar(`<p class="eyebrow" title="exemplo data-aula='2' data-de='7'">Lesson 2 of 7</p>`).length,
    1
  );
});

test('aceita > dentro de atributo anterior à posição', () => {
  assert.deepEqual(
    checar('<p class="eyebrow" title="2 > 1" data-aula="2" data-de="7">Lesson</p>'),
    []
  );
});

test('rejeita data-desvio misturado com posição no arco', () => {
  const achados = checar(
    '<p class="eyebrow" data-desvio="1" data-aula="2" data-de="7">Detour</p>'
  );
  assert.equal(achados.length, 1);
  assert.match(achados[0].detalhe, /mistura data-desvio/);
});

test('mantém a frase legada em português quando atributos estão ausentes', () => {
  assert.deepEqual(checar('<p class="eyebrow">Aula 2 de 7</p>'), []);
});

test('atributos de posição presentes sem valor não acionam fallback legado', () => {
  assert.equal(checar('<p class="eyebrow" data-aula data-de>Aula 2 de 7</p>').length, 1);
});

test('valida os formatos principais de posição', async (t) => {
  const casos = [
    ['aula numerada', '<p class="eyebrow" data-aula="2" data-de="7">Lesson</p>', true],
    ['desvio numerado', '<p class="eyebrow" data-desvio="1">Detour</p>', true],
    ['número negativo', '<p class="eyebrow" data-aula="-2" data-de="7">Lesson</p>', false],
    ['par ausente', '<p class="eyebrow" data-aula="2">Lesson</p>', false],
  ];
  for (const [nome, html, aceito] of casos) {
    await t.test(nome, () => {
      assert.equal(checar(html).length === 0, aceito);
    });
  }
});

test('encontra o eyebrow dentro da estrutura normal do documento', () => {
  assert.deepEqual(
    checar('<html><body><header><p class="eyebrow" data-aula="2" data-de="7">Lesson</p></header>'),
    []
  );
});
