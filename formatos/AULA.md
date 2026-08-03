# Formato de uma aula

Uma aula é **um HTML que linka os componentes de `assets/`**, em `lessons/`, numerado `NNNN-nome-em-kebab.html`. Curta, bonita, um ganho tangível, amarrada à missão.

Ela **não** é autocontida, e isso é escolha: os componentes ficam do lado, num arquivo só, pra que consertar o `lesson.css` uma vez conserte as vinte aulas de uma vez. O preço é que a aula não viaja sozinha — mandada por e-mail, sem a pasta `assets/` ao lado, abre sem estilo nenhum.

## Estrutura

**1. Cabeçalho.** `.eyebrow` com `Aula N de M` e link pro mapa, `<h1>`, `.subtitle` com a promessa da aula em uma frase.

```html
<p class="eyebrow">{Tema} · <a href="../MAPA.html">Aula 3 de 7</a></p>
```

Nunca `Aula 1 de ?`. Se você não sabe o M, você não escreveu o mapa — volte e escreva.

**Exceção única: o desvio.** Aula pedida pelo aluno fora do arco não tem "N de M" — ela não é a N-ésima de nada. Arquivo `D001-nome.html`, cabeçalho `Desvio 1 · fora do arco`, com o mesmo link pro mapa. É a única forma de cabeçalho permitida além de `Aula N de M`.

**2. A analogia.** Antes de qualquer termo técnico. Puxada do mundo que ele já conhece, e **com o ponto de ruptura declarado**. Componente: `analogy.css`.

> A camada de base é como a fundação de um andar: o segundo andar não fica em pé sozinho, ele apoia no primeiro.
> **Onde quebra:** um prédio real não deixa você mergear o segundo andar levando o primeiro junto. Aqui leva.

**3. O conceito, em português nativo.** No máximo **três termos novos**, cada um batizado em português antes de receber a etiqueta em inglês: **camada de base** (`base branch`). Nunca o contrário.

**4. O desenho.** Pelo menos um por aula. Cada parte com sua cor, e a cor significa aquilo — a mesma parte usa a mesma cor da aula 1 até a última. Os cinco papéis são fixos: azul = a base, laranja = o que se move, verde = o terceiro elemento, magenta = o que entra depois, tijolo = o que dá errado. Teto de **cinco cores** (medido, não opinado — ver regra 5 do `SKILL.md`); sexta parte entra por traço tracejado (`.secundaria`) ou vira um segundo desenho. Rótulo dentro, legenda embaixo, nenhum hex no SVG. Componentes: `figure.css` + `diagrama.css`.

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
- [ ] Abre com analogia do mundo dele, **com ponto de ruptura declarado**
- [ ] No máximo 3 termos novos
- [ ] Todo termo novo batizado em português **antes** da etiqueta em inglês
- [ ] **Teste da borracha:** apaguei mentalmente os termos em inglês — a aula ainda ensina?
- [ ] Nenhuma frase em inglês com terminação portuguesa ("é retargetado", "vou commitar o rebase")
- [ ] Termos novos entraram no glossário nesta sessão, marcados `provisório`
- [ ] Termo que ele usou certo nesta sessão perdeu a marca (e virou registro)
- [ ] **Tem pelo menos um desenho**, e ele se explica antes do texto
- [ ] Cada parte tem cor, a cor significa aquilo, e é a mesma cor das aulas anteriores
- [ ] Os papéis batem com a tabela: azul = base, laranja = movimento, verde = terceiro, magenta = o que entra depois, tijolo = o que dá errado
- [ ] No máximo 5 cores; sexta parte usa `.secundaria` ou virou outro desenho
- [ ] Rótulo dentro do desenho + legenda embaixo — nada depende só de cor
- [ ] Nenhum hex dentro do SVG; texto em tinta, nunca na cor da parte
- [ ] Abre em fundo claro — nenhum `prefers-color-scheme: dark` ou `data-theme` na aula
- [ ] Toda afirmação factual tem citação (`.cite`) pra fonte primária
- [ ] Contém pelo menos um dado real medido da máquina dele
- [ ] Quiz com opções do mesmo tamanho
- [ ] Um ganho tangível, e ele amarra na missão
- [ ] Reusa `assets/` — nada reusável escrito inline
- [ ] Classes certas: `.eyebrow`, `.subtitle`, `.quiz-score` (não `.score`)
- [ ] Aberta no navegador pra ele
- [ ] A entrega no chat termina com **uma** pergunta

## Tamanho

Se a aula não cabe em poucos minutos, ela é duas aulas. Memória de trabalho é pequena e não negocia. Na dúvida, corte — a próxima aula está a uma sessão de distância.
