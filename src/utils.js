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

export function testRunsUpDown(numbers) {
  validateNumbers(numbers);
  const N = numbers.length;
  const binarySeq = numbers.map((ui) => (ui < 0.5 ? 0 : 1));

  let runs = [];
  let length = 1;
  let runNumber = 1;

  const tableData = [
    { i: 1, ui: numbers[0], binary: binarySeq[0], runNumber, runValue: 1, length: 1 }, // la primera fila arranca en uno
  ];

  for (let i = 1; i < binarySeq.length; i++) {
    let runValue = 0; // por defecto no hay cambio

    if (binarySeq[i] !== binarySeq[i - 1]) {
      // Si hay cambio en el binario
      runs.push(length); //se guarda la longitud de la corrida anterior
      length = 1; // Se resetea la longitud
      runNumber++;
      runValue = 1; // acá se inicia una nueva corrida
    } else {
      length++;
    }

    tableData.push({
      i: i + 1,
      ui: numbers[i],
      binary: binarySeq[i],
      runNumber,
      runValue,
      length,
    });
  }
  runs.push(length); // Se agrega la última corrida

  // Se calcula la frecuencia observada (FO) de cada longitud de corrida
  const freqObs = {};
  runs.forEach((r) => {
    freqObs[r] = (freqObs[r] || 0) + 1;
  });

  // Se calcula la frecuencia esperada (FE) y el Chi-cuadrado
  const chiRows = [];
  let chiSquare = 0;
  Object.keys(freqObs).forEach((k) => {
    const i = parseInt(k);
    const FE = (N - i + 3) / Math.pow(2, i + 1);
    const FO = freqObs[i];
    const chi = Math.pow(FO - FE, 2) / FE;
    chiRows.push({ length: i, FE: FE.toFixed(3), FO, chi: chi.toFixed(3) });
    chiSquare += chi;
  });

  // calculando grados de libertad
  const df = Object.keys(freqObs).length - 1;

  const chiCritical = chiTable[df] || 'No table value';

  const hypothesis = chiSquare < chiCritical && chiCritical !== 'No table value';

  return {
    tableData,
    chiRows,
    chiSquare: chiSquare.toFixed(3),
    chiCritical,
    df,
    hypothesis,
  };
}

export function testMethod5(numbers) {
  console.log(numbers);
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

// Tabla valores críticos (alpha 5%) para la prueba de corrida arriba y abajo del promedio
const chiTable = {
  1: 3.841,
  2: 5.991,
  3: 7.815,
  4: 9.488,
  5: 11.07,
  6: 12.592,
  7: 14.067,
  8: 15.507,
  9: 16.919,
  10: 18.307,
};
