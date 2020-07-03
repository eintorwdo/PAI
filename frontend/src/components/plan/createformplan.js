import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {createPlan} from "../../Api/PlanApi";
import history from "../../history";

export default function CreatePlanForm(props){
    const [duration,setDuration] = useState(1)
    const [cost,setCost] = useState(1)
    const createPlanhandle = async(e)=>{
        e.preventDefault()
        let obj = {duration:duration,cost:cost}
        let dane = createPlan(obj).then(request=>{
            if(request.status < 300)
                return request.json()
            return null
        })
        if (dane === null){
            alert("Error in data, duretion must be more than 1 or problem with server")
            return
        }
        history.push('/user')

    }
    return (
        <Container>
            <form onSubmit={(e) => createPlanhandle(e)}>
                <TextField
                    id="standard-number"
                    label="Plan duration in days"
                    type="number"
                    value={duration}
                    onChange={(e)=>setDuration(parseInt(e.target.value))}
                    style={{marginTop:"1rem"}}
                />
                <br/>
                <TextField
                    id="standard-number"
                    label="Plan cost"
                    type="number"
                    value={cost}
                    onChange={(e)=>setCost(e.target.value)}
                    style={{marginTop:"1rem"}}
                />
                <br/>
                <Button type='submit'
                        style={{marginTop:"1.2rem"}}
                        variant='contained'
                        color='primary'>Add new Parking</Button>
            </form>
        </Container>
    )
}