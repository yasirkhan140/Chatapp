import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {Routes,Route, useNavigate} from 'react-router-dom'

import {  useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [currentUser,setCurrentUser] = useState({});
  const PrivateRoute =({children})=>{
  const navigate = useNavigate();
  
    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
      
        if(user){
          setCurrentUser(user);
          
        }else{
          navigate('/login')
          return<p>something get wrong </p>           
        }
  
      })
    })
    return children    
  }
  return (
    <div className="App" >
      <Routes>
        
          <Route path ='/'index element ={<PrivateRoute><Home user ={currentUser}/></PrivateRoute>}/>
          <Route exact path ="/login" element={<Login/>}/>
          <Route exact path ="/register" element={<SignUp/>}/>
        
      </Routes>
      
    </div>
  );
}

export default App;
