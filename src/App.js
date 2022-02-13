import "./App.css";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { createBrowserHistory } from "history";
import JuniorDashboard from "./screens/Dashboard/Junior";
import OtherDashboard from "./screens/Dashboard/Other";
import SeniorDashboard from "./screens/Dashboard/Senior";
import PODashboard from "./screens/Dashboard/PO";
import LecturerDashboard from "./screens/Dashboard/Lecturer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Login history={history} />
        </Route>
        <Route path="/signup">
          <SignUp history={history} />
        </Route>
        <Route path="/junior">
          <JuniorDashboard history={history} />
        </Route>
        <Route path="/senior">
          <SeniorDashboard history={history} />
        </Route>
        <Route path="/po">
          <PODashboard history={history} />
        </Route>
        <Route path="/lecturer">
          <LecturerDashboard history={history} />
        </Route>
      </Switch>
    </Router>
  );
}

//export default App;
