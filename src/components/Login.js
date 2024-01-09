import React, {useState} from 'react'
import { useNavigate } from 'react-router';

const Login = () => {
      let navigate = useNavigate();
      const [info, setInfo] = useState({email: "", password: ""});
      
      const handleSubmit = async (event)=>{
          event.preventDefault(); //prevents refresh
          const response = await fetch("http://localhost:4999/api/auth/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({email: info.email, password: info.password})
          });

          const json = await response.json();

          if(json.success){
              localStorage.setItem('token', json.token);
              navigate('/');
              console.log("Successfully Login!");
          }
          else{
            console.log("User dosent exist");;
          }
          console.log(json);
      }

      const handleChange = (event)=>{
          setInfo({...info, [event.target.name]: event.target.value});
          console.log(info);
      }

    return (
      <>
        <div className="registration-form text-white">
          <form onSubmit={handleSubmit}>
              <div className="form-icon">
                  <span><i className="icon icon-user"></i></span>
              </div>
              <div className="form-group">
                  <input type="text" className="form-control item" name="email" id="email" placeholder="Email" onChange={handleChange} value={info.email}/>
              </div>
              <div className="form-group">
                  <input type="password" className="form-control item" name="password" id="password" placeholder="Password" onChange={handleChange} value={info.password}/>
              </div>

              <div className="form-group">
                  <button type="submit" className="btn btn-block create-account">Login</button>
              </div>
          </form>
          <div className="social-media">
              <h5>Sign up with social media</h5>
              <div className="social-icons">
                  <a href="?"><i className="btn-social-icon btn-google fa fa-google" title="Google"></i></a>
                  <a href="?"><i className="btn-social-icon btn-github fa fa-github" title="GitHub"></i></a>
              </div>
          </div>
        </div>
  </>
  )
}

export default Login
