const FrequencyTest = ({ state }) => {
  const { observedFrequencies, chiSquare, hypothesis, expectedFrequency } = state.result;
  const { chiSquareCritical } = state;

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-md">
      {observedFrequencies.length > 0 && (
        <table className="w-full mt-4 border-collapse border bg-gray-900">
          <thead>
            <tr className="bg-gray-900">
              <th className="border p-2">Intervalo</th>
              <th className="border p-2">Frecuencia Observada</th>
              <th className="border p-2">(FO-FE)^2/FE</th>
              <th className="border p-2">Frecuencia Esperada</th>
            </tr>
          </thead>
          <tbody>
            {observedFrequencies.map((obs, index) => {
              const chiValue = Math.pow(obs - expectedFrequency, 2) / expectedFrequency;

              return (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{obs}</td>
                  <td className="border p-2">{chiValue.toFixed(4)}</td>
                  <td className="border p-2">{expectedFrequency.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="mt-4 p-4 bg-gray-900 rounded">
        <p>
          <strong>Chi-Cuadrado Calculado:</strong> {chiSquare.toFixed(2)}
        </p>
        <p>
          <strong>Valor Crítico (α=0.05):</strong> {chiSquareCritical}
        </p>
        <p className={`mt-2 font-bold ${hypothesis ? 'text-green-600' : 'text-red-600'}`}>
          {hypothesis
            ? 'No se puede rechazar la hipótesis de uniformidad.'
            : 'Se rechaza la hipótesis de uniformidad.'}
        </p>
      </div>
    </div>
  );
};

export default FrequencyTest;
