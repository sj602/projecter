import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthenticated } from '../actions';
import { getFromStorage } from '../utils/storage';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Header extends Component {
  componentDidMount() {
    const obj = getFromStorage('projecter');
    if(obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('/api/verify/' + token)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if(json.success) {
            this.props.setAuthenticated(true);
          } 
        })
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={styles.flex}>
              <Button component={Link} to="/" color="inherit" style={{fontSize: '30px'}}>프로젝터</Button>
            </Typography>
            {
              isAuthenticated ?
              (
                <Fragment>
                  <Button component={Link} to="/add" color="inherit">프로젝트 추가</Button>
                  <Button component={Link} to="/logout" color="inherit">로그아웃</Button>
                </Fragment>
              )
              :
              (
                <Fragment>
                  <Button component={Link} to="/signup" color="inherit">회원가입</Button>
                  <Button component={Link} to="/login" color="inherit">로그인</Button>
                </Fragment>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {setAuthenticated})(Header);
