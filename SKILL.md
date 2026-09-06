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
| `NOTES.md` | Preferências dele, o mundo da analogia da trilha, a marca `pele: nova` / `pele: antiga` (regra 6) e suas notas de trabalho. |
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

### 2. Regra da analogia — isomorfa e universal, ou nenhuma

**Analogia esticada é pior que analogia nenhuma.** Sem candidata aprovada nos critérios desta regra, a aula abre com diagrama sóbrio, sem fantasia forçada. A saída de emergência abre a regra porque título e abertura são o que fica lido: prometer analogia em toda aula empurra pra inventar uma quando não existe nenhuma boa, e a esticada instala crença errada que cobra uma aula de desaprendizado depois.

Havendo candidata, o conceito entra por ela **antes de qualquer termo técnico**.

Quando houver uma ruptura relevante, a analogia declara **onde ela quebra** — na `figcaption` da figura que a desenha. Esconder uma ruptura instala uma crença errada que só aparece três aulas depois; se não houver ruptura relevante, não invente uma diferença só para preencher esse lugar.

**A analogia só entra se for isomorfa — e o teste é contável.** Procure onde a **estrutura do conceito** já existe no mundo físico: a forma de bolo não é *parecida* com a imagem Docker, ela **é** só-leitura-que-gera-instâncias. A medida: **quantos pontos de ruptura a analogia precisa declarar.** Zero ou um, é isomorfa — use. Dois ou mais, está esticada — descarte (caso real: esquema tático do eFootball para imagem/contêiner precisava de dois avisos de "aqui mente", e um deles era uma aula inteira de desaprendizado).

**Ruptura é a diferença que faz o aluno prever errado sobre o que a aula ensina.** Diferença física que não gera previsão errada não conta e não precisa ser declarada: a forma de bolo esquenta, a imagem Docker não, e nenhuma aula de Docker cobra essa previsão. A contagem de zero ou um vale sobre as rupturas assim definidas, não sobre toda diferença que dá pra apontar entre o objeto e o conceito.

**O objeto tem que ser de repertório universal** — conhecido por qualquer pessoa alfabetizada, independente de profissão, país ou idade. O teste: *um adolescente de outro país entenderia esse objeto sem explicação?* Passam forma de bolo, cadeado, receita, fila, geladeira, semáforo, tomada. Não passam esquema tático de videogame, biblioteca de código, pipeline de CI, contrato de um setor específico. O mundo pessoal do aluno não entra aqui: histórico e `NOTES.md` não são fonte de candidatas nem critério de desempate. Repertório de nicho é mais rico em detalhe e por isso estica com mais facilidade; e procurar candidata no histórico faz você escolher uma analogia pior só porque ela apareceu ali.

**A ordem de escolha entre candidatas:** isomorfia (0 ou 1 ponto de ruptura) → repertório universal → simplicidade.

**A analogia se desenha antes de se descrever** — e é ela que dá o que desenhar. O estilo aprovado desenha OBJETOS (a forma canelada, o cadeado, o bolo com vapor), e conceito abstrato desenhado "direto" vira caixa com rótulo, que é exatamente o visual que a pele nova existe pra matar. Por isso as duas decisões andam juntas: sem objeto isomorfo, sem desenho de analogia — e vale a saída de emergência que abre a regra. Nesse caso o desenho é do próprio assunto: mostra as partes com nome e a relação entre elas, como a trilha do cubo mágico, que abre com o próprio cubo destacando centros, arestas e cantos. E a forma do desenho segue o conteúdo do mesmo jeito.

