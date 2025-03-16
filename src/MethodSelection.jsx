export default function MethodSelection({ options, dispatch, selectedTest }) {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <h2 className="text-lg font-bold mb-2">
        Seleccione una de las siguientes pruebas de uniformidad:
      </h2>

      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => dispatch({ type: 'selectTest', payload: option.value })}
            // className="bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
            className={`${
              selectedTest === option.value ? 'bg-blue-500' : 'bg-gray-700'
            } text-white px-4 py-2 rounded-md cursor-pointer`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
