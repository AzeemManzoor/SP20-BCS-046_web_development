import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";




const Login=()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
          navigate('/')
        }
    });
    const handleLogin=async()=>{
        console.warn(email,password);
        
        let result = await fetch("http://127.0.0.1:5000/login", {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          }
          });
          result = await result.json();
          console.warn(result);
          if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",JSON.stringify(result.auth))

            navigate('/')
          }
          else{
            alert("Please insert correct information")
          }
    }
    return(
        <div className="login">
          <h3>Login</h3>
            <input type="text" className="inputBox" placeholder="E-mail" 
            onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input
        className="inputBox"
        type="password"
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)} value={password}
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
            
        </div>
    )
}

export default Login;