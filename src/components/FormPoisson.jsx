import { useState } from 'react';
import Button from '../components/shared/Button';

export default function FormPoisson({ dispatch }) {
  const [name, setName] = useState('');
  const [mean, setMean] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [operator, setOperator] = useState('');
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    let newErrors = [];
    if (name.trim() === '') {
      newErrors.push('El nombre de la variable aleatoria no puede estar vacío.');
    }
    if (mean <= 0) {
      newErrors.push('El valor de la media debe ser un número positivo.');
    }

    if (quantity <= 0) {
      newErrors.push('La cantidad a comparar debe ser un número positivo.');
    }
    if (operator.trim() === '') {
      newErrors.push('El operador no puede estar vacío.');
    }
    if (
      operator !== '<' &&
      operator !== '>' &&
      operator !== '=' &&
      operator !== '<=' &&
      operator !== '>='
    ) {
      newErrors.push('El operador debe ser <, >, =, <= o >=');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch({
        type: 'setPoissonVariables',
        payload: {
          variableName: name,
          mean: Number(mean),
          compareValue: Number(quantity),
          operator: operator,
        },
      });
      dispatch({ type: 'execute' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">Definir Variable y Parámetros</h2>

      {errors.length > 0 && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="mb-2">
        <label className="block">Nombre de la variable aleatoria:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Media:</label>
        <input
          type="number"
          value={mean}
          onChange={(e) => setMean(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Cantidad a comparar:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block">Operador:</label>
        <input
          type="text"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className="p-2 rounded bg-gray-700 border border-gray-600 w-full"
        />
      </div>

      <Button text="Confirmar" onClick={handleSubmit} type={'submit'} />
      <Button text="Volver" onClick={() => dispatch({ type: 'reset' })} />
    </form>
  );
}
