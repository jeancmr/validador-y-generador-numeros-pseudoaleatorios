export default function DistributionTableExponential({ variableName, result }) {
  const { computedValues, probabilityText, countMatching, probability } = result;
  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">Resultados - Distribución Exponencial</h2>

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
              <td className="border border-gray-600 p-2">{row.value.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
