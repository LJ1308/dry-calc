import { useState } from 'react'
import {
  drynessOdds,
  formatChancePct,
  formatDrynessLine,
  killsFromGetProbability,
  probabilityGet,
} from './lib/probability'
import './App.css'

const DEFAULT_RATE = 128

export default function App() {
  const [rate, setRate] = useState(DEFAULT_RATE)
  const [kills, setKills] = useState(0)
  const [pctText, setPctText] = useState<string | null>(null)

  const chance = probabilityGet(rate, kills)
  const drynessLine = formatDrynessLine(drynessOdds(rate, kills))
  const chancePct = parseFloat(formatChancePct(chance))

  function setChanceFromPercent(percent: number) {
    const p = Math.min(99.99, Math.max(0, percent)) / 100
    if (p <= 0) setKills(0)
    else setKills(Math.max(0, Math.round(killsFromGetProbability(rate, p))))
  }

  return (
    <main className="app">
      <h1>Dry calc</h1>

      <div className="card">
        <div className="fields">
          <div className="field">
            <label className="field__label" htmlFor="rate">
              Rate
            </label>
            <span className="odds-prefix">1 in</span>
            <input
              id="rate"
              className="num-input"
              type="number"
              min={2}
              value={rate}
              onChange={(e) =>
                setRate(Math.max(2, Math.floor(Number(e.target.value)) || 2))
              }
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="kills">
              Kills
            </label>
            <span className="odds-prefix odds-prefix--spacer" aria-hidden>
              1 in
            </span>
            <input
              id="kills"
              className="num-input"
              type="number"
              min={0}
              value={kills}
              onChange={(e) =>
                setKills(Math.max(0, Math.floor(Number(e.target.value)) || 0))
              }
            />
          </div>
        </div>

        <section className="chance" aria-labelledby="chance-label">
          <span id="chance-label" className="chance__label">
            Chance
          </span>
          <div
            className={`chance__pct${pctText !== null ? ' chance__pct--editing' : ''}`}
          >
            <input
              id="chance-pct"
              className="chance__value"
              type="text"
              inputMode="decimal"
              size={Math.max(3, (pctText ?? formatChancePct(chance)).length)}
              value={pctText ?? formatChancePct(chance)}
              aria-label="Chance percent"
              onFocus={() => setPctText(formatChancePct(chance))}
              onChange={(e) => {
                setPctText(e.target.value)
                const n = parseFloat(e.target.value)
                if (!Number.isNaN(n)) setChanceFromPercent(n)
              }}
              onBlur={() => setPctText(null)}
            />
          </div>
          <div className="slider-wrap">
            <input
              id="chance-slider"
              type="range"
              min={0}
              max={100}
              step={0.01}
              value={chancePct}
              onChange={(e) => setChanceFromPercent(Number(e.target.value))}
              className="slider"
              style={{ '--fill': `${chancePct}%` } as React.CSSProperties}
            />
          </div>
        </section>
      </div>

      {drynessLine && <p className="dryness">{drynessLine}</p>}
    </main>
  )
}
