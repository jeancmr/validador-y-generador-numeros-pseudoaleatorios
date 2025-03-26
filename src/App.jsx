import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Validator from './pages/Validator';
import Generator from './pages/Generator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generador" element={<Generator />} />
        <Route path="/validador" element={<Validator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
