import React, { Component } from 'react'
import PropTypes from 'prop-types';

// MUI stuff
import Grid from '@material-ui/core/Grid'

import Scream from '../components/Scream';
import Profile from '../components/Profile';

// Redux stuff
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class HomePage extends Component {
  
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream, index) => <Scream scream={scream} key={index}/>)
    ) : <p>Loading...</p>
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

HomePage.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(HomePage)
