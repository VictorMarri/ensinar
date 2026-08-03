# Formato do MAPA.html

O mapa mora em `MAPA.html`, na raiz da trilha, e **é escrito antes da primeira
aula**. Ele responde três perguntas que o aluno faz o tempo todo e que
numeração sequencial nunca responde: *quantas faltam?*, *o que eu já cobri?*,
*o que é terminar isso?*

**É HTML, não markdown, e o motivo é navegação.** Toda aula linka pro mapa no
cabeçalho e no rodapé. Se o mapa fosse `.md`, o navegador mostraria texto cru
ou baixaria o arquivo — e o aluno ficaria sem nenhuma forma de sair da aula em
que está. O mapa é a única página que sempre existe, então é ela que faz o
papel de índice: dela se chega a qualquer aula já escrita.

## Modelo

```html
<h1>Mapa: {Tema}</h1>
<p class="subtitle">Hipótese de percurso, não contrato.</p>
<p class="eyebrow">Profundidade: <strong>{nível}</strong> · {N} aulas até o corte · última revisão {data}</p>

<h2>O arco</h2>
<p>{Uma ou duas frases: o que significa dominar isso, no recorte desta missão.
Não o tema inteiro do mundo — o pedaço que a missão justifica.}</p>

<h2>As aulas</h2>
<div class="table-wrap">
<table>
  <tr><th>#</th><th>Aula</th><th>Ao terminar, você consegue</th><th>Estado</th></tr>
  <tr><td>1</td><td><a href="lessons/0001-{nome}.html">{nome curto}</a></td><td>{capacidade observável}</td><td>✅ feita</td></tr>
  <tr><td>2</td><td>{nome curto}</td><td>{capacidade observável}</td><td>▶ próxima</td></tr>
  <tr><td>3</td><td>{nome curto}</td><td>{capacidade observável}</td><td>◻ prevista</td></tr>
  <tr><td>4</td><td>{nome curto}</td><td>{capacidade observável}</td><td>◻ fora do nível atual</td></tr>
</table>
</div>

<h2>Fora do mapa</h2>
<ul><li>{O que deliberadamente não entra, e por quê}</li></ul>

<h2>Desvios</h2>
<ul><li><a href="lessons/D001-{nome}.html">D001 · {nome}</a> — {o que ele perguntou que gerou o desvio}</li></ul>

<h2>Revisões</h2>
<ul><li>{data} — {o que mudou no mapa e o que causou a mudança}</li></ul>

<div class="footer">
  <p class="next-up"><a href="MISSION.md">Missão</a> · <a href="reference/glossario.html">Glossário</a> · <a href="pratica/">Prática</a></p>
</div>
```

Estrutura de página: mesmo `<head>` das aulas, linkando `../assets/lesson.css`
— aqui sem o `../`, porque o mapa está na raiz da trilha.

## Regras

- **Só vira link a aula que já existe.** Aula prevista é texto simples. Link
  para arquivo inexistente é a pior navegação possível: parece que funciona e
  dá erro. O estado da coluna e a existência do link têm que concordar.
- **O tamanho vem da profundidade escolhida** em `MISSION.md`: Leve 3–4,
  Intermediário 5–7, Profundo 8–12. Estourou muito a faixa pra cima e ou o
  recorte está fino demais, ou são dois temas disfarçados de um.
- **Regra do prefixo: o mapa de um nível é o começo do mapa do nível acima.**
  As 4 aulas do Leve são as 4 primeiras do Profundo — não um recorte diferente
  do tema. Isso custa um pouco: o mapa leve fica menos sob medida do que seria
  se você o desenhasse sozinho. E compra o que importa: subir de nível é
  **estender**, nunca recomeçar. Aluno que refaz aula que já tinha feito
  desiste, e com razão.
- **Ao escrever o mapa, desenhe o arco Profundo primeiro** e corte no nível
  escolhido. É a única forma de o prefixo fechar de verdade. As aulas além do
  corte ficam listadas como `◻ fora do nível atual` — servem de convite, não de
  dívida.
- **Descreva por capacidade, não por assunto.** "Você consegue dizer se duas
  branches são pilha ou irmãs" tem critério de parada. "Sobre branches" não tem
  — e sem critério de parada a aula incha até o aluno cansar.
- **Exatamente uma aula marcada ▶ próxima.** É onde ele está. Se você não
  consegue apontar, você não sabe o que ensinar na sessão de hoje.
- **O mapa é hipótese.** Ele vai mudar quando o aluno mostrar que sabe mais (ou
  menos) do que você supôs. Mudar é saudável; mudar em silêncio não é.
- **Registre toda revisão.** O aluno precisa ver que o mapa mudou e por quê.
  Mapa que muda sem aviso vira mapa em que ele não confia — e aí ele volta a não
  saber onde está.
- **Curto.** Se o mapa passar de uma tela, ele virou plano de aula. O valor dele
  é caber num olhar.
- **Uma aula pode sair do mapa.** Se o aluno pedir um desvio, atenda — mas ele
  não entra na contagem do arco. Arquivo `D001-nome.html` (numeração própria,
  separada das aulas), cabeçalho `Desvio 1 · fora do arco` com link pro mapa, e
  uma linha na seção `Desvios`.

  A razão de não absorver no arco: `Aula 4 de 8` passaria a incluir uma aula que
  não é pré-requisito de nada, e a contagem — que é o ponto inteiro da regra 1 —
  deixaria de significar "quanto falta pra chegar lá".

## Manutenção — toda sessão que entrega uma aula mexe aqui

1. A aula entregue vira `✅ feita` **e ganha link**.
2. A seguinte vira `▶ próxima`.
3. Volte na aula anterior e preencha o link "próxima" que ficou vazio quando
   ela foi escrita — ver `AULA.md`. É a única edição retroativa que a skill faz
   numa aula já entregue, e existe porque no momento em que a aula N é escrita a
   aula N+1 ainda não existe pra ser linkada.
