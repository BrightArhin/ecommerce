import React from 'react'
import './sign-up.styles.scss'
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"
import {auth, createUserProfileDocument} from "../../firebase/firebase-utils"

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email : "",
            password : "",
            displayName : "",
            confirmPassword : ""
        }
    }

    handleSubmit = async(e)=>{
        e.preventDefault()
        const {email, password, displayName, confirmPassword} = this.state
        if(password!==confirmPassword){
            alert('Password do not match')
            return
        }
        try{
           const {user} = await auth.createUserWithEmailAndPassword(email, password)
           await createUserProfileDocument(user, {displayName})
            this.setState({
                email : "",
                password : "",
                displayName : "",
                confirmPassword : ""

            })
        }catch (e) {
            return new Error('Error', e.message)
        }


    }
    handleChange = (e)=>{
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className={'sign-up'}>
                <form action="" onSubmit={this.handleSubmit}>
                    <h1 className={'title'}>I do not have an account</h1>
                    <span>Fill the form below to SinUp</span>

                    <FormInput
                        name={'displayName'}
                        type={'text'}
                        value={this.state.displayName}
                        label={'DisplayName'}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        name={'email'}
                        type={'email'}
                        label={'Email'}
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        name={'password'}
                        type={'password'}
                        value={this.state.password}
                        label={'Password'}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        name={'confirmPassword'}
                        type={'password'}
                        value={this.state.confirmPassword}
                        label={'confirmPassword'}
                        handleChange={this.handleChange}
                        required
                    />
                    <CustomButton type={'submit'}>SignUp</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp
