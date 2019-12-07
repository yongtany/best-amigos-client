import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecoode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';

// Page
import home from './pages/HomePage';
import login from './pages/LoginPage';
import signup from './pages/SignupPage';
import axios from 'axios';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecoode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
     <MuiThemeProvider theme={theme}>
       <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">  
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute 
                path="/login" 
                component={login} 
              />
              <AuthRoute 
                path="/signup" 
                component={signup} 
              />
            </Switch>
          </div>  
        </Router>
       </Provider>
     </MuiThemeProvider>
    );
  }
}

export default App;
