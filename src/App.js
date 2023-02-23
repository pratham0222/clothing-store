import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./component/router/home/home.component";
import Navigation from "./component/router/navigation/navigation.component";
import Authentication from "./component/router/authentication/authentication.component";
import Shop from "./component/router/shop/shop.component";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}></Route>
        <Route path="shop" element={<Shop/>}></Route>
        <Route path="auth" element={<Authentication/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
