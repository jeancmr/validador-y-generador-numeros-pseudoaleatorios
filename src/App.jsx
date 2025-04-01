import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Validator from './pages/Validator';
import Generator from './pages/Generator';
import Probability from './pages/Probability';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generador" element={<Generator />} />
        <Route path="/validador" element={<Validator />} />
        <Route path="/probabilidad" element={<Probability />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
