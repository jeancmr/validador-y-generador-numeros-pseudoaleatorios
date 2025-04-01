export default function UniformDistributionTable({ randomNumbers, assignments, summaryData }) {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">Resultados de Probabilidad</h2>

      <>
        <h3 className="text-md font-semibold mb-2">Números y Variables Asignadas</h3>
        <table className="w-full border-collapse border border-gray-600 mb-4">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 p-2">Número Aleatorio</th>
              <th className="border border-gray-600 p-2">Variable Asignada</th>
            </tr>
          </thead>
          <tbody>
            {randomNumbers.map((num, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-600 p-2">{num.toFixed(4)}</td>
                <td className="border border-gray-600 p-2">{assignments[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-md font-semibold mb-2">Distribución de Resultados</h3>
        <table className="w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 p-2">Variables</th>
              <th className="border border-gray-600 p-2">Frecuencia</th>
              <th className="border border-gray-600 p-2">Proporción</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-600 p-2">{row.name}</td>
                <td className="border border-gray-600 p-2">{row.count}</td>
                <td className="border border-gray-600 p-2">{row.probability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}
