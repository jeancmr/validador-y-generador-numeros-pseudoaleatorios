import {
  testMean,
  testFrequency,
  testSmirnov,
  testRunsUpDown,
  testDistanceGap,
} from '../utils/utils.validador';

export const initialState = {
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

export const reducer = (state, action) => {
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
