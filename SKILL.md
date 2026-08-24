---
name: ensinar
description: Ensina um tema ao longo de várias sessões, na língua nativa do aluno, sob seis regras — mapa do tema, analogia isomorfa desenhada como objeto, orçamento de jargão, teste da borracha, desenho onde cor significa, e a pele de aço com figura em painel branco. Fork pessoal do /teach.
argument-hint: "O que você quer aprender?"
disable-model-invocation: true
---

# Ensina

O usuário quer aprender um tema. Isso é um pedido **com estado**: a trilha atravessa várias sessões, e o que ele já aprendeu mora em disco, não na sua memória.

**A língua de ensino é a língua nativa do aluno**, registrada no `MISSION.md` da trilha (regra da língua, em [formatos/MISSAO.md](./formatos/MISSAO.md)). O padrão é a língua em que ele fala com você. Aulas, mapa, glossário e desenhos saem inteiros nela; só as etiquetas técnicas ficam em inglês. Este arquivo está escrito em pt-BR e seus exemplos são pt-BR, mas as regras valem em qualquer língua.

Fork pessoal de `mattpocock-skills:teach`. As quatro regras da seção **O que este fork muda** existem porque o original falhava nelas — elas não são enfeite, são o motivo deste arquivo existir.

## Onde a trilha mora

`~/learning/<tema>/` — um tema, uma pasta.

| Arquivo | O que é |
|---|---|
| `MAPA.html` | O mapa do tema, e a página de índice da trilha. **Vem antes da primeira aula.** Ver [formatos/MAPA.md](./formatos/MAPA.md). |
| `MISSION.md` | Por que ele quer aprender isso. Ancora tudo. Ver [formatos/MISSAO.md](./formatos/MISSAO.md). |
| `RESOURCES.md` | Fontes confiáveis + comunidades. Ver [formatos/RECURSOS.md](./formatos/RECURSOS.md). |
| `NOTES.md` | Preferências dele e suas notas de trabalho. |
| `lessons/NNNN-nome.html` | As aulas. Ver [formatos/AULA.md](./formatos/AULA.md). |
| `reference/*.html` | Referências: glossário, cheat sheets, algoritmos. Ver [formatos/GLOSSARIO.md](./formatos/GLOSSARIO.md). |
| `pratica/NNNN-nome.html` | A prova externa: como o mundo cobra o tema. Ver [formatos/PRATICA.md](./formatos/PRATICA.md). |
| `learning-records/NNNN-nome.md` | O que ele de fato aprendeu. Ver [formatos/REGISTRO.md](./formatos/REGISTRO.md). |
| `assets/*` | Componentes reusados entre aulas. |

Os nomes em inglês são dívida herdada — quatro trilhas já existem com eles (`claude-models`, `claude-config`, `claude-subagents`, `github-stacked-prs`). **Não renomeie, nem em trilha nova.** `MISSION.md` é `MISSION.md` na quinta trilha também; o layout tem que ser o mesmo em todas, senão uma sessão procura `MISSION.md`, encontra `MISSAO.md`, conclui que não há missão e refaz a entrevista do zero.

O que nasce em português é **tipo novo**, criado por este fork: `MAPA.html`, `pratica/`. Esses não têm original em inglês pra contradizer.

## O que este fork muda

Seis regras. Toda aula passa pelas seis antes de ser entregue.

### 1. Regra do mapa — nenhuma aula antes do mapa

O original numerava aulas `0001`, `0002`, indefinidamente. O aluno nunca sabia quantas faltavam, o que já tinha coberto, nem o que era "dominar aquilo". Cabeçalho "Aula 1 de ?" é confissão de que ninguém pensou no arco.

Antes da primeira aula, escreva `MAPA.html`: o tema fatiado em aulas nomeadas, cada uma com **o que ele vai conseguir fazer** ao terminar. Ele é HTML porque também é a página de índice — é dele que o aluno alcança qualquer aula, e markdown não abre no navegador. O mapa é uma **hipótese**, não um contrato — revise quando a realidade mudar, e registre a revisão. Mas ele existe, e toda aula diz onde o aluno está dentro dele.

