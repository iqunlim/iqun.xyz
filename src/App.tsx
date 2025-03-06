import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calculator from "./components/calculator/calculator";
import ContainerPage from "./Container";
import PageIframe from "./pages/PageFrame";
import Board from "./components/connnect4/board";
import CustomDropDownExampleComponent from "./components/customdropdown/Component";
import { ThemeProvider } from "./components/theme/theme-provider";
import SimonSays from "./components/simon-says/simon";

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContainerPage />}>
            {/* TODO: A proper landing page */}
            <Route
              index
              element={
                <div>Hello! Click anything above to check out my stuff</div>
              }
            />
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
            <Route
              path="dropdown"
              element={<CustomDropDownExampleComponent />}
            />
            <Route path="simon" element={<SimonSays />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
