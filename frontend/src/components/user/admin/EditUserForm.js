import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import {getUserById} from "../../../Api/UserApi";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {editUser} from "../../../Api/UserApi";
import history from "../../../history";

const classes = {
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
}
export default class EditUserForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
            user: {}
        }
        this.edituserhandle = this.edituserhandle.bind(this)
    }

    async componentDidMount() {
        console.log(this.props.match.params.id)
        let data = await getUserById(this.props.match.params.id).then(request => {
            if (request.status < 300)
                return request.json()
            return null
        })
        if (data !== null) {
            this.setState({user: data.user})
            this.setState({email: data.user.email})
            this.setState({role: data.user.role})
        }

    }

    async edituserhandle(e) {
        e.preventDefault()
        if (this.state.password !== this.state.confirmPassword) {
            alert("Hasla sie nie zgadzaja")
            return
        }
        let obj = {email:this.state.email,password: this.state.password,role:this.state.role}
        let dane = await editUser(this.props.match.params.id,obj).then(request=>{
            if(request.status < 300){
                return request.json
            }
            return null
        })
        if (dane === null){
            alert("Problem podczas wysylania danych, haslo prawdopodobnie za krótkie albo nieprawidlowy email")
            return
        }
        history.push('/editusers')

    }

    render() {
        return (
            <Container>
                <Container style={classes.avatar}>
                    <Typography variant='h5' gutterBottom>Edit user</Typography>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </Container>
                <form onSubmit={(e) => this.edituserhandle(e)}>
                    <Grid container spacing={3} style={classes.gridform}>
                        <Grid item xs={12} sm={6}>
                            <TextField id='carbrand'
                                       variant='outlined'
                                       label='Email'
                                       margin='normal'
                                       value={this.state.email}
                                       onChange={(e) => this.setState({email: e.target.value})}
                                       fullWidth
                                       required

                            />
                            <TextField id='carbrand'
                                       variant='outlined'
                                       margin='normal'
                                       label='password'
                                       fullWidth
                                       type='password'
                                       onChange={(e) => this.setState({password: e.target.value})}
                                       required
                            />
                            <TextField id='carbrand'
                                       variant='outlined'
                                       margin='normal'
                                       label='confirm password'
                                       fullWidth
                                       type='password'
                                       onChange={(e) => this.setState({confirmPassword: e.target.value})}
                                       required
                            />
                            <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={this.state.role}
                                onChange={(e) => this.setState({role: e.target.value})}
                            >

                                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                                <MenuItem value={"REGULAR"}>REGULAR</MenuItem>
                            </Select><br/>
                                <Button type='submit'
                                        style={classes.formButton}
                                        variant='contained'
                                        color='primary'>Edit user</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
    )
    }
    }