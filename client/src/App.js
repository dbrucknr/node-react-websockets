import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { Messenger } from "./components/messenger/messenger";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";

const NoPageFound = () => <div>404 Page Not Found</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Messenger />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </Router>
  );
}

export default App;
