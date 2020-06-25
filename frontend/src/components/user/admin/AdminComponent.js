import React from "react";
import {Route} from 'react-router-dom'
import ParkingEdit from "./ParkingEdit";
import SubscriptionEdit from "./SubscriptionEdit";
import ParkingSpaceEdit from "./ParkingSpaceEdit";
import AdministrationRoute from "../../shared/AdministrationRoute";
import CreateParkingForm from "../../Parking/CreateParkingForm";
import UserEdit from "./UserEdit";
export default function AdminComponent(props){
    return (
        <div>
            <AdministrationRoute path='/editparking' component={ParkingEdit} />
            <AdministrationRoute path='/editsubscription' component={SubscriptionEdit} />
            <AdministrationRoute path='/editparkingspace' component={ParkingSpaceEdit} />
            <AdministrationRoute path='/createparking' component={CreateParkingForm}/>
            <AdministrationRoute path='/editusers' component={UserEdit}/>
        </div>
    )
}