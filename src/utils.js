// utils.js

export function testMean(numbers) {
  const N = numbers.length;
  if (N === 0) return { error: 'No hay números para analizar.' };

  const mean = numbers.reduce((sum, num) => sum + num, 0) / N;
  const Z0 = ((mean - 0.5) * Math.sqrt(N)) / Math.sqrt(1 / 12);
  const Zalpha2 = 1.96; // Nivel de significancia del 5%

  const result =
    Math.abs(Z0) < Zalpha2
      ? 'No se puede rechazar la hipótesis de que los números provienen de una distribución uniforme.'
      : 'Se rechaza la hipótesis de que los números provienen de una distribución uniforme.';

  return { mean, Z0, result };
}

export function testFrequency(numbers) {
  return { message: 'Implementación pendiente para el Método 2.' };
}

export function testSmirnov(numbers) {
  return { message: 'Implementación pendiente para el Método 3.' };
}

export function testMethod4(numbers) {
  return { message: 'Implementación pendiente para el Método 4.' };
}

export function testMethod5(numbers) {
  return { message: 'Implementación pendiente para el Método 5.' };
}
