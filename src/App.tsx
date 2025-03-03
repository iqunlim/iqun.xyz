import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Calculator from "./components/calculator/calculator";
import ContainerPage from "./Container";
import PageIframe from "./pages/PageFrame";
import Board from "./components/connnect4/board";
import CustomDropDownExampleComponent from "./components/customdropdown/Component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContainerPage />}>
          <Route path="calc" element={<Calculator />} />
          <Route
            path="vanlife"
            element={
              <PageIframe
                src="https://startling-biscuit-830178.netlify.app/"
                gh="https://github.com/iqunlim/vanlife"
              />
            }
          />
          <Route
            path="poring"
            element={
              <PageIframe
                src="https://poring.xyz"
                gh="https://github.com/iqunlim/poring.xyz"
              />
            }
          />
          <Route path="connect4" element={<Board rows={6} cols={7} />} />
          <Route path="dropdown" element={<CustomDropDownExampleComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
