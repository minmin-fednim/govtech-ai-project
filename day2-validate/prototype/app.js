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
      tip: "No glasses or hat. Plain white background." }
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
    { id: "consent", label: "Other parent's consent", upload: true, skippable: true,
      what: "A signed form, if only one parent is applying.",
      tip: "If both parents apply together, skip this row." },
    { id: "photo", label: "A recent photo of my child", upload: true,
      what: "Passport-style, taken in the last 3 months.",
      tip: "Your child alone, eyes open, plain white background." }
  ]
};

var section = document.getElementById("checklist");
var list = document.getElementById("items");
var statusBox = document.getElementById("status"); // not named "status": that clashes with window.status
var choices = document.querySelectorAll(".choice");
var current = [];
var state = {}; // id -> file name, or true for tick-only items
var SKIPPED = "skipped"; // marker: the applicant said both parents apply together
var uploading = 0; // uploads still in progress
var generation = 0; // changes when the applicant switches who the passport is for
var UPLOAD_WAIT_MS = 600; // made-up wait

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
  generation++;
  uploading = 0;
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

    if (item.skippable) {
      var skip = document.createElement("button");
      skip.type = "button";
      skip.className = "skip";
      skip.textContent = "Both parents are applying together: skip this row";
      skip.addEventListener("click", function () {
        state[item.id] = SKIPPED;
        error.hidden = true;
        update();
      });
      li.appendChild(skip);
    }

    if (item.upload) {
      var input = document.createElement("input");
      input.type = "file";
      input.hidden = true;
      input.accept = ".pdf,.jpg,.jpeg,.png";
      input.addEventListener("change", function () {
        if (!input.files.length) return;
        var file = input.files[0];
        var problem = checkFile(file);
        if (problem) {
          error.textContent = problem;
          error.hidden = false;
          input.value = "";
          update();
          return;
        }
        // Simulated upload (made up: nothing leaves the browser).
        error.hidden = true;
        error.textContent = "";
        uploading++;
        var myGeneration = generation;
        update();
        setTimeout(function () {
          if (myGeneration !== generation) return; // list was reset meanwhile
          uploading--;
          if (document.getElementById("upload-fail").checked) {
            // Forced failure: the page is not found. The file is NOT counted as uploaded.
            error.textContent = "Upload failed. The page could not be found (error 404). Your file was not saved. Please try again.";
            error.hidden = false;
            input.value = "";
          } else {
            state[item.id] = file.name;
          }
          update();
        }, UPLOAD_WAIT_MS);
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

    var skipBtn = li.querySelector(".skip");
    if (skipBtn) skipBtn.hidden = !!value;

    if (value === SKIPPED) {
      var skipped = document.createElement("span");
      skipped.className = "filename";
      skipped.textContent = "✓ Skipped";
      var undo = document.createElement("button");
      undo.type = "button";
      undo.className = "remove";
      undo.textContent = "Undo";
      undo.addEventListener("click", function (e) {
        e.stopPropagation();
        delete state[item.id];
        update();
      });
      action.appendChild(skipped);
      action.appendChild(undo);
    } else if (value && item.upload) {
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
    statusBox.className = "status ok";
    statusBox.textContent = "File types and sizes look right. I have not checked what is inside the files. An ICA officer will check them. You can pay now.";
  } else {
    statusBox.className = "status warn";
    statusBox.textContent = missing.length + " still to do.";
  }
  updatePay(missing.length);
}

// ---- Pay the fee (made up: no real payment) ----
var payBtn = document.getElementById("pay-btn");
var payHint = document.getElementById("pay-hint");
var payMsg = document.getElementById("pay-msg");
var payTimeout = document.getElementById("pay-timeout");
var paying = false;
var paid = false;
var PAY_WAIT_MS = 1200; // made-up wait

function updatePay(missingCount) {
  if (paid) return;
  // Rule: pay only when every document is submitted.
  payBtn.disabled = paying || missingCount > 0;
  payHint.textContent = missingCount > 0
    ? "Pay is locked. " + missingCount + " row" + (missingCount === 1 ? "" : "s") + " still to do."
    : "";
}

payBtn.addEventListener("click", function () {
  if (paying || paid || payBtn.disabled) return;
  // Second check: never submit unless every document is really uploaded.
  var stillMissing = current.filter(function (item) { return !state[item.id]; }).length;
  if (stillMissing > 0 || uploading > 0) { update(); return; }
  paying = true;
  payBtn.disabled = true;
  payBtn.textContent = "Paying...";
  payMsg.className = "";
  payMsg.textContent = "";

  setTimeout(function () {
    paying = false;
    if (payTimeout.checked) {
      // Timeout: nothing is paid. Let the applicant try again.
      payBtn.textContent = "Try payment again";
      payMsg.className = "pay-error";
      payMsg.textContent = "The payment timed out. You have not been charged. Please try again.";
      update();
    } else {
      paid = true;
      payBtn.textContent = "Paid";
      payBtn.disabled = true;
      payMsg.className = "pay-ok";
      payMsg.textContent = "Payment received (made up). An ICA officer will review your application.";
    }
  }, PAY_WAIT_MS);
});

choices.forEach(function (btn) {
  btn.addEventListener("click", function () {
    choices.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
    render(btn.dataset.who);
  });
});
