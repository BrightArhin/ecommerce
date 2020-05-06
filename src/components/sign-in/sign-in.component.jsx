import React from 'react'
import './sign-in.styles.scss'
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"
import {auth, signInWithGoogle} from "../../firebase/firebase-utils"

class SignIn extends React.Component{
    constructor(){
        super()
        this.state = {
            email : "",
            password : ""
        }
    }

    handleSubmit = async (e) =>{
        e.preventDefault()
        const {email, password} = this.state
        try{
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({email : '', password : ''})
        }catch (e) {
            return new Error('Error Signing In', e.message)
        }
    }

    handleChange= e=>{
        const {name , value} = e.target
        this.setState({[name]: value})
    }

    render() {
        return(
            <div className="sign-in">
                <h1>I already have an Account</h1>
                <span>Sign in with email and password</span>

                <form action="" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        label="email"
                        handleChange={this.handleChange}
                        required/>

                    <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        label="password"
                        handleChange={this.handleChange}
                        required/>

                    <div className="buttons">
                        <CustomButton type="submit" value="Submit">Sign In</CustomButton>
                        <CustomButton  onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}Sign In with Google{' '}
                        </CustomButton>
                    </div>


                </form>
            </div>
        )
    }
}

export default SignIn
