export const MIN_X = -120;
export const MAX_X = 120;
export const RESET_Y = 0;
export const BOTTOM_LIMIT = 650;

export function getRandomAsteroidX() {
  return Math.floor(Math.random() * (MAX_X - MIN_X + 1)) + MIN_X;
}

export function getAsteroidSpeed(score: number) {
  if (score < 5) return 8;
  if (score < 10) return 10;
  if (score < 20) return 12;
  if (score < 30) return 14;
  return 16;
}

export function isCollision(
  asteroidX: number,
  asteroidY: number,
  shipX: number
) {
  const verticalHit =
    asteroidY >= 520 && asteroidY <= 620;

  const horizontalHit =
    Math.abs(shipX - asteroidX) < 25;

  return verticalHit && horizontalHit;
}
export function createAsteroid() {
  return {
    x: getRandomAsteroidX(),
    y: RESET_Y,
  };
}