import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';

// Page
import home from './pages/HomePage';
import login from './pages/LoginPage';
import signup from './pages/SignupPage';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">  
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/login" component={login} />
              <Route path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
