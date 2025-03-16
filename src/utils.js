// utils.js

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
  return { message: 'Implementación pendiente para el Método 3.' };
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
