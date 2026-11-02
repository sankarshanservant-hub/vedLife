// Рисунок обложки. Одна книга — один рисунок, найденный в её смысле (01 · Концепция),
// а не шаблон на всех. Рисунок строится только из словаря системы (12 · Паттерны, 15 · Глифы):
// короткий штрих (Поле), точка и решётка (Рассеяние), линия на линии (Накопление),
// четверть дуги (Континуум). Всё детерминировано: одна книга — всегда один и тот же рисунок.
// Плоский цвет, без теней и градиентов (10 · Ошибки). Поле 105 × 148 — формат A5.

export const W = 105;
export const H = 148;

export type ArtKind = 'field' | 'ripple' | 'accumulation' | 'board' | 'truchet';
export type Ground = 'ink' | 'oat' | 'indigo' | 'tulasi' | 'terracotta' | 'bister' | 'marigold';
export type Art = { kind: ArtKind; seed: number };

// Палитра рисунка. Поверхность — фон и один пигмент (08c · правило одного цвета).
export type Ink = { ground: string; line: string; soft: string; accent: string; text: string; bracket: string };
export const GROUND: Record<Ground, Ink> = {
  ink:        { ground: '#0B0B0C', line: '#F6F1E7', soft: '#F6F1E7', accent: '#F0C98A', text: '#F6F1E7', bracket: '#F0C98A' },
  oat:        { ground: '#E6E2D6', line: '#5A4630', soft: '#5A4630', accent: '#2E3F6B', text: '#0B0B0C', bracket: '#2E3F6B' },
  indigo:     { ground: '#2E3F6B', line: '#E6E2D6', soft: '#E6E2D6', accent: '#F0C98A', text: '#F6F1E7', bracket: '#F0C98A' },
  tulasi:     { ground: '#4E6B4A', line: '#F6F1E7', soft: '#F6F1E7', accent: '#F0C98A', text: '#F6F1E7', bracket: '#F0C98A' },
  terracotta: { ground: '#A85A38', line: '#F6F1E7', soft: '#F6F1E7', accent: '#0B0B0C', text: '#F6F1E7', bracket: '#F6F1E7' },
  bister:     { ground: '#5A4630', line: '#F6F1E7', soft: '#E6E2D6', accent: '#F0C98A', text: '#F6F1E7', bracket: '#F0C98A' },
  marigold:   { ground: '#E0902F', line: '#0B0B0C', soft: '#0B0B0C', accent: '#F6F1E7', text: '#0B0B0C', bracket: '#0B0B0C' },
};
// Свой пигмент рисунка на тёмном: подсветка линий ярче, чем у поверхности (только на чернилах).
export const ON_INK: Record<string, string> = {
  marigold: '#E0902F', terracotta: '#A85A38', indigo: '#5C82C8', tulasi: '#96BE82', bister: '#8A6D4C',
};

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}
const f = (n: number) => +n.toFixed(2);

/* ---------- Поле: путь через поле битвы (Дхарма Гита) ----------
   Короткий штрих, от края до края меняется только угол. По полю идёт путь:
   там штрихи выровнены вдоль него, дальше от пути они поворачиваются поперёк. */
function field(seed: number, c: Ink): string {
  const r = rng(seed);
  const cols = 12, rows = 17, dx = W / cols, dy = H / rows;
  const out: string[] = [];
  const path = (y: number) => 30 + 38 * (y / H) + 11 * Math.sin((y / H) * Math.PI * 2.2 + 0.6);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = dx * (i + 0.5) + (r() - 0.5) * 1.2, y = dy * (j + 0.5) + (r() - 0.5) * 1.2;
      const d = x - path(y);
      const near = Math.abs(d) < 7.5;
      // направление пути (касательная), дальше от него штрих поворачивается к горизонтали
      const slope = (path(y + 1) - path(y - 1)) / 2;
      const base = Math.atan2(1, slope);
      const turn = Math.min(1, Math.max(0, (Math.abs(d) - 7.5) / 38)) * (d < 0 ? -1 : 1) * (Math.PI / 2.4);
      const a = near ? base : base - turn;
      const len = near ? 7.4 : 5.6;
      const x1 = x - Math.cos(a) * len / 2, y1 = y - Math.sin(a) * len / 2;
      const x2 = x + Math.cos(a) * len / 2, y2 = y + Math.sin(a) * len / 2;
      const op = near ? 1 : 0.34 + 0.4 * (1 - Math.min(1, Math.abs(d) / 50));
      out.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${near ? c.accent : c.line}" stroke-opacity="${f(op)}" stroke-width="${near ? 1.15 : 0.7}" stroke-linecap="butt"/>`);
    }
  }
  return out.join('');
}

