import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from "../../history";
import {Alert} from '@material-ui/lab';
import {register,login} from "../../Api/AuthApi";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUp(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alertOpen, setAlertOpen] = useState(0)
    const singuphandle = async (e) => {
        e.preventDefault()
        if (password.length < 6) {
            setAlertOpen(true)
            setTimeout(()=>setAlertOpen(false),2000)
            return
        }
        const obj = {email:email,password:password}
        let data = await register(obj).then(request=>{
            if(request.status ===400){
                alert("Email zajety")
                return
            }
            else if (request.status === 200){
                return request.json()
            }
            return null
        })
        if (data!== null){
            let data2 = await login(obj).then(data=>{
                if (data.status > 400) {
                    alert("Brak uzytkownika")
                    return null
                }
                return data.json()
            })
            if (data2 !== null) {
                props.mainStore.setLogged(true)
                Cookies.set("user",data2.user)
                history.push('/')
            }
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                {
                    (alertOpen)?(
                    <Alert style={{position: "absolute",top:"1.3rem", margin: "1.1rem"}} severity="error">
                        Password is too short,required is more than 6 characters
                    </Alert>
                    ):(<div/>)
                }
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => singuphandle(e)}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link onClick={() => history.push('/login')} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default inject(stores => ({
    mainStore: stores.mainStore
}))(observer(SignUp))