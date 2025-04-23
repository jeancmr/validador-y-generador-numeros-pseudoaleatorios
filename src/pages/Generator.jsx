import { useReducer } from 'react';
import * as XLSX from 'xlsx';
import { reducer, initialState } from '../reducers/generatorReducer';
import Form from '../components/Form';
import MethodSelectionGenerator from '../components/MethodSelectionGenerator';
import Button from '../components/shared/Button';
import BackButton from '../components/shared/BackButton';

export default function Generator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sequence, period, option, options } = state;
  const method = options.find((o) => o.value === option);

  const downloadExcel = () => {
    if (!state.normalizedValues || state.normalizedValues.length === 0) return;
    const data = state.normalizedValues.map((value) => ({
      valores: Number(value.toFixed(4)),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, 'numeros_normalizados.xlsx');
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <BackButton />

      <h1 className="text-2xl font-bold mb-4">
        Generador de Números Pseudoaleatorios {method ? `(${method.name})` : ''}
      </h1>

      {option ? (
        <Form dispatch={dispatch} option={option} />
      ) : (
        <MethodSelectionGenerator dispatch={dispatch} options={options} />
      )}

      {sequence.length > 0 && (
        <div className="mt-4 p-4 bg-gray-800 rounded-md">
          <h2 className="text-lg font-bold">Resultados</h2>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {sequence.map((num, i) => (
              <div key={i} className={`p-2 rounded text-center bg-gray-700`}>
                {num}
              </div>
            ))}
          </div>

          {period !== null && option !== 'cuadradomedio' && (
            <p className="mt-2 text-yellow-400">Período de la secuencia: {period}</p>
          )}
        </div>
      )}

      {/* tabla para valores entre el rango 0-1 */}
      {state.normalizedValues && state.normalizedValues.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Valores Aleatorios [0,1]</h2>
          <div className="mt-2 grid grid-cols-5 gap-2">
            {state.normalizedValues.map((value, i) => (
              <div key={i} className="p-2 rounded text-center bg-gray-600">
                {value.toFixed(4)}
              </div>
            ))}
          </div>
        </div>
      )}

      {sequence.length > 0 && <Button text="Bajar datos" onClick={downloadExcel} />}
    </div>
  );
}
