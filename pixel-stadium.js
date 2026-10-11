// Procedurally builds one retro/8-bit "stadium bowl" icon on a small pixel
// grid. The shape is identical for every team; only the CSS colors (set per
// badge via --team-primary/--team-secondary custom properties) change, plus
// a grayscale filter while a stadium is unvisited. Generated with math
// instead of a hand-typed ASCII grid so the bowl/outline stays symmetric.
const PIXEL_GRID_W = 18;
const PIXEL_GRID_H = 14;

function buildStadiumMatrix() {
  const cx = (PIXEL_GRID_W - 1) / 2;
  const cy = 7.4;
  const outerRx = 8.1;
  const outerRy = 6.0;
  const innerRx = 5.7;
  const innerRy = 4.0;

  const matrix = [];
  for (let r = 0; r < PIXEL_GRID_H; r++) {
    const row = [];
    for (let c = 0; c < PIXEL_GRID_W; c++) {
      const dxOuter = (c + 0.5 - cx) / outerRx;
      const dyOuter = (r + 0.5 - cy) / outerRy;
      const distOuter = dxOuter * dxOuter + dyOuter * dyOuter;

      const dxInner = (c + 0.5 - cx) / innerRx;
      const dyInner = (r + 0.5 - cy) / innerRy;
      const distInner = dxInner * dxInner + dyInner * dyInner;

      let type = ".";
      if (distInner <= 1) {
        const dxDirt = Math.abs(c + 0.5 - cx) / 2.6;
        const dyDirt = Math.abs(r + 0.5 - (cy + 1)) / 1.8;
        type = dxDirt + dyDirt <= 1 ? "D" : "F";
      } else if (distOuter <= 1) {
        type = distOuter > 0.62 ? "S" : "C";
      }
      row.push(type);
    }
    matrix.push(row);
  }

  // Outline any bowl pixel that touches empty space, for a crisp pixel-art rim.
  for (let r = 0; r < PIXEL_GRID_H; r++) {
    for (let c = 0; c < PIXEL_GRID_W; c++) {
      if (matrix[r][c] !== "S" && matrix[r][c] !== "C") continue;
      const neighbors = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1],
      ];
      const touchesEmpty = neighbors.some(([nr, nc]) => {
        if (nr < 0 || nr >= PIXEL_GRID_H || nc < 0 || nc >= PIXEL_GRID_W) return true;
        return matrix[nr][nc] === ".";
      });
      if (touchesEmpty) matrix[r][c] = "O";
    }
  }

  // Fixed fixtures: a scoreboard up top, and two light towers flanking it.
  const scoreboard = { rowStart: 0, rowEnd: 1, colStart: 7, colEnd: 10 };
  for (let r = scoreboard.rowStart; r <= scoreboard.rowEnd; r++) {
    for (let c = scoreboard.colStart; c <= scoreboard.colEnd; c++) {
      matrix[r][c] = "B";
    }
  }
  for (const poleCol of [1, PIXEL_GRID_W - 2]) {
    matrix[0][poleCol] = "L";
    matrix[1][poleCol] = "O";
    matrix[2][poleCol] = "O";
  }

  return matrix;
}

const STADIUM_MATRIX = buildStadiumMatrix();

const PIXEL_CLASS = {
  S: "px-structure",
  C: "px-crowd",
  F: "px-field",
  D: "px-dirt",
  O: "px-outline",
  B: "px-scoreboard",
  L: "px-light",
};

function createStadiumBadgeSvg() {
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  svg.setAttribute("viewBox", `0 0 ${PIXEL_GRID_W} ${PIXEL_GRID_H}`);
  svg.setAttribute("shape-rendering", "crispEdges");
  svg.classList.add("stadium-svg");

  for (let r = 0; r < PIXEL_GRID_H; r++) {
    for (let c = 0; c < PIXEL_GRID_W; c++) {
      const type = STADIUM_MATRIX[r][c];
      if (type === ".") continue;
      const rect = document.createElementNS(svgNs, "rect");
      rect.setAttribute("x", c);
      rect.setAttribute("y", r);
      rect.setAttribute("width", 1);
      rect.setAttribute("height", 1);
      rect.setAttribute("class", PIXEL_CLASS[type]);
      svg.appendChild(rect);
    }
  }

  return svg;
}
