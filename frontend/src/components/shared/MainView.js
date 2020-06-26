import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import history from "../../history";

const useStyles = makeStyles({
    root: {
        marginTop:"1rem"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container:{
        marginTop:"1.4rem",
        padding: "1.3rem"
    }
});
export default function MainView(props) {
    const classes = useStyles();
    return(
        <Container className={classes.container}>
            <Card  className={classes.root} variant="outlined">
                <CardContent onClick={()=>history.push('/parkings')}>
                    <Typography variant="h5" component="h2">
                       Parkings
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                       ---
                    </Typography>
                    <Typography variant="body2" component="p">
                        Choice place in parking
                    </Typography>
                </CardContent>
            </Card>
            <Card  className={classes.root} variant="outlined">
                <CardContent onClick={()=>history.push('/subscriptions')}>
                    <Typography variant="h5" component="h2">
                        Subscription plans
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        ---
                    </Typography>
                    <Typography variant="body2" component="p">
                        Choice subscriptions
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}