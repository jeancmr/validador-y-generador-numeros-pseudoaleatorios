export default function HuecosTable({ state }) {
  const {
    data,
    chiSquareTable,
    chiCuadradoTotal,
    foTotal,
    gradosLibertad,
    valorCritico,
    resultado,
    alpha,
    beta,
  } = state.result;
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-md">
      {data.length > 0 && (
        <table className="w-full mt-4 border-collapse border bg-gray-900">
          <thead>
            <tr className="bg-gray-900">
              <th className="border p-2">Valor</th>
              <th className="border p-2">Cumple</th>
              <th className="border p-2">Inicio Hueco</th>
              <th className="border p-2">Tamaño</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{row.valor}</td>
                <td
                  className={`border px-4 py-2 ${
                    row.cumple === 'Sí' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {row.cumple}
                </td>
                <td
                  className={`border px-4 py-2 ${
                    row.inicioHueco === 1 ? 'bg-emerald-700 font-bold' : ''
                  }`}
                >
                  {row.inicioHueco}
                </td>
                <td className="border px-4 py-2">{row.tamanio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data.length > 0 && (
        <>
          <h2 className="text-lg font-bold mt-6">Tabla de Chi-Cuadrado</h2>

          <table className="w-full mt-4 border-collapse border bg-gray-900">
            <thead>
              <tr className="bg-gray-900">
                <th className="border p-2">Tamaño</th>
                <th className="border p-2">FO</th>
                <th className="border p-2">Pi</th>
                <th className="border p-2">FE</th>
                <th className="border p-2">Chi Cuadrado</th>
              </tr>
            </thead>
            <tbody>
              {chiSquareTable.map((row, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2">{row.size}</td>
                  <td className="border px-4 py-2">{row.fo}</td>
                  <td className="border px-4 py-2">{row.pi.toFixed(6)}</td>
                  <td className="border px-4 py-2">{row.fe.toFixed(4)}</td>
                  <td className="border px-4 py-2">{row.chi.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 p-4 bg-gray-900 rounded">
            <h2 className="text-lg font-bold">Resultados</h2>

            <p>
              <strong>Chi-Cuadrado Total:</strong> {chiCuadradoTotal.toFixed(4)}
            </p>
            <p>
              <strong>FO Total:</strong> {foTotal}
            </p>
            <p>
              <strong>Grados de Libertad (df):</strong> {gradosLibertad}
            </p>

            <p>
              <strong>α (alpha):</strong> {alpha}
            </p>
            <p>
              <strong>β (beta):</strong> {beta}
            </p>

            <p>
              <strong>Valor Crítico (5%):</strong> {valorCritico}
            </p>

            <p>{`${chiCuadradoTotal.toFixed(4)} < ${valorCritico}`}</p>

            <p className={`mt-2 font-bold ${resultado ? 'text-green-600' : 'text-red-600'}`}>
              {resultado
                ? 'No se puede rechazar la hipótesis de uniformidad.'
                : 'Se rechaza la hipótesis de uniformidad.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
