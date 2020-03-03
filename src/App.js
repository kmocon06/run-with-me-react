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
import RaceContainer from './RaceContainer'
import { Message, Button } from 'semantic-ui-react'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      loggedInUserEmail: null,
      message: ''
    }
  }

  //register
  register = async (data) => {
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
      const registerJson = await registerResponse.json()

      //if the registerResponse is 201,
      //then we need to change the state
      if(registerResponse.status === 201) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: registerJson.data.email,
          message: ''
        })
      } else {
        this.setState({
          message: 'A user with that email already exists'
        })
      }

    } catch (err) {
        console.error(err)
    }
  }

  //login
  login = async (data) => {
    const loginUrl = process.env.REACT_APP_API_URL + '/api/v1/auth/login'

    try {
      const loginResponse = await fetch(loginUrl, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const loginJson = await loginResponse.json()

      //if the loginResponse is 200,
      //then we need to change the state
      if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: loginJson.data.email
        })
      } else {
        this.setState({
          message: 'Invalid email or password'
        })
      }

    } catch (err) {
        console.error(err)
    }
  }

  logout = async () => {

    const logoutUrl = process.env.REACT_APP_API_URL + '/api/v1/auth/logout' 

    try {
      const logoutResponse = await fetch(logoutUrl, {
        credentials: 'include',
        method: 'GET',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const logoutJson = await logoutResponse.json()


      if(logoutResponse.status === 200) {
        this.setState({
          loggedIn: false,
          loggedInEmail: null,
          message: ''
        })
      } 

    } catch (err) {
        console.error(err)
    }
  }

  render() {

    return (
      <div className="App">
      <h1>Running App</h1>
      <Router>
        <Switch>
         { 
          this.state.loggedIn 
          ? 
          <div>
          <nav>
            <Button onClick={this.logout}>Logout</Button>
          </nav>
          <RaceContainer /> 
          </div>
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
