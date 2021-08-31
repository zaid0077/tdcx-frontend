import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Grid, makeStyles, } from '@material-ui/core';
import Button from '../components/Button'
import RestResource from '../services/AuthService';
const service = new RestResource();


const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)
        },
        '& .MuiButtonBase-root': {
            width: '90%',
            margin: theme.spacing(1),
            borderRadius: 10
        }
    }
}))

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const classes = useStyle();

    const login = (e) => {
        e.preventDefault();
        let data = {
            email: email,
            password: password
        }

        service.login(data).then(res => {
            console.log(res)
        })
    }

    return (
        <div className="main-container">
            <div className="container">
                <h1 className="header-text">Login</h1>
                <form className={classes.root}>
                    <Grid container>
                        <Grid item xs={12}>

                            <TextField 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            label="Email" 
                            variant="outlined" />

                            <TextField 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            label="Password" 
                            variant="outlined" />

                            <Button 
                            size="large"
                            onClick={login}
                            text="submit"
                            ></Button>

                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}