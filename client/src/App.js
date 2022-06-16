import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser, loadingUser } from "./actions/index.js";

// importo los componentes que vamos a renderizar
import Home from "./components/Home/Home.jsx";
import Err404 from "./components/Err404/Err404.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import FormRegisterFormik from "./components/FormRegisterFormik/FormRegisterFormik.jsx";
import Header from "./components/Header/Header.jsx";
import LoginFormik from "./components/LoginFormik/LoginFormik.js";
import Cart from "./components/Cart/Cart.jsx";
import Spiner from "./components/Spinner/Spinner.js";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import PublicacionPage from "./pages/PublicationsPage/PublicationsPage.js";

function App() {
  const { user, searchUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token_id");
    if (token && !user) dispatch(getUser(token));
    else dispatch(loadingUser(false));
  }, []);

  return searchUser ? (
    <Routes>

      <Route exact path="/" element={<Home />} />
      <Route path="/signin" element={!user.id ? <LoginFormik /> : <Navigate to="/"/>} />
      <Route path="/signup" element={!user.id ? <FormRegisterFormik /> : <Navigate to="/"/>} />
      <Route exact path="/err404" element={<Err404 />} />
      <Route path="/details/:productId" element={<ProductDetails />} />
      <Route path="*" element={<Navigate to="/err404" replace />}/>
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Spiner />} />
    </Routes>
  ) : (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          path="/signin"
          element={!user ? <LoginFormik /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!user ? <FormRegisterFormik /> : <Navigate to="/home" />}
        />
        <Route exact path="/err404" element={<Err404 />} />
        <Route path="/details/:productId" element={<ProductDetails />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/publications"
          element={user ? <PublicacionPage /> : <Navigate to="/home" />}
        />
        <Route path="*" element={<Navigate to="/err404" replace />} />
      </Routes>
    </>
  );
}

export default App;
