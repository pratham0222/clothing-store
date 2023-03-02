// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
// import { auth,signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils"
import SignInForm from "../../sign-in-form/sign-in-form.component";
import  SignUpForm from "../../sign-up-form/sign-up-form.component";
import {AuthenticationContainer} from './authentication.styles.jsx';

const Authentication = () =>{
    // useEffect( () => {
    //     async function fetchdata(){
    //     const response=await getRedirectResult(auth);
    //     if(response){
    //         const userDocRef=await createUserDocumentFromAuth(response.user);
    //     }
    // }
    // fetchdata();
    // },[])


    return (
        <AuthenticationContainer >
            <SignInForm/>
            <SignUpForm/>

        {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
        </AuthenticationContainer>


    )
}
export default Authentication;