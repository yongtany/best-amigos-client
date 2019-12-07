import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTyeps from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => 
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />} 
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTyeps = {
  user: PropTyeps.object.isRequired
}

export default connect(mapStateToProps)(AuthRoute);
