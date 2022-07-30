import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DefaultLayout from "./Common/DefaultLayout";
import { Login } from "./Pages";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<DefaultLayout />} />    
    </Routes>
  </BrowserRouter>
  );
}

export default App;
