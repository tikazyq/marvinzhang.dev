import React from 'react';
import styles from './ScaleCurveWidget.module.css';

/**
 * ScaleCurveWidget
 *
 * An interactive Universal Scalability Law (USL) explorer that renders the
 * SAME curve shape for a human team and an AI-agent team — the point being
 * that both organisations obey the identical mathematics of coordination cost.
 *
 * X(N) = λN / (1 + σ(N−1) + κN(N−1))
 *   λ — per-unit throughput (single-worker productivity)
 *   σ — contention / queueing coefficient
 *   κ — coherence / coordination coefficient (the N² term)
 *
 * Zero third-party dependencies, hand-drawn SVG, theme-aware via CSS variables.
 */

type Mode = 'human' | 'agent';

interface Params {
  lambda: number;
  sigma: number;
  kappa: number;
}

const PARAMS: Record<Mode, Params> = {
  human: { lambda: 4.64, sigma: 0.0158, kappa: 0.0146 },
  agent: { lambda: 1.0, sigma: 0.08, kappa: 0.02 },
};

const N_MIN = 2;
const N_MAX = 24;

function throughput(N: number, p: Params): number {
  return (p.lambda * N) / (1 + p.sigma * (N - 1) + p.kappa * N * (N - 1));
}

function efficiency(N: number, p: Params): number {
  // X(N) / (λN) — share of ideal linear scaling actually delivered
  return 1 / (1 + p.sigma * (N - 1) + p.kappa * N * (N - 1));
}

function nStar(p: Params): number {
  // Peak of X(N): N* = sqrt((1 − σ) / κ)
  return Math.sqrt((1 - p.sigma) / p.kappa);
}

const STR = {
  en: {
    modeHuman: 'Human team',
    modeAgent: 'AI agent team',
    caption: {
      human:
        'An illustrative USL fit for a human engineering team. Slide the team size: past the sweet spot, adding people buys less and less — and eventually output falls.',
      agent:
        'The same law, re-fit for an AI-agent team. The curve bends the same way — coordination cost is not a human failing, it is a property of the math.',
    },
    unit: { human: 'PR / week', agent: 'tasks / M tokens' },
    sizeLabel: 'Team size N',
    ideal: 'ideal (λN)',
    star: 'N* peak',
    out: 'Output',
    eff: 'Effective share',
    tax: 'Coordination tax',
    unitShort: { human: 'PR/wk', agent: 'tasks' },
  },
  zh: {
    modeHuman: '人类团队',
    modeAgent: 'AI agent 团队',
    caption: {
      human:
        '人类工程团队的 USL 示意拟合。拖动团队规模：过了最佳点，每多一个人带来的产出越来越少，最终总产出不升反降。',
      agent:
        '同一条定律，换成 AI agent 团队重新拟合。曲线以同样的方式弯折——协调成本不是人类的毛病，而是数学本身的性质。',
    },
    unit: { human: 'PR / 周', agent: '任务 / 百万 token' },
    sizeLabel: '团队规模 N',
    ideal: '理想线（λN）',
    star: 'N* 最优规模',
    out: '产出',
    eff: '有效占比',
    tax: '协调税率',
    unitShort: { human: 'PR/周', agent: '任务' },
  },
};

interface Props {
  lang?: 'en' | 'zh';
}

