import style from './Login.module.css';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { googleAuth, loginAuth } from '../../actions/index.js';
import { Formik, Field, Form, ErrorMessage } from 'formik'

const Login = () => {
  const dispatch = useDispatch();

  function successResponse(googleData) { dispatch(googleAuth(googleData)) }
  function failResponse(resp) { console.log('Error') }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password:''
        }}     

        validate={(values)=>{
          let errors ={};
          //Validate Email
          if(!values.email) {
            errors.email = "Ingrese su Email por favor";
          }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)){
            errors.email = "Ingrese un Email valido por favor";
          }

          //Validate Password
          if(!values.password){
            errors.password = "Ingrese su contraseña";
          }
          return errors;
        }}  

        onSubmit={(values,{resetForm})=>{
          dispatch(loginAuth(values));

           resetForm();
        }}      
      >
      {({ errors})=>(
          <Form className={style.frmLogin}>
            <h3>Login Here</h3>
            <label htmlFor='email'>Email</label>
            <Field type="email" placeholder="email@email.com" id="email" name='email'/>
            <ErrorMessage name='email' component={()=>(
              <div>{errors.email}</div>
            )}/>

            <label htmlFor='password'>Password</label>
            <Field type="password" placeholder="Password" id="password" name='password'/>
            <ErrorMessage name='password' component={()=>(
              <div>{errors.password}</div>
            )}/>

            <button type="submit">Log In</button>

            <GoogleLogin className={style.go}
              clientId="804485400642-ql0oec6nnarp74n4keo22bq9ou539gme.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={successResponse}
              onFailure={failResponse}
              cookiePolicy={'single_host_origin'}
            />
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Login;