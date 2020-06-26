import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import {getPlans} from "../../../Api/PlanApi";
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
export default class SubscriptionEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plans:[]
        }
    }
    async componentDidMount(){
        let data = await getPlans().then(request=>{
            if(request.status < 300)
                return request.json()
            return null
        })
        console.log(data)
        if (data !== null){
            this.setState({plans:data.plans})
        }
    }
    render() {
        return (
            <Container>
                <Grid container>
                    {this.state.plans.map(plan=>{
                        return(
                            <Grid xs>
                                <Paper style={useStyles.paper} key={plan._id}>
                                    <Typography>Duration : {plan.duration}</Typography>
                                    <Typography>Cost : {plan.cost}</Typography>
                                    <ButtonGroup style={useStyles.buttongroup}>
                                        <Button >Edytuj</Button>
                                        <Button >Usuń</Button>
                                    </ButtonGroup>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
                <Button color='primary' onClick={()=>history.push('/createplan')}>Create plan</Button>
            </Container>
        )
    }


}