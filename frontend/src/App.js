import React from 'react';
import './App.css';
import ApplicationBar from "./components/shared/ApplicationBar";
import Login from "./components/auth/login";
import {Route} from 'react-router-dom'
import register from "./components/auth/register";
import {Provider} from "mobx-react";
import Cookies from 'js-cookie'
import MainStore from "./store/MainStore";
import PrivateRoute from "./components/shared/PrivateRoute";
import User from "./components/user/User";
import AddingCarForm from "./components/car/AddingCarForm";
function App(props) {
    let user = Cookies.getJSON('user')
    let stores = {
        mainStore: new MainStore(user ? user : null)
    }
    return (
        <Provider {...stores}>
            <div className="App">
                <ApplicationBar/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={register}/>
                <PrivateRoute path='/user' component={User}/>
                <PrivateRoute path='/addcar' component={AddingCarForm}/>
            </div>
        </Provider>
    );
}

export default App;
