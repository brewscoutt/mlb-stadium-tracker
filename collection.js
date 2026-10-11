const badgeGrid = document.getElementById("badgeGrid");
const search = document.getElementById("search");
const leagueFilter = document.getElementById("leagueFilter");
const visitedFilter = document.getElementById("visitedFilter");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function updateProgress() {
  const total = STADIUMS.length;
  const visitedCount = STADIUMS.filter((s) => getVisit(s.id).visited).length;
  const pct = total ? Math.round((visitedCount / total) * 100) : 0;
  progressFill.style.width = pct + "%";
  progressText.textContent = `${visitedCount} / ${total} visited`;
}

function getFilteredStadiums() {
  const q = search.value.trim().toLowerCase();
  const league = leagueFilter.value;
  const visitedOnly = visitedFilter.value;

  return STADIUMS.filter((s) => {
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
}

function render() {
  const list = getFilteredStadiums();
  badgeGrid.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No stadiums match your filters.";
    badgeGrid.appendChild(empty);
    return;
  }

  for (const s of list) {
    badgeGrid.appendChild(renderBadge(s));
  }
}

function renderBadge(s) {
  const v = getVisit(s.id);

  const badge = document.createElement("button");
  badge.type = "button";
  badge.className = "badge" + (v.visited ? " visited" : "");
  badge.style.setProperty("--team-primary", s.colors.primary);
  badge.style.setProperty("--team-secondary", s.colors.secondary);
  badge.setAttribute("aria-pressed", String(v.visited));
  badge.title = v.visited
    ? `${s.team} — visited. Click to unmark.`
    : `${s.team} — not visited yet. Click to mark as visited.`;

  const icon = document.createElement("div");
  icon.className = "badge-icon";
  icon.appendChild(createStadiumBadgeSvg());

  const labels = document.createElement("div");
  labels.className = "badge-labels";
  labels.innerHTML = `
    <div class="badge-team">${escapeHtml(s.team)}</div>
    <div class="badge-stadium">${escapeHtml(s.stadium)}</div>
  `;

  badge.appendChild(icon);
  badge.appendChild(labels);

  badge.addEventListener("click", () => {
    const nowVisited = !getVisit(s.id).visited;
    setVisit(s.id, { visited: nowVisited });
    badge.classList.toggle("visited", nowVisited);
    badge.setAttribute("aria-pressed", String(nowVisited));
    updateProgress();

    if (nowVisited) {
      badge.classList.remove("just-toggled");
      // eslint-disable-next-line no-unused-expressions
      badge.offsetWidth; // restart the pop animation
      badge.classList.add("just-toggled");
    }
  });

  return badge;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

[search, leagueFilter, visitedFilter].forEach((el) => {
  el.addEventListener("input", render);
  el.addEventListener("change", render);
});

render();
updateProgress();
