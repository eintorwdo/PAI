import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {addCarToDatabase} from "../../Api/CarApi";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
    first: {marginTop: "1.5rem"},
    avatar: {
        display: "flex",
        flexDirection: "column",
        justifyItems: 'center',
        alignItems: "center",
        justifyContent: "center"
    },
    gridform: {
        display: 'flex',
        justifyContent: "center"
    },
    formButton: {
        marginTop: "1.2rem"
    }

}))
export default function AddingCarForm(props) {
    const classes = useStyles()
    const [carMark, setCarMark] = useState("")
    const [carModel, setCarModel] = useState("")
    const [regNumber, setRegNumber] = useState("")

    const carraddinghandle = async (e) => {
        e.preventDefault()
        let obj = {
            make: carMark,
            model: carModel,
            regNumber: regNumber
        }
        let data = await addCarToDatabase(obj).then(request=>{
            if(request.status < 300)
                return request.json()
            else if(request.status === 400){
                alert("Car with such registration number is already in database")
                return {}
            }
             return null
        })
        if (data !== null)
            history.push("/")
        else if(data === null) {
            alert("problem z dodaniem samochodu")
            return
        }
    }
    return (
        <Container className={classes.first}>
            <Container className={classes.avatar}>
                <Typography variant='h5' gutterBottom>Add your new car</Typography>
                <Avatar>
                    <DriveEtaIcon fontSize="large"/>
                </Avatar>
            </Container>
            <form onSubmit={(e) => carraddinghandle(e)}>
                <Grid container spacing={3} className={classes.gridform}>
                    <Grid item xs={12} sm={6}>
                        <TextField id='carbrand'
                                   variant='outlined'
                                   label='Car make'
                                   margin='normal'
                                   fullWidth
                                   required
                                   onChange={(e) => setCarMark(e.target.value)}

                        />
                        <TextField id='carmodel'
                                   variant='outlined'
                                   margin='normal'
                                   label='Car model'
                                   fullWidth
                                   required
                                   onChange={(e) => setCarModel(e.target.value)}

                        />
                        <TextField id='reqnumber'
                                   variant='outlined'
                                   margin='normal'
                                   label='Registration number'
                                   fullWidth
                                   required
                                   onChange={(e) => setRegNumber(e.target.value)}

                        />
                        <Button type='submit'
                                className={classes.formButton}
                                variant='contained'
                                color='primary'>Add car</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}