import React, {useState} from 'react'
import './sign-up.styles.scss'
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"
import {connect} from 'react-redux'
import {signUpStart} from "../../redux/user/user.actions"

const SignUp  = ({signUpStart})=> {

    const [userCredentials , setUserCredentials] = useState(
        {email: '', password:'', confirmPassword: '', displayName:''})

    const {email, password,confirmPassword, displayName} = userCredentials

    const handleSubmit = async(e)=>{
        e.preventDefault();
        signUpStart(email, password,confirmPassword, displayName)

    }

    const handleChange = (e)=>{
        const {name, value} = e.target
        setUserCredentials({...userCredentials, [name]: value})
    }

    return (
            <div className={'sign-up'}>
                <form action="" onSubmit={handleSubmit}>
                    <h1 className={'title'}>I do not have an account</h1>
                    <span>Fill the form below to SinUp</span>

                    <FormInput
                        name={'displayName'}
                        type={'text'}
                        value={displayName}
                        label={'DisplayName'}
                        handleChange={handleChange}
                        required
                    />
                    <FormInput
                        name={'email'}
                        type={'email'}
                        label={'Email'}
                        value={email}
                        handleChange={handleChange}
                        required
                    />
                    <FormInput
                        name={'password'}
                        type={'password'}
                        value={password}
                        label={'Password'}
                        handleChange={handleChange}
                        required
                    />
                    <FormInput
                        name={'confirmPassword'}
                        type={'password'}
                        value={confirmPassword}
                        label={'confirmPassword'}
                        handleChange={handleChange}
                        required
                    />
                    <CustomButton type={'submit'}>SignUp</CustomButton>
                </form>
            </div>
        );

}
const mapDispatchToProps = dispatch=> ({
    signUpStart : (email, password, confirmPassword, displayName)=> dispatch(signUpStart({email, password, confirmPassword, displayName}))
})

export default connect(null, mapDispatchToProps)(SignUp)
