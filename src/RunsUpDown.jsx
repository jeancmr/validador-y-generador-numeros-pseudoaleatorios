export default function RunsUpDown({ state }) {
  const { tableData, chiRows, chiSquare, chiCritical, df, hypothesis } = state.result;

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-md">
      <table className="w-full mt-4 border-collapse border bg-gray-900">
        <thead>
          <tr className="bg-gray-900">
            <th className="border p-2">i</th>
            <th className="border p-2">Ui</th>
            <th className="border p-2">Binario</th>
            <th className="border p-2">Corrida</th>
            <th className="border p-2"># Corrida</th>
            <th className="border p-2">Longitud</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{row.i}</td>
              <td className="border px-4 py-2">{row.ui}</td>
              <td className="border px-4 py-2">{row.binary}</td>
              <td className="border px-4 py-2">{row.runValue}</td>
              <td className="border px-4 py-2">{row.runNumber}</td>
              <td className="border px-4 py-2">{row.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-bold mt-6">Tabla de Chi-Cuadrado</h2>
      <table className="w-full mt-4 border-collapse border bg-gray-900">
        <thead>
          <tr className="bg-gray-900">
            <th className="border p-2">Longitud</th>
            <th className="border p-2">FE</th>
            <th className="border p-2">FO</th>
            <th className="border p-2">Chi Cuadrado</th>
          </tr>
        </thead>
        <tbody>
          {chiRows.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{row.length}</td>
              <td className="border px-4 py-2">{row.FE}</td>
              <td className="border px-4 py-2">{row.FO}</td>
              <td className="border px-4 py-2">{row.chi}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 p-4 bg-gray-900 rounded">
        <p>
          Chi-Cuadrado Total: <strong>{chiSquare}</strong>
        </p>

        <p>
          Grados de Libertad (df): <strong>{df}</strong>
        </p>

        <p>
          Valor Crítico (5%): <strong>{chiCritical}</strong>
        </p>

        <p className={`mt-2 font-bold ${hypothesis ? 'text-green-600' : 'text-red-600'}`}>
          {hypothesis
            ? 'No se puede rechazar la hipótesis de uniformidad.'
            : 'Se rechaza la hipótesis de uniformidad.'}
        </p>
      </div>
    </div>
  );
}
