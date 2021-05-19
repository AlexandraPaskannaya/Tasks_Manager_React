import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import {LoginPage, RegistrationPage, UsersPage, TasksPage} from "../pages";
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact  path="/">
          <LoginPage/>
        </Route>

        <Route path="/signUp">
          <RegistrationPage/>
        </Route>

        <Route path="/tasks">
          <TasksPage />
        </Route>

        <Route path="/users">
          <UsersPage />
        </Route>

      </Router>
    </div>
  );
}

export default App;
