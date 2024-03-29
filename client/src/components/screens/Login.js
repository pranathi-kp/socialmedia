import React, { useState,useContext } from "react";
import {Link, useHistory} from 'react-router-dom';
import { Redirect } from "react-router-dom";
import {UserContext} from '../../App';
import M from 'materialize-css';

const Login = () => {
  const {state,dispatch} = useContext(UserContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const history = useHistory()
  const PostData = () =>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"Invalid Email", classes:"#c62828 red darken-3"})
    }
    else{
      
    fetch("/login",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          email,
          password
        })
    })
    .then(res=>(
      
      res.json()))
    .then(data=>{
      
      if(data.error){
        M.toast({html: data.error, classes:"#c62828 red darken-3"})
      }
      else{
        
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"SignedIn successfully",classes:"#2e7d32 green darken-3"})
        history.push('/')
      }
    })
    .catch(err=>{
      console.log(err)
    })
    }
  }

  if(!state)
  return(
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail((e.target.value))} ></input>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword((e.target.value))}></input>
        <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>PostData()}> Login </button>
        <h6 >
            <Link to="/signup">Don't have an account?</Link>
        </h6>
        <h6 >
            <Link to="/resetpassword">Forgot Password?</Link>
        </h6>
      </div>
    </div>
  );
  else
  return(
    <Redirect to="/" />
  );
};

export default Login;
