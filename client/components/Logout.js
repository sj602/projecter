import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthenticated } from '../actions';
import { getFromStorage } from '../utils/storage';

class Logout extends Component {
  componentWillMount() {
    this.logout();
    this.props.history.push('/');
  }

  logout() {
    const obj = getFromStorage('projecter');

    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/logout/' + token, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }).then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
            });
            this.props.setAuthenticated(false);
          }
        });
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {setAuthenticated})(Logout);