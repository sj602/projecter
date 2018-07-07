import React, { Component, Fragment } from 'react';
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
  constructor() {
    super();
    
    this.state = {
      completed: 30,
      buffer: 10,
      checked: false,
      numberOfMilestone: ['milestone']
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

  handleChange() {
    this.setState({checked: !this.state.checked})
  }

  handleAdd() {
    const { numberOfMilestone } = this.state;
    let copiedArr = [...numberOfMilestone];
    copiedArr.push('milestone');
    this.setState({numberOfMilestone: copiedArr})

    // this.setState({numberOfMilestone: this.state.numberOfMilestone + 1})
  }

  handleRemove() {
    if(this.state.numberOfMilestone !== 1) this.setState({numberOfMilestone: this.state.numberOfMilestone - 1})
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
                defaultValue="foo"
                onChange={() => console.log(1)}
                margin="normal"
                style={{flex: 1}}
              />
              <TextField
                id="progress"
                label="진행율"
                defaultValue="foo"
                className={classes.textField}
                margin="normal"
                style={{flex: 1}}
              />
              <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} style={{width: 100}}/>
              <TextField
                id="date"
                label="목표일"
                type="date"
                defaultValue="2017-05-24"
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
              <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleRemove()}>
                <DeleteIcon className={classes.leftIcon} />
                마일스톤 삭제
              </Button>
              <Button variant="contained" color="secondary" className={classes.button}>
                <DeleteIcon className={classes.leftIcon} />
                프로젝트 삭제
              </Button>
              <Button variant="contained" size="small" className={classes.button}>
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

export default withStyles(styles)(ProjectDetail);