- **Um mundo por trilha.** Docker mora na cozinha (forma, bolo, etiqueta gravada, os potes na geladeira). Se a aula 3 puxa do futebol e a aula 4 da cozinha, não existe mundo — existem analogias soltas, e ele recomeça a cada aula. O universo se escolhe na primeira aula, fica anotado em `NOTES.md`, e as seguintes moram dentro dele. Prefira universo com **relações prontas** entre os objetos (encaixe, peça que troca, peça que quebra): é relação que o tema precisa ensinar.
- **A forma do desenho segue o que a aula ensina**, inclusive quando há analogia. Comparação (errado contra certo, antes contra depois, ou os dois conceitos que ele confunde, a forma e o bolo): duas metades num SVG só, divisor tracejado no meio (`.dash`), porque desenhar um lado obriga o leitor a imaginar o outro, e a diferença entre os dois é a aula. Processo: os passos em sequência (preparar a massa, pôr na forma, assar, desenformar). Escolha: árvore de decisão. Duas metades deixa de ser obrigatório, é o padrão da comparação.
- **Quando houver analogia, a tradução vem depois do desenho.** A figura fala em objeto ("a forma é trancada"); a linha `.traducao` no rodapé dela batiza os termos ("a forma é a **imagem**, `image`) — regra 3 na ordem certa. Num desenho direto do assunto, as partes podem ser nomeadas na língua da trilha; a etiqueta técnica em inglês continua vindo depois do entendimento. A tabela do `analogy.css` virou opcional: use só quando a ponte precisar de amarração propriedade por propriedade que não coube na figura.

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

**Estado da migração mora na trilha, não aqui.** Cada trilha declara a própria pele no `NOTES.md` dela, numa linha só: `pele: nova` ou `pele: antiga`. **Ausência da linha vale como antiga** — o caso conservador, pra que trilha velha nunca troque de cara por esquecimento. Esta skill **não lista trilha nominalmente**: lista de trilhas migradas envelhece em silêncio e passa a mentir na primeira migração que ninguém veio anotar aqui, e aí a instrução errada é seguida com confiança.

Ao migrar uma trilha, a sessão faz as três coisas juntas: troca a marca no `NOTES.md` dela, copia o `lesson.css` novo (`node scripts/sincronizar_componentes.js --aplicar`, que lê essa marca) e **abre as aulas antigas da trilha no navegador antes de dar por feito** — a folha nova pega aula escrita pra folha velha, e o estrago só aparece na tela.

## Como conduzir

### HTML primeiro, diálogo como apoio

A aula nasce **completa em HTML** — desenho, prosa curta, quiz, citações — e é aberta no navegador **uma única vez, depois de passar inteira na checklist de [formatos/AULA.md](./formatos/AULA.md)**, acompanhada nessa mesma abertura de uma apresentação curta no chat. Abrir antes da checklist é entregar rascunho: o que ele vê na tela deixa de ser a aula. O HTML é o veículo do ensino; o chat é o apoio.

O papel do chat: a apresentação em poucas linhas, as dúvidas dele, e a pergunta única que fecha a aula. **Nunca duplique o texto da aula nos dois lugares** — quem repete a aula inteira no chat obriga ele a ler tudo duas vezes, e foi exatamente essa a reclamação que originou a regra.

Quando ele disser "não entendi" — e principalmente se ele pedir desculpa — a resposta mora **no chat**, uma ideia por vez, ancorada no que ele já viveu na máquina dele, fechando com pergunta binária. Não produza mais arquivo pra resolver dúvida.

Toda entrega termina com **uma pergunta que ele precisa responder**. Uma, não três.

**Essa pergunta é o que fecha a aula**: a aula vira `✅ feita` no `MAPA.html` quando a resposta permite avançar pelos critérios abaixo. O quiz não fecha nada, porque ele roda no navegador e você não vê o resultado dele: quiz é treino com feedback imediato. Três exigências da pergunta final: ela apresenta uma **situação nova** e pede que ele use o que aprendeu e explique o motivo da resposta; ela cabe na etapa em que ele está; e a aula deu as ferramentas para chegar até a resposta. Situação nova, ferramentas conhecidas.

**Resposta parcialmente errada não decide sozinha o avanço.** Se o erro compromete o próximo conceito, corrija e peça nova tentativa antes de avançar. Se é detalhe secundário, siga e anote `revisar` no mapa para aquele conteúdo. Responder não é prova de domínio, e também não se exige resposta perfeita para avançar.

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

**Abertura de sessão: 2–3 perguntas antes de escrever a aula nova.** Sessão que retoma uma trilha que já tem pelo menos uma aula fechada não começa escrevendo — começa perguntando, **no chat**. Duas ou três perguntas de recuperação ativa, puxadas do glossário e dos quizzes das aulas anteriores. A prioridade, nesta ordem: (1) o conteúdo marcado `revisar` no mapa; (2) as aulas sem marca `🔁 lembrou`; (3) as aulas com o `🔁 lembrou` mais antigo (é o mais antigo que está prestes a sumir, não o da semana passada). Os termos ainda `provisório` do glossário continuam sendo fonte das perguntas. Sem calendário fixo: as sessões não têm dia certo, então o espaçamento aqui é ordem de escolha, não agenda. Ele responde **de memória**, sem reabrir a aula. Só então a aula nova começa.

**Acertou de memória, sem ajuda?** A aula ganha no `MAPA.html` a marca `🔁 lembrou: <o que foi lembrado, em poucas palavras> · <data>`. A descrição serve a duas coisas: ela diz o que já foi perguntado, pra próxima pergunta variar, e evita tratar uma resposta sobre parte da aula como verificação da aula inteira. **Esqueceu depois algo que já tinha marca `🔁`?** Mantenha a marca antiga e acrescente `revisar`: esse conteúdo vem primeiro na próxima retomada. Fora o registro de crença errada e a promoção de termo no glossário, essa é a única escrita em arquivo que a abertura faz.

**Errou? Não corrija de imediato — sonde antes.** Faça uma pergunta a mais sobre o **mesmo conceito, por outro ângulo**, construída de modo que a resposta errada só faça sentido sob uma crença específica. A sondagem separa os dois casos:

- **Hesitação ou "não sei" → pista de lacuna.** Confirmada na sondagem, corrige em uma linha e segue, sem virar aula de revisão. Resposta hesitante também pode ter raciocínio certo por baixo: peça o motivo antes de concluir que falta conteúdo.
- **Resposta errada com confiança → pista de crença errada.** Confiança não diagnostica sozinha, porque resposta confiante pode ser decorada. A crença errada só vira registro quando a sondagem confirma, ou seja, quando o motivo que ele explica e a pergunta discriminante apontam para o mesmo modelo. Confirmada, a próxima aula começa desmontando esse modelo antes de empilhar conteúdo novo.

Exemplo: "O que acontece com o que o contêiner gravou quando ele é removido?" → "Fica salvo na imagem", confiante → sondagem: "Então dois contêineres da mesma imagem enxergam os arquivos um do outro? Por quê?". Um novo "sim" acompanhado da explicação de que ambos escrevem na imagem faz a resposta e o motivo convergirem para a crença — imagem como armazenamento compartilhado e gravável — e a próxima aula abre desmontando isso. Hesitação continua sendo só pista: peça o motivo e use a sondagem antes de decidir se há lacuna e se uma correção curta basta.

Sem a sondagem, a abertura mede o que ficou, não o que ficou torto. Numa trilha de oito aulas, crença errada na aula 2 contamina até a 6 e só aparece quando desmontar já é caro.

Termo `provisório` que ele acertou aqui conta como uso correto por conta própria: perde a marca no glossário na mesma sessão e vira registro — regra do [formatos/GLOSSARIO.md](./formatos/GLOSSARIO.md).

A abertura mora no chat e custa dois minutos, sem gerar arquivo nenhum — o que ela escreve é a marca `🔁 lembrou` no mapa, a promoção de termo no glossário e, quando a sondagem confirmar crença errada, o registro. A justificativa é a própria seção — retenção é o objetivo declarado, espaçamento e recuperação ativa são o mecanismo conhecido, e sem um momento fixo em que ele puxa da memória o que ficou da sessão passada a skill declara retenção e entrega fluência, que é justamente a que engana.

### Conhecimento, habilidade, sabedoria

- **Conhecimento** vem de fontes confiáveis. Nunca da sua memória paramétrica. Registre em `RESOURCES.md` e cite dentro das aulas — citação é o que torna a aula auditável.

  **Ao menor sinal de incerteza — um dado, um nome, um número, uma sintaxe, uma definição — pare e cheque na fonte antes de escrever aquilo na aula.** Se a checagem mudar o que você ia ensinar, diga isso abertamente em vez de silenciar a correção. Citação sozinha não proíbe escrever de memória e caçar a fonte depois: a checagem vem antes da afirmação, não atrás dela.
- **Habilidade** vem de prática com laço de feedback curto: quiz, tarefa no navegador, passo a passo no mundo real. Feedback imediato, de preferência automático. E, quando o tema tem uma forma própria de cobrar lá fora, um banco de **prova externa** — ver [formatos/PRATICA.md](./formatos/PRATICA.md).
- **Sabedoria** vem de gente. Quando a pergunta dele exigir julgamento, tente responder — e aponte uma comunidade de alta reputação onde ele testa aquilo com humanos. Se ele já disse que não quer comunidade, respeite e anote.

## As aulas

Uma aula é **um HTML que linka os componentes de `assets/`**, em `lessons/`, numerado `NNNN-nome-em-kebab.html`. Linkada, não autocontida — o reuso vale mais que a portabilidade de um arquivo solto.

Curta. Completável rápido. Um ganho tangível por aula. Bonita — tipografia limpa, imprime bem, estilo Tufte — porque ele volta nelas depois.

O contrato completo de uma aula está em [formatos/AULA.md](./formatos/AULA.md). Rode a checklist de lá antes de entregar — e antes dela, `node scripts/checar_aula.js <caminho-da-aula.html>`, que confere sozinho os itens mecânicos e devolve as falhas com o número da linha.

Abra a aula pra ele no final, com o comando do sistema dele: `Start-Process "<caminho>"` no Windows, `open "<caminho>"` no macOS, `xdg-open "<caminho>"` no Linux. **Uma vez por aula, por sessão**, e só depois da checklist passar inteira — cada uma dessas aberturas é uma aba nova, então repetir o comando pra mostrar uma correção não corrige nada, só empilha versões da mesma aula na frente dele. Correção em aula já aberta é **edição no mesmo arquivo**: a aba que ele já tem atualiza com F5, e é isso que você diz no chat ("é só recarregar"). Daí a regra dura: **uma aula = um arquivo, editado no lugar** — nunca crie variante (`-v2`, nome levemente diferente) da mesma aula, porque revisão não gera arquivo novo e trilha com duas versões do mesmo número não tem mais fonte de verdade. E **só a aula abre no navegador**: `MAPA.html`, glossário e prática se alcançam pelos links da própria aula — abrir junto transforma a entrega em três abas, que é o problema que esta regra existe pra matar.

> Histórico: em 24/08/2026, na trilha `worktree`, uma entrega abriu três abas da mesma aula, cada uma num estágio diferente de revisão (abriu, rodou a checklist, corrigiu, abriu de novo). Foi isso que originou a regra da abertura única.

## Componentes

Aulas são montadas com componentes reusáveis em `assets/`: folha de estilo, quiz, analogia, figura, árvore de decisão, simuladores.

**Reuso é o padrão, não a exceção.** Leia `assets/` antes de escrever qualquer aula. Se precisar de algo novo e reusável, escreva como componente e linke — nunca inline código que a próxima aula duplicaria.

**Todos os componentes moram em [`assets/`](./assets/) desta skill.** É de lá que se copia para uma trilha nova — a skill é autossuficiente, não depende de nenhuma trilha existir.

| Arquivo | Serve pra |
|---|---|
| `lesson.css` | A pele inteira (regra 6) **e o kit de desenho `.d`** da analogia desenhada: `.box`/`.box-acc`/`.dash-bad`, setas, textos, `.frase`, `.canvas`, `.traducao`, `.quote`, `.rows`. Classes da página: `.eyebrow`, `.subtitle`, `.callout`, `.cite`, `.sidenote`, `.quiz`, `.quiz-score`, `.footer`, `.next-up`. Toda aula linka só ele + `quiz.js`, salvo quando precisar dos componentes abaixo. |
| `quiz.js` | Quiz com feedback imediato e ordem embaralhada. |
| `analogy.css` | Tabela propriedade-a-propriedade. **Opcional** — só quando a ponte não coube na figura e na `.traducao`. |
| `figure.css` | A moldura do diagrama de partes: scroll no celular, impressão. Só com `diagrama.css`. |
| `diagrama.css` | **As cores das partes.** Cinco papéis fixos e validados, legenda, impressão por padrão de traço. |
| `decide.css` | Árvore de decisão binária, pra aula cujo produto é "no caso X, escolha Y". |
| `duo.css` | Comparação lado a lado. |
| `transcript.css` | Transcrição de terminal / conversa. |

**Componente é o que serve a qualquer tema.** Simulador amarrado a um assunto — um medidor de janela de contexto, um tabuleiro tático — mora na trilha que o usa, em `~/learning/<tema>/assets/`, e não sobe pra cá. O teste: outro tema usaria isso? Se não, é da trilha.

⚠️ **Cada trilha tem a própria cópia de cada componente** — não há arquivo compartilhado. Mexeu num componente aqui, propague para todas as trilhas que já o usam, senão a aula 3 de uma trilha fica com regra diferente da aula 3 da outra. Quem faz a conferência é o script, não a memória:

- `node scripts/sincronizar_componentes.js` — **confere**: compara o md5 de cada componente da skill com a cópia de cada trilha, não escreve nada, e sai com 1 se algo divergiu.
- `node scripts/sincronizar_componentes.js --aplicar` — **propaga** da skill pras trilhas o que divergiu.

Componente que a trilha não tem **não é divergência**: cada trilha usa o que precisa, e empurrar `decide.css` pra quem nunca desenhou árvore de decisão só suja a pasta. O script diz "não usa" e segue.

**Exceção durante a migração de pele (regra 6):** o `lesson.css` daqui é o novo, e ele só é conferido e propagado nas trilhas cujo `NOTES.md` tem a marca `pele: nova`. Trilha sem a marca guarda o `lesson.css` creme de propósito até ser migrada — pra essas o script **pula** o `lesson.css` e diz que pulou, enquanto os outros componentes continuam tendo que bater. É a marca na trilha que manda; esta skill não guarda lista de quem já migrou.

⚠️ `lesson.css` **não tem** `.score` — o nome certo é `.quiz-score`. A aula 1 de `claude-config` usa o errado e o placar sai sem estilo. É um dos itens que o `checar_aula.js` pega sozinho.

## Referências

**Referência é o que se consulta.** Toda aula deposita sua essência comprimida numa referência de consulta rápida: glossário, cheat sheet de sintaxe, fluxograma, sequência. A aula é pôster feito pra ser lido inteiro (regra 6); a referência serve o outro uso — achar uma definição em segundos, no meio do trabalho, sem reler aula nenhuma. E é ela que segura a consistência do vocabulário: um termo, uma definição, igual em todas as aulas.

O **glossário** é a referência essencial. Assim que existir, toda aula obedece a ele — se uma aula diverge do glossário, a aula está errada. Termo batizado pela regra 3 entra na mesma sessão como `provisório` e é promovido quando ele o usar certo. O glossário marca dois eixos: se o termo é oficial ou apelido da trilha, e se já é dele ou ainda é provisório.

## Registros de aprendizado

Escreva um quando: ele demonstrou entender algo não-trivial, revelou conhecimento prévio, corrigiu uma crença errada, ou a missão mudou.

Não escreva pra registrar que um assunto foi *coberto*. Cobertura não é aprendizado. Formato em [formatos/REGISTRO.md](./formatos/REGISTRO.md).
