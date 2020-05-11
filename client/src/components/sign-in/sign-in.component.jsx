import React, {useState} from 'react'
import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"

import {emailSignInStart, googleSignStart} from "../../redux/user/user.actions"
import {connect} from 'react-redux'


const SignIn = ({emailSignStart,googleSignStart}) =>{

    const [userCredentials, setUserCredentials] = useState({email: '', password:''});

   const{email, password} = userCredentials

   const handleSubmit = async (e) =>{
        e.preventDefault()
        emailSignStart(email, password)
    }

   const handleChange= e=>{
        const {name , value} = e.target
        setUserCredentials({...userCredentials , [name]: value})
    }

        return(
            <div className="sign-in">
                <h1>I already have an Account</h1>
                <span>Sign in with email and password</span>

                <form action="" onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        label="email"
                        handleChange={handleChange}
                        required/>

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        label="password"
                        handleChange={handleChange}
                        required/>

                    <div className="buttons">
                        <CustomButton type="submit" value="Submit">Sign In</CustomButton>
                        <CustomButton type="button" onClick={googleSignStart} isGoogleSignIn>
                            {' '}Sign In with Google{' '}
                        </CustomButton>
                    </div>


                </form>
            </div>
        )

}

const mapDispatchToProps = (dispatch)=> ({
    googleSignStart : ()=> dispatch(googleSignStart()),
    emailSignStart : (email, password) =>dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)
