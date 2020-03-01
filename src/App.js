import React, { Component } from 'react'
import './App.css'
import LoginRegisterForm from './LoginRegisterForm'

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
        <h1>New React App</h1>
        <LoginRegisterForm />
      </div>
    );
  }
}

export default App;
