import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from "../../history";
import {login} from "../../Api/AuthApi";
import Cookies from 'js-cookie'
import {inject, observer} from "mobx-react";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    register:{
        backgroundColor:"lightblue"
    }
}));

function Login(props) {
    const classes = useStyles();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const loginhandle = async(e)=>{
        e.preventDefault()
        let obj = {email:email,password:password}
        let data = await login(obj).then(data=>{
            if (data.status > 400) {
                alert("Brak uzytkownika")
                return null
            }
            return data.json()
        })
        if (data !== null) {
            props.mainStore.setLogged(true)
            Cookies.set("user",data.user)
            history.push('/')
        }


    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} onSubmit={(e)=>loginhandle(e)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Typography style={{marginBottom:".5rem",fontSize:"1rem"}} >
                        {"Don't have an account?"}
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        className={classes.register}
                        onClick={()=>history.push('/register')}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
}
export default inject(stores => ({
    mainStore: stores.mainStore
}))(observer(Login))