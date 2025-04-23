import {
  congruencialMixto,
  congruencialMultiplicativo,
  cuadradoMedio,
  congruencialCuadratico,
  blumBlumShub,
} from '../utils/utils.generador';

export const initialState = {
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

export function reducer(state, action) {
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
