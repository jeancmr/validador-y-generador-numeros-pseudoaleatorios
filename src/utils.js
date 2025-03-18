export function testMean(numbers) {
  validateNumbers(numbers);
  const N = numbers.length;

  const mean = numbers.reduce((sum, num) => sum + num, 0) / N;
  const Z0 = ((mean - 0.5) * Math.sqrt(N)) / Math.sqrt(1 / 12);

  const Zalpha2 = 1.96;

  const result = Math.abs(Z0) < Zalpha2;

  return { mean, Z0, result };
}

export const testFrequency = (numbers, intervals, expectedFrequency, chiSquareCritical) => {
  validateNumbers(numbers);
  const intervalSize = 1 / intervals;
  let observedFrequencies = new Array(intervals).fill(0);

  // Calcular las frecuencias observadas
  numbers.forEach((num) => {
    const index = Math.min(Math.floor(num / intervalSize), intervals - 1);
    observedFrequencies[index] += 1;
  });

  const chiValues = observedFrequencies.map(
    (obs) => Math.pow(obs - expectedFrequency, 2) / expectedFrequency
  );

  // Calcular el valor total de chi-cuadrado
  const chiSquare = chiValues.reduce((sum, value) => sum + value, 0);

  // Determinar si se rechaza la hipótesis
  const hypothesis = chiSquare < chiSquareCritical;

  return { observedFrequencies, chiSquare, hypothesis, expectedFrequency };
};

export function testSmirnov(numbers) {
  validateNumbers(numbers);

  const n = numbers.length;
  const sortedNumbers = [...numbers].sort((a, b) => a - b);

  let maxDiff = 0;
  let table = [];

  sortedNumbers.forEach((Xi, i) => {
    const Fn = (i + 1) / n;
    const diff = Math.abs(Fn - Xi);
    if (diff > maxDiff) maxDiff = diff;

    table.push({
      i: i + 1,
      Xi: Xi.toFixed(4),
      Fn: Fn.toFixed(4),
      diff: diff.toFixed(4),
    });
  });

  // Obtener valor crítico (dalpha)
  let dalpha = ksTable[n];
  if (!dalpha) {
    // Usar fórmula aproximada si n > 100
    dalpha = 1.36 / Math.sqrt(n);
  }

  const hypothesis = maxDiff < dalpha;
  return { table, Dn: maxDiff, dalpha, hypothesis };
}

export function testMethod4(numbers) {
  return { message: 'Implementación pendiente para el Método 4.' };
}

export function testMethod5(numbers) {
  return { message: 'Implementación pendiente para el Método 5.' };
}

export function validateNumbers(numbers) {
  if (numbers.length === 0) return { error: 'No hay números para analizar.' };
  if (numbers.some((num) => isNaN(num))) return { error: 'Hay números inválidos.' };
  return null;
}

// Tabla de valores críticos (alpha 5%) para la prueba de Kolmogorov-Smirnov
const ksTable = {
  1: 0.975,
  2: 0.842,
  3: 0.708,
  4: 0.624,
  5: 0.563,
  6: 0.521,
  7: 0.486,
  8: 0.457,
  9: 0.432,
  10: 0.409,
  11: 0.391,
  12: 0.375,
  13: 0.361,
  14: 0.349,
  15: 0.338,
  16: 0.328,
  17: 0.318,
  18: 0.309,
  19: 0.301,
  20: 0.294,
  25: 0.264,
  30: 0.242,
  35: 0.23,
  40: 0.21,
  50: 0.188,
  60: 0.172,
  70: 0.16,
  80: 0.15,
  90: 0.141,
  100: 0.134,
};