/* ---------- Звук: кольца от одной точки (Имя) ----------
   Точка в центре — источник. Кольца из точек расходятся, и чем дальше от источника,
   тем свободнее лежат точки: порядок переходит в рассеяние (P—04). */
function ripple(seed: number, c: Ink, pig: string): string {
  const r = rng(seed);
  const cx = 52.5, cy = 56, out: string[] = [];
  const rings = 15;
  for (let k = 1; k <= rings; k++) {
    const rad = 5 + Math.pow(k, 1.32) * 2.6;
    const n = Math.max(6, Math.round(rad * 1.5));
    const scatter = Math.pow(k / rings, 1.6) * 3.4;
    const hot = k <= 3;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + k * 0.21;
      const rr = rad + (r() - 0.5) * scatter * 2;
      const aa = a + (r() - 0.5) * scatter * 0.05;
      const x = cx + Math.cos(aa) * rr, y = cy + Math.sin(aa) * rr;
      if (x < -2 || x > W + 2 || y < -2 || y > H + 2) continue;
      const size = Math.max(0.28, 0.78 - k * 0.032);
      const op = Math.max(0.22, 1 - k * 0.055);
      out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(size)}" fill="${hot ? pig : c.line}" fill-opacity="${f(op)}"/>`);
    }
  }
  out.push(`<circle cx="${cx}" cy="${cy}" r="2.5" fill="${c.accent}"/>`);
  return out.join('');
}

/* ---------- Накопление: линия на линии (Карма Гита) ----------
   Ничего не стирают, только пишут поверх. Каждый проход оставляет след, и ниже слоёв больше.
   По следам идёт дорога каравана; на ней — три знака, три шага пути. */
function accumulation(seed: number, c: Ink): string {
  const r = rng(seed);
  const out: string[] = [];
  const rows = 46;
  for (let j = 0; j < rows; j++) {
    const y = 6 + (j / (rows - 1)) * (H - 12);
    const depth = j / (rows - 1);
    const passes = 1 + Math.floor(depth * 4.2 + r() * 1.4);
    for (let p = 0; p < passes; p++) {
      const x1 = r() * 55, len = 14 + r() * 62;
      const yy = y + (r() - 0.5) * 1.6;
      out.push(`<line x1="${f(x1)}" y1="${f(yy)}" x2="${f(Math.min(W + 4, x1 + len))}" y2="${f(yy)}" stroke="${c.line}" stroke-opacity="${f(0.16 + r() * 0.42)}" stroke-width="${f(0.22 + r() * 0.5 + depth * 0.35)}"/>`);
    }
  }
  // дорога: одна непрерывная линия из угла в угол
  const pts: [number, number][] = [[-2, 138], [24, 122], [44, 99], [58, 84], [66, 58], [88, 36], [107, 20]];
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p.join(' ')).join(' ');
  out.push(`<path d="${d}" fill="none" stroke="${c.accent}" stroke-width="1.5" stroke-linejoin="round"/>`);
  [[24, 122, 12], [58, 84, 28], [88, 36, 34]].forEach(([x, y, rot]) => {
    out.push(`<rect x="${x - 3}" y="${y - 3}" width="6" height="6" rx="1.3" transform="rotate(${rot} ${x} ${y})" fill="${c.ground}" stroke="${c.accent}" stroke-width="1.2"/>`);
  });
  return out.join('');
}

/* ---------- Игра: порядок и свобода (Ведическое мировоззрение) ----------
   Строгая решётка слева рассыпается на свободные точки справа. Мир — сложная игра:
   одна точка обведена — то, что в нас роднит с Абсолютом. */
