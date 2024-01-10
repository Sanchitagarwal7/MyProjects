import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    let navigate = useNavigate();
    const [info, setInfo] = useState({name: "", email: "", password: ""});

    const host = "http://localhost:4999";
    
    const handleSubmit = async (event)=>{
        event.preventDefault(); //prevents refresh
        const response = await fetch(`${host}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: info.name, email: info.email, password: info.password})
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
                <input type="text" className="form-control item" name="name" id="username" placeholder="Username" onChange={handleChange} value={info.name}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" name="email" id="email" placeholder="Email" onChange={handleChange} value={info.email}/>
            </div>
            <div className="form-group">
                <input type="password" className="form-control item" name="password" id="password" placeholder="Password" onChange={handleChange} value={info.password}/>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-block create-account">Register</button>
            </div>

            <div className="d-flex justify-content-center"><NavLink to={"/login"}>Already have an account? Login then!</NavLink></div>

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

export default Register
