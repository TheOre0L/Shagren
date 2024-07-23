import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import BurgerMenu from "./components/Menu/Menu";
import FullProduct from "./Pages/FullProduct";
import Catalog from "./Pages/Catalog/Catalog";
import AddProduct from "./Pages/AddProduct/AddProduct";
export const CLIENT_URL = "http://localhost:3000"
function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
            <Route path="/product/:id" element={<FullProduct/>}/>
            <Route path="/product/add" element={<AddProduct/>}/>
            <Route path="/product/:id/edit" element={<AddProduct/>}/>
        </Routes>
      </>
  );
};

export default App;
