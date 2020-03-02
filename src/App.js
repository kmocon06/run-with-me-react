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
import RaceList from './RaceList'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      loggedInUserEmail: null
    }
  }

  //register
  register = async (data) => {
    console.log("register() in App.js called with the following info", data)
    const registerUrl = process.env.REACT_APP_API_URL + '/api/v1/auth/register'

    try {
      const registerResponse = await fetch(registerUrl, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(registerResponse);
      const registerJson = await registerResponse.json()
      console.log(registerJson);

    } catch (err) {
        console.error(err)
    }
  }

  //login
  login = async (data) => {
    console.log("login() in App.js called with the following info", data)
  }

  render() {

    console.log(process.env)
    return (
      <div className="App">
      <h1>Running App</h1>
      <Router>
        <Switch>
         { 
          this.state.loggedIn 
          ? 
          <RaceList /> 
          : 
          <Route path='/register'>
            <Register 
              register={this.register}
            />
          </Route>
        }
          <Route path='/'>
            <Login 
              login={this.login}
            />
          </Route>
      </Switch>
    </Router>
    </div>
    );
  }
}

export default App;