Toda aula abre com `Aula 3 de 7` e um link pro mapa. Nunca `de ?`.

### 2. Regra da analogia — toda aula abre por algo que ele já conhece

O conceito entra por uma **analogia do mundo dele**, antes de qualquer termo técnico. Puxe de coisas que ele de fato conhece — futebol e táticas de eFootball, o próprio código dele, a cozinha, o trânsito. Se você não sabe o que ele conhece, **pergunte** e anote em `NOTES.md`.

Toda analogia declara **onde ela quebra** — na `figcaption` da figura que a desenha. Analogia sem ponto de ruptura declarado instala uma crença errada que só aparece três aulas depois.

**A analogia só entra se for isomorfa — e o teste é contável.** Procure onde a **estrutura do conceito** já existe no mundo físico: a forma de bolo não é *parecida* com a imagem Docker, ela **é** só-leitura-que-gera-instâncias. O mundo dele (futebol, cozinha, o código dele) é critério de desempate entre candidatas que servem, nunca requisito de entrada. A medida: **quantos pontos de ruptura a analogia precisa declarar.** Zero ou um, é isomorfa — use. Dois ou mais, está esticada — descarte (caso real: esquema tático do eFootball para imagem/contêiner precisava de dois avisos de "aqui mente", e um deles era uma aula inteira de desaprendizado).

**A analogia se desenha antes de se descrever** — e é ela que dá o que desenhar. O estilo aprovado desenha OBJETOS (a forma canelada, o cadeado, o bolo com vapor), e conceito abstrato desenhado "direto" vira caixa com rótulo, que é exatamente o visual que a pele nova existe pra matar. Por isso as duas decisões andam juntas: sem objeto isomorfo, sem desenho de analogia — a aula segue com diagrama sóbrio e sem fantasia forçada.

