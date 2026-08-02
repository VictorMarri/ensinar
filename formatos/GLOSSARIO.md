# Formato do glossário

O glossário é a **língua oficial da trilha**. Toda aula, exercício e registro obedece a ele — se uma aula diverge do glossário, a aula está errada. Construí-lo já é aprender: comprimir um conceito numa definição apertada é evidência de que ele entendeu.

Mora em `reference/glossario.html`.

## Modelo

```md
# Glossário: {Tema}

{Uma ou duas frases sobre o que este glossário cobre.}

## {Agrupamento natural}

**Camada de base** (`base branch`):
A branch pra onde um pull request aponta.
_Evite_: branch alvo, branch destino

**Irmãos** — *apelido da trilha, não termo oficial*:
Duas branches que saíram do mesmo ponto e apontam ambas pra trunk.
```

## Regras

- **Só entra termo que ele já entende.** O glossário registra conhecimento comprimido; não é dicionário que se lê pra aprender. Conceito recém-apresentado espera até ele usar corretamente.
- **Nome em português na chave, etiqueta em inglês entre parênteses.** É a regra 3 do `SKILL.md` materializada. A etiqueta existe pra ele reconhecer o termo na documentação e no CLI — não pra ser o jeito dele pensar.
- **Termo sem tradução honesta fica em inglês, e você diz isso.** Forçar tradução ruim é pior que manter o original. `pull request` é `pull request`. Mas então explique o que é em português nativo.
- **Marque o que é apelido da trilha.** Se você inventou um termo pra ensinar (útil e legítimo), sinalize. Ele não pode chegar num fórum usando seu apelido achando que é vocabulário oficial e passar vergonha.
- **Seja opinativo.** Quando várias palavras existem pro mesmo conceito, escolha a melhor e liste as outras em `_Evite_`. É assim que a língua comprime.
- **Definições apertadas.** Uma ou duas frases. Defina o que o termo **é**, não o que ele faz nem como se usa.
- **Use os próprios termos do glossário dentro das definições.** Isso é o que faz os termos difíceis ficarem fáceis depois.
- **Sinalize ambiguidade.** Se o campo usa o termo de forma frouxa, resolva explicitamente: "nesta trilha, 'camada' sempre significa um PR da pilha".
- **Revise.** Definição escrita na semana 1 pode estar errada na semana 6. Atualize no lugar; não deixe entrada velha.
