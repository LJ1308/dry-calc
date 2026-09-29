export function failureRate(rate: number): number {
  return (rate - 1) / rate
}

/** P(at least one drop in `kills` kills) */
export function probabilityGet(rate: number, kills: number): number {
  if (kills <= 0) return 0
  return 1 - failureRate(rate) ** kills
}

export function killsFromGetProbability(rate: number, probability: number): number {
  if (probability <= 0) return 0
  if (probability >= 1) return 0
  const dryChance = 1 - probability
  return Math.log(dryChance) / Math.log(failureRate(rate))
}

/** Rounded percent number for display/editing (no % suffix). */
export function formatChancePct(probability: number): string {
  if (probability <= 0) return '0'
  if (probability >= 0.01) return (probability * 100).toFixed(2)
  return (probability * 100).toFixed(4)
}

export function formatPercent(probability: number): string {
  return `${formatChancePct(probability)}%`
}

/** 1 in X players are at least this dry (P = failure^kills). */
export function drynessOdds(dropRate: number, killsDry: number): number | null {
  if (killsDry <= 0) return null
  const p = failureRate(dropRate) ** killsDry
  if (p <= 0) return null
  return 1 / p
}

/** Only shown when more than 3 people would be this dry. */
export function formatDrynessLine(odds: number | null): string | null {
  if (odds === null || odds <= 3) return null
  const x =
    odds >= 1_000_000
      ? odds.toExponential(0)
      : Math.round(odds).toLocaleString()
  return `1 in ${x} people are this dry`
}
