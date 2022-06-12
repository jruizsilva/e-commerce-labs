import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser, loadingUser } from './actions/index.js';

// importo los componentes que vamos a renderizar
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Err404 from './components/Err404/Err404.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import FormRegister from './components/FormRegister/FormRegister.jsx';
import Spiner from './components/Spinner/Spinner.js';

function App() {
  const { user, searchUser } = useSelector((state)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
    let token = localStorage.getItem("token_id");
    if (token && !user.id) dispatch(getUser(token))
    else dispatch(loadingUser(false));
  }, []);

  return (
    <Routes>
      {searchUser ? <Route path="*" element={<Spiner />} /> :
      <><Route exact path="/" element={<Home />} />
      <Route path="/signin" element={!user.id ? <Login /> : <Navigate to="/"/>} />
      <Route path="/signup" element={!user.id ? <FormRegister /> : <Navigate to="/"/>} />
      <Route exact path="/err404" element={<Err404 />} />
      <Route path="/details/:productId" element={<ProductDetails />} />
      <Route path="*" element={<Navigate to="/err404" replace />}/></>
      }
    </Routes> 
  );
}

export default App;