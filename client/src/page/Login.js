import { useRef, useState, useEffect, useContext} from "react";
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import React from "react";
import { useNavigate } from "react-router-dom";

const {
  NODE_ENV,
  // REACT_APP_API_DOMAIN,
  // REACT_APP_EC2_HTTP,
  // REACT_APP_EC2_HTTPS,
} = process.env;
// export const url =
//   NODE_ENV === 'development' ? REACT_APP_EC2_HTTP : REACT_APP_API_DOMAIN;

const url =
process.env.NODE_ENV === 'production'
  ? 'https://server.secretdiary.org'
  : (process.env.NODE_ENV === 'development' 
  ? 'http://localhost:80' : 'https://server.secretdiary.org');

const Login = ({setAuthenticate, isLogin, handleResponseSuccess, setIsLogin, handleUserinfo }) => {
  // console.log('isLogin',isLogin)
  const navigate = useNavigate();
  
  // console.log('ENV?', NODE_ENV);
  // console.log('url?', url);
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [nickName, setNickName] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [ id, setId] = useState(null)

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login user function issue")
    setAuthenticate(true);
    navigate("/")

    try {
      const response = await axios.post(
        `${url}/login`,{
          user : user,
          pwd : pwd
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      ).then((res)=>{
        if(res.data.length == 0){
          setUser('');
          setPwd('');
          setSuccess(false);
          setIsLogin(false)
        }else{
          axios.post(
            `${url}/getUser`,{
              id : res.data[0].id
            },
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
          ).then(res => {
            console.log('res = ',res.data[0].password)
            setSuccess(true);
            setIsLogin(true)
            setNickName(res.data[0].name)
            sessionStorage.setItem('id',res.data[0].id)
            sessionStorage.setItem('name',res.data[0].name)
            sessionStorage.setItem('email',res.data[0].email)
            sessionStorage.setItem('created_at',res.data[0].created_at)
            sessionStorage.setItem('password',res.data[0].password)
            handleUserinfo()    
          })
          .catch(function(error) {
            console.log("실패");
          })
         
        }

      }
      );

      
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      
      
     
      handleResponseSuccess()
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      // errRef.current.focus();

    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>{nickName} is logged in!</h1>
          <br />
          <p>
            <a href='/main'>Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className='line'>
              {/*put router link here*/}
              <a href='/signup'>Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;