import { useReducer } from 'react';
import * as XLSX from 'xlsx';
import { testMean, testFrequency, testSmirnov, testRunsUpDown, testMethod5 } from './utils';
import MethodSelection from './MethodSelection';
import FrequencyTest from './FrequencyTest';
import MeanTest from './MeanTest';
import SmirnovTest from './SmirnovTest';
import RunsUpDown from './RunsUpDown';

const initialState = {
  numbers: [],
  result: null,
  selectedTest: null,
  options: [
    { value: 'testMean', label: 'Prueba de promedios' },
    { value: 'testFrequency', label: 'Prueba de frecuencias' },
    { value: 'testSmirnov', label: 'Prueba de Kolmogorov-Smirnov' },
    { value: 'testRunsUpDown', label: 'Prueba de corrida arriba y abajo del promedio' },
    { value: 'testMethod5', label: 'Método 5' },
  ],
  // MeanTest
  Zalpha2: 1.96, // Nivel de significancia del 5%

  // Frequency Test
  intervals: 6,
  chiSquareCritical: 11.07, // Valor crítico para alpha = 0.05 y df = 5
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'uploadFile':
      return { ...state, numbers: action.payload };

    case 'selectTest':
      return { ...state, selectedTest: action.payload };

    case 'runTest': {
      const testFunctions = {
        testMean,
        testFrequency,
        testSmirnov,
        testRunsUpDown,
        testMethod5,
      };
      const expectedFrequency = state.numbers.length / state.intervals;

      const testResult = testFunctions[state.selectedTest](
        state.numbers,
        state.intervals,
        expectedFrequency,
        state.chiSquareCritical
      );
      return { ...state, result: testResult };
    }
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const extractedNumbers = json.flat().filter((val) => !isNaN(val));
      dispatch({ type: 'uploadFile', payload: extractedNumbers });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">
        Pruebas de Uniformidad de Números Pseudoaleatorios
      </h1>

      <div className="w-full max-w-md mb-4">
        <label className="block text-gray-400 text-sm mb-2">Subir Archivo</label>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="block w-full border p-2 rounded-md bg-gray-800 text-white cursor-pointer focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <MethodSelection
        options={state.options}
        dispatch={dispatch}
        selectedTest={state.selectedTest}
      />
      {state.numbers.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => dispatch({ type: 'runTest' })}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
          >
            Correr Prueba
          </button>
        </div>
      )}

      {state.selectedTest === 'testMean' && state.result && <MeanTest state={state} />}
      {state.selectedTest === 'testFrequency' && state.result && <FrequencyTest state={state} />}
      {state.selectedTest === 'testSmirnov' && state.result && <SmirnovTest state={state} />}
      {state.selectedTest === 'testRunsUpDown' && state.result && <RunsUpDown state={state} />}
    </div>
  );
}
