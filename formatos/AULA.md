# Formato de uma aula

Uma aula é **um HTML que linka os componentes de `assets/`**, em `lessons/`, numerado `NNNN-nome-em-kebab.html`. Curta, bonita, um ganho tangível, amarrada à missão.

**A aula é o veículo completo do ensino** — ela nasce inteira (desenho, prosa curta, quiz, citações) e é aberta no navegador uma única vez, depois que a checklist passa inteira; o chat entra como apoio: apresentação em poucas linhas, dúvidas, e a pergunta única que fecha. Nunca duplique o texto da aula no chat. Ver "HTML primeiro, diálogo como apoio" no `SKILL.md`.

Ela **não** é autocontida, e isso é escolha: os componentes ficam do lado, num arquivo só, pra que consertar o `lesson.css` uma vez conserte as vinte aulas de uma vez. O preço é que a aula não viaja sozinha — mandada por e-mail, sem a pasta `assets/` ao lado, abre sem estilo nenhum.

## Estrutura

**1. Cabeçalho.** `.eyebrow` com a posição escrita na língua da trilha e link pro mapa, `<h1>`, `.subtitle` com a promessa da aula em uma frase. Em páginas novas, `data-aula`/`data-de` guardam a estrutura independentemente da frase visível.

```html
<p class="eyebrow" data-aula="3" data-de="7">{Tema} · <a href="../MAPA.html">Aula 3 de 7</a></p>
```

Os atributos guardam número e total independentemente da frase, pra que o validador confira a posição e a frase saia na língua da trilha (`Lesson 3 of 7` numa trilha em inglês).

Nunca `Aula 1 de ?`. Se você não sabe o M, você não escreveu o mapa — volte e escreva.

**Exceção única: o desvio.** Aula pedida pelo aluno fora do arco não tem "N de M" — ela não é a N-ésima de nada. Arquivo `D001-nome.html`, cabeçalho equivalente a `Desvio 1 · fora do arco` na língua da trilha e atributo `data-desvio="1"` (sem `data-aula` nem `data-de`), com o mesmo link pro mapa. É o único tipo de cabeçalho permitido além da aula normal.

Aula antiga sem os atributos continua válida: sem eles, o validador cai na frase em português.

**2. A figura de abertura — a analogia desenhada como objeto, ou o próprio assunto desenhado.** A aula abre com ela, antes de qualquer prosa. Com analogia, vem antes de qualquer termo técnico; sem analogia aprovada (regra 2 do `SKILL.md`), desenha o próprio assunto, com as partes nomeadas na língua da trilha e a relação entre elas, sem comparação forçada com objeto de outro contexto. Kit `.d` do `lesson.css`; referência canônica: a aula 1 de docker (`0001-molde-e-coisa-viva.html`).

A forma do desenho segue o conteúdo, com ou sem analogia: comparação vai lado a lado com divisor tracejado (`.dash`), processo vai em sequência, escolha vai em árvore.

A anatomia da figura, na ordem:

```html
<figure class="fig">
  <p class="frase">Uma forma. Quantos bolos você quiser — inclusive nenhum.</p>
  <div class="canvas d">
    <svg viewBox="0 0 940 430" role="img" aria-label="{a conclusão, não a geometria}">…</svg>
  </div>
  <figcaption>{A lição inteira em prosa corrida: o que o desenho prova, e por quê.}</figcaption>
  <p class="traducao"><b>no Docker</b>A forma é a <strong>imagem</strong> (<code>image</code>): …</p>
</figure>
```

- **`.frase`**: a manchete que o desenho prova. Uma linha.
- **Com analogia, o desenho fala em objeto**, nunca em termo técnico: desenha a forma canelada, o cadeado, o bolo com vapor — não caixas com rótulo. Sem analogia, desenha e nomeia as partes do próprio assunto na língua da trilha. Duas metades com divisor tracejado (`.dash`) é o padrão da comparação, não obrigação de toda figura; tinta desenha o objeto, âmbar (`.box-acc`, `.line-acc`) marca o que a figura ensina, tijolo (`.line-bad`, `.dash-bad`) o que quebra ou não existe.
- **`figcaption`**: prosa corrida bem escrita que narra a lição — não rodapé telegráfico. É onde o ponto de ruptura da analogia se declara, quando houver.
- **`.traducao`**, quando houver analogia: batiza os termos — objeto na língua da trilha primeiro, etiqueta em inglês depois (regra 3). É aqui que "forma" vira **imagem** (`image`). Num desenho direto, a etiqueta em inglês também vem só depois de a parte ser apresentada na língua da trilha.

