import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {SignInContainer,ButtonsContainer}  from  './sign-in-form.styles.jsx';
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () =>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () =>{
        await signInWithGooglePopup();
    }

    const handleChange= (event) =>{
        const {name, value} =event.target;
        setFormFields({...formFields,[name]:value});
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("Incorrect Password!!!");
                    break;
                case 'auth/user-not-found':
                    alert("Email is not registered!!");
                    break;
                default: console.log(error);
            }
        }

    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with Email and Password</span>
            <form onSubmit={handleSubmit} >

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password"  value={password}/>

                <ButtonsContainer>
                    <Button children="Sign In" buttonType={BUTTON_TYPE_CLASSES.base} type="submit" />
                    <Button children="Google sign in" buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}  />
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;