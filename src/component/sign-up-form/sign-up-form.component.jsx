import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {SignUpContainer} from './sign-up-form.styles.jsx';
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () =>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleChange= (event) =>{
        const {name, value} =event.target;
        setFormFields({...formFields,[name]:value});
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(password!==confirmPassword){
            alert("Password Does not matches!!");
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();
        }catch(error){
            if(error){
                if(error.code==="auth/email-already-in-use"){
                    alert("Use Different Email, its already in USE");
                }
                console.log("User creation error",error.message);
            }
        }

    }

    return (
        <SignUpContainer>
            <h2>Dont have an account?</h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handleSubmit} >
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password"  value={password}/>

                <FormInput label="Confirm Password" type="password" required onChange={handleChange}  name="confirmPassword" value={confirmPassword}/>

                <Button children="Sign Up" buttonType={BUTTON_TYPE_CLASSES.base} type="submit" />
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;