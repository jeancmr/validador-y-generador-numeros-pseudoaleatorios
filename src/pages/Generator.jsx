import { useReducer } from 'react';
import * as XLSX from 'xlsx';
import Form from '../components/Form';
import {
  congruencialMixto,
  congruencialMultiplicativo,
  cuadradoMedio,
  congruencialCuadratico,
  blumBlumShub,
} from '../utils/utils.generador';
import MethodSelectionGenerator from '../components/MethodSelectionGenerator';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

const initialState = {
  sequence: [],
  period: null,
  option: null,
  normalizedValues: null,
  options: [
    {
      name: 'Congruencial Mixto',
      value: 'mixto',
    },
    {
      name: 'Congruencial Multiplicativo',
      value: 'multiplicativo',
    },
    {
      name: 'Cuadrado medio',
      value: 'cuadradomedio',
    },
    {
      name: 'Congruencial cuadrático',
      value: 'cuadratico',
    },
    { name: 'Blum Blum Shub', value: 'bbs' }, // Nueva opción
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'changeOption':
      return {
        ...state,
        option: action.payload,
      };

    case 'generateSequence': {
      const { a, b, c, m, x0, n } = action.payload;
      let result = {};

      if (state.option === 'mixto') {
        result = congruencialMixto(+a, +c, +m, +x0, +n);
      } else if (state.option === 'multiplicativo') {
        result = congruencialMultiplicativo(+a, +m, +x0, +n);
      } else if (state.option === 'cuadradomedio') {
        result = cuadradoMedio(+x0, +n);
      } else if (state.option === 'cuadratico') {
        result = congruencialCuadratico(+a, +b, +c, +m, +x0, +n);
      } else if (state.option === 'bbs') {
        result = blumBlumShub(+a, +b, +x0, +n);
      }

      return {
        ...state,
        sequence: result.sequence,
        period: state.option === 'cuadradomedio' ? null : result.period,
        normalizedValues: result.normalizedValues,
      };
    }

    case 'reset':
      return initialState;

    default:
      return state;
  }
}

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
