import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      paswordChk: '',
      message: '',
    }
  }

  handleEmail(email) {
    this.setState({email})
  }

  handlePassword(password) {
    this.setState({password})
  }

  handlePasswordChk(passwordChk) {
    this.setState({passwordChk})
  }

  register() {
    const { email, password, passwordChk } = this.state;
    
    if(email && password && passwordChk) {
      if(password !== passwordChk) return alert('패스워드가 다릅니다')
      else {
        fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email, password
          })
        }).then(res => res.json())
          .then(json => {
            if(json.success) {
              alert(json.message + '로그인 해주세요.');
              return this.props.history.push(`/login`);
            } else {
              this.setState({message: json.message})
            }
          })
      }
    } else {
      return alert('빈 칸을 채워주세요')
    }
  }

  render() {
    const { message } = this.state;
    const { classes } = this.props;

    return (
      <div className="SignUp">
        <Paper elevation={1} className="paper">
          <Grid container>
            <Grid item xs={12} className="grid">
              <Input
                className={classes.input}
                onChange={(event) => this.handleEmail(event.target.value)}
                placeholder="이메일"
              />
            </Grid>
            <Grid item xs={12} className="grid">
              <Input
                type="password"
                className={classes.input}
                onChange={(event) => this.handlePassword(event.target.value)}
                placeholder="비밀번호"
              />
            </Grid>
            <Grid item xs={12} className="grid">
              <Input
                type="password"
                className={classes.input}
                onChange={(event) => this.handlePasswordChk(event.target.value)}
                placeholder="비밀번호 확인"
              />
            </Grid>
            {
              message ? 
              (
                <div style={{textAlign: 'center', margin: '0 auto'}}>
                  <span style={{color: 'red'}}>{message}</span>
                </div>
              )
              :
              null
            }
            <Grid item xs={12} className="grid">
              <Button variant="contained" color="primary" className={classes.button} onClick={() => this.register()}>
                회원가입
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const styles = theme => ({
  SignUp: {
    display: "flex", 
    justifyContent: 'center', 
    marginTop: '50px'
  },
  paper: {
    flex: 1
  },
  grid: {
    textAlign: 'center'
  },
  input: {
    margin: theme.spacing.unit,
    display: 'lnline-block',
    width: '20%'
  },
  button: {
    margin: theme.spacing.unit,
    display: 'lnline-block'
  },
});

export default withStyles(styles)(SignUp);