
import { BrowserRouter, Routes, Route } from "react-router-dom"; //BrowserRouter va (y ya está) en index.js

// importo los componentes que vamos a renderizar
import Home from './components/Home/Home.jsx';
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:productId" element={<ProductDetails />} />
    </Routes> 
  );
}

export default App;