import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RestResource from '../services/DataService';
const service = new RestResource();


const DialogComp = (props) => {
    const[newTask, setNewTask] = useState('')

    const updateTask = (data) => {
        service.updateTask(data).then(res =>{
            setNewTask('')
        })
    }
    
    return (
        <Dialog open={props.show} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
            <DialogContent>
                <p>{newTask}</p>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Task Name"
                    fullWidth
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => updateTask({ name: newTask, _id: props.data._id })}color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogComp