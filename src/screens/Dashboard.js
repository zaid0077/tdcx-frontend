import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton, Card, CardContent, Typography, Grid, Modal,
    TextField, Button
} from '@material-ui/core';
import Header from "../components/Header";
import PieChart from "../components/PieChart";
import Lists from "../components/Lists";
import CardList from "../components/CardList";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import RestResource from '../services/DataService';
var Loader = require('react-loader');
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
        height: '100%',
    },
    gridContainer: {
        marginTop: "50px",
        paddingLeft: "15%",
        paddingRight: "15%"
    },
}));


const Dashboard = () => {
    const history = useHistory();
    const [{ dashboardData, user }, dispatch] = useStateValue()

    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState()
    const [recentTasks, setRecentTasks] = useState([])
    const [chartData, setChartData] = useState({})
    const [totalTasks, setTotalTasks] = useState([])
    const [totalCompletes, setTotalCompletes] = useState([])
    const [newTask, setNewTask] = useState('')
    const [loadComplete, setLoadComplete] = useState(false)
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        // getDashboardData() get all data in one API call
        if (localStorage.getItem("token")) {
            getTasks()
            getCount()
            setLoading(true)
        } else {
            history.push('/login')
        }
    }, [])


    const getDashboardData = async () => {
        await service.getDashboardData().then(res => {
            dispatch({
                type: 'DASHBOARD',
                item: {
                    dashboardData: res.data.dashboardData
                }
            })
        })
    }

    const getTasks = () => {
        service.getTasks().then(res => {
            setTasks(res.data.tasks)
            setRecentTasks(res.data.tasks.slice(Math.max(res.data.tasks.length - 3, 0)))
        })
    }

    const getCount = () => {
        let chartLabel = []
        let chartData = []
        service.getCount().then(res => {
            setCount(res.data.count)
            setCount(res.data.count)
            chartLabel = Object.keys(res.data.count)
            chartData = Object.values(res.data.count)

            setChartData({
                labels: chartLabel,
                datasets: [
                    {
                        label: '# of Votes',
                        data: chartData,

                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            })
            setLoadComplete(true)
        })
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addTask = () => {
        service.saveTask({ name: newTask }).then(res => {
            getTasks()
            getCount()
        })
    }


    const modalBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">+New Task</h2>
        </div>
    );

    var options = {
        lines: 13,
        length: 20,
        width: 10,
        radius: 30,
        scale: 1.00,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 0,
        direction: 1,
        speed: 1,
        trail: 60,
        fps: 20,
        zIndex: 2e9,
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    };

    return (
        <div className={classes.root}>
            <Header />
            <div></div>
            <Loader loaded={loading} options={options} className="spinner" />
            {
                (loadComplete && tasks.length > 0) ?
                    <div>
                        <CardList count={count} recentTasks={recentTasks} chartData={chartData} />
                        <div>
                            <h2 style={{ paddingLeft: '15%', marginTop: '50px' }}>Tasks</h2>
                        </div>
                        <Grid container className={classes.gridContainer}>
                            <Grid item xs={12} sm={12} lg={12} md={12}>
                                <Lists />
                            </Grid>
                        </Grid>
                    </div> :

                    <div>
                        <div className="main-container">
                            <div className="container">
                                <h2 className="header-text">+ New Task</h2>
                                <form className={classes.root}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <TextField
                                                onChange={(e) => setNewTask(e.target.value)}
                                                value={newTask}
                                                style={{ width: '90%', marginBottom: '10px' }}
                                                label="Task Name"
                                                variant="outlined" />

                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                onClick={addTask}
                                                style={{ width: '90%', borderRadius: '10' }}
                                                variant="contained"
                                                color="primary">
                                                Add Task
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Dashboard
