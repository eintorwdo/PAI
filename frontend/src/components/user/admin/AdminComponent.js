import React from "react";
import ParkingEdit from "./ParkingEdit";
import SubscriptionEdit from "./SubscriptionEdit";
import ParkingSpaceEdit from "./ParkingSpaceEdit";
import AdministrationRoute from "../../shared/AdministrationRoute";
import CreateParkingForm from "../../Parking/CreateParkingForm";
import UserEdit from "./UserEdit";
import EditUserForm from "./EditUserForm";
import CarsEdit from "./CarsEdit";
import CreatePlanForm from "../../plan/createformplan";
export default function AdminComponent(props){
    return (
        <div>
            <AdministrationRoute path='/editparking' component={ParkingEdit} />
            <AdministrationRoute path='/editsubscription' component={SubscriptionEdit} />
            <AdministrationRoute path='/editparkingspace' component={ParkingSpaceEdit} />
            <AdministrationRoute path='/createparking' component={CreateParkingForm}/>
            <AdministrationRoute path='/editusers' component={UserEdit}/>
            <AdministrationRoute path='/edituser/:id' component={EditUserForm}/>
            <AdministrationRoute path='/editcars' component={CarsEdit}/>
            <AdministrationRoute path='/createplan' component={CreatePlanForm} />
        </div>
    )
}