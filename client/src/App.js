
import { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import "./App.css";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
