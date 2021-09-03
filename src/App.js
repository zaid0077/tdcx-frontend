import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import "./styles/Common.css"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

require('dotenv').config()
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Login}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/dashboard' exact component={Dashboard}></Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
