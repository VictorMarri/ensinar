# Formato de uma aula

Uma aula é **um HTML que linka os componentes de `assets/`**, em `lessons/`, numerado `NNNN-nome-em-kebab.html`. Curta, bonita, um ganho tangível, amarrada à missão.

**A aula é o veículo completo do ensino** — ela nasce inteira (desenho, prosa curta, quiz, citações) e é aberta no navegador na hora; o chat entra como apoio: apresentação em poucas linhas, dúvidas, e a pergunta única que fecha. Nunca duplique o texto da aula no chat. Ver "HTML primeiro, diálogo como apoio" no `SKILL.md`.

Ela **não** é autocontida, e isso é escolha: os componentes ficam do lado, num arquivo só, pra que consertar o `lesson.css` uma vez conserte as vinte aulas de uma vez. O preço é que a aula não viaja sozinha — mandada por e-mail, sem a pasta `assets/` ao lado, abre sem estilo nenhum.

## Estrutura

**1. Cabeçalho.** `.eyebrow` com `Aula N de M` e link pro mapa, `<h1>`, `.subtitle` com a promessa da aula em uma frase.

```html
<p class="eyebrow">{Tema} · <a href="../MAPA.html">Aula 3 de 7</a></p>
```

Nunca `Aula 1 de ?`. Se você não sabe o M, você não escreveu o mapa — volte e escreva.

**Exceção única: o desvio.** Aula pedida pelo aluno fora do arco não tem "N de M" — ela não é a N-ésima de nada. Arquivo `D001-nome.html`, cabeçalho `Desvio 1 · fora do arco`, com o mesmo link pro mapa. É a única forma de cabeçalho permitida além de `Aula N de M`.

**2. A figura de abertura — a analogia desenhada como objeto.** A aula abre com ela, antes de qualquer prosa e de qualquer termo técnico. Kit `.d` do `lesson.css`; referência canônica: a aula 1 de docker (`0001-molde-e-coisa-viva.html`).

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
- **O desenho fala em objeto**, nunca em termo técnico: desenha a forma canelada, o cadeado, o bolo com vapor — não caixas com rótulo. Duas metades com divisor tracejado (`.dash`); tinta desenha o objeto, âmbar (`.box-acc`, `.line-acc`) marca o que a figura ensina, tijolo (`.line-bad`, `.dash-bad`) o que quebra ou não existe.
- **`figcaption`**: prosa corrida bem escrita que narra a lição — não rodapé telegráfico. É onde o ponto de ruptura da analogia se declara, quando houver.
- **`.traducao`**: batiza os termos — objeto na língua da trilha primeiro, etiqueta em inglês depois (regra 3). É aqui que "forma" vira **imagem** (`image`).

A analogia precisa ser **isomorfa** (regra 2 da skill: no máximo um ponto de ruptura). O objeto vem do mundo da trilha, anotado em `NOTES.md` — a aula 4 aprofunda o objeto da aula 1, não inventa outro. A tabela do `analogy.css` é opcional: só quando a amarração propriedade a propriedade não coube na figura.

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

- Todas as opções com **o mesmo número de palavras** e comprimento parecido. Uma opção mais longa ou mais qualificada entrega a resposta pela forma — e aí o item mede leitura de formatação, não conhecimento.
- O feedback explica **por que** as erradas são erradas, não só qual era a certa.
- Uma pergunta deve puxar de aula anterior sempre que houver aula anterior. Espaçamento e intercalação valem mais que mais uma pergunta nova.

## Checklist antes de entregar

Rode inteira. Uma falha, a aula volta pra bancada.

- [ ] Cabeçalho diz `Aula N de M` — nunca `de ?`. Desvio usa `Desvio N · fora do arco`
- [ ] Rodapé tem anterior · mapa · próxima, e o mapa aponta pra `MAPA.html`
- [ ] Nenhum link do rodapé aponta pra arquivo `.md`
- [ ] A aula anterior teve o link "próxima" preenchido, e o mapa foi atualizado
- [ ] A aula **abre com a figura**, antes de qualquer prosa
- [ ] A analogia é isomorfa: no máximo **um** ponto de ruptura, declarado na `figcaption`
- [ ] O desenho fala em **objeto** (forma, bolo, cadeado) — nenhuma caixa com rótulo, nenhum termo técnico dentro do SVG
- [ ] Duas metades num SVG só, com divisor tracejado (`.dash`)
- [ ] Objeto em tinta; âmbar só no que a figura ensina; tijolo no que quebra ou não existe
- [ ] `figcaption` narra a lição em prosa corrida; `.traducao` batiza os termos depois do desenho
- [ ] O objeto veio do mundo da trilha (`NOTES.md`) — nenhum universo novo no meio da trilha
- [ ] No máximo 3 termos novos
- [ ] Todo termo novo batizado na língua da trilha **antes** da etiqueta em inglês
- [ ] **Teste da borracha:** apaguei mentalmente os termos em inglês — a aula ainda ensina?
- [ ] Nenhuma frase em inglês com terminações da língua da trilha (em pt-BR: "é retargetado", "vou commitar o rebase")
- [ ] Termos novos entraram no glossário nesta sessão, marcados `provisório`
- [ ] Termo que ele usou certo nesta sessão perdeu a marca (e virou registro)
- [ ] **Tem pelo menos um desenho**, e ele se explica antes do texto
- [ ] Se houver diagrama de partes: sobre painel branco, cada parte com sua cor, mesma cor das aulas anteriores, papéis fixos (azul = base, laranja = movimento, verde = terceiro, magenta = o que entra depois, tijolo = o que dá errado), teto de 5, rótulo dentro + legenda embaixo
- [ ] **Auditoria de coordenadas do SVG**: nenhum texto estoura o `viewBox` nem invade forma vizinha. Confira com a conta, não no olho: texto mono de 15px ocupa ~9px por caractere (13px ≈ 8px/char) — `x + 9×nº de caracteres` tem que caber no limite direito, e o vão vertical entre texto e forma tem que ser ≥ 10px. Frase da figura e desenho têm que concordar (não escreva "cinco formas" sobre um desenho com quatro)
- [ ] Nenhum hex dentro do SVG — as cores moram no CSS
- [ ] Nenhum travessão (—) no texto da aula: reestruture com vírgula, dois-pontos, ponto ou `·`
- [ ] Pele certa: página cinza-aço, figuras e blocos densos em painel branco — nenhum `prefers-color-scheme: dark` ou `data-theme` na aula
- [ ] Toda afirmação factual tem citação (`.cite`) pra fonte primária
- [ ] Contém pelo menos um dado real medido da máquina dele
- [ ] Quiz com opções do mesmo tamanho
- [ ] Um ganho tangível, e ele amarra na missão
- [ ] Reusa `assets/` — nada reusável escrito inline
- [ ] Classes certas: `.eyebrow`, `.subtitle`, `.quiz-score` (não `.score`)
- [ ] Aberta no navegador pra ele **assim que o arquivo existe**, com apresentação curta no chat (sem duplicar o texto da aula)
- [ ] No `MAPA.html`, a aula ganhou link mas segue `▶ próxima` até ele responder a pergunta ou o quiz
- [ ] A entrega no chat termina com **uma** pergunta

## Tamanho

Se a aula não cabe em poucos minutos, ela é duas aulas. Memória de trabalho é pequena e não negocia. Na dúvida, corte — a próxima aula está a uma sessão de distância.
