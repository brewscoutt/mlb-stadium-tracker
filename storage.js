const STORAGE_KEY = "mlb-stadium-tracker:v1";

function loadVisits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn("Could not read saved data, starting fresh.", e);
    return {};
  }
}

function saveVisits(visits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visits));
}

const visits = loadVisits();

function getVisit(id) {
  return visits[id] || { visited: false, dateVisited: "", notes: "" };
}

function setVisit(id, patch) {
  const current = getVisit(id);
  visits[id] = { ...current, ...patch };
  saveVisits(visits);
}

function replaceAllVisits(data) {
  for (const key of Object.keys(visits)) delete visits[key];
  Object.assign(visits, data);
  saveVisits(visits);
}
