import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import { getUser } from './actions/index.js';
import initAuth2Google from './components/Login/init_Auth2.js'

// importo los componentes que vamos a renderizar
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Err404 from './components/Err404/Err404.jsx';

function App() {
  const { user } = useSelector((state)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
    let token = localStorage.getItem("token_id");
    if (token) {dispatch(getUser(token))}
    if(!user.id) initAuth2Google();
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={!user.id ? <Login /> : <Navigate to="/"/>} />
      <Route exact path="/err404" element={<Err404 />} />
      <Route path="*" element={<Navigate to="/err404" replace />}/>
    </Routes> 
  );
}

export default App;