import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecoode from 'jwt-decode';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Page
import home from './pages/HomePage';
import login from './pages/LoginPage';
import signup from './pages/SignupPage';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecoode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true
  }
}

class App extends Component {
  render() {
    return (
     <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">  
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute 
                  path="/login" 
                  component={login} 
                  authenticated={authenticated} 
                />
                <AuthRoute 
                  path="/signup" 
                  component={signup} 
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
     </MuiThemeProvider>
    );
  }
}

export default App;
