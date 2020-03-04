import React, { Component } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect,
  withRouter
} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import RaceContainer from './RaceContainer'
import RaceIndex from './RaceIndex'
import { Message, Button } from 'semantic-ui-react'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      loggedInUserEmail: null,
      loggedInUserId: null,
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
          loggedInUserId: registerJson.data._id,
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
    console.log("login was called");
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
          loggedInUserEmail: loginJson.data.email,
          loggedInUserId: loginJson.data._id
        })
      } else {
        this.setState({
          message: 'Invalid email or password'
        })
      }
      //this is redirecting the page path
      this.props.history.push("/");

    } catch (err) {
        console.error(err)
    }
  }

  //logout
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
          loggedInUserId: null,
          message: ''
        })
      } 

    } catch (err) {
        console.error(err)
    }
  }



  render() {

    console.log("state in render method in app.js >> ", this.state);

    return (
      <div className="App">
      <h1>Running App</h1>
      

        <Switch>

          <Route path='/login'>
                <Login login={this.login} />
          </Route>

          <Route path='/register'>
            <Register register={this.register} />
          </Route>

          <Route path='/'>
            { 
              this.state.loggedIn 
              ? 
              <RaceContainer logout={this.logout} loggedInUserId={this.state.loggedInUserId}/> 
              : 
              <Redirect 
                to={{
                  pathname: '/login'
                }}
              />
            }
          </Route>

        </Switch>

      
    </div>
    );
  }
}

export default withRouter(App);