Se houver analogia, ela precisa ser **isomorfa** (regra 2 da skill: no máximo um ponto de ruptura), e o objeto vem do mundo da trilha, anotado em `NOTES.md` — a aula 4 aprofunda o objeto da aula 1, não inventa outro. Essas exigências não se aplicam ao desenho direto do assunto. A tabela do `analogy.css` é opcional: só quando a amarração propriedade a propriedade não coube na figura.

**A ruptura se repete onde ela é cobrada.** Quando uma aula chega no ponto em que a analogia deixa de valer, ela declara a ruptura ali de novo, no lugar, com link de volta pra `figcaption` da aula que a declarou primeiro. Declarar uma vez não basta: o aviso mora na aula onde foi escrito, e o aluno esbarra no buraco três aulas depois — ele não volta pra reler.

**3. O conceito, na língua nativa do aluno.** No máximo **três termos novos**, cada um batizado na língua da trilha antes de receber a etiqueta em inglês: **camada de base** (`base branch`). Nunca o contrário.

**4. O desenho da mecânica — quando a analogia não carrega tudo.** A figura de abertura muitas vezes resolve a aula sozinha (a aula 1 de docker resolve com duas figuras de objeto e nenhum diagrama). Quando a mecânica técnica tem 3+ partes que o objeto não representa, entra o diagrama de partes: `figure.css` + `diagrama.css`, **sempre sobre painel branco** (as cinco cores reprovam sobre o cinza da página — medido). Cada parte com sua cor, e a cor significa aquilo, da aula 1 até a última: azul = a base, laranja = o que se move, verde = o terceiro elemento, magenta = o que entra depois, tijolo = o que dá errado. Teto de cinco; sexta parte usa `.secundaria` ou vira outro desenho. Rótulo dentro, legenda embaixo, nenhum hex no SVG.

O desenho tem que responder a pergunta da aula **sozinho**, antes do texto. Se precisa de três parágrafos pra ser entendido, ele está ilustrando, não ensinando.

**5. Ancoragem no mundo dele.** Um dado real, medido agora — o repositório dele, a config dele, o histórico dele. Aula que só usa exemplo genérico ensina o exemplo, não o conceito. Meça de verdade; não invente número plausível.

**6. Prática.** Quiz de recuperação ativa (`quiz.js`) ou uma tarefa com laço de feedback curto. Recuperar de memória, não reler.

**7. Fonte primária.** A melhor coisa que ele pode ler ou assistir sobre isso, linkada e justificada em uma frase.

**8. Lembrete de perguntar.** Você é o professor dele, não um PDF. Convide pergunta *e* discordância.

**9. Rodapé.** `.footer` com a referência que esta aula alimentou, e **a barra de navegação** — que é como o aluno sai daqui:

```html
<p class="next-up">
  <a href="0002-ciclo-de-vida.html">← Aula 2</a> ·
  <a href="../MAPA.html">Mapa</a> ·
  <span>Próxima: aula 4 — <em>{nome}</em> (ainda não escrita)</span>
</p>
```

Três posições fixas: **anterior · mapa · próxima**. Regras:

- **Anterior** é link sempre que existir (da aula 2 em diante).
- **Mapa** é link sempre. É a única página que existe desde antes da aula 1, e é dela que se alcança qualquer outra — por isso é `MAPA.html` e não `.md`: markdown não abre no navegador, e uma aula cujo único escape não abre é uma aula sem saída.
- **Próxima** nasce como texto, porque a aula seguinte ainda não existe. Quando ela for escrita, **volte aqui e transforme em link.** É a única edição retroativa que a skill faz numa aula já entregue.

