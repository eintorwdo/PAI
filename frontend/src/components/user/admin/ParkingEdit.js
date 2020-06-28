import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import {getAllParkings} from "../../../Api/ParkingApi";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

export default class ParkingEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            parkings: []
        }
    }

    async componentDidMount() {
        let data = await getAllParkings().then(request => {
            if (request.status > 300)
                return null
            return request.json()
        })
        if (data !== null) {
            this.setState({parkings: data.parkingLot})
        }
    }
    render() {
        return (
            <Container>
                <Grid container spacing={3}>
                    {this.state.parkings.map(park => {
                        return (
                            <Grid item key={park._id} xs>
                                <Paper style={useStyles.paper}>
                                    <Typography>City : {park.city}</Typography>
                                    <Typography>Address : {park.address}</Typography>
                                    <Typography>Number of spaces: {park.numberOfSpaces}</Typography>
                                    <Typography>Number of free spaces : {park.freeSpaces}</Typography>
                                    
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
                <br/>
                <Button variant='contained' onClick={()=>history.push('/createparking')}>Add parking</Button>
            </Container>
        )
    }


}