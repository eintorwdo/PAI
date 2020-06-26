import React, {useEffect, useState, Component} from "react";
import Container from "@material-ui/core/Container";
import {getUsers} from "../../../Api/UserApi";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import history from "../../../history";

const useStyles = {
    paper: {
        padding: ".5rem",
        textAlign: 'center',
        margin: "1.2rem"
    },
    buttongroup: {
        marginTop: ".5rem"
    }

};

export default class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        let data = await getUsers().then(request=>{
            if(request.status > 300)
                return null
            return request.json()
        })
        if(data !== null){
            this.setState({users:data.users})
        }
    }

    render() {
        return(
        <Container>
            User edit
            <Grid container spacing={3}>
                {this.state.users.map(user => {
                    return (
                        <Grid xs>
                            <Paper style={useStyles.paper} key={user._id}>
                                <Typography>Email : {user.email}</Typography>
                                <Typography>Role : {user.role}</Typography>
                                <ButtonGroup style={useStyles.buttongroup}>
                                    <Button onClick={() => history.push(`/edituser/${user._id}`)}>Edytuj</Button>
                                    <Button>Usuń</Button>
                                </ButtonGroup>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>)
    }
}