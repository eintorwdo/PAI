import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {getParkingById} from "../../Api/ParkingApi";
import history from "../../history";
import {  withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Cookies from 'js-cookie'
import {getCarByUserId} from "../../Api/CarApi";
import {getPlans} from "../../Api/PlanApi";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {addSubscriptionToUser} from "../../Api/SubscriptionApi";

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);
export default class Parkings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parking: [],
            spaces:[],
            user:{},
            userCars:[],
            plans:[],
            selectedCar:[],
            selectedPlan:[]
        }
        this.addsubscriptionHandle = this.addsubscriptionHandle.bind(this)
    }
    async componentDidMount() {
        console.log(this.props.match.params.id)
        this.setState({user:Cookies.getJSON('user')})
        let data = await getParkingById(this.props.match.params.id).then(request => {
            if (request.status > 300)
                return null
            return request.json()
        })
        let data2 = await getCarByUserId(this.state.user.id).then(request=>{
            if(request.status < 300)
                return request.json()
            return null
        })
        let data3 = await getPlans().then(request=>{
            if(request.status < 300)
                return request.json()
            return null
        })
        if (data !== null && data2 !== null && data3 !== null) {
            console.log(data2, data3)
            this.setState({parking: data.parkingLot})
            this.setState({spaces:data.parkingLot.parkingSpaces})
            this.setState({userCars:data2.cars})
            this.setState({plans:data3.plans})
        }

    }
    async addsubscriptionHandle(e){
        e.preventDefault()
        let obj = {
            lotID:this.props.match.params.id,
            carID: this.state.selectedCar,
            planID:this.state.selectedPlan
        }
        let data = await addSubscriptionToUser(obj).then(request=>{
            if(request.status===400){
                alert("You have already purchased a subscription for this parking lot and car")
                return null
            }
            if(request.status === 200)
                return request.json()
            else if(request.status === 500){
                alert("There was a conflict, and the transaction cannot finish")
                return null
            }
            else{
                alert("server error")
                return null
            }
        })
        if (data !== null){
            history.push("/user")
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
                    <form onSubmit={(e)=>this.addsubscriptionHandle(e)}>
                        <InputLabel id="demo-customized-select-label">Select Car</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            style={{width:"15rem"}}
                        value={this.state.selectedCar}
                        onChange={(e)=>this.setState({selectedCar:e.target.value})}
                        input={<BootstrapInput />}
                        MenuProps={MenuProps}
                            required
                        >
                            {this.state.userCars.map(car=>(
                                <MenuItem key={car._id} value={car._id} style={{}}>
                                    {[car.make,car.model].join(" ")}
                                </MenuItem>
                            ))}
                        </Select>

                        <InputLabel style={{marginTop:"1.3rem"}} id="demo-customized-select-label">Select plan</InputLabel>
                        <Select
                            labelId="demo-customized-select-label"
                            style={{width:"15rem"}}
                            value={this.state.selectedPlan}
                            onChange={(e)=>this.setState({selectedPlan:e.target.value})}
                            input={<BootstrapInput />}
                            MenuProps={MenuProps}
                        >
                            {this.state.plans.map(plan=>(
                                <MenuItem required key={plan._id} value={plan._id} style={{}}>
                                    {["Duration: "+plan.duration+" days, ","Price: "+plan.cost+" zl"].join(" ")}
                                </MenuItem>
                            ))}
                        </Select>
                        <br/>
                        <Button color='primary' type='submit' variant='contained' style={{marginTop:"1.4rem"}}>Add subscription</Button>
                    </form>
                </Container>
            </Container>)
    }
}