import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import {getCarByUserId} from "../../Api/CarApi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
const classes = {
    root: {
        display:"flex",
        flexWrap:"wrap"
    },
    car:{
        border: "4px outset rgba(28,110,164,0.63)",
        borderRadius: "15px 10px 15px 10px",
        width: "15rem",
        marginTop:".5rem"
    }
}
export default class UserCars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCars: []
        }
    }

    async componentDidMount() {
        let dane = await getCarByUserId(this.props.userId).then(request => {
            if (request.status < 300)
                return request.json()
            return null
        })
        console.log(dane)
        if(dane!== null)
            this.setState({userCars:dane.cars})
    }

    render() {
        return (
            <Container>
                <List style={classes.root} >
                    {this.state.userCars.map(car=>{
                        return(
                            <Container style={classes.car}>
                                <Typography>Producent {car.make}</Typography>
                                <Typography>Model : {car.model}</Typography>
                                <Typography>Register number<br/>{car.regNumber}</Typography>
                            </Container>
                        )
                    })}
                </List>

            </Container>
        )
    }
}