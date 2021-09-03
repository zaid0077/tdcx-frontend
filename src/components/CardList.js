import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import PieChart from "../components/PieChart";

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


const CardList = ({ count, recentTasks, chartData }) => {
    const classes = useStyles();
    return (
        <div>
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
        </div>
    )
}

export default CardList