Nada de link para arquivo `.md` no rodapé — não renderiza. Missão e glossário se alcançam pelo mapa.

## Regras do quiz

- **Escreva a correta primeiro; cada distrator nasce mutando ela.** Mesmo esqueleto, mesma granularidade, mesmo registro — troque a peça que carrega o erro e mais nada. Contar palavras era auditoria depois do fato; mutar torna o paralelismo automático, por construção. A razão de fundo continua a mesma: opção que se destaca pela forma entrega a resposta, e aí o item mede leitura de formatação, não conhecimento.
- **Cada distrator é um erro que o aluno de fato cometeria**, não um erro decorativo. É o que torna a escolha dele diagnóstica: errar revela qual crença errada ele carrega.
- **Teste final: leia o conjunto pronto sem conhecer o assunto.** Se ainda dá pra identificar a certa, regenere o conjunto — não remende a opção que se destacou.
- **Nenhuma alternativa carrega o porquê.** Zero justificativa dentro das opções: o motivo aparece só na explicação, depois de responder — no quiz da skill, o campo `why` do `quiz.js`, que já é separado de `options`. A correta vir com "…, porque X" enquanto as outras são secas entrega a resposta pela forma.
- O feedback explica **por que** as erradas são erradas, não só qual era a certa.
- Uma pergunta deve puxar de aula anterior sempre que houver aula anterior. Espaçamento e intercalação valem mais que mais uma pergunta nova.
- **Os textos que o `quiz.js` gera saem em português por padrão**: o rótulo `Pergunta N`, o `Certo.`/`Não.` do feedback, os três estados do placar e a mensagem de quiz malformado. Aula em outra língua troca todos por atributos `data-txt-*` no primeiro elemento `.quiz` da página, conforme documentado no cabeçalho do `quiz.js`. Define todos eles: metade em inglês e metade em português é o pior dos dois.

## Checklist antes de entregar

Rode inteira. Uma falha, a aula volta pra bancada. E a bancada é o arquivo: reprovou, edita no lugar e roda a checklist de novo — o navegador só entra quando ela passa inteira, porque cada abertura é uma aba nova e o aluno não deveria escolher entre três versões da mesma aula.

**O mecânico roda antes da sua leitura.** Da pasta da skill: `node scripts/checar_aula.js <caminho-da-aula.html>` (aceita vários arquivos). Ele confere sozinho os itens marcados `— script` aqui embaixo: os que se leem no arquivo sem julgamento — `de ?` no cabeçalho, link pra `.md`, hex dentro do SVG, travessão, `.score` no lugar de `.quiz-score`, marca de tema escuro. FALHA bloqueia (saída 1); AVISO é a parte heurística (a figura de abertura e a auditoria de coordenadas), que continua sendo conferência no olho. Rode ele **primeiro**, e só depois leia a lista inteira: atenção humana gasta em vírgula errada é atenção que faltou pra perguntar se a analogia é isomorfa — e é exatamente isso que o script não sabe fazer.

