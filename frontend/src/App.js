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
import AdminComponent from "./components/user/admin/AdminComponent";
import MainView from "./components/shared/MainView";
import Plans from "./components/plan/plans";
function App(props) {
    let user = Cookies.getJSON('user')
    let stores = {
        mainStore: new MainStore(user ? user : null)
    }
    return (
        <Provider {...stores}>
            <div className="App">
                <ApplicationBar/>
                <Route exact path={'/'} component={MainView}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={register}/>
                <Route path='/subscriptions' component={Plans}/>
                <PrivateRoute path='/user' component={User}/>
                <PrivateRoute path='/addcar' component={AddingCarForm}/>
                <AdminComponent/>
            </div>
        </Provider>
    );
}

export default App;
