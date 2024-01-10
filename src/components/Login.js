import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
      let navigate = useNavigate();
      const [info, setInfo] = useState({email: "", password: ""});

      const host = "http://localhost:4999";
      
      const handleSubmit = async (event)=>{
          event.preventDefault(); //prevents refresh
          const response = await fetch(`${host}/api/auth/login`, {
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
          }
      }

      const handleChange = (event)=>{
          setInfo({...info, [event.target.name]: event.target.value});
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

              <div className="d-flex justify-content-center"><NavLink to={"/register"}>Don't have an account yet? Sign Up then!</NavLink></div>

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
