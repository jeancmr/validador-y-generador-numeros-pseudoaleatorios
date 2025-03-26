import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center">¿Qué deseas hacer?</h1>

      <div className="flex flex-col space-y-6 w-full max-w-md">
        <Link
          to="/generador"
          className="bg-gray-700 text-white px-6 py-4 rounded-md text-center hover:bg-gray-600 transition"
        >
          Generar Números Pseudoaleatorios
        </Link>

        <Link
          to="/validador"
          className="bg-gray-700 text-white px-6 py-4 rounded-md text-center hover:bg-gray-600 transition"
        >
          Validar Números Pseudoaleatorios
        </Link>
      </div>
    </div>
  );
}
