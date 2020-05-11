import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component"
import SignInAndSignUpPage from "./pages/sign-in-and-sing-up/sign-in-and-sing-up.component"
import CheckOutPage from "./pages/checkout/checkout.component"

import Header from "./components/header/header-component"


import {checkUserSession} from "./redux/user/user.actions"
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"
import {selectCurrentUser} from "./redux/user/user.selectors"



const App = ({checkUserSession, currentUser})=> {

    useEffect(()=>{
        checkUserSession()
    },[checkUserSession])

    return (
            <div >
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route path="/signin" render={()=> currentUser ?
                        (<Redirect to={'/'}/>) :
                        (<SignInAndSignUpPage/>)} />
                    <Route exact path={'/checkout'} component={CheckOutPage}/>
                </Switch>
            </div>
        );



}

const mapDispatchToProps = (dispatch)=>{
    return {
        checkUserSession : () => dispatch(checkUserSession()),
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
