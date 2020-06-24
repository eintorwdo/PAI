import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
export default function AddingCarForm(props) {
    const classes = useStyles()
    const [carMark, setCarMark] = useState("")
    const [carModel, setCarModel] = useState("")
    const carraddinghandle = async (e) => {
        e.preventDefault()
        console.log(carMark, carModel)
        let addDate = new Date().toISOString().slice(0, 10)
        console.log(addDate)
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
                                   label='Car mark'
                                   margin='normal'
                                   fullWidth
                                   required
                                   onChange={(e) => setCarMark(e.target.value)}

                        />
                        <TextField id='carbrand'
                                   variant='outlined'
                                   margin='normal'
                                   label='Car model'
                                   fullWidth
                                   required
                                   onChange={(e) => setCarModel(e.target.value)}

                        />
                        <Button type='submit'
                                className={classes.formButton}
                                variant='contained'
                                color='primary'>Add new car</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}