export default function ScaleCurveWidget({ lang = 'en' }: Props): React.ReactElement {
  const t = STR[lang];
  const [mode, setMode] = React.useState<Mode>('human');
  const [n, setN] = React.useState<number>(16);

  const p = PARAMS[mode];

  // ---- geometry ----
  const W = 520;
  const H = 300;
  const padL = 46;
  const padR = 18;
  const padT = 18;
  const padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const { actualPath, areaPath, idealPath, yMax } = React.useMemo(() => {
    // peak of the actual curve sets the vertical scale; give headroom so the
    // ideal (linear) line is visible shooting off above it.
    let peak = 0;
    for (let N = N_MIN; N <= N_MAX; N += 0.5) peak = Math.max(peak, throughput(N, p));
    const yM = peak * 2.05;

    const mapX = (N: number) => padL + ((N - N_MIN) / (N_MAX - N_MIN)) * plotW;
    const mapY = (v: number) => padT + (1 - v / yM) * plotH;

    let act = '';
    for (let N = N_MIN; N <= N_MAX; N += 0.25) {
      act += `${N === N_MIN ? 'M' : 'L'}${mapX(N).toFixed(1)},${mapY(throughput(N, p)).toFixed(1)}`;
    }
    const area =
      act +
      `L${mapX(N_MAX).toFixed(1)},${mapY(0).toFixed(1)}` +
      `L${mapX(N_MIN).toFixed(1)},${mapY(0).toFixed(1)}Z`;

    // ideal λN, clipped to the plot rect
    const ideal = `M${mapX(N_MIN)},${mapY(p.lambda * N_MIN)}L${mapX(N_MAX)},${mapY(p.lambda * N_MAX)}`;

    return { actualPath: act, areaPath: area, idealPath: ideal, yMax: yM };
  }, [mode, plotW, plotH]);

  const mapX = (N: number) => padL + ((N - N_MIN) / (N_MAX - N_MIN)) * plotW;
  const mapY = (v: number) => padT + (1 - v / yMax) * plotH;

  const ns = nStar(p);
  const xSel = throughput(n, p);
  const effSel = efficiency(n, p);
  const clipId = `scw-clip-${mode}`;

  const xTicks = [2, 6, 10, 14, 18, 22];

  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <div className={styles.toggle} role="tablist">
          <button
            type="button"
            className={`${styles.toggleBtn} ${mode === 'human' ? styles.toggleActive : ''}`}
            onClick={() => setMode('human')}
            aria-pressed={mode === 'human'}
          >
            {t.modeHuman}
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${mode === 'agent' ? styles.toggleActive : ''}`}
            onClick={() => setMode('agent')}
            aria-pressed={mode === 'agent'}
          >
            {t.modeAgent}
          </button>
        </div>
      </div>

      <p className={styles.caption}>{t.caption[mode]}</p>

      <div className={styles.chartWrap}>
        <svg
          className={styles.chart}
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${mode === 'human' ? t.modeHuman : t.modeAgent}: output vs team size`}
        >
          <defs>
            <clipPath id={clipId}>
              <rect x={padL} y={padT} width={plotW} height={plotH} />
            </clipPath>
          </defs>

          {/* horizontal gridlines */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <line
              key={f}
              className={styles.gridLine}
              x1={padL}
              x2={W - padR}
              y1={padT + f * plotH}
              y2={padT + f * plotH}
            />
          ))}

          {/* axes */}
          <line className={styles.axisLine} x1={padL} y1={padT} x2={padL} y2={H - padB} />
          <line className={styles.axisLine} x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} />

          {/* x ticks */}
          {xTicks.map((tk) => (
            <text key={tk} className={styles.axisLabel} x={mapX(tk)} y={H - padB + 15} textAnchor="middle">
              {tk}
            </text>
          ))}
          <text className={styles.axisTitle} x={padL + plotW / 2} y={H - 4} textAnchor="middle">
            {t.sizeLabel}
          </text>
          <text
            className={styles.axisTitle}
            x={-(padT + plotH / 2)}
            y={13}
            textAnchor="middle"
            transform="rotate(-90)"
          >
            {t.unit[mode]}
          </text>

          {/* ideal line */}
          <g clipPath={`url(#${clipId})`}>
            <path className={styles.idealLine} d={idealPath} />
          </g>
          <text className={styles.idealLabel} x={W - padR} y={padT + 11} textAnchor="end">
            {t.ideal}
          </text>

          {/* actual curve + filled area */}
          <path className={styles.actualArea} d={areaPath} />
          <path className={styles.actualLine} d={actualPath} />

          {/* N* marker */}
          <line className={styles.starLine} x1={mapX(ns)} y1={padT} x2={mapX(ns)} y2={H - padB} />
          <circle className={styles.starDot} cx={mapX(ns)} cy={mapY(throughput(ns, p))} r={3.5} />
          <text className={styles.starLabel} x={mapX(ns)} y={padT + 11} textAnchor="middle">
            {t.star} ≈ {ns.toFixed(1)}
          </text>

          {/* selected-N guide + dot */}
          <line className={styles.pickGuide} x1={mapX(n)} y1={mapY(xSel)} x2={mapX(n)} y2={H - padB} />
          <circle className={styles.pickDot} cx={mapX(n)} cy={mapY(xSel)} r={5} />
        </svg>
      </div>

      <div className={styles.controls}>
        <div className={styles.sliderRow}>
          <span className={styles.sliderLabel}>
            {t.sizeLabel} = <span className={styles.sliderVal}>{n}</span>
          </span>
          <input
            className={styles.slider}
            type="range"
            min={N_MIN}
            max={N_MAX}
            step={1}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            aria-label={t.sizeLabel}
          />
        </div>

        <div className={styles.readouts}>
          <div className={styles.stat}>
            <div className={`${styles.statVal} ${styles.statValActual}`}>{xSel.toFixed(1)}</div>
            <div className={styles.statLabel}>
              {t.out} ({t.unitShort[mode]})
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statVal}>{Math.round(effSel * 100)}%</div>
            <div className={styles.statLabel}>{t.eff}</div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statVal} ${styles.statValTax}`}>{Math.round((1 - effSel) * 100)}%</div>
            <div className={styles.statLabel}>{t.tax}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
