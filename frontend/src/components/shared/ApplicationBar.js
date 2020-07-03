import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import history from "../../history";
import Cookies from 'js-cookie'
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from '@material-ui/icons/AccountCircle';
import {inject,observer} from "mobx-react";
import {logout} from "../../Api/AuthApi";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontStyle:"oblique",
        "&:hover": {
            cursor: "pointer"
        }
    },
}));

function ApplicationBar(props) {
    const classes = useStyles();
    const logouthandle = ()=>{
        Cookies.remove('user')
        props.mainStore.setLogged(false)
        logout()
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Container>
                        <Row>
                            {/*
                                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                                </IconButton>
                            */}

                            <Col sm={{span: 6, offset: 3}} className='d-flex align-items-center'>
                                <Typography onClick={()=>history.push('/')} variant="h6" className={classes.title}>
                                    Parking  Heaven
                                </Typography>
                            </Col>
                            <Col>
                                {
                                    props.mainStore.getLogStatus?
                                        (<div>
                                            <IconButton
                                                edge="end"
                                                aria-label="account of current user"
                                                aria-haspopup="true"
                                                onClick={() => history.push('/user')}
                                                color="inherit"
                                            >
                                                <AccountCircle/>
                                            </IconButton>
                                            <Button onClick={() => logouthandle()} color="inherit">Logout</Button>
                                        </div>):
                                        (<Button onClick={() => history.push('/login')} color="inherit">Login</Button>)
                                }
                            </Col>
                        </Row>
                    </Container>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default inject(stores => ({
    mainStore: stores.mainStore
}))(observer(ApplicationBar))