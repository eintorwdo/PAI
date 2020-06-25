import {observable,computed,action,decorate} from "mobx";

export default class MainStore{
    isLoged = false
    constructor(user) {
        if(user)
            this.isLoged = true
    }
    setLogged(value){
        this.isLoged = value
    }
    get getLogStatus(){
        return this.isLoged
    }
}
decorate(MainStore,{
    isLoged:observable,
    setLogged:action,
    getLogStatus:computed
})