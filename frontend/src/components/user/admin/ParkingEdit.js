import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import history from "../../../history";
export default function ParkingEdit(props){
    return (
        <Container>
            Something
                <br/>
            <Button variant='contained' onClick={()=>history.push('/createparking')}>Add parking</Button>
        </Container>
    )
}