- **Um mundo por trilha.** Docker mora na cozinha (forma, bolo, etiqueta gravada, os potes na geladeira). Se a aula 3 puxa do futebol e a aula 4 da cozinha, não existe mundo — existem analogias soltas, e ele recomeça a cada aula. O universo se escolhe na primeira aula, fica anotado em `NOTES.md`, e as seguintes moram dentro dele. Prefira universo com **relações prontas** entre os objetos (encaixe, peça que troca, peça que quebra): é relação que o tema precisa ensinar.
- **O desenho mostra o par.** Duas metades num SVG só, divisor tracejado no meio (`.dash`). O que o par contrasta depende da aula: errado contra certo, antes contra depois, ou os dois conceitos que ele confunde — a forma e o bolo. Desenho de um lado obriga o leitor a imaginar o outro, e a diferença entre os dois é a aula.
- **A tradução vem depois do desenho.** A figura fala em objeto ("a forma é trancada"); a linha `.traducao` no rodapé dela batiza os termos ("a forma é a **imagem**, `image`) — regra 3 na ordem certa. A tabela do `analogy.css` virou opcional: use só quando a ponte precisar de amarração propriedade por propriedade que não coube na figura.

### 3. Orçamento de jargão — 3 termos novos por aula, no máximo

Passou de três, são duas aulas. A memória de trabalho é pequena e o jargão come tudo.

Todo termo novo é **batizado na língua da trilha primeiro** (a língua nativa do aluno, registrada no `MISSION.md`), e só depois recebe a etiqueta em inglês. Em pt-BR:

> ✅ A **camada de base** (`base branch`) é a branch pra onde o PR aponta.
> ❌ A `base branch` é a branch pra onde o PR aponta.

O primeiro ensina e depois etiqueta — a etiqueta serve pra ele reconhecer o termo na doc e no CLI, que estão em inglês. O segundo só traduz, e deixa ele pensando em inglês emprestado.

Aluno cuja língua nativa é o inglês é o caso degenerado limpo: não existe camada de tradução, e o orçamento de três termos continua valendo inteiro — que é o espírito da regra.

Todo termo batizado entra no glossário da trilha na mesma sessão, marcado `provisório`. A marca cai quando ele usar o termo corretamente por conta própria — ver [formatos/GLOSSARIO.md](./formatos/GLOSSARIO.md).

### 4. Teste da borracha — o teste final de toda aula

> Apague mentalmente todos os termos em inglês da aula. Ela ainda ensina?

Se não, você **traduziu** em vez de ensinar: o entendimento estava pendurado nas palavras em inglês, e a língua da trilha era só legenda. Reescreva a explicação na língua nativa do aluno e recoloque os termos em inglês por cima, como etiquetas.

Sintoma clássico: parágrafos que só funcionam se o leitor já sabe o que o termo significa. Em pt-BR: "o PR do meio é retargetado automaticamente" — isso não é uma frase em português, é uma frase em inglês com terminações portuguesas. Toda língua tem a sua versão desse enxerto.

### 5. Regra do desenho — cor representa parte, não decora

**Toda aula tem pelo menos um desenho.** Conceito com duas ou mais partes que se relacionam não se explica só em prosa — prosa obriga o leitor a montar o desenho na cabeça dele, e é exatamente aí que a memória de trabalho estoura.

**Desenhe em toda página que ceder** — aula, referência, prática. Peque pelo excesso: figura a mais custa tempo de autoria; figura a menos custa entendimento, e o preço só aparece quando ele volta na página meses depois e não reconhece nada. Duas famílias, cada uma com seu kit:

- **A analogia desenhada** (kit `.d`, dentro do `lesson.css`) é a padrão: desenha o **objeto** do mundo da trilha em tinta, âmbar no que a figura ensina, tijolo no que quebra ou não existe. Três cores, e chega — a figura de objeto vive de forma, não de paleta.
- **O diagrama de partes** (`figure.css` + `diagrama.css`, cinco papéis abaixo) entra quando a mecânica técnica tem 3+ partes que a analogia não carrega. **Sempre sobre painel branco** — as cinco cores reprovam sobre o cinza da página (laranja 2,68:1) e passam sobre o branco (pior caso 3,20:1), medido.

As regras de cor abaixo valem pro diagrama de partes:

- **Cada parte tem sua cor, e a cor significa aquilo.** Nada de colorir porque ficou bonito. Se o azul é a camada de base na aula 1, o azul é a camada de base na aula 6. Cor que troca de sentido entre aulas custa mais caro que desenho sem cor nenhuma.
- **Cinco papéis fixos**, iguais em toda aula e em toda trilha:

  | | Cor | O papel |
  |---|---|---|
  | `.d-parte-1` | azul `#2a78d6` | a base, o que sustenta |
  | `.d-parte-2` | laranja `#eb6834` | o que vem por cima, o que se move |
  | `.d-parte-3` | verde `#17a06f` | o terceiro elemento |
  | `.d-parte-4` | magenta `#c0399b` | o que entra depois |
  | `.d-parte-5` | tijolo `#a12f2f` | o que dá errado, o alerta, onde quebra |

- **Cinco cores, teto duro.** Não é gosto: as cinco passaram no validador de paleta contra o papel destas trilhas (`#fffef9`) no modo `--pairs all` — o modo certo pra diagrama, onde qualquer parte pode acabar do lado de qualquer outra. Eram três enquanto a paleta precisava sobreviver *também* ao tema escuro; largar o tema escuro (regra 6) foi o que pagou a quarta e a quinta. A sexta reprova por contraste — e cinco partes já é o limite do que se segura num desenho só. Precisou de uma sexta: use `.secundaria` (mesma cor, traço tracejado) ou quebre em dois desenhos.
- **Nunca só cor.** Rótulo dentro do desenho e legenda embaixo, sempre. Quem tem daltonismo, quem imprime em preto e branco e quem está no sol tem que aprender igual. `diagrama.css` troca cor por padrão de traço na impressão. **Isto não é zelo: é o que torna a paleta válida** — o par pior fica na faixa 6–8 de separação sob daltonismo, que só é legal com esse segundo canal.
- **Texto usa tinta, nunca a cor da parte.** A identidade mora na forma colorida; o rótulo fica em tinta do lado dela. Texto colorido perde contraste e vira enfeite.
- **Nada de hex dentro do SVG** — só as variáveis, pra paleta ser trocável num arquivo só.
- **Trocou as cores? Rode o validador.** Paleta não se avalia no olho:
  `node scripts/validate_palette.js "<hex,…>" --mode light --surface "#fffef9" --pairs all` (skill `dataviz`).

### 6. Regra da pele — página de aço, figura em papel branco

**A aula é pôster que ensina, não documento com figuras.** A pele aprovada (23/08/2026, a partir da página "SOLID na Oficina"): página em cinza-aço `#e9ebec`, todo bloco denso — figura, quiz, aviso, cartão — em **painel branco com borda grossa de tinta**, título em Archivo Black, corpo em IBM Plex Sans, âmbar `#e9a400` como única cor de destaque da página, tijolo `#b03a26` no que quebra. A figura abre a aula, antes de qualquer prosa; a prosa é curta e vira legenda e linha de tradução. Referência canônica: `~/learning/docker/lessons/0001-molde-e-coisa-viva.html`.

Continua **sem tema escuro**, e continua decisão: a aula é lida de dia, impressa, e reaberta meses depois. O bloco `@media print` derruba o cinza pra branco e troca tijolo por tracejado.

Duas medidas que sustentam a pele (calculadas, não opinadas):
- Texto fraco sobre o cinza precisa de `#67675f` (4,77:1) — o `#8a8a82` antigo dava 2,91:1 e reprovava.
- As cinco cores do diagrama de partes reprovam sobre o cinza e passam sobre o branco — por isso **desenho nunca pousa direto na página**: sempre em painel branco.

Desenho bom responde a pergunta da aula sozinho, antes do texto. Se o leitor precisa ler três parágrafos pra entender o desenho, o desenho está ilustrando — não ensinando.

**Estado da migração:** só `docker` usa a pele nova. As outras cinco trilhas seguem na antiga (creme/Tufte) até serem migradas uma a uma — ao migrar, copie o `lesson.css` novo e abra as aulas antigas da trilha no navegador antes de dar por feito.

## Como conduzir

### HTML primeiro, diálogo como apoio

A aula nasce **completa em HTML** — desenho, prosa curta, quiz, citações — e é aberta no navegador **uma única vez, depois de passar inteira na checklist de [formatos/AULA.md](./formatos/AULA.md)**, acompanhada nessa mesma abertura de uma apresentação curta no chat. Abrir antes da checklist é entregar rascunho: o que ele vê na tela deixa de ser a aula. O HTML é o veículo do ensino; o chat é o apoio.

O papel do chat: a apresentação em poucas linhas, as dúvidas dele, e a pergunta única que fecha a aula. **Nunca duplique o texto da aula nos dois lugares** — quem repete a aula inteira no chat obriga ele a ler tudo duas vezes, e foi exatamente essa a reclamação que originou a regra.

Quando ele disser "não entendi" — e principalmente se ele pedir desculpa — a resposta mora **no chat**, uma ideia por vez, ancorada no que ele já viveu na máquina dele, fechando com pergunta binária. Não produza mais arquivo pra resolver dúvida.

Toda entrega termina com **uma pergunta que ele precisa responder**. Uma, não três.

> Histórico: de 03/08/2026 a 23/08/2026 valia o acordo inverso ("chat primeiro, HTML enxuto no fim", firmado na trilha docker). Revogado por ele em 23/08/2026, na trilha clusters: "era pra já criar o HTML de uma vez". O `NOTES.md` da trilha docker guarda o histórico — não o reescreva.

### A missão

Toda aula amarra na missão — o motivo real dele. Se `MISSION.md` estiver vazio ou vago, entreviste antes de escrever qualquer coisa. Missão ruim é pior que missão nenhuma: gera aula abstrata e você fica sem critério pra escolher a próxima.

Quando a motivação vier fraca ("quero estar por dentro"), não exija que ele invente uma dor. **Ancore em evidência**: abra o repositório dele, meça o estado real, e escreva a missão em cima do que você encontrou. E aceite explicitamente que "isso não serve pro meu caso" é um resultado válido da trilha.

Missão muda. Quando mudar, confirme com ele, atualize o arquivo e escreva um registro.

**A missão também responde onde ele para.** Depois de entender o porquê, pergunte a profundidade — Leve (reconhece e decide, 3–4 aulas), Intermediário (faz o caminho comum sozinho, 5–7) ou Profundo (resolve o caso torto e consegue ensinar outra pessoa, 8–12). Sempre com o número de aulas junto: sem o preço à vista, a resposta é ambição e o abandono vem na aula 6.

Pergunte no **fim** da entrevista, nunca antes de você ter medido o terreno — no começo ele ainda não sabe o bastante do tema pra estimar o quanto precisa dele.

Nível é destino, não etapa: uma trilha só, que termina antes ou depois. E subir de nível **estende** o mapa, nunca recomeça — o que só se sustenta se você desenhar o arco Profundo primeiro e cortar no nível escolhido (regra do prefixo, em [formatos/MAPA.md](./formatos/MAPA.md)).

### Zona de desenvolvimento proximal

Cada aula deve desafiar **na medida**. Para calibrar: leia `learning-records/`, olhe onde ele está no `MAPA.html`, e escolha o próximo passo que a missão justifica.

### Fluência × retenção

Duas coisas diferentes:

- **Fluência** — recuperar na hora. Dá sensação de domínio e engana.
- **Retenção** — lembrar daqui a um mês. É o objetivo.

Retenção se constrói com dificuldade desejável: recuperação ativa (lembrar de memória, não reler), espaçamento (distribuir no tempo) e intercalação (misturar tópicos vizinhos na prática).

Para **conhecimento**, dificuldade é inimiga — ela come a memória de trabalho que faria falta pra entender. Para **habilidade**, dificuldade é a ferramenta.

### Conhecimento, habilidade, sabedoria

- **Conhecimento** vem de fontes confiáveis. Nunca da sua memória paramétrica. Registre em `RESOURCES.md` e cite dentro das aulas — citação é o que torna a aula auditável.
- **Habilidade** vem de prática com laço de feedback curto: quiz, tarefa no navegador, passo a passo no mundo real. Feedback imediato, de preferência automático. E, quando o tema tem uma forma própria de cobrar lá fora, um banco de **prova externa** — ver [formatos/PRATICA.md](./formatos/PRATICA.md).
- **Sabedoria** vem de gente. Quando a pergunta dele exigir julgamento, tente responder — e aponte uma comunidade de alta reputação onde ele testa aquilo com humanos. Se ele já disse que não quer comunidade, respeite e anote.

## As aulas

Uma aula é **um HTML que linka os componentes de `assets/`**, em `lessons/`, numerado `NNNN-nome-em-kebab.html`. Linkada, não autocontida — o reuso vale mais que a portabilidade de um arquivo solto.

Curta. Completável rápido. Um ganho tangível por aula. Bonita — tipografia limpa, imprime bem, estilo Tufte — porque ele volta nelas depois.

O contrato completo de uma aula está em [formatos/AULA.md](./formatos/AULA.md). Rode a checklist de lá antes de entregar.

Abra a aula pra ele no final: `Start-Process "<caminho>"` no Windows. **Uma vez por aula, por sessão**, e só depois da checklist passar inteira — cada `Start-Process` abre uma aba nova, então repetir o comando pra mostrar uma correção não corrige nada, só empilha versões da mesma aula na frente dele. Correção em aula já aberta é **edição no mesmo arquivo**: a aba que ele já tem atualiza com F5, e é isso que você diz no chat ("é só recarregar"). Daí a regra dura: **uma aula = um arquivo, editado no lugar** — nunca crie variante (`-v2`, nome levemente diferente) da mesma aula, porque revisão não gera arquivo novo e trilha com duas versões do mesmo número não tem mais fonte de verdade. E **só a aula abre no navegador**: `MAPA.html`, glossário e prática se alcançam pelos links da própria aula — abrir junto transforma a entrega em três abas, que é o problema que esta regra existe pra matar.

> Histórico: em 24/08/2026, na trilha `worktree`, uma entrega abriu três abas da mesma aula, cada uma num estágio diferente de revisão (abriu, rodou a checklist, corrigiu, abriu de novo). Foi isso que originou a regra da abertura única.

## Componentes

Aulas são montadas com componentes reusáveis em `assets/`: folha de estilo, quiz, analogia, figura, árvore de decisão, simuladores.

**Reuso é o padrão, não a exceção.** Leia `assets/` antes de escrever qualquer aula. Se precisar de algo novo e reusável, escreva como componente e linke — nunca inline código que a próxima aula duplicaria.

**Todos os componentes moram em [`assets/`](./assets/) desta skill.** É de lá que se copia para uma trilha nova — a skill é autossuficiente, não depende de nenhuma trilha existir.

| Arquivo | Serve pra |
|---|---|
| `lesson.css` | Base de tudo. Papel claro, sem tema escuro. Classes: `.eyebrow`, `.subtitle`, `.callout`, `.cite`, `.sidenote`, `.quiz`, `.quiz-score`, `.footer`, `.next-up`. |
| `quiz.js` | Quiz com feedback imediato e ordem embaralhada. |
| `lesson.css` | A pele inteira (regra 6) **e o kit de desenho `.d`** da analogia desenhada: `.box`/`.box-acc`/`.dash-bad`, setas, textos, `.frase`, `.canvas`, `.traducao`, `.quote`, `.rows`. Toda aula linka só ele + `quiz.js`, salvo quando precisar dos componentes abaixo. |
| `analogy.css` | Tabela propriedade-a-propriedade. **Opcional** — só quando a ponte não coube na figura e na `.traducao`. |
| `figure.css` | A moldura do diagrama de partes: scroll no celular, impressão. Só com `diagrama.css`. |
| `diagrama.css` | **As cores das partes.** Cinco papéis fixos e validados, legenda, impressão por padrão de traço. |
| `decide.css` | Árvore de decisão binária, pra aula cujo produto é "no caso X, escolha Y". |
| `duo.css` | Comparação lado a lado. |
| `transcript.css` | Transcrição de terminal / conversa. |

**Componente é o que serve a qualquer tema.** Simulador amarrado a um assunto — um medidor de janela de contexto, um tabuleiro tático — mora na trilha que o usa, em `~/learning/<tema>/assets/`, e não sobe pra cá. O teste: outro tema usaria isso? Se não, é da trilha.

⚠️ **Cada trilha tem a própria cópia de cada componente** — não há arquivo compartilhado. Mexeu num componente aqui, propague para todas as trilhas que já o usam, senão a aula 3 de uma trilha fica com regra diferente da aula 3 da outra. Confira com:
`md5sum ~/.claude/skills/ensinar/assets/<componente> ~/learning/*/assets/<componente>` — todas têm que bater.

**Exceção durante a migração de pele (regra 6):** o `lesson.css` daqui é o novo, e só `docker` bate com ele. As trilhas antigas (`claude-models`, `claude-config`, `claude-subagents`, `github-stacked-prs`, `whatsapp-agents`) mantêm o `lesson.css` creme de propósito até serem migradas — pra essas, o md5 do `lesson.css` NÃO deve bater com o daqui, e os outros componentes continuam tendo que bater.

⚠️ `lesson.css` **não tem** `.score` — o nome certo é `.quiz-score`. A aula 1 de `claude-config` usa o errado e o placar sai sem estilo.

## Referências

Aulas raramente são relidas. **Referências são.** Toda aula deposita sua essência comprimida numa referência de consulta rápida: glossário, cheat sheet de sintaxe, fluxograma, sequência.

O **glossário** é a referência essencial. Assim que existir, toda aula obedece a ele — se uma aula diverge do glossário, a aula está errada. Termo batizado pela regra 3 entra na mesma sessão como `provisório` e é promovido quando ele o usar certo. O glossário marca dois eixos: se o termo é oficial ou apelido da trilha, e se já é dele ou ainda é provisório.

## Registros de aprendizado

Escreva um quando: ele demonstrou entender algo não-trivial, revelou conhecimento prévio, corrigiu uma crença errada, ou a missão mudou.

Não escreva pra registrar que um assunto foi *coberto*. Cobertura não é aprendizado. Formato em [formatos/REGISTRO.md](./formatos/REGISTRO.md).
