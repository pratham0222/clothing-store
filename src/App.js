import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./component/router/home/home.component";
import Navigation from "./component/router/navigation/navigation.component";
import Authentication from "./component/router/authentication/authentication.component";
import Shop from "./component/router/shop/shop.component";
import Checkout from "./component/router/checkout/checkout.component";
import { useEffect} from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";

const App=()=> {
  const dispatch=useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });
    return unsubscribe;
},[]);
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}></Route>
        <Route path="shop/*" element={<Shop/>}></Route>
        <Route path="auth" element={<Authentication/>}></Route>
        <Route path="checkout" element={<Checkout/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
