import { BrowserRouter, Routes, Route } from "react-router";

import Products from "./components/products/Products"
import NotFound from "./routes/notFound/NotFound";
import ProductPage from "./components/productPage/ProductPage";

function App() {
  
  return (
    <div className="d-flex flex-column align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
