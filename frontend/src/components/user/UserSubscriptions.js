import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import {getSubscriptionByUserID} from "../../Api/SubscriptionApi";
import Typography from "@material-ui/core/Typography";
import {getCarByUserId} from "../../Api/CarApi";
import {getParkingById} from "../../Api/ParkingApi";

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
export default class UserSubscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscriptions: []
        }
    }

    async componentDidMount() {
        let dane = await getSubscriptionByUserID(this.props.userId).then(request => {
            if (request.status < 300)
                return request.json()
            return null
        })
        if(dane!== null) {
            let gg = dane.subscriptions
            for (let i in gg) {
                let data = await getCarByUserId(gg[i].userID).then(request => {
                    if (request.status < 300)
                        return request.json()
                    return null
                })
                if (data !== null) {
                    gg[i].cars = data.cars.filter(car => car._id === gg[i].carID)[0]
                }
                let data2 = await getParkingById(gg[i].lotID).then(request=>{
                    if(request.status < 300)
                        return request.json()
                    return null
                })
                if (data2!==null){
                    gg[i].parking = data2.parkingLot
                }
            }
            this.setState({subscriptions: gg})
        }
    }

    render() {
        return (
            <Container>
                <Container style={classes.root} >
                    {this.state.subscriptions.map(sub=>{
                        return(
                            <Container key={sub._id} style={classes.car}>
                                <Typography>Cost {sub.cost}</Typography>
                                <Typography>Start date : {sub.startDate.split("T")[0]}</Typography>
                                <Typography>End date : {sub.endDate.split("T")[0]}</Typography>
                                <Typography>Car : {sub.cars.make +" "+sub.cars.model}</Typography>
                                <Typography>Parking : {sub.parking.city +" "+sub.parking.address}</Typography>
                            </Container>
                        )
                    })}
                </Container>

            </Container>
        )
    }
}