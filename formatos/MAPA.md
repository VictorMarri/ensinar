# Formato do MAPA.md

O mapa mora na raiz da trilha e **é escrito antes da primeira aula**. Ele responde três perguntas que o aluno faz o tempo todo e que numeração sequencial nunca responde: *quantas faltam?*, *o que eu já cobri?*, *o que é terminar isso?*

## Modelo

```md
# Mapa: {Tema}

> Hipótese de percurso, não contrato. Última revisão: {data}.
> Profundidade: **{nível}** — {N} aulas até o corte.

## O arco

{Uma ou duas frases: o que significa dominar isso, no recorte desta missão. Não o tema inteiro do mundo — o pedaço que a missão justifica.}

## As aulas

| # | Aula | Ao terminar, você consegue | Estado |
|---|---|---|---|
| 1 | {nome curto} | {capacidade observável} | ✅ feita |
| 2 | {nome curto} | {capacidade observável} | ▶ próxima |
| 3 | {nome curto} | {capacidade observável} | ◻ prevista |
| 4 | {nome curto} | {capacidade observável} | ◻ prevista |
| 5 | {nome curto} | {capacidade observável} | ◻ fora do nível atual |

## Fora do mapa

- {O que deliberadamente não entra, e por quê}

## Revisões

- {data} — {o que mudou no mapa e o que causou a mudança}
```

## Regras

- **O tamanho vem da profundidade escolhida** em `MISSION.md`: Leve 3–4, Intermediário 5–7, Profundo 8–12. Estourou muito a faixa pra cima e ou o recorte está fino demais, ou são dois temas disfarçados de um.
- **Regra do prefixo: o mapa de um nível é o começo do mapa do nível acima.** As 4 aulas do Leve são as 4 primeiras do Profundo — não um recorte diferente do tema. Isso custa um pouco: o mapa leve fica menos sob medida do que seria se você o desenhasse sozinho. E compra o que importa: subir de nível é **estender**, nunca recomeçar. Aluno que refaz aula que já tinha feito desiste, e com razão.
- **Ao escrever o mapa, desenhe o arco Profundo primeiro** e corte no nível escolhido. É a única forma de o prefixo fechar de verdade. As aulas além do corte ficam listadas como `◻ fora do nível atual` — servem de convite, não de dívida.
- **Descreva por capacidade, não por assunto.** "Você consegue dizer se duas branches são pilha ou irmãs" tem critério de parada. "Sobre branches" não tem — e sem critério de parada a aula incha até o aluno cansar.
- **Exatamente uma aula marcada ▶ próxima.** É onde ele está. Se você não consegue apontar, você não sabe o que ensinar na sessão de hoje.
- **O mapa é hipótese.** Ele vai mudar quando o aluno mostrar que sabe mais (ou menos) do que você supôs. Mudar é saudável; mudar em silêncio não é.
- **Registre toda revisão.** O aluno precisa ver que o mapa mudou e por quê. Mapa que muda sem aviso vira mapa em que ele não confia — e aí ele volta a não saber onde está.
- **Curto.** Se o mapa passar de uma tela, ele virou plano de aula. O valor dele é caber num olhar.
- **Uma aula pode sair do mapa.** Se o aluno pedir um desvio, atenda — e marque no mapa como desvio, não como aula do arco.
