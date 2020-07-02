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
import Parkings from "./components/Parking/Parkings";
import ReserveParking from "./components/Parking/ReserveParking";
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <Route path='/parkings' component={Parkings}/>
                <PrivateRoute path='/parkingsubscriptions/:id' component={ReserveParking}/>
                <PrivateRoute path='/user' component={User}/>
                <PrivateRoute path='/addcar' component={AddingCarForm}/>
                <AdminComponent/>
            </div>
        </Provider>
    );
}

export default App;
