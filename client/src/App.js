
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importo los componentes que vamos a renderizar
import Home from './components/Home/Home.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes> 
  );
}

export default App;