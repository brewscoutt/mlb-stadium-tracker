const grid = document.getElementById("grid");
const search = document.getElementById("search");
const leagueFilter = document.getElementById("leagueFilter");
const visitedFilter = document.getElementById("visitedFilter");
const sortBy = document.getElementById("sortBy");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress() {
  const total = STADIUMS.length;
  const visitedCount = STADIUMS.filter((s) => getVisit(s.id).visited).length;
  const pct = total ? Math.round((visitedCount / total) * 100) : 0;
  progressFill.style.width = pct + "%";
  progressText.textContent = `${visitedCount} / ${total} visited`;
}

const DIVISION_ORDER = ["AL East", "AL Central", "AL West", "NL East", "NL Central", "NL West"];

function getFilteredStadiums() {
  const q = search.value.trim().toLowerCase();
  const league = leagueFilter.value;
  const visitedOnly = visitedFilter.value;

  let list = STADIUMS.filter((s) => {
    if (league && s.league !== league) return false;
    const v = getVisit(s.id).visited;
    if (visitedOnly === "visited" && !v) return false;
    if (visitedOnly === "unvisited" && v) return false;
    if (q) {
      const haystack = `${s.team} ${s.stadium} ${s.city} ${s.state}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const sort = sortBy.value;
  if (sort === "team") {
    list = list.slice().sort((a, b) => a.team.localeCompare(b.team));
  } else if (sort === "visited") {
    list = list.slice().sort((a, b) => {
      const av = getVisit(a.id).visited ? 0 : 1;
      const bv = getVisit(b.id).visited ? 0 : 1;
      if (av !== bv) return av - bv;
      return a.team.localeCompare(b.team);
    });
  } else {
    list = list.slice().sort((a, b) => {
      const da = DIVISION_ORDER.indexOf(`${a.league} ${a.division}`);
      const db = DIVISION_ORDER.indexOf(`${b.league} ${b.division}`);
      if (da !== db) return da - db;
      return a.team.localeCompare(b.team);
    });
  }

  return list;
}

function render() {
  const list = getFilteredStadiums();
  grid.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No stadiums match your filters.";
    grid.appendChild(empty);
    return;
  }

  for (const s of list) {
    grid.appendChild(renderCard(s));
  }
}

function renderCard(s) {
  const v = getVisit(s.id);

  const card = document.createElement("div");
  card.className = "card" + (v.visited ? " visited" : "");

  const top = document.createElement("div");
  top.className = "card-top";

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = v.visited;
  checkbox.addEventListener("change", () => {
    setVisit(s.id, { visited: checkbox.checked });
    card.classList.toggle("visited", checkbox.checked);
    details.style.display = checkbox.checked ? "flex" : "none";
    updateProgress();
  });

  const titles = document.createElement("div");
  titles.className = "card-titles";
  titles.innerHTML = `
    <div class="team">${escapeHtml(s.team)}</div>
    <div class="stadium">${escapeHtml(s.stadium)}</div>
    <div class="location">${escapeHtml(s.city)}, ${escapeHtml(s.state)}</div>
  `;

  label.appendChild(checkbox);
  label.appendChild(titles);

  const badge = document.createElement("span");
  badge.className = `league-badge ${s.league}`;
  badge.textContent = `${s.league} ${s.division}`;

  top.appendChild(label);
  top.appendChild(badge);
  card.appendChild(top);

  if (s.note) {
    const note = document.createElement("div");
    note.className = "card-note";
    note.textContent = s.note;
    card.appendChild(note);
  }

  const details = document.createElement("div");
  details.className = "card-details";
  details.style.display = v.visited ? "flex" : "none";

  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Date visited";
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = v.dateVisited || "";
  dateInput.addEventListener("change", () => {
    setVisit(s.id, { dateVisited: dateInput.value });
  });

  const notesLabel = document.createElement("label");
  notesLabel.textContent = "Notes";
  const notesInput = document.createElement("textarea");
  notesInput.placeholder = "Who you went with, the game, a memory...";
  notesInput.value = v.notes || "";
  notesInput.addEventListener("change", () => {
    setVisit(s.id, { notes: notesInput.value });
  });

  details.appendChild(dateLabel);
  details.appendChild(dateInput);
  details.appendChild(notesLabel);
  details.appendChild(notesInput);
  card.appendChild(details);

  return card;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

[search, leagueFilter, visitedFilter, sortBy].forEach((el) => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(visits, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mlb-stadium-tracker-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

const importFile = document.getElementById("importFile");
document.getElementById("importBtn").addEventListener("click", () => importFile.click());
importFile.addEventListener("change", () => {
  const file = importFile.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      replaceAllVisits(data);
      render();
      updateProgress();
    } catch (e) {
      alert("Could not read that file. Make sure it's a JSON export from this tool.");
    }
  };
  reader.readAsText(file);
  importFile.value = "";
});

render();
updateProgress();
