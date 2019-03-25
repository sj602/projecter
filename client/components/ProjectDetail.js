import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { 
  setAuthenticated, getUsers,
} from '../actions';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper';;
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
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    let { milestones, title, progress, dueDate, milestone, description, participants } = this.props.location.state;

    this.state = {
      id: this.props.location.state._id,
      title,
      progress,
      dueDate,
      milestones,
      milestone,
      description,
      participants,
      value: '',
      suggestions: []
    };
  };

  componentDidMount() {
    this.props.getUsers();
  };

  /////////////// auto-suggest///////////////////
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let { users } = this.props;

    users = inputLength == 0 ? [] : users.filter(user =>
      user.name.toLowerCase().slice(0, inputLength) == inputValue
    );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    const { participants } = this.state;

    if(method == 'enter' || 'click') {
      let copyParticipants = JSON.parse(JSON.stringify(participants));

      copyParticipants.push(suggestionValue);
      this.setState((prev) => ({
        participants: copyParticipants,
        value: ''
      }));
    }
  }

  onParticipantDelete = (name) => {
    let { participants } = this.state;
    participants = participants.filter((p) => {
      return p != name;
    });

    this.setState({participants});
  }

  getSuggestionValue = suggestion => suggestion.name;
  
  renderInputComponent = (inputProps) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  
    return (
      <TextField
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        className={classes.textParticipantsField}
        {...other}
      />
    );
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
          )}
        </div>
      </MenuItem>
    );
  }

  renderParticipant() {
    const { classes } = this.props;
    const { participants } = this.state;

    participants.map((p) => {
      return (
        <Chip
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          label={p}
          onDelete={() => onParticipantDelete(p)}
          className={classes.chip}
        />
      )
    });
  }
  //////////////////////////////////////////

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

  handleChange(content, type, index) {
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
        this.setState({value: typeof(content) !== 'undefined' ? content : ''});
        break; 
      case 'milestone':
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
    const { id, title, progress, dueDate, milestones, description, participants } = this.state;

    if(isAuthenticated) {
      fetch('/api/update', {
        method: 'PUT',
        headers: {
          "Content-type": "application/json",
          "Accept": "applitcation/json"
        },
        body: JSON.stringify({id, title, progress, dueDate, milestones, description, participants})
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
    const { classes, users } = this.props;
    const { title, dueDate, progress, description, participants, suggestions, value } = this.state;

    return (
      <div className="ProjectDetail">
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
              />
              <TextField
                id="progress"
                label="진행율"
                onChange={(event) => this.handleChange(event.target.value, 'progress')}
                value={progress}
                className={classes.textField}
                margin="normal"
              />
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
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Autosuggest
                    renderInputComponent={this.renderInputComponent}
                    inputProps={{
                      classes,
                      label: '참여자',
                      placeholder: '참여자 검색',
                      value,
                      onChange: (event) => this.handleChange(event.target.value, 'participants'),
                      inputRef: node => {
                        this.popperNode = node;
                      },
                      InputLabelProps: {
                        shrink: true
                      }
                    }}
                    suggestions={users}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    renderSuggestionsContainer={options => (
                      <Popper anchorEl={this.popperNode} open={Boolean(options.children)} placement='right'>
                        <Paper
                          square
                          {...options.containerProps}
                          style={{width: 200}}
                        >
                          {options.children}
                        </Paper>
                      </Popper>
                    )}
                    theme={{
                      suggestionsList: classes.suggestionsList,
                      suggestion: classes.suggestion,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  
                </Grid>
              </Grid>
            </div>
            {
              participants && this.renderParticipant()
            }
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
                <Button variant="contained" color="primary" className={classes.button} onClick={() => this.handleRemove('milestone')}>
                  <DeleteIcon className={classes.leftIcon} />
                  마일스톤 삭제
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.handleDelete('project')}>
                  <DeleteIcon className={classes.leftIcon} />
                  프로젝트 삭제
                </Button>
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
  textParticipantsField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 635,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
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
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, {
  setAuthenticated,
  getUsers
})(withStyles(styles)(ProjectDetail));