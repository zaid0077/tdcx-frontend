import React from 'react';
import { Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment'


const useStyles = makeStyles((theme) => ({
    cardRoot: {
        width: '100%',
        minHeight: 100,
        borderRadius: 10,
        marginTop: 10
    },
    gridContainer: {
        marginTop: "50px",
        paddingLeft: "15%",
        paddingRight: "15%"

    },
}));

const TaskList = (props) => {
    const classes = useStyles();
    return (
        <div>
            {
                props.data.map((tasks, index) => {
                    return (
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <p>{tasks.name}</p>
                                <p>{tasks._id}</p>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>


    )
}


export default TaskList