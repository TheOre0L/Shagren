import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
export const CLIENT_URL = "http://localhost:3000"
function App() {
  return (
      <>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
      </>
  );
};

export default App;
