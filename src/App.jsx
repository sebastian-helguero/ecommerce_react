import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify"

import Products from "./components/productsComps/products/Products"
import NotFound from "./routes/notFound/NotFound";
import ProductPage from "./components/productsComps/productPage/ProductPage";
import NewProduct from "./components/productsComps/newProduct/NewProduct";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import Protected from "./routes/protected/Protected";

function App() {

  return (
    <div >
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />}></Route>
          <Route element={<Protected />}>
            <Route path="/add-product" element={<NewProduct />}></Route>
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
