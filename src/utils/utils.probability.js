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

export function uniformDistributionV2(randomNumbers, variableName, a, b, compareValue, operator) {
  if (!randomNumbers.length || a === undefined || b === undefined) {
    return { randomNumbers, computedValues: [], probability: 0 };
  }

  // X = -λ * ln(R)
  const computedValues = randomNumbers.map((R) => ({
    random: R,
    value: a + R * (b - a),
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

export function poissonDistribution(randomNumbers, variableName, compareValue, operator, mean) {
  if (!randomNumbers.length || mean === undefined) {
    return { randomNumbers, computedValues: [], probability: 0 };
  }

  // calcular la probabilidad de poisson para un valonr de x
  function poissonProbability(mean, x) {
    return (Math.pow(mean, x) * Math.exp(-mean)) / factorial(x);
  }

  // factorial de un num
  function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  // tabla de probabilidades y valores acumulados
  // se calcula hasta que la probabilidad acumulada sea >= 0.99
  const distributionTable = [];
  let cumulative = 0;
  let x = 0;

  while (cumulative < 0.99) {
    const prob = poissonProbability(mean, x);
    cumulative += prob;
    distributionTable.push({
      x,
      probability: prob,
      cumulative: cumulative,
    });
    x++;
    if (cumulative >= 0.999) break; // pequeña protección para asegurar que no se pase mucho de 0.99
  }

  // asignando x a cada num aleatorio dentro de los rangos acumulados
  const computedValues = randomNumbers.map((R) => {
    for (let i = 0; i < distributionTable.length; i++) {
      const lower = i === 0 ? 0 : distributionTable[i - 1].cumulative;
      const upper = distributionTable[i].cumulative;
      if (R >= lower && R < upper) {
        return {
          random: R,
          value: distributionTable[i].x,
        };
      }
    }
    // En el caso donde R >= última acumulada, asignamos el último x
    return {
      random: R,
      value: distributionTable[distributionTable.length - 1].x,
    };
  });

  //para contar cuántos cumplen con la condición
  const compareFn = {
    '<': (x) => x < compareValue,
    '>': (x) => x > compareValue,
    '=': (x) => x === compareValue,
    '<=': (x) => x <= compareValue,
    '>=': (x) => x >= compareValue,
  };

  const countMatching = computedValues.filter((item) => compareFn[operator](item.value)).length;

  // probabilidad = casos favorables / casos posibles
  const probability = (countMatching / randomNumbers.length).toFixed(4);

  return {
    randomNumbers,
    computedValues,
    distributionTable,
    probabilityText: `Probabilidad de que ${variableName} sea ${operator} ${compareValue}: ${probability}`,
    countMatching,
    probability,
  };
}
