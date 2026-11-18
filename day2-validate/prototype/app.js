// Single-page prototype. All items and wording below are made up.
// Files are NOT uploaded anywhere. The page only reads the file name in the browser.
// "what" = one short line. "tip" = common mistake, shown only when the user opens Tips.
var MAX_MB = 5; // made-up limit
var TYPES = ["pdf", "jpg", "jpeg", "png"];

var ITEMS = {
  myself: [
    { id: "old", label: "My current passport", upload: true,
      what: "The page with your photo and details.",
      tip: "Do not crop the edges or the lines at the bottom of the page." },
    { id: "photo", label: "A recent photo", upload: true,
      what: "Passport-style, taken in the last 3 months.",
      tip: "No glasses or hat. Plain white background." },
    { id: "pay", label: "Payment ready", upload: false,
      what: "Card or e-wallet. You pay at the end.",
      tip: "Nothing to upload. Tick when you are ready." }
  ],
  child: [
    { id: "old", label: "My child's current passport", upload: true,
      what: "The page with your child's photo and details.",
      tip: "Do not crop the edges or the lines at the bottom of the page." },
    { id: "birth", label: "My child's birth certificate", upload: true,
      what: "The full certificate showing both parents' names.",
      tip: "A hospital note is not accepted." },
    { id: "ids", label: "Both parents' IDs", upload: true,
      what: "Front and back of each parent's ID.",
      tip: "Parents often upload only one parent's ID. Both are needed." },
    { id: "consent", label: "Other parent's consent", upload: true,
      what: "A signed form, if only one parent is applying.",
      tip: "If both parents apply together, skip this row." },
    { id: "photo", label: "A recent photo of my child", upload: true,
      what: "Passport-style, taken in the last 3 months.",
      tip: "Your child alone, eyes open, plain white background." },
    { id: "pay", label: "Payment ready", upload: false,
      what: "Card or e-wallet. You pay at the end.",
      tip: "Nothing to upload. Tick when you are ready." }
  ]
};

var section = document.getElementById("checklist");
var list = document.getElementById("items");
var status = document.getElementById("status");
var choices = document.querySelectorAll(".choice");
var current = [];
var state = {}; // id -> file name, or true for tick-only items

function checkFile(file) {
  var ext = file.name.split(".").pop().toLowerCase();
  if (TYPES.indexOf(ext) === -1) return "The selected file must be a PDF, JPG or PNG.";
  if (file.size === 0) return "The selected file is empty.";
  if (file.size > MAX_MB * 1024 * 1024) return "The selected file must be smaller than " + MAX_MB + " MB.";
  return "";
}

function render(who) {
  current = ITEMS[who];
  state = {};
  list.innerHTML = "";

  current.forEach(function (item) {
    var li = document.createElement("li");
    li.dataset.id = item.id;

    var row = document.createElement("div");
    row.className = "row";
    row.tabIndex = 0;
    row.setAttribute("role", "button");

    var text = document.createElement("span");
    text.className = "text";
    var strong = document.createElement("strong");
    strong.textContent = item.label;
    var what = document.createElement("small");
    what.textContent = item.what;
    text.appendChild(strong);
    text.appendChild(what);

    var action = document.createElement("span");
    action.className = "action";

    row.appendChild(text);
    row.appendChild(action);
    li.appendChild(row);

    var error = document.createElement("p");
    error.className = "error";
    error.setAttribute("role", "alert");
    error.hidden = true;
    li.appendChild(error);

    // Tips sit outside the clickable row so keyboard and screen readers work.
    var tips = document.createElement("details");
    tips.className = "tips";
    var summary = document.createElement("summary");
    summary.textContent = "Tips";
    var tipText = document.createElement("p");
    tipText.textContent = item.tip;
    tips.appendChild(summary);
    tips.appendChild(tipText);
    li.appendChild(tips);

    if (item.upload) {
      var input = document.createElement("input");
      input.type = "file";
      input.hidden = true;
      input.accept = ".pdf,.jpg,.jpeg,.png";
      input.addEventListener("change", function () {
        if (!input.files.length) return;
        var problem = checkFile(input.files[0]);
        if (problem) {
          error.textContent = problem;
          error.hidden = false;
          input.value = "";
        } else {
          error.hidden = true;
          state[item.id] = input.files[0].name;
        }
        update();
      });
      li.appendChild(input);
      var open = function () { input.click(); };
      row.addEventListener("click", function () { if (!state[item.id]) open(); });
      row.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && !state[item.id]) { e.preventDefault(); open(); }
      });
    } else {
      var toggle = function () {
        if (state[item.id]) { delete state[item.id]; } else { state[item.id] = true; }
        update();
      };
      row.addEventListener("click", toggle);
      row.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    }

    list.appendChild(li);
  });

  section.hidden = false;
  update();
}

function update() {
  var missing = [];
  current.forEach(function (item) {
    var li = list.querySelector('[data-id="' + item.id + '"]');
    var action = li.querySelector(".action");
    var value = state[item.id];
    li.classList.toggle("done", !!value);
    action.textContent = "";

    if (value && item.upload) {
      var name = document.createElement("span");
      name.className = "filename";
      name.textContent = "✓ " + value;
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove";
      remove.textContent = "Remove";
      remove.addEventListener("click", function (e) {
        e.stopPropagation();
        delete state[item.id];
        li.querySelector('input[type="file"]').value = "";
        update();
      });
      action.appendChild(name);
      action.appendChild(remove);
    } else if (value) {
      action.textContent = "✓ Done";
    } else {
      action.textContent = item.upload ? "Upload" : "Tick";
      missing.push(item.label);
    }
  });

  if (missing.length === 0) {
    status.className = "status ok";
    status.textContent = "Looks complete. Ready to submit. An ICA officer will review it.";
  } else {
    status.className = "status warn";
    status.textContent = missing.length + " still to do.";
  }
}

choices.forEach(function (btn) {
  btn.addEventListener("click", function () {
    choices.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
    render(btn.dataset.who);
  });
});