function board(seed: number, c: Ink): string {
  const r = rng(seed);
  const cols = 12, rows = 17, dx = W / cols, dy = H / rows, out: string[] = [];
  let chosen: [number, number] | null = null;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const t = Math.max(0, (i - 2) / (cols - 3));
      const jit = Math.pow(t, 1.25) * 8;
      const x = dx * (i + 0.5) + (r() - 0.5) * jit * 1.6;
      const y = dy * (j + 0.5) + (r() - 0.5) * jit * 1.6;
      const rad = 0.55 + t * 0.55 * r() + (i < 3 ? 0.15 : 0);
      out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="${c.line}" fill-opacity="${f(0.92 - t * 0.34)}"/>`);
      if (i === 8 && j === 6) chosen = [x, y];
    }
  }
  if (chosen) {
    out.push(`<circle cx="${f(chosen[0])}" cy="${f(chosen[1])}" r="5.4" fill="none" stroke="${c.accent}" stroke-width="1.1"/>`);
    out.push(`<circle cx="${f(chosen[0])}" cy="${f(chosen[1])}" r="1.5" fill="${c.accent}"/>`);
  }
  return out.join('');
}

/* ---------- Путь: непрерывная линия (Путешествие на Запад) ----------
   Два четверть-круга в клетке, линия нигде не прерывается (P—01). Среди одинаковых
   плиток один путь ведёт из одного края поля к другому — он выделен. */
function truchet(seed: number, c: Ink, pig: string): string {
  const r = rng(seed);
  const cols = 7, rows = 10, s = W / cols, oy = (H - rows * s) / 2, out: string[] = [];
  const tiles: boolean[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => r() < 0.5));
  // сторона: 0 N, 1 E, 2 S, 3 W. Тип A: N–W и S–E. Тип B: N–E и S–W.
  const link = (a: boolean, side: number) => (a ? [3, 2, 1, 0][side] : [1, 0, 3, 2][side]);
  const mid = (x: number, y: number, side: number): [number, number] =>
    [[x + s / 2, y], [x + s, y + s / 2], [x + s / 2, y + s], [x, y + s / 2]][side] as [number, number];
  const corner = (x: number, y: number, a: number, b: number): [number, number] => {
    const set = new Set([a, b]);
    const nx = set.has(1) ? x + s : x, ny = set.has(2) ? y + s : y;
    return [nx, ny];
  };
  const arc = (x: number, y: number, a: number, b: number) => {
    const p0 = mid(x, y, a), p1 = mid(x, y, b), C = corner(x, y, a, b);
    const v0 = [p0[0] - C[0], p0[1] - C[1]], v1 = [p1[0] - C[0], p1[1] - C[1]], k = 0.5523;
    return `M${f(p0[0])} ${f(p0[1])}C${f(p0[0] + k * v1[0])} ${f(p0[1] + k * v1[1])} ${f(p1[0] + k * v0[0])} ${f(p1[1] + k * v0[1])} ${f(p1[0])} ${f(p1[1])}`;
  };
  const base: string[] = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const x = i * s, y = oy + j * s, A = tiles[j][i];
    const pairs = A ? [[0, 3], [2, 1]] : [[0, 1], [2, 3]];
    pairs.forEach(([a, b]) => base.push(arc(x, y, a, b)));
  }
  out.push(`<path d="${base.join('')}" fill="none" stroke="${pig}" stroke-width="1.05" stroke-opacity=".9"/>`);
  // дорога: ищем самый длинный путь, входящий слева в одной из клеток
  let best: string[] = [];
  for (let j0 = 0; j0 < rows; j0++) {
    let i = 0, j = j0, enter = 3; const segs: string[] = []; let guard = 0;
    while (i >= 0 && i < cols && j >= 0 && j < rows && guard++ < 120) {
      const A = tiles[j][i], exit = link(A, enter);
      segs.push(arc(i * s, oy + j * s, enter, exit));
      const di = [0, 1, 0, -1][exit], dj = [-1, 0, 1, 0][exit];
      i += di; j += dj; enter = [2, 3, 0, 1][exit];
    }
    if (segs.length > best.length) best = segs;
  }
  out.push(`<path d="${best.join('')}" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`);
  return out.join('');
}

export function coverArt(art: Art, ground: Ground, pigment: string): string {
  const c = GROUND[ground];
  const onInk = ground === 'ink' ? ON_INK[pigment] ?? c.accent : c.accent;
  switch (art.kind) {
    case 'field': return field(art.seed, c);
    case 'ripple': return ripple(art.seed, c, onInk);
    case 'accumulation': return accumulation(art.seed, c);
    case 'board': return board(art.seed, c);
    case 'truchet': return truchet(art.seed, c, ground === 'ink' ? onInk : c.line);
  }
}
