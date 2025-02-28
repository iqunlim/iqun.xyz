import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Calculator from "./project/calculator/calculator";
import ContainerPage from "./Container";
import Test from "./project/test/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContainerPage />}>
          <Route path="calc" element={<Calculator />} />
          <Route path="test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
