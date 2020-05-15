import React, {useEffect, lazy, Suspense} from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'




import Header from "./components/header/header-component"


import {checkUserSession} from "./redux/user/user.actions"
import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect"
import {selectCurrentUser} from "./redux/user/user.selectors"
import ErrorBoundary from "./components/error-boundary/error-boundary.component"
import Spinner from "./components/spinner/spinner.component"


const HomePage = lazy(()=> import('./pages/homepage/homepage.component'))
const ShopPage = lazy(()=> import('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(()=>import('./pages/sign-in-and-sing-up/sign-in-and-sing-up.component'))
const CheckOutPage = lazy(()=>import("./pages/checkout/checkout.component"))

const App = ({checkUserSession, currentUser})=> {

    useEffect(()=>{
        checkUserSession()
    },[checkUserSession])

    return (
            <div >
                <Header />
                <Switch>
                    <ErrorBoundary>
                        <Suspense fallback={<Spinner/>}>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/shop" component={ShopPage}/>
                        <Route path="/signin" render={()=> currentUser ?
                            (<Redirect to={'/'}/>) :
                            (<SignInAndSignUpPage/>)} />
                        <Route exact path={'/checkout'} component={CheckOutPage}/>
                        </Suspense>
                    </ErrorBoundary>
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
