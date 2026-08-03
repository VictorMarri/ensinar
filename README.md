# `/ensinar`

Uma skill do [Claude Code](https://claude.com/claude-code) que ensina um tema ao
longo de várias sessões, em português, com trilha que mora em disco — mapa do
tema, aulas em HTML, glossário e registros do que você de fato aprendeu.

Fork de [`teach`](https://github.com/mattpocock/skills), de Matt Pocock. O
arcabouço de ensino é dele; o que este fork acrescenta são as seis regras
abaixo. Detalhe da atribuição em [NOTICE.md](./NOTICE.md).

## As seis regras

O original ensinava bem e falhava sempre nos mesmos pontos. Cada regra existe
porque um desses pontos doeu:

| | Regra | O problema que ela resolve |
|---|---|---|
| 1 | **Mapa** — nenhuma aula antes do mapa | Aulas numeradas ao infinito. O aluno nunca sabia quantas faltavam nem o que era "terminar". Toda aula abre com `Aula 3 de 7`, nunca `de ?`. |
| 2 | **Analogia** — abre por algo que ele já conhece | Conceito entrando por definição técnica não gruda. E toda analogia declara **onde quebra** — analogia sem ponto de ruptura instala uma crença errada que só aparece três aulas depois. |
| 3 | **Orçamento de jargão** — 3 termos novos, no máximo | A memória de trabalho é pequena e o jargão come tudo. Todo termo é batizado em português primeiro, e só depois recebe a etiqueta em inglês: a **camada de base** (`base branch`). |
| 4 | **Teste da borracha** | Apague mentalmente todos os termos em inglês da aula. Ela ainda ensina? Se não, você traduziu em vez de ensinar. |
| 5 | **Desenho** — cor representa parte, não decora | Conceito com partes que se relacionam não se explica só em prosa. Cinco papéis fixos de cor, iguais da aula 1 à última. |
| 6 | **Papel claro** | A aula é documento de estudo, não aplicativo. É lida de dia, impressa, e reaberta meses depois. |

As regras 5 e 6 se pagam: manter a paleta legível *também* no tema escuro
travava o diagrama em três cores. Sem tema escuro, cinco passam no validador de
paleta da skill `dataviz`, contra o papel `#fffef9`:

```
#2a78d6 azul     — a base, o que sustenta
#eb6834 laranja  — o que vem por cima, o que se move
#17a06f verde    — o terceiro elemento
#c0399b magenta  — o que entra depois
#a12f2f tijolo   — o que dá errado, o alerta

[PASS] faixa de luminosidade · piso de croma · separação sob daltonismo
       (ΔE 8.6) · visão normal (ΔE 16.8) · contraste 5/5 acima de 3:1
```

## Instalação

```bash
git clone https://github.com/VictorMarri/ensinar ~/.claude/skills/ensinar
```

Depois, no Claude Code, digite `/ensinar`.

> A skill é **user-invoked** (`disable-model-invocation: true`). Ela só carrega
> se você digitar `/ensinar`. Pedir "me ensina sobre X" numa conversa comum
> **não** aciona nenhuma destas regras.

## Como a trilha fica em disco

Um tema, uma pasta, em `~/learning/<tema>/`:

| Arquivo | O que é |
|---|---|
| `MAPA.md` | O mapa do tema. Vem antes da primeira aula. |
| `MISSION.md` | Por que você quer aprender isso. Ancora tudo. |
| `RESOURCES.md` | Fontes confiáveis + comunidades. |
| `NOTES.md` | Suas preferências de como ser ensinado. |
| `lessons/NNNN-nome.html` | As aulas. |
| `reference/*.html` | Glossário, cheat sheets, fluxogramas. |
| `pratica/NNNN-nome.html` | A prova externa: o tema como o mundo cobra. |
| `learning-records/NNNN-nome.md` | O que você de fato aprendeu. |
| `assets/*` | Cópia dos componentes desta skill. |

## O que tem neste repo

```
SKILL.md          as seis regras e como conduzir
formatos/         o contrato de cada arquivo da trilha
  AULA.md         o contrato de uma aula + checklist de entrega
  MAPA.md         o arco do tema
  MISSAO.md  RECURSOS.md  REGISTRO.md  GLOSSARIO.md
assets/           os componentes das aulas
  lesson.css      base de tudo, papel claro
  diagrama.css    as cinco cores das partes
  analogy.css     a analogia de abertura (obrigatória)
  figure.css  quiz.js  decide.css  duo.css  transcript.css
```

Componente é o que serve a **qualquer** tema. Simulador amarrado a um assunto
mora na trilha que o usa, não aqui.

⚠️ Cada trilha carrega a própria cópia dos componentes — não há arquivo
compartilhado. Mexeu num componente, propague para as trilhas que já o usam.

## Licença

O material derivado de Matt Pocock é MIT — aviso e texto completos em
[NOTICE.md](./NOTICE.md).

A licença deste fork **ainda não foi definida**.
