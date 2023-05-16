import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LayOut from "./layout/LayOut";
import ValuesChart from "./pages/ValuesChart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut />}>
            <Route path="/" element={<ValuesChart />} />
            <Route path="/:building" element={<ValuesChart />} />
            <Route path="/:building/:sensor" element={<ValuesChart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
