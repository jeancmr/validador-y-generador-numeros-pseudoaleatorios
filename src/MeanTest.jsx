const MeanTest = ({ state }) => {
  const { mean, result, Z0 } = state.result;
  const { Zalpha2 } = state;

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-md">
      <h2 className="text-lg font-bold">Resultados</h2>

      <p>
        <strong>Media aritmética:</strong> {mean}
      </p>
      <p>
        <strong>Z0:</strong> {Math.abs(Z0)}
      </p>
      <p>
        <strong>Z(α/2):</strong> {Zalpha2}
      </p>

      <p className={`mt-2 font-bold ${result ? 'text-green-600' : 'text-red-600'}`}>
        {result
          ? 'No se puede rechazar la hipótesis de que los números provienen de una distribución uniforme.'
          : 'Se rechaza la hipótesis de que los números provienen de una distribución uniforme.'}
      </p>
    </div>
  );
};
export default MeanTest;
