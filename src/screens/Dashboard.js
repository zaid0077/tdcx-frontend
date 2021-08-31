import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
 IconButton, Card, CardContent, Typography, Grid, Modal,
    TextField
} from '@material-ui/core';
import Header from "../components/Header";
import PieChart from "../components/PieChart";
import TaskList from "../components/TaskList";
import Lists from "../components/Lists";
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
        height: '100%',
    },
    cardRoot: {
        minWidth: 200,
        minHeight: 250,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    gridContainer: {
        marginTop: "50px",
        paddingLeft: "15%",
        paddingRight: "15%"
    },
    chartContainer: {
        width: 170,
        height: 170,
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


const Dashboard = () => {

    const [tasks, setTasks] = useState([])
    const [count, setCount] = useState()
    const [recentTasks, setRecentTasks] = useState([])
    const [chartData, setChartData] = useState({})
    const [totalTasks, setTotalTasks] = useState([])
    const [totalCompletes, setTotalCompletes] = useState([])
    const [loadComplete, setLoadComplete] = useState(false)
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    useEffect(() => {
        getTasks()
        getCount()
    }, [])

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
            console.log(res.data.count)
            chartLabel = Object.keys(res.data.count)
            chartData = Object.values(res.data.count)

            console.log(chartData)

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


    const modalBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">+New Task</h2>
        </div>
    );

    return (
        <div className={classes.root}>
            <Header />
            {
                loadComplete &&
                <Grid container spacing={4} className={classes.gridContainer} justifyContent="center">
                    <Grid item xs={12} sm={6} lg={4} md={4}>
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Tasks Completed
                                </Typography>
                                <p> <span style={{ color: '#3f51b5', fontSize: '70px', fontWeight: 'bold' }}> {count.total} </span>
                                    <span style={{ color: 'grey', fontSize: '30px' }}>/ {count.complete}</span> </p>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Latest Created Tasks
                                </Typography>
                                <div className={classes.title}>
                                    {
                                        recentTasks.map((value) => {
                                            return (
                                                <ul key={value._id}>
                                                    <li className={value.completed == true ? classes.completedText : ''}>{value.name}</li>
                                                </ul>
                                            )
                                        })
                                    }
                                </div>
                                <Typography variant="h5" component="h2">

                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <div className={classes.chartContainer}>
                                    <PieChart className={classes.chart} data={chartData} />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }
            <div>
                <h2 style={{paddingLeft: '15%', marginTop: '50px'}}>Tasks</h2>
            </div>
            <Grid container className={classes.gridContainer}>
                <Grid item xs={12} sm={12} lg={12} md={12}>
                   <Lists/>
                </Grid>
            </Grid>

        </div>
    )
}

export default Dashboard
