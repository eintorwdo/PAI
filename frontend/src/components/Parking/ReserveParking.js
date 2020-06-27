import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {getParkingById} from "../../Api/ParkingApi";
import history from "../../history";

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

export default class Parkings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parking: [],
            spaces:[]
        }
    }

    async componentDidMount() {
        console.log(this.props.match.params.id)
        let data = await getParkingById(this.props.match.params.id).then(request => {
            if (request.status > 300)
                return null
            return request.json()
        })
        console.log(data)
        if (data !== null) {
            this.setState({parking: data.parkingLot})
            this.setState({spaces:data.parkingLot.parkingSpaces})
        }

    }

    render() {
        return (
            <Container>
                <Grid container spacing={3}>
                    <Grid item key={this.state.parking._id} xs>
                        <Paper style={useStyles.paper}>
                            <Typography>City : {this.state.parking.city}</Typography>
                            <Typography>Address : {this.state.parking.address}</Typography>
                            <Typography>Number of spaces: {this.state.parking.numberOfSpaces}</Typography>
                            <Typography>Number of free spaces : {this.state.parking.freeSpaces}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Container>

                </Container>
            </Container>)
    }
}