- [ ] Cabeçalho expressa aula normal ou desvio na língua da trilha — nunca `de ?`. Página nova usa `data-aula`/`data-de` ou, para desvio, somente `data-desvio`; página antiga sem atributos mantém a frase legada em português — script
- [ ] Rodapé tem anterior · mapa · próxima, e o mapa aponta pra `MAPA.html` — script (parcial: confere o `.next-up` e o link do mapa)
- [ ] Nenhum link do rodapé aponta pra arquivo `.md` — script
- [ ] A aula anterior teve o link "próxima" preenchido, e o mapa foi atualizado
- [ ] A aula **abre com a figura**, antes de qualquer prosa — script (aviso)
- [ ] Se houver analogia: a analogia é isomorfa — zero ou no máximo **um** ponto de ruptura; quando houver, ele é declarado na `figcaption`
- [ ] Se houver analogia: aula que esbarra na ruptura repete a ruptura ali, com link pra `figcaption` que a declarou
- [ ] Se houver analogia: o desenho fala em **objeto** (forma, bolo, cadeado) — nenhuma caixa com rótulo, nenhum termo técnico dentro do SVG
- [ ] Se houver analogia: objeto em tinta; âmbar só no que a figura ensina; tijolo no que quebra ou não existe
- [ ] Se houver analogia: `figcaption` narra a lição em prosa corrida; `.traducao` batiza os termos depois do desenho
- [ ] Se houver analogia: o objeto veio do mundo da trilha (`NOTES.md`) — nenhum universo novo no meio da trilha
- [ ] Se não houver analogia: o desenho mostra as partes com nome e a relação entre elas, e é do próprio assunto (nada de comparação forçada)
- [ ] A forma do desenho casa com o conteúdo: comparação = lado a lado com `.dash`, processo = sequência, escolha = árvore
- [ ] No máximo 3 termos novos
- [ ] Todo termo novo batizado na língua da trilha **antes** da etiqueta em inglês
- [ ] **Teste da borracha:** apaguei mentalmente os termos em inglês — a aula ainda ensina?
- [ ] Nenhuma frase em inglês com terminações da língua da trilha (em pt-BR: "é retargetado", "vou commitar o rebase")
- [ ] Termos novos entraram no glossário nesta sessão, marcados `provisório`
- [ ] Termo que ele usou certo nesta sessão perdeu a marca (e virou registro)
- [ ] **Tem pelo menos um desenho**, e ele se explica antes do texto
- [ ] Se houver diagrama de partes: sobre painel branco, cada parte com sua cor, mesma cor das aulas anteriores, papéis fixos (azul = base, laranja = movimento, verde = terceiro, magenta = o que entra depois, tijolo = o que dá errado), teto de 5, rótulo dentro + legenda embaixo
- [ ] **Auditoria de coordenadas do SVG**: nenhum texto estoura o `viewBox` nem invade forma vizinha. Confira com a conta, não no olho: texto mono de 15px ocupa ~9px por caractere (13px ≈ 8px/char) — `x + 9×nº de caracteres` tem que caber no limite direito, e o vão vertical entre texto e forma tem que ser ≥ 10px. Frase da figura e desenho têm que concordar (não escreva "cinco formas" sobre um desenho com quatro) — script (aviso: ele faz a conta dos 9px por caractere; o resto é seu)
- [ ] Nenhum hex dentro do SVG — as cores moram no CSS — script
- [ ] Nenhum travessão (—) no texto da aula: reestruture com vírgula, dois-pontos, ponto ou `·` — script
- [ ] Pele certa: página cinza-aço, figuras e blocos densos em painel branco — nenhum `prefers-color-scheme: dark` ou `data-theme` na aula — script (parcial: ele pega as duas marcas de tema escuro)
- [ ] Toda afirmação factual tem citação (`.cite`) pra fonte primária
- [ ] Contém pelo menos um dado real medido da máquina dele
- [ ] Quiz: distratores mutados da correta, nenhuma opção carrega o porquê — lido sem conhecer o assunto, não dá pra identificar a certa. Aula fora do português define todos os `data-txt-*`
- [ ] Um ganho tangível, e ele amarra na missão
- [ ] Reusa `assets/` — nada reusável escrito inline
- [ ] Classes certas: `.eyebrow`, `.subtitle`, `.quiz-score` (não `.score`) — script
- [ ] Aberta no navegador pra ele **uma única vez, depois de todos os itens acima passarem**, com apresentação curta no chat (sem duplicar o texto da aula)
- [ ] Correção depois da abertura **edita o mesmo arquivo** e pede pra ele recarregar a aba — nunca uma segunda abertura no navegador (`Start-Process`, `open`, `xdg-open` — cada uma abre aba nova), nunca um arquivo variante da mesma aula (uma aula, um arquivo)
- [ ] No `MAPA.html`, a aula ganhou link mas segue `▶ próxima` até a resposta à pergunta final permitir avançar pelos critérios do `SKILL.md`
- [ ] A entrega no chat termina com **uma** pergunta: situação nova, pede o motivo, cabe na etapa dele, e a aula deu as ferramentas

## Tamanho

Se a aula não cabe em poucos minutos, ela é duas aulas. Memória de trabalho é pequena e não negocia. Na dúvida, corte — a próxima aula está a uma sessão de distância.
