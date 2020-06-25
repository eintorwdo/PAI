import React from "react";
import {Route,Redirect} from 'react-router-dom'
import {inject,observer} from "mobx-react";
import Cookies from 'js-cookie'
function AdministrationRoute({component:Component,...rest}){
    return(
        <Route
            {...rest} render={(props) =>
            (Cookies.getJSON('user').role === "ADMIN") ?
                (<Component {...props}/>) : (<Redirect to='/user'/>)
        }/>
    )
}
export default inject(stores => ({
    mainStore:stores.mainStore
}))(observer(AdministrationRoute))