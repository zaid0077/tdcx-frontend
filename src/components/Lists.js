import React, { useState, useEffect } from 'react';
import {
  Button, Grid, TextField, List, ListItem,
  ListItemIcon, ListItemSecondaryAction,
  ListItemText, Checkbox, IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DialogComp from './DialogComp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RestResource from '../services/DataService';
const service = new RestResource();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  cardRoot: {
    width: '100%',
    minHeight: 100,
    borderRadius: 10,
    marginTop: 10
  },
  completedText: {
    textDecoration: 'line-through'
  },

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));

const deleteTask = (taskId) => {
  service.deleteTask(taskId).then(res => {
    alert(res.data.message)
  })
}


const Lists = (props) => {

  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [tasks, setTasks] = useState([])
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [addTask, setAddTask] = useState("")
  const [search, setSearch] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [toEdit, setToEdit] = useState({})

  useEffect(() => {
    getTasks()
  }, [])


  const getTasks = () => {
    service.getTasks().then(res => {
      setTasks(res.data.tasks)
    })
  }

  const saveTask = () => {
    let data = {
      name: addTask
    }
    service.addTask(data).then(res => {
      alert('Success')
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">+ New Task</h2>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            style={{ marginBottom: '10px', width: '90%' }}
            onChange={(e) => setAddTask(e.target.value)}
            value={addTask}
            label="Task Name"
            variant="outlined" />
        </Grid>
        <Grid item xs={12}>

          <Button style={{ width: '90%' }} variant="contained" color="primary">
            Add Task
          </Button>
        </Grid>
      </Grid>

    </div>
  );


  const edit = (value) => {
    setShowDialog(true)
    setToEdit(value)
  }

  const test = () => {
    alert(1234)
  }

  const handleToggle = (value) => () => {
    let toUpdate = value.completed == true ? false : true
    service.changeTaskStatus({ id: value._id, toUpdate }).then(res => {
      setTasks(res.data.updatedTasks)
    })

  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          style={{ marginBottom: '10px', borderRadius: '20px' }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          label="Search by Task Name"
          variant="outlined" />

        <Button onClick={handleOpen}
          style={{ height: '55px', borderRadius: '10px', marginLeft: '20px' }}
          variant="contained"
          color="primary">
          + New Task
        </Button>

      </div>
      <List className={classes.root}>
        {tasks.filter((value) => {
          if (search == "") {
            return value
          } else if (value.name.toLowerCase().includes(search.toLowerCase())) {
            return value
          }
        }).map((value, index) => {

          return (
            <ListItem divider key={value._id} role={undefined} dense button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.completed}
                  onChange={handleToggle}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText className={value.completed == true ? classes.completedText : ''} primary={value.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <DeleteIcon onClick={() => deleteTask(value._id)} />
                </IconButton>
                <IconButton edge="end">
                  <EditIcon onClick={() => edit(value) } />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <DialogComp edit={() => test()} onClose={() => setShowDialog(false)} data={toEdit} show={showDialog}></DialogComp>
      
      </div>
    </div>
  );

}


export default Lists