import React,{Component} from "react";
import {getPlans} from "../../Api/PlanApi";
import Container from "@material-ui/core/Container";
export default class Plans extends Component{
    constructor(props) {
        super(props);
        this.state = {
            plans: []
        }
    }
    async componentDidMount() {
        let data = await getPlans().then(request=>{
            if(request.status < 300)
                return request.json()
            return null
        })
        if (data !== null){
            this.setState({plans:data})
        }
    }
    render() {
        return (
            <Container>
                {JSON.stringify(this.state.plans)}
            </Container>
        )
    }
}