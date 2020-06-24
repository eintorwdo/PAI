import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import history from "../../history";
import PersonIcon from '@material-ui/icons/Person';
import UserTabPanel from "./UserTabPanel";
export default function User(props) {
    return (
        <Container>
            <Container>
                    <PersonIcon style={{fontSize:"10rem"}} />
            </Container>
            <Container>
                <UserTabPanel/>
            </Container>
            <ButtonGroup style={{marginTop:"3rem"}} size="large" color="primary" aria-label="large outlined primary button group">
                <Button onClick={()=>history.push('/addcar')}>Add car</Button>
                <Button>Renew subscriptions</Button>
                <Button>OK</Button>
            </ButtonGroup>
        </Container>
    )
}