import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
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
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with Email and Password</span>
            <form onSubmit={handleSubmit} >

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password"  value={password}/>

                <div className="buttons-container" >
                    <Button children="Sign In" buttonType="" type="submit" />
                    <Button children="Google sign in" buttonType="google" type="button" onClick={signInWithGoogle}  />
                </div>
            </form>
        </div>
    )
}

export default SignInForm;