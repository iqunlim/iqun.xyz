import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Calculator from "./project/calculator/calculator";
import ContainerPage from "./Container";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContainerPage />}>
          <Route path="calc" element={<Calculator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
