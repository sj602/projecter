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
      <div className={classes.Login}>
        <Paper elevation={1}>
          <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.grid}>
              <Input
                className={classes.input}
                onChange={(event) => this.handleEmail(event.target.value)}
                placeholder="이메일"
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
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
                <div style={{textAlign: 'center', margin: '0 auto'}}>
                  <span style={{color: 'red'}}>{error}</span>
                </div>
              )
              :
              null
            }
            <Grid item xs={12} className={classes.grid}>
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
  Login: {
    display: "flex", 
    justifyContent: 'center', 
    marginTop: '50px'
  },
  container: {
    flex: 1
  },
  grid: {
    textAlign: 'center',
    width: '100%'
  },
  input: {
    margin: theme.spacing.unit,
    display: 'inline-block',
    width: '20%'
  },
  button: {
    margin: theme.spacing.unit,
    display: 'inline-block'
  },
});

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {setAuthenticated})(withStyles(styles)(Login));