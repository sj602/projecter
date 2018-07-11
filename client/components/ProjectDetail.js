import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAuthenticated } from '../actions';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 30,
      buffer: 10,
      checked: false,
      numberOfMilestone: ['milestone'],
      id: this.props.location.state._id,
      title: this.props.location.state.title,
      progress: this.props.location.state.progress,
      dueDate: this.props.location.state.dueDate,
      milestone: this.props.location.state.milestone,
      description: this.props.location.state.description
    };
  }

  renderMilestone() {
    const { classes } = this.props;
    const { numberOfMilestone } = this.state;
    // console.log(numberOfMilestone)
    return numberOfMilestone.map((n, index) => {
      console.log('index', index)
      return (
        <div style={{flex: 1, flexDirection: 'row'}}>
          <FormControl component="fieldset" margin='normal'>
            <FormGroup row={true}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checked}
                    onChange={() => this.handleChange()}
                    value="false"
                  />}
              />
            </FormGroup>
          </FormControl>

          <TextField
            id="milestone"
            label="마일스톤"
            className={classes.textField}
            margin="normal"
          />
        </div>
      )
    })
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
      case 'milestone':
        this.setState({milestone: content})
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
      alert('마일스톤을 추가히려면 로그인 해주세요');
      this.props.history.push('/login');
    }
  }

  handleDelete(type) {
    const { isAuthenticated } = this.props;
    const { id, milestones } = this.state;

    if(isAuthenticated && type === 'milestone') {
      if(milestones.length !== 0) {
        const copiedMilestones = [...milestones];
        copiedMilestones.pop();
        this.setState({milestones: copiedMilestones})
      }
    } else if (isAuthenticated && type === 'project') {
      fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({id})
      }).then(res => res.json())
        .then(json => {
          alert(json.message);
          this.props.history.push('/');
        })
        .catch(err => console.log(err))
    } else {
      alert('삭제하려면 로그인 해주세요');
      this.props.history.push('/login');
    }
  }

  handleSave() {
    const { isAuthenticated } = this.props;
    const { id, title, progress, dueDate, milestone, description } = this.state;

    if(isAuthenticated) {
      fetch('/api/update', {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          "Accept": "applitcation/json"
        },
        body: JSON.stringify({id, title, progress, dueDate, milestone, description})
      }).then(res => res.json())
        .then(json => {
          alert(json.message);
          this.props.history.push('/');
        })
        .catch(err => console.log(err));
    } else {
      alert('프로젝트를 저장하려면 로그인 해주세요')
      this.props.history.push('/login');
    }
  }

  render() {
    console.log('rendered')
    const { classes } = this.props;
    const { completed, buffer, title, dueDate, progress, milestone, description } = this.state;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <form className={classes.container} noValidate autoComplete="off" style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{flex: 1}}>
              <TextField
                id="title"
                label="프로젝트"
                className={classes.textField}
                onChange={(event) => this.handleChange(event.target.value, 'title')}
                value={title}
                margin="normal"
                style={{flex: 1}}
              />
              <TextField
                id="progress"
                label="진행율"
                onChange={(event) => this.handleChange(event.target.value, 'progress')}
                value={progress}
                className={classes.textField}
                margin="normal"
                style={{flex: 1}}
              />
              <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} style={{width: 100}}/>
              <TextField
                id="date"
                label="목표일"
                onChange={(event) => this.handleChange(event.target.value, 'dueDate')}
                value={dueDate}
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className='milestones'>
            {
              this.renderMilestone()
            }   
            </div>

            <div style={{flex: 1}}>
              <TextField
                id="multiline-flexible"
                label="세부내용"
                onChange={(event) => this.handleChange(event.target.value, 'description')}
                value={description}
                multiline
                fullWidth
                rowsMax="20"
                className={classes.textField}
                style={{width: '98%'}}
                margin="normal"
              />
            </div>
            <div>
              <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleAdd()}>
                <AddIcon className={classes.leftIcon} />
                마일스톤 추가
              </Button>
              <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleRemove('milestone')}>
                <DeleteIcon className={classes.leftIcon} />
                마일스톤 삭제
              </Button>
              <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleDelete('project')}>
                <DeleteIcon className={classes.leftIcon} />
                프로젝트 삭제
              </Button>
              <Button variant="contained" size="small" className={classes.button} onClick={() => this.handleSave()}>
                <SaveIcon className={classes.leftIcon} />
                프로젝트 저장
              </Button>
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
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {setAuthenticated})(withStyles(styles)(ProjectDetail));