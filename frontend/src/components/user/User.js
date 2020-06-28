import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import history from "../../history";
import PersonIcon from '@material-ui/icons/Person';
import UserTabPanel from "./UserTabPanel";
import Cookies from 'js-cookie'
import Typography from "@material-ui/core/Typography";

export default function User(props) {
    const [user] = useState(Cookies.getJSON('user'))
    return (
        <Container>
            <Container>
                <PersonIcon style={{fontSize: "10rem"}}/>
            </Container>
            <Container>
                <UserTabPanel userId={user.id}/>
            </Container>
            <ButtonGroup style={{marginTop: "3rem"}} size="large" color="primary"
                         aria-label="large outlined primary button group">
                <Button onClick={() => history.push('/addcar')}>Add car</Button>
            </ButtonGroup>
            {(Cookies.getJSON('user').role === "ADMIN") ?
                (
                    <Container style={{marginTop: "1.4rem"}}>
                        <Typography>Admin panel</Typography>
                        <Button style={{margin: ".5rem"}} color='primary' variant='contained'
                                onClick={() => history.push("/editparking")}>Edit parking's</Button>
                        <Button style={{margin: ".5rem"}} color='primary' variant='contained'
                                onClick={() => history.push("/editsubscription")}>Edit subscription's</Button>
                        <Button style={{margin: ".5rem"}} color='primary' variant='contained'
                                onClick={() => history.push("/editusers")}>User's edit</Button>

                    </Container>
                ) : (<div/>)
            }
        </Container>
    )
}