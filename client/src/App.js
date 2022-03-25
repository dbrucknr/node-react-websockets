import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { Messenger } from "./components/messenger/messenger";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/protectedRoute";

import "./App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSmile,
  faImage,
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell
);

const NoPageFound = () => <div>404 Page Not Found</div>;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<Messenger />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
