# Formato dos registros de aprendizado

Ficam em `learning-records/`, numerados `0001-nome.md`. São o equivalente de ADR no ensino: capturam o que ele de fato aprendeu e o que isso muda no que vem depois. É deles que sai o cálculo da zona de desenvolvimento proximal.

## Modelo

```md
# {Título curto do que foi aprendido ou estabelecido}

{1 a 3 frases: o que foi aprendido (ou que conhecimento prévio ficou estabelecido) e por que isso importa pras próximas sessões.}
```

Esse é o formato inteiro. Um parágrafo basta. O valor está em registrar **que** isso agora é sabido e **por que** muda o que ensinar em seguida.

## Seções opcionais

Só quando agregam de verdade:

- **Status** (`ativo | substituído por 000N`) — quando um entendimento anterior se mostrou errado.
- **Evidência** — como ele demonstrou: pergunta respondida, exercício feito, experiência citada, comando rodado.
- **Implicações** — o que isso libera ou descarta pras próximas sessões.

## Quando escrever

1. **Ele demonstrou entender algo não-trivial** — não exposição, evidência de uso correto. Isso sobe o piso do que ensinar em seguida.
2. **Ele revelou conhecimento prévio** — "isso eu já sei". Registre, e registre a **profundidade** alegada.
3. **Uma crença errada foi corrigida** — os mais valiosos. Erro corrigido prevê onde ele vai tropeçar em assunto vizinho.
4. **A missão mudou** — atualize `MISSION.md` e o `MAPA.html` junto.
5. **Ele seguiu uma instrução sem entender.** Registre isso como o que é: comportamento mudou, entendimento não. É dívida, e ela cobra depois.

## O que não vale registro

- Assunto que foi **coberto**. Cobertura não é aprendizado — espere a evidência.
- Definição de termo. Isso é glossário, não registro.
- Diário de sessão. Registro é insight que muda decisão, não log.

## Substituição

Quando um registro novo contradiz um antigo, marque o antigo como `Status: substituído por 000N` em vez de apagar. O histórico de como o entendimento evoluiu é sinal.
