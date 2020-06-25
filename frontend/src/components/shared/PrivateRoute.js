import React from "react";
import {Route,Redirect} from 'react-router-dom'
import {inject,observer} from "mobx-react";

function PrivateRoute({component:Component,...rest}){
    return(
        <Route
            {...rest} render={(props) =>
            rest.mainStore.getLogStatus ?
                (<Component {...props}/>) : (<Redirect to='/login'/>)
        }/>
    )
}
export default inject(stores => ({
    mainStore:stores.mainStore
}))(observer(PrivateRoute))