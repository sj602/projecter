import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthenticated } from '../actions';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { setInStorage } from '../utils/storage';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      token: '',
      message: '',
      error: '',
    }
  }

  login() {
    const { email, password } = this.state;

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    }).then(res => res.json())
      .then(json => {
        if(json.success) {
          setInStorage('projecter', { token: json.token });
          this.setState({
            message: json.message,
            email: '',
            password: '',
            token: json.token
          })
          this.props.setAuthenticated(true);
          return this.props.history.push('/');
        } else {
          this.setState({
            error: json.message
          })
        }
      })
  }

  handleEmail(email) {
    this.setState({email});
  }  

  handlePw(password) {
    this.setState({password});
  }

  render() {
    const { error } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <Paper elevation={1}>
          <Grid container>
            <Grid item xs={12}>
              <Input
                className={classes.input}
                onChange={(event) => this.handleEmail(event.target.value)}
                placeholder="이메일"
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                type="password"
                className={classes.input}
                onChange={(event) => this.handlePw(event.target.value)}
                placeholder="비밀번호"
              />
            </Grid>
            {
              error ?
              (
                <p style={{color: 'red'}}>{error}</p>
              )
              :
              null
            }
            <Grid item xs={12}>
              <Button variant="contained" color="primary" className={classes.button} onClick={() => this.login()}>
                로그인
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {setAuthenticated})(withStyles(styles)(Login));