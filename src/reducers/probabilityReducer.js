import {
  uniformDistribution,
  exponentialDistribution,
  uniformDistributionV2,
  poissonDistribution,
  normalDistribution,
} from '../utils/utils.probability';

export const initialState = {
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

  // UniformV2
  a: null,
  b: null,

  //Normal
  standardDeviation: null,
};

export function reducer(state, action) {
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

    case 'setUniformV2Variables':
      return {
        ...state,
        variableName: action.payload.variableName,
        a: action.payload.a,
        b: action.payload.b,
        compareValue: action.payload.compareValue,
        operator: action.payload.operator,
      };

    case 'setPoissonVariables':
      return {
        ...state,
        variableName: action.payload.variableName,
        mean: action.payload.mean,
        compareValue: action.payload.compareValue,
        operator: action.payload.operator,
      };

    case 'setNormalVariables':
      return {
        ...state,
        variableName: action.payload.variableName,
        mean: action.payload.mean,
        standardDeviation: action.payload.standardDeviation,
        compareValue: action.payload.compareValue,
        operator: action.payload.operator,
      };

    case 'execute': {
      const distribution = {
        uniformDistribution,
        exponentialDistribution,
        uniformDistributionV2,
        poissonDistribution,
        normalDistribution,
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

      if (state.option === 'uniformDistributionV2') {
        distributionResult = distribution.uniformDistributionV2(
          state.numbers,
          state.variableName,
          state.a,
          state.b,
          state.compareValue,
          state.operator
        );
      }

      if (state.option === 'poissonDistribution') {
        distributionResult = distribution.poissonDistribution(
          state.numbers,
          state.variableName,
          state.compareValue,
          state.operator,
          state.mean
        );
      }

      if (state.option === 'normalDistribution') {
        distributionResult = distribution.normalDistribution(
          state.numbers,
          state.variableName,
          state.mean,
          state.standardDeviation,
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
