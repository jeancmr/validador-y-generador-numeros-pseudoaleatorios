import { useState } from 'react';
import Button from '../components/Button';

export default function FormDistribution({ maxVariables, dispatch }) {
  const [numVariables, setNumVariables] = useState('');
  const [variables, setVariables] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleNumVariablesChange = (e) => {
    const value = Number(e.target.value);
    if (value > maxVariables) {
      setErrors([`El número de variables no puede superar ${maxVariables}.`]);
    } else {
      setErrors([]);
      setNumVariables(value);
      setVariables(Array.from({ length: value }, () => ({ name: '', probability: '' })));
    }
  };

  const handleVariableChange = (index, field, value) => {
    const newVariables = [...variables];
    newVariables[index][field] = field === 'probability' ? Number(value) : value;
    setVariables(newVariables);
  };

  const totalProbability = variables.reduce((sum, v) => sum + (v.probability || 0), 0);

  const validateForm = () => {
    let newErrors = [];

    if (totalProbability !== 100) {
      newErrors.push('La suma de probabilidades debe ser exactamente 100%.');
    }

    if (variables.some((v) => v.probability <= 0)) {
      newErrors.push('Ninguna probabilidad puede ser 0.');
    }

    if (variables.some((v) => v.name.trim() === '')) {
      newErrors.push('Todas las variables deben tener un nombre.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch({ type: 'setVariables', payload: variables });
      dispatch({ type: 'execute' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">Definir Variables y Probabilidades</h2>
      {errors.length > 0 && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="mb-2">
        <label className="block">Número de variables:</label>
        <input
          type="number"
          value={numVariables}
          onChange={handleNumVariablesChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
          min="1"
          max={maxVariables}
        />
      </div>
      {variables.map((variable, index) => (
        <div key={index} className="mb-2">
          <label className="block">Nombre variable {index + 1}:</label>
          <input
            type="text"
            value={variable.name}
            onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
            required
          />
          <label className="block mt-2">Probabilidad variable {index + 1} (%):</label>
          <input
            type="number"
            value={variable.probability}
            onChange={(e) => handleVariableChange(index, 'probability', e.target.value)}
            className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
            min="1"
            max="100"
            required
          />
        </div>
      ))}
      <p className="text-sm mt-2">
        Suma total:
        <span className={totalProbability !== 100 ? 'text-red-400' : 'text-green-400'}>
          {' '}
          {totalProbability}%
        </span>
      </p>
      <Button text="Confirmar" onClick={handleSubmit} type={'submit'} />
      <Button text="Volver" onClick={() => dispatch({ type: 'reset' })} />
    </form>
  );
}
