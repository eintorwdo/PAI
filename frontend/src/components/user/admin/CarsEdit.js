import React,{Component} from "react";
import Container from "@material-ui/core/Container";
import {getCars} from "../../../Api/CarApi";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
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



export default class CarsEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            cars:[]
        }
    }
    async componentDidMount(){
        let data = await getCars().then(request=>{
            if(request.status < 300)
                return request.json()
            return null
        })
        if (data !== null){
            this.setState({cars:data.cars})
        }
    }
    render() {
        return(
            <Container>
                <Grid container>
                        {this.state.cars.map(car=>{
                            return(
                                <Grid xs>
                                    <Paper style={useStyles.paper} key={car._id}>
                                        <Typography>Add date : {car.addDate}</Typography>
                                        <Typography>Make : {car.make}</Typography>
                                        <Typography>Model : {car.model}</Typography>
                                        <Typography>Register number : <br/>{car.regNumber}</Typography>
                                        <ButtonGroup style={useStyles.buttongroup}>
                                            <Button >Edytuj</Button>
                                            <Button >Usuń</Button>
                                        </ButtonGroup>
                                    </Paper>
                                </Grid>
                            )
                        })}

                </Grid>
            </Container>
        )

    }
}