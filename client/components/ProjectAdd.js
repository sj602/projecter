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

class ProjectAdd extends Component {
  constructor() {
    super();
    
    this.state = {
      completed: 30,
      buffer: 10,
      numberOfMilestone: ['milestone'],
      title: '',
      progress: '',
      dueDate: '2017-04-23',
      description: '',
    };
  }

  renderMilestone() {
    const { classes } = this.props;
    const { numberOfMilestone } = this.state;
    console.log(numberOfMilestone)
    numberOfMilestone.map((n, index) => {
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
    }
    console.log(this.state)
  }

  handleAdd() {
    const { isAuthenticated } = this.props;

    if(isAuthenticated) {
      const { numberOfMilestone } = this.state;
      let copiedArr = [...numberOfMilestone];
      copiedArr.push('milestone');
      this.setState({numberOfMilestone: copiedArr})
  
      // this.setState({numberOfMilestone: this.state.numberOfMilestone + 1})  
    } else {
      return alert('마일스톤을 추가히려면 로그인 해주세요')
    }
  }

  handleSave() {
    const { isAuthenticated } = this.props;
    const { title, dueDate, description } = this.state;
    console.log('title', title, 'dueDate', dueDate, 'description', description)
    if(isAuthenticated) {
      fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title, dueDate, description
        })
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
      return alert('프로젝트를 저장하려면 로그인 해주세요')
    }
  }

  handleDelete(type) {
    const { isAuthenticated } = this.props;

    if(isAuthenticated && type === 'milestone') {
      if(this.state.numberOfMilestone !== 1) this.setState({numberOfMilestone: this.state.numberOfMilestone - 1})
    } else {
      return alert('삭제하려면 로그인 해주세요')
    }
  }

  render() {
    // console.log(this.state.numberOfMilestone)
    const { classes } = this.props;
    const { completed, buffer } = this.state;

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <form className={classes.container} noValidate autoComplete="off" style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{flex: 1}}>
              <TextField
                id="title"
                label="프로젝트"
                className={classes.textField}
                value={this.state.title}
                onChange={(event) => this.handleChange(event.target.value, 'title')}
                margin="normal"
                style={{flex: 1}}
              />
              <TextField
                id="progress"
                label="진행율"
                value={this.state.progress}
                onChange={(event) => this.handleChange(event.target.value, 'progress')}
                className={classes.textField}
                margin="normal"
                style={{flex: 1}}
              />
              <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} style={{width: 100}}/>
              <TextField
                id="date"
                label="목표일"
                value={this.state.dueDate}
                type="date"
                onChange={(event) => this.handleChange(event.target.value, 'dueDate')}
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
                value={this.state.description}
                onChange={(event) => this.handleChange(event.target.value, 'description')}
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
              <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleDelete('milestone')}>
                <DeleteIcon className={classes.leftIcon} />
                마일스톤 삭제
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

export default connect(mapStateToProps, {setAuthenticated})(withStyles(styles)(ProjectAdd));
