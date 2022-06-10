import style from './Login.module.css';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { googleAuth, loginAuth } from '../../actions/index.js';
import { useState } from 'react';

const Login = ()=>{
  const dispatch = useDispatch();
  const [form, setForm] = useState({email: '', password: ''});

  function successResponse(googleData){dispatch(googleAuth(googleData))}
  function failResponse(resp){console.log('Error')}
  function handlerChange(e){
    setForm({...form, [e.target.name]: e.target.value})
  }
  function handlerSubmit(e){
    e.preventDefault();
    if (form.email && form.password) {
      dispatch(loginAuth(form));
    }else{
      alert('Complete la información');
    }
  }

  return (
    <>
      <form onSubmit={(e)=>{handlerSubmit(e)}}>
        <h3>Login Here</h3>
        <label>Email</label>
        <input onChange={(e)=>{handlerChange(e)}}  type="email" placeholder="Email or Phone" name='email' value={form.email}/>

        <label>Password</label>
        <input onChange={(e)=>{handlerChange(e)}} type="password" placeholder="Password" name='password' value={form.password}/>

        <button>Log In</button>

        <GoogleLogin className={style.go}
          clientId="804485400642-ql0oec6nnarp74n4keo22bq9ou539gme.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={successResponse}
          onFailure={failResponse}
          cookiePolicy={'single_host_origin'}
        />
      </form>
    </>
  )
}

export default Login;