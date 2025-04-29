import { useReducer } from 'react';
import * as XLSX from 'xlsx';
import { reducer, initialState } from '../reducers/probabilityReducer';
import BackButton from '../components/shared/BackButton';
import MethodSelectionDistribution from '../components/MethodSelectionDistribution';
import FormUniform from '../components/FormUniform';
import FormExponential from '../components/FormExponential';
import FormUniformV2 from '../components/FormUniformV2';
import FormPoisson from '../components/FormPoisson';
import DistributionTableUniform from '../components/DistributionTableUniform';
import DistributionTableExponential from '../components/DistributionTableExponential';
import DistributionTableUniformV2 from '../components/DistributionTableUniformV2';
import DistributionTablePoisson from '../components/DistributionTablePoisson';
const OPTIONS = [
  { value: 'uniformDistribution', label: 'Distribución uniforme' },
  { value: 'exponentialDistribution', label: 'Distribución exponencial' },
  { value: 'uniformDistributionV2', label: 'Distribución uniforme V2' },
  { value: 'poissonDistribution', label: 'Distribución de Poisson' },
];

export default function Probability() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { numbers, option, result } = state;

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

      <h1 className="text-2xl font-bold mb-4">Probabilidad con variables no uniformes</h1>
      <div className="w-full max-w-md mb-4">
        <label className="block text-gray-400 text-sm mb-2">Subir Archivo</label>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="block w-full border p-2 rounded-md bg-gray-800 text-white cursor-pointer focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {option === 'uniformDistribution' && (
        <FormUniform dispatch={dispatch} option={option} maxVariables={numbers.length} />
      )}
      {option === 'exponentialDistribution' && (
        <FormExponential dispatch={dispatch} option={option} maxVariables={numbers.length} />
      )}
      {option === 'uniformDistributionV2' && (
        <FormUniformV2 dispatch={dispatch} option={option} maxVariables={numbers.length} />
      )}
      {option === 'poissonDistribution' && (
        <FormPoisson dispatch={dispatch} option={option} maxVariables={numbers.length} />
      )}

      {!option && <MethodSelectionDistribution dispatch={dispatch} options={OPTIONS} />}

      {option === 'uniformDistribution' && result && (
        <DistributionTableUniform
          randomNumbers={result.randomNumbers}
          assignments={result.assignments}
          summaryData={result.summaryData}
        />
      )}
      {option === 'exponentialDistribution' && result && (
        <DistributionTableExponential variableName={state.variableName} result={result} />
      )}

      {option === 'uniformDistributionV2' && result && (
        <DistributionTableUniformV2 variableName={state.variableName} result={result} />
      )}

      {option === 'poissonDistribution' && result && (
        <DistributionTablePoisson variableName={state.variableName} result={result} />
      )}
    </div>
  );
}
