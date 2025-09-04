export function getEasedOntarget(
  targetNorm,
  coef = Math.PI / 4,
  current,
  ease = 0.01
) {
  const target = (targetNorm - 0.5) * coef;
  return current + (target - current) * ease;
}
