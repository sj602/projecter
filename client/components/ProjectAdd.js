import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { setAuthenticated } from '../actions';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class ProjectAdd extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      progress: '',
      dueDate: '',
      milestones: [
        {
          milestone: '',
          checked: false
        }
      ],
      description: '',
      participants: '',
    };
  }

  componentDidMount() {
    fetch('/api/getAllUsers', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(json => this.setState({users: json['users']}))
      .catch(err => console.log(err))
  }

  renderMilestone() {
    const { classes } = this.props;
    const { milestones } = this.state;

    return milestones.map((milestone, index) => {
      return (
        <div style={{flex: 1, flexDirection: 'row'}} key={index}>
          <FormControl component="fieldset" margin='normal'>
            <FormGroup row={true}>
              <FormControlLabel
                control={
                  <div style={{marginTop: 10, marginLeft: 10}}>
                    <Checkbox
                      checked={milestones[index]['checked']}
                      onChange={() => this.handleCheck(index)}
                      value="false"
                    />
                  </div>
                }
              />
            </FormGroup>
          </FormControl>

          <TextField
            label="마일스톤"
            margin="normal"
            onChange={(event) => this.handleChange(event.target.value, 'milestone', index)}
            value={milestones[index]['milestone']}
            className={classes.textField}
            style={{flex: 1}}
          />
        </div>
      )
    })
  }

  handleCheck(index) {
    const { milestones } = this.state;
    const copiedMilestones = [...milestones];

    copiedMilestones[index]['checked'] = !milestones[index]['checked'];
    this.setState({milestones: copiedMilestones});
  }

  handleChange(content, type) {
    switch(type) {
      case 'title':
        this.setState({title: content})
        break;
      case 'progress':
        this.setState({progress: content})
        break;
      case 'dueDate':
        this.setState({dueDate: content})
        break;
      case 'description':
        this.setState({description: content})
        break;
      case 'participants':
        this.setState({participants: content})
        break;
      case 'milestones':
        const { milestones } = this.state;
        const copiedMilestones = [...milestones];
        copiedMilestones[index]['milestone'] = content;

        this.setState({milestones: copiedMilestones})
        break;
    }
  }

  handleAdd() {
    const { isAuthenticated } = this.props;
    const { milestones } = this.state;
    const milestone = {
      milestone: '',
      checked: false
    }

    if(isAuthenticated) {
      let copiedMilestones = [...milestones];

      copiedMilestones.push(milestone);
      this.setState({milestones: copiedMilestones})
    } else {
      return alert('마일스톤을 추가히려면 로그인 해주세요')
      this.props.history.push('/login');
    }
  }

  handleSave() {
    const { isAuthenticated } = this.props;
    const { title, progress, dueDate, milestones, description, participants } = this.state;

    if(isAuthenticated) {
      fetch('/api/add', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Accept": "applitcation/json"
        },
        body: JSON.stringify({title, progress, dueDate, milestones, description, participants})
      }).then(res => res.json())
        .then(json => {
          if(json.success) {
            alert(json.message);
            return this.props.history.push(`/`);
          } else {
            alert(json.message);
          }
        })
    } else {
      alert('프로젝트를 저장하려면 로그인 해주세요')
      this.props.history.push('/login');
    }
  }

  handleDelete(type) {
    const { isAuthenticated } = this.props;
    const { milestones } = this.state;

    if(isAuthenticated && type === 'milestone') {
      if(milestones.length !== 0) {
        const copiedMilestones = [...milestones];
        copiedMilestones.pop();
        this.setState({milestones: copiedMilestones})
      }
    } else {
      return alert('삭제하려면 로그인 해주세요')
      this.props.history.push('/login');
    }
  }

  render() {
    const { classes } = this.props;
    const { title, progress, dueDate, description, participants } = this.state;

    return (
      <div className="ProjectAdd">
        <Paper className={classes.root} elevation={1}>
          <form className={classes.container} noValidate autoComplete="off" style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{flex: 1}}>
              <TextField
                id="title"
                label="프로젝트"
                className={classes.textField}
                value={title}
                onChange={(event) => this.handleChange(event.target.value, 'title')}
                margin="normal"
                style={{flex: 1}}
              />
              <TextField
                id="progress"
                label="진행율"
                value={progress}
                onChange={(event) => this.handleChange(event.target.value, 'progress')}
                className={classes.textField}
                margin="normal"
                style={{flex: 1}}
              />
              <TextField
                id="date"
                label="목표일"
                value={dueDate}
                type="date"
                onChange={(event) => this.handleChange(event.target.value, 'dueDate')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="참여자"
                value={participants}
                onChange={(event) => this.handleChange(event.target.value, 'participants')}
                className={classes.textField}
                margin="normal"
                style={{flex: 1}}
              />

            </div>

            <div style={{flex: 1}}>
              <TextField
                id="multiline-flexible"
                label="세부내용"
                value={description}
                onChange={(event) => this.handleChange(event.target.value, 'description')}
                multiline
                fullWidth
                rowsMax="20"
                className={classes.textField}
                style={{width: '98%'}}
                margin="normal"
              />
            </div>

            <div className='milestones'>
            {
              this.renderMilestone()
            }   
            </div>

            <div className={classes.buttons}>
              <Grid item>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleAdd()}>
                  <AddIcon className={classes.leftIcon} />
                  마일스톤 추가
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleDelete('milestone')}>
                  <DeleteIcon className={classes.leftIcon} />
                  마일스톤 삭제
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size="medium" className={classes.button} onClick={() => this.handleSave()}>
                  <SaveIcon className={classes.leftIcon} />
                  프로젝트 저장
                </Button>
              </Grid>
            </div>
          </form>        
        </Paper>     
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

// const memberList = [
//   {
//     name: 'C',
//     year: 1972
//   },
//   {
//     name: 'Elm',
//     year: 2012
//   },
//   ...
// ];

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {setAuthenticated})(withStyles(styles)(ProjectAdd));
