import { useReducer } from 'react';
import * as XLSX from 'xlsx';
import {
  testMean,
  testFrequency,
  testSmirnov,
  testRunsUpDown,
  testDistanceGap,
} from '../utils/utils.validador';
import FrequencyTest from '../components/FrequencyTest';
import MeanTest from '../components/MeanTest';
import SmirnovTest from '../components/SmirnovTest';
import RunsUpDown from '../components/RunsUpDown';
import GapTest from '../components/GapTest';
import BackButton from '../components/BackButton';
import MethodSelectionValidator from '../components/MethodSelectionValidator';

const initialState = {
  numbers: [],
  result: null,
  selectedTest: null,
  options: [
    { value: 'testMean', label: 'Prueba de promedios' },
    { value: 'testFrequency', label: 'Prueba de frecuencias' },
    { value: 'testSmirnov', label: 'Prueba de Kolmogorov-Smirnov' },
    { value: 'testRunsUpDown', label: 'Prueba de corrida arriba y abajo del promedio' },
    {
      value: 'testDistanceGap',
      label: 'Prueba de la distancia (números pseudoaleatorios considerados como reales)',
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'uploadFile':
      return { ...state, numbers: action.payload };

    case 'selectTest':
      return { ...state, selectedTest: action.payload, result: null };

    case 'runTest': {
      const testFunctions = {
        testMean,
        testFrequency,
        testSmirnov,
        testRunsUpDown,
        testDistanceGap,
      };

      const testResult = testFunctions[state.selectedTest](state.numbers);
      return { ...state, result: testResult };
    }
    default:
      return state;
  }
};

export default function Validator() {
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
      <BackButton />

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

      <MethodSelectionValidator
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
      {state.selectedTest === 'testDistanceGap' && state.result && <GapTest state={state} />}
    </div>
  );
}
