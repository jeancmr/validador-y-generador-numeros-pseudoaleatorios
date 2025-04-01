export function uniformDistribution(randomNumbers, variables) {
  let acumulative = 0;
  const intervals = variables.map((v) => {
    acumulative += v.probability / 100;
    return { name: v.name, limit: acumulative };
  });

  // asignando variables a cada num aleatorio
  const assignments = randomNumbers.map((num) => {
    return intervals.find((interval) => num < interval.limit)?.name || 'Desconocido';
  });

  // contando ocurrencias por categoría
  const counts = variables.reduce((acc, v) => {
    acc[v.name] = 0;
    return acc;
  }, {});

  assignments.forEach((name) => {
    if (counts[name] !== undefined) counts[name]++;
  });

  const total = randomNumbers.length;
  const summaryData = Object.keys(counts).map((name) => ({
    name,
    count: counts[name],
    probability: (total > 0 ? counts[name] / total : 0).toFixed(2),
  }));

  return { randomNumbers, assignments, summaryData };
}

export function exponentialDistribution(randomNumbers, variableName, mean, compareValue, operator) {
  if (!randomNumbers.length || !mean) {
    return { randomNumbers, computedValues: [], probability: 0 };
  }

  // X = -λ * ln(R)
  const computedValues = randomNumbers.map((R) => ({
    random: R,
    value: -mean * Math.log(R),
  }));

  // contando cuántos cumplen la condición
  const compareFn = {
    '<': (x) => x < compareValue,
    '>': (x) => x > compareValue,
    '=': (x) => x === compareValue,
    '<=': (x) => x <= compareValue,
    '>=': (x) => x >= compareValue,
  };

  const countMatching = computedValues.filter((item) => compareFn[operator](item.value)).length;

  // probabilidad = num de casos favorables / num de casos posibles
  const probability = (countMatching / randomNumbers.length).toFixed(4);

  return {
    randomNumbers,
    computedValues,
    probabilityText: `Probabilidad de que ${variableName} sea ${operator} ${compareValue}: ${probability}`,
    countMatching,
    probability,
  };
}
