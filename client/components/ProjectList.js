import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

let projectList = [
  {
    name: '왈피',
    progress: 90,
    dueDate: 2019,
    milestone: 123
  },
  {
    name: '20힐즈',
    progress: 15,
    dueDate: 2018,
    milestone: 123
  },
  {
    name: '우주정복',
    progress: 14,
    dueDate: 2023,
    milestone: 123
  },
];

class ProjectList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
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
              projectList && projectList.map((project, index) => {
                return (
                  <Fragment key={index}>
                    <ListItem button component={props => <Link to="/detail" {...props} />} style={{display: 'flex', flexDirection: 'row'}}>
                      <ListItemText primary={project.name} style={{flex: 1}}/>
                      <ListItemText primary={project.progress} style={{flex: 1}}/>
                      <ListItemText primary={project.dueDate} style={{flex: 1}}/>
                      <ListItemText primary={project.milestone} style={{flex: 4}}/>
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
});

export default withStyles(styles)(ProjectList);