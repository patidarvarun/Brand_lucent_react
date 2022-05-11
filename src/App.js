import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CustomRoute from "./router/routers";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <BrowserRouter>
      <CustomRoute />
    </BrowserRouter>
  );
}

export default App;
