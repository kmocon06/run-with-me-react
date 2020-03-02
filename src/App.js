import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import Register from './Register'
import Login from './Login'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      loggedInUserEmail: null
    }
  }

  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/'>
            <Login />
          </Route>
      </Switch>
    </Router>
    </div>
    );
  }
}

export default App;
