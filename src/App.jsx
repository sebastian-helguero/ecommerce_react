import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify"

import Products from "./components/productsComps/products/Products"
import NotFound from "./routes/notFound/NotFound";
import ProductPage from "./components/productsComps/productPage/ProductPage";
import NewProduct from "./components/productsComps/newProduct/NewProduct";
import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import Protected from "./routes/protected/Protected";
import EditProduct from "./components/productsComps/editProduct/EditProduct";
import { useContext } from "react";
import { AuthContext } from "./services/authContext/Auth.context";
import RecoverProduct from "./components/productsComps/recoverProduct/RecoverProduct";
import Cart from "./components/cart/Cart";
import CreateOrder from "./components/createOrder/CreateOrder";
import AdministrateUsers from "./components/administrateUser/AdministrateUser";
import DeleteAndRecoverUsers from "./components/deleteAndRecoverUsers/DeleteAndRecoverUsers";

function App() {
  const { token } = useContext(AuthContext)
  return (
    <div >
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {!token ?
            <Route path='/' element={<Navigate to="login" />} />
            :
            <Route path='/' element={<Navigate to="Products" />} />
          }
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />}></Route>
          <Route element={<Protected />}>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/create-order" element={<CreateOrder />}></Route>
            <Route path="/users" element={<AdministrateUsers />}></Route>
            <Route path="/users/modify-state" element={<DeleteAndRecoverUsers />}></Route>
            <Route path="/recover-product" element={<RecoverProduct />} />
            <Route path="/add-product" element={<NewProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
