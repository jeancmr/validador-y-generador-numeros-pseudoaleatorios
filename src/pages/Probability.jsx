import { useReducer } from 'react';
import * as XLSX from 'xlsx';
import BackButton from '../components/BackButton';
import MethodSelectionDistribution from '../components/MethodSelectionDistribution';
import { uniformDistribution, exponentialDistribution } from '../utils/utils.probability';
import FormUniform from '../components/FormUniform';
import FormExponential from '../components/FormExponential';
import DistributionTableUniform from '../components/DistributionTableUniform';
import DistributionTableExponential from '../components/DistributionTableExponential';

const OPTIONS = [
  { value: 'uniformDistribution', label: 'Distribución uniforme' },
  { value: 'exponentialDistribution', label: 'Distribución exponencial' },
];

const initialState = {
  numbers: [],
  option: null,
  result: null,

  //Uniform
  variables: [],

  //Exponential
  variableName: '',
  mean: null,
  compareValue: null,
  operator: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'uploadFile':
      return { ...state, numbers: action.payload };

    case 'changeOption':
      return {
        ...state,
        option: state.numbers.length > 0 ? action.payload : null,
      };

    case 'setVariables':
      return { ...state, variables: action.payload };

    case 'setExponentialVariables':
      return {
        ...state,
        variableName: action.payload.variableName,
        mean: action.payload.mean,
        compareValue: action.payload.compareValue,
        operator: action.payload.operator,
      };

    case 'execute': {
      const distribution = {
        uniformDistribution,
        exponentialDistribution,
      };

      let distributionResult = null;
      if (state.option === 'uniformDistribution') {
        distributionResult = distribution.uniformDistribution(state.numbers, state.variables);
      }

      if (state.option === 'exponentialDistribution') {
        distributionResult = distribution.exponentialDistribution(
          state.numbers,
          state.variableName,
          state.mean,
          state.compareValue,
          state.operator
        );
      }

      return { ...state, result: distributionResult };
    }

    case 'reset':
      return { ...initialState, numbers: state.numbers };

    default:
      return state;
  }
}

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

      {option ? (
        option === 'uniformDistribution' ? (
          <FormUniform dispatch={dispatch} option={option} maxVariables={numbers.length} />
        ) : (
          <FormExponential dispatch={dispatch} option={option} maxVariables={numbers.length} />
        )
      ) : (
        <MethodSelectionDistribution dispatch={dispatch} options={OPTIONS} />
      )}

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
    </div>
  );
}
