/* Widget de quiz reutilizável — recuperação ativa com feedback imediato.
 *
 * Uso na aula:
 *
 *   <div class="quiz" data-quiz='{
 *     "q": "Texto da pergunta",
 *     "options": ["Opção A", "Opção B", "Opção C"],
 *     "answer": 1,
 *     "why": "Explicação mostrada depois de responder."
 *   }'></div>
 *   <script src="../assets/quiz.js"></script>
 *
 * Regra de autoria: todas as opções devem ter comprimento parecido. Uma opção
 * visivelmente mais longa ou mais qualificada que as outras entrega a resposta
 * pela forma, não pelo conteúdo — e aí o item mede leitura de formatação, não
 * conhecimento.
 *
 * A ordem das opções é embaralhada a cada carregamento (Fisher-Yates), então
 * reler a aula é recuperação de verdade, não memória de posição.
 */
(function () {
  "use strict";

  var total = 0;
  var correct = 0;
  var answered = 0;

  function shuffle(n) {
    var idx = Array.from({ length: n }, function (_, i) { return i; });
    for (var i = idx.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = idx[i]; idx[i] = idx[j]; idx[j] = t;
    }
    return idx;
  }

  function updateScore() {
    var el = document.querySelector("[data-quiz-score]");
    if (!el) return;
    if (answered === 0) {
      el.textContent = total + (total === 1 ? " pergunta" : " perguntas") + " — responda para ver o placar.";
    } else if (answered < total) {
      el.textContent = correct + " de " + answered + " até aqui (" + (total - answered) + " restando).";
    } else {
      el.textContent = "Placar final: " + correct + " de " + total + ".";
    }
  }

  function render(node, i) {
    var spec;
    try {
      spec = JSON.parse(node.getAttribute("data-quiz"));
    } catch (e) {
      node.innerHTML = '<p class="cite">Quiz malformado: ' + String(e.message) + "</p>";
      return;
    }

    total++;

    var num = document.createElement("div");
    num.className = "q-num";
    num.textContent = "Pergunta " + (i + 1);

    var q = document.createElement("div");
    q.className = "q-text";
    q.textContent = spec.q;

    var fb = document.createElement("div");
    fb.className = "feedback";

    node.appendChild(num);
    node.appendChild(q);

    var buttons = [];
    var order = shuffle(spec.options.length);

    order.forEach(function (origIdx) {
      var b = document.createElement("button");
      b.className = "opt";
      b.type = "button";
      b.textContent = spec.options[origIdx];
      b.addEventListener("click", function () {
        if (node.dataset.done === "1") return;
        node.dataset.done = "1";
        answered++;

        var isRight = origIdx === spec.answer;
        if (isRight) correct++;

        buttons.forEach(function (other) {
          other.disabled = true;
          if (other.dataset.orig === String(spec.answer)) {
            other.classList.add("correct");
          } else if (other === b) {
            other.classList.add("wrong");
          } else {
            other.classList.add("muted");
          }
        });

        fb.className = "feedback show " + (isRight ? "ok" : "no");
        fb.innerHTML =
          "<p><strong>" +
          (isRight ? "Certo." : "Não.") +
          "</strong> " +
          spec.why +
          "</p>";

        updateScore();
      });
      b.dataset.orig = String(origIdx);
      buttons.push(b);
      node.appendChild(b);
    });

    node.appendChild(fb);
  }

  function init() {
    var nodes = document.querySelectorAll(".quiz[data-quiz]");
    Array.prototype.forEach.call(nodes, render);
    updateScore();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
