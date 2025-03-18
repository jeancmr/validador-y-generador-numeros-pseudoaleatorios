const SmirnovTest = ({ state }) => {
  // return { table, Dn: maxDiff, dalpha, hypothesis };
  const { table: tableData, Dn, dalpha, hypothesis } = state.result;

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-md">
      {tableData.length > 0 && (
        <table className="w-full mt-4 border-collapse border bg-gray-900">
          <thead>
            <tr className="bg-gray-900">
              <th className="border p-2">i</th>
              <th className="border p-2">Xi</th>
              <th className="border p-2">Fn(Xi)</th>
              <th className="border p-2">|Fn(Xi) - Xi|</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{row.i}</td>
                <td className="border px-4 py-2">{row.Xi}</td>
                <td className="border px-4 py-2">{row.Fn}</td>
                <td className="border px-4 py-2">{row.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 p-4 bg-gray-900 rounded">
        <p>
          Dn: <strong>{Dn}</strong>
        </p>

        <p>
          Tamaño de la muestra (n): <strong>{tableData.length}</strong>
        </p>

        <p>
          α (alpha): <strong>5%</strong>
        </p>
        <p>
          dα,n (dalpha,n): <strong>{dalpha}</strong>
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

export default SmirnovTest;
