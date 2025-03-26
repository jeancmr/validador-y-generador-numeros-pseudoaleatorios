import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')} // Regresa a la pantalla principal
      className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition mb-6 cursor-pointer"
    >
      ⬅ Volver
    </button>
  );
}
