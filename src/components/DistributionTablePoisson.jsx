export default function DistributionTablePoisson({ variableName, result }) {
  const { computedValues, distributionTable, probabilityText, countMatching, probability } = result;

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">Resultados - Distribución de Poisson</h2>

      {/* Tabla de valores aleatorios transformados en x */}
      <h3 className="text-md font-semibold mb-2">Variables Aleatorias Generadas</h3>
      <table className="w-full border-collapse border border-gray-600 mb-4">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 p-2">Número Aleatorio</th>
            <th className="border border-gray-600 p-2">{variableName}</th>
          </tr>
        </thead>
        <tbody>
          {computedValues.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-600 p-2">{row.random.toFixed(4)}</td>
              <td className="border border-gray-600 p-2">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de la distribución teórica de Poisson */}
      <h3 className="text-md font-semibold mb-2">Tabla de Distribución de Poisson</h3>
      <table className="w-full border-collapse border border-gray-600 mb-4">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 p-2">x</th>
            <th className="border border-gray-600 p-2">P(x)</th>
            <th className="border border-gray-600 p-2">P(X ≤ x)</th>
          </tr>
        </thead>
        <tbody>
          {distributionTable.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-600 p-2">{row.x}</td>
              <td className="border border-gray-600 p-2">{row.probability.toFixed(4)}</td>
              <td className="border border-gray-600 p-2">{row.cumulative.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de frecuencia de la condición evaluada */}
      <h3 className="text-md font-semibold mb-2">Distribución de Resultados</h3>
      <table className="w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 p-2">Frecuencia de la condición</th>
            <th className="border border-gray-600 p-2">Probabilidad</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border border-gray-600 p-2">{countMatching}</td>
            <td className="border border-gray-600 p-2">{probability}</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 text-green-400">{probabilityText}</p>
    </div>
  );
}
