import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

class ProjectList extends Component {
  constructor() {
    super();

    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    fetch('/api/getAll', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
      .then(json => this.setState({projects: json['projects']}))
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props;
    const { projects } = this.state;

    return (
      <div className="ProjectList">
        <Paper className={classes.root} elevation={1}>
          <List component="nav">
            <ListItem style={{display: 'flex', flexDirection: 'row'}}>
              <ListItemText disableTypography
                primary={<Typography type="body2" style={{ color: 'grey' }}>프로젝트</Typography>}
                style={{flex: 1}}
              />
              <ListItemText disableTypography
                primary={<Typography type="body2" style={{ color: 'grey' }}>진행율</Typography>}
                style={{flex: 1}}
              />
              <ListItemText disableTypography
                primary={<Typography type="body2" style={{ color: 'grey' }}>목표일</Typography>}
                style={{flex: 1}}
              />
              <ListItemText disableTypography
                primary={<Typography type="body2" style={{ color: 'grey' }}>마일스톤</Typography>}
                style={{flex: 4}}
              />
            </ListItem>
            <Divider />

            {
              projects && projects.map((project, index) => {
                const { _id, title, progress, dueDate, milestones, description } = project;

                return (
                  <Fragment key={index}>
                    <ListItem button component={props => <Link to={{pathname: "/detail", state: {_id, title, progress, dueDate, milestones, description} }} style={{display: 'flex', flexDirection: 'row'}} {...props} /> }>
                      <ListItemText primary={title} style={{flex: 1}} />
                      <ListItemText primary={progress} style={{flex: 1}} />
                      <ListItemText primary={dueDate} style={{flex: 1}} />
                      <ListItemText primary={(
                        <div>
                          {
                            milestones && milestones.map(milestone => {
                             if(milestone['checked']) {
                               return (
                                <Tooltip id="tooltip-fab" title="완료!">
                                  <Chip label={milestone['milestone']} className={classes.chip_completed} />
                                </Tooltip>
                               )
                             } else {
                               return (
                                <Tooltip id="tooltip-fab" title="미완료..">
                                  <Chip label={milestone['milestone']} className={classes.chip} />
                                </Tooltip>
                               )
                             }
                            })
                          }
                        </div>
                      )} style={{flex: 4}} />
                    </ListItem>
                    <Divider />  
                  </Fragment>  
                )
              })
            }

          </List>
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
  table: {
    minWidth: 700,
  },
  chip: {
    marginRight: theme.spacing.unit,
    backgroundColor: '#eff0f2'
  },
  chip_completed: {
    marginRight: theme.spacing.unit,
    backgroundColor: 'grey'
  },
});

export default withStyles(styles)(ProjectList);