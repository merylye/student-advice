(function () {
  var data = JSON.parse(document.getElementById("library-data").textContent);
  var labels = JSON.parse(document.getElementById("library-labels").textContent);
  var list = document.getElementById("library-list");
  var count = document.getElementById("library-count");
  var search = document.getElementById("library-search");
  var topicSelect = document.getElementById("filter-topic");
  var state = { stage: new Set(), field: new Set(), type: new Set() };

  var params = new URLSearchParams(window.location.search);
  if (params.get("topic")) topicSelect.value = params.get("topic");

  document.querySelectorAll(".chip[data-group]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var g = btn.dataset.group, v = btn.dataset.value;
      if (state[g].has(v)) { state[g].delete(v); btn.setAttribute("aria-pressed", "false"); }
      else { state[g].add(v); btn.setAttribute("aria-pressed", "true"); }
      render();
    });
  });
  search.addEventListener("input", render);
  topicSelect.addEventListener("change", render);

  function matchesSet(set, values) {
    if (set.size === 0) return true;
    for (var i = 0; i < values.length; i++) if (set.has(values[i])) return true;
    return false;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    var q = search.value.trim().toLowerCase();
    var topic = topicSelect.value;
    var shown = data.filter(function (r) {
      if (topic && r.topics.indexOf(topic) === -1) return false;
      if (!matchesSet(state.stage, r.stage.concat(r.stage.indexOf("any") > -1 ? Object.keys(labels.stage) : []))) return false;
      if (!matchesSet(state.field, r.field)) return false;
      if (!matchesSet(state.type, [r.type])) return false;
      if (q) {
        var hay = (r.title + " " + r.author + " " + (r.note || "")).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    count.textContent = shown.length + (shown.length === 1 ? " link" : " links");
    list.innerHTML = shown.map(function (r) {
      var tags = '<span class="tag tag-type">' + esc(r.type) + "</span>" +
        r.field.map(function (f) { return '<span class="tag">' + esc(labels.field[f]) + "</span>"; }).join("") +
        r.stage.map(function (s) { return '<span class="tag">' + esc(labels.stage[s]) + "</span>"; }).join("");
      return '<li class="resource"><a class="resource-title" href="' + esc(r.url) + '">' + esc(r.title) +
        '</a><span class="resource-author">' + esc(r.author) + "</span>" +
        (r.note ? '<span class="resource-note">' + esc(r.note) + "</span>" : "") +
        '<span class="tags">' + tags + "</span></li>";
    }).join("");
  }
  render();
})();
