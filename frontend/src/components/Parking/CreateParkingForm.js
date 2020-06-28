import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createParking} from "../../Api/ParkingApi";
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
    formButton:{
        marginTop:"1.2rem"
    }

}))
export default function CreateParkingForm(props) {
    const classes = useStyles()
    const [address,setAddress] = useState("")
    const [city,setCity] = useState("")
    const [spaces,setSpaces] = useState(0)
    const [freeSpaces,setFreeSpaces] = useState(0)
    const carraddinghandle = async (e) => {
        e.preventDefault()
        let obj = {
            city:city,
            address:address,
            numberOfSpaces:spaces,
            freeSpaces:freeSpaces
        }
        let dane = await createParking(obj).then(request=>{
            if(request.status < 300)
                return request.json()
            return null
        })
        if (dane === null){
            alert("Server error or\n Parking space must be beetwen 1 a 50\n Or too short addres name")
            return
        }
        history.push('/user')
    }
    return (
        <Container className={classes.first}>
            <Container className={classes.avatar}>
                <Typography variant='h5' gutterBottom>Add new parking</Typography>
                <Avatar>
                    <LocalParkingIcon fontSize="large"/>
                </Avatar>
            </Container>
            <form onSubmit={(e) => carraddinghandle(e)}>
                <Grid container spacing={3} className={classes.gridform}>
                    <Grid item xs={12} sm={6}>
                        <TextField id='city'
                                   variant='outlined'
                                   label='City'
                                   margin='normal'
                                   fullWidth
                                   required
                                   onChange={(e) => setCity(e.target.value)}

                        />
                        <TextField id='address'
                                   variant='outlined'
                                   margin='normal'
                                   label='Address'
                                   fullWidth
                                   required
                                   onChange={(e) => setAddress(e.target.value)}

                        />
                        <TextField
                            id="standard-number"
                            label="Parking spaces"
                            type="number"
                            value={spaces}
                            onChange={(e)=>setSpaces(parseInt(e.target.value))}
                            style={{marginTop:"1rem"}}
                        />
                        <br/>
                        <TextField
                            id="standard-number"
                            label="Free parking spaces"
                            type="number"
                            value={freeSpaces}
                            onChange={(e)=>setFreeSpaces(parseInt(e.target.value))}
                            style={{marginTop:"1rem"}}
                        />
                        <br/>
                        <Button type='submit'
                                className={classes.formButton}
                                variant='contained'
                                color='primary'>Add new Parking</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}