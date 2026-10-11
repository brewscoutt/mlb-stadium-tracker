const grid = document.getElementById("grid");
const search = document.getElementById("search");
const visitedFilter = document.getElementById("visitedFilter");
const sortBy = document.getElementById("sortBy");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress() {
  const total = FORMER_STADIUMS.length;
  const visitedCount = FORMER_STADIUMS.filter((s) => getVisit(s.id).visited).length;
  const pct = total ? Math.round((visitedCount / total) * 100) : 0;
  progressFill.style.width = pct + "%";
  progressText.textContent = `${visitedCount} / ${total} visited`;
}

function closedYear(s) {
  const match = s.years.match(/(\d{4})\s*$/);
  return match ? parseInt(match[1], 10) : 0;
}

function getFilteredStadiums() {
  const q = search.value.trim().toLowerCase();
  const visitedOnly = visitedFilter.value;

  let list = FORMER_STADIUMS.filter((s) => {
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
  if (sort === "closed") {
    list = list.slice().sort((a, b) => closedYear(b) - closedYear(a));
  } else if (sort === "visited") {
    list = list.slice().sort((a, b) => {
      const av = getVisit(a.id).visited ? 0 : 1;
      const bv = getVisit(b.id).visited ? 0 : 1;
      if (av !== bv) return av - bv;
      return a.team.localeCompare(b.team);
    });
  } else {
    list = list.slice().sort((a, b) => a.team.localeCompare(b.team));
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
  card.className = "card has-team-color" + (v.visited ? " visited" : "");
  card.style.setProperty("--team-primary", s.colors.primary);

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
  badge.className = "era-badge";
  badge.textContent = s.years;

  top.appendChild(label);
  top.appendChild(badge);
  card.appendChild(top);

  const note = document.createElement("div");
  note.className = "card-note";
  note.textContent = `Replaced by ${s.replacedBy}`;
  card.appendChild(note);

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

[search, visitedFilter, sortBy].forEach((el) => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});

render();
updateProgress();
