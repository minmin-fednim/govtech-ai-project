// Fix test: do applicants fix a flagged problem correctly?
// Everything here is made up. No real files, names or IDs. Nothing is uploaded or stored.
(function () {
  var SAMPLE = [
    { id: "pass", label: "Child's current passport", file: "child-passport-page.pdf", ok: true },
    {
      id: "birth", label: "Child's birth certificate", file: "hospital-note.pdf", ok: false,
      prompt: "This looks like a hospital note, not the full birth certificate. Upload the full certificate that shows both parents' names.",
      options: [
        { name: "hospital-note-copy.pdf", good: false, note: "That is still a hospital note." },
        { name: "birth-certificate-full.pdf", good: true },
        { name: "child-photo.jpg", good: false, note: "That is a photo, not the birth certificate." }
      ]
    },
    {
      id: "ids", label: "Both parents' IDs", file: "parent1-id.png", ok: false,
      prompt: "Only one parent's ID was found. Both parents' IDs are needed.",
      options: [
        { name: "parent1-id-again.png", good: false, note: "That is the same parent again. Add the other parent's ID." },
        { name: "bank-statement.pdf", good: false, note: "That is not an identity document." },
        { name: "parent2-id-front-back.png", good: true }
      ]
    }
  ];

  var list = document.getElementById("fixtest-list");
  var result = document.getElementById("fixtest-result");
  var totalsEl = document.getElementById("fixtest-totals");
  var totals = { people: 0, flagged: 0, firstTry: 0 };
  var session;

  function newSession() {
    session = {};
    SAMPLE.forEach(function (r) {
      if (!r.ok) session[r.id] = { fixed: false, tries: 0, firstTry: false, open: false, msg: "" };
    });
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function render() {
    list.innerHTML = "";
    var remaining = 0;

    SAMPLE.forEach(function (r) {
      var s = session[r.id];
      var li = el("li", "ft-row");
      var head = el("div", "ft-head");
      var left = el("span", "text");
      left.appendChild(el("strong", "", r.label));
      var isOk = r.ok || s.fixed;
      left.appendChild(el("small", "", isOk ? "✓ " + (s.fixed ? "Fixed" : r.file) : "Uploaded: " + r.file));
      head.appendChild(left);
      li.appendChild(head);

      if (isOk) {
        li.classList.add("done");
      } else {
        remaining++;
        li.appendChild(el("p", "ft-prompt", r.prompt));

        if (!s.open) {
          var fix = el("button", "ft-btn", "Fix this");
          fix.type = "button";
          fix.addEventListener("click", function () { s.open = true; render(); });
          li.appendChild(fix);
        } else {
          var fs = el("fieldset", "ft-choose");
          fs.appendChild(el("legend", "", "Pick the file to upload (made-up samples)"));
          r.options.forEach(function (o, i) {
            var lab = el("label", "ft-opt");
            var radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "pick-" + r.id;
            radio.value = String(i);
            lab.appendChild(radio);
            lab.appendChild(el("span", "", o.name));
            fs.appendChild(lab);
          });
          if (s.msg) { var m = el("p", "ft-wrong", s.msg); m.setAttribute("role", "alert"); fs.appendChild(m); }
          var go = el("button", "ft-btn", "Upload this file");
          go.type = "button";
          go.addEventListener("click", function () {
            var picked = fs.querySelector("input:checked");
            if (!picked) { s.msg = "Pick a file first."; render(); return; }
            var o = r.options[Number(picked.value)];
            s.tries++;
            if (o.good) {
              s.fixed = true;
              s.firstTry = s.tries === 1;
              s.msg = "";
            } else {
              s.msg = o.note;
            }
            render();
          });
          fs.appendChild(go);
          li.appendChild(fs);
        }
      }
      list.appendChild(li);
    });

    result.innerHTML = "";
    if (remaining === 0) {
      result.className = "status ok";
      var fixedFirst = Object.keys(session).filter(function (k) { return session[k].firstTry; }).length;
      var flagged = Object.keys(session).length;
      var tries = Object.keys(session).map(function (k) { return session[k].tries; }).join(" and ");
      result.appendChild(el("p", "", "All fixed. Looks complete. An ICA officer will review it."));
      result.appendChild(el("p", "", "Fixed correctly on the first try: " + fixedFirst + " of " + flagged + ". Tries per problem: " + tries + "."));
      var next = el("button", "ft-btn", "Record result and start next participant");
      next.type = "button";
      next.addEventListener("click", function () {
        totals.people++;
        totals.flagged += flagged;
        totals.firstTry += fixedFirst;
        newSession();
        render();
      });
      result.appendChild(next);
    } else {
      result.className = "status warn";
      result.textContent = remaining + " problem" + (remaining > 1 ? "s" : "") + " still to fix.";
    }

    if (totals.people > 0) {
      var pct = Math.round((totals.firstTry / totals.flagged) * 100);
      totalsEl.textContent = "Recorded: " + totals.people + " participant" + (totals.people > 1 ? "s" : "") +
        ". Fixed correctly on the first try: " + totals.firstTry + " of " + totals.flagged +
        " (" + pct + "%). Goal: 9 in 10 (made-up target).";
    } else {
      totalsEl.textContent = "No results recorded yet. Goal: 9 in 10 fixed correctly on the first try (made-up target).";
    }
  }

  newSession();
  render();
})();
