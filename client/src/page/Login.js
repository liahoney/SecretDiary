import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try { 
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                
                { 
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                    
                },
               
               
            );
            console.log("똥")
            // console.log(JSON.stringify({ user, pwd }))
            // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
           
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
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
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/signup">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
 
// function Login() {
//     const [inputId, setInputId] = useState('')
//     const [inputPw, setInputPw] = useState('')
 
// 	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
//     const handleInputId = (e) => {
//         setInputId(e.target.value)
//     }
 
//     const handleInputPw = (e) => {
//         setInputPw(e.target.value)
//     }
 
// 	// login 버튼 클릭 이벤트
//     const onClickLogin = () => {
//         console.log('click login')
//     }
 
// 	// 페이지 렌더링 후 가장 처음 호출되는 함수
//     useEffect(() => {
//         axios.get('/')
//         .then(res => console.log(res))
//         .catch()
//     },
//     // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
//     [])
 
//     return(
//         <div>
//             <h2>Login</h2>
//             <div>
//                 <label htmlFor='input_id'>ID : </label>
//                 <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
//             </div>
//             <div>
//                 <label htmlFor='input_pw'>PW : </label>
//                 <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
//             </div>
//             <div>
//                 <button type='button' onClick={onClickLogin}>Login</button>
//             </div>
//         </div>
//     )
// }
 
// export default Login;

// // import React, {useState} from 'react';
// // import '../App.css'
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const Login = ({ handleResposeSuccess, setAuthenticate,setIsLogin}) => {
// //   const [userinfo, setUserinfo] = useState({
// //     email: '',
// //     password: '',
// //   });
// //   const [errormessage, setErrormessage] = useState('')
// //   const [errormessage2, setErrormessage2] = useState('')
// //   const handleInputValue = (key) => (e) => {
// //     setUserinfo({ ...userinfo, [key]: e.target.value });
// //   }
// //   const navigate = useNavigate();
// //     const loginUser = (event) => {
// //         event.preventDefault();
// //         console.log("login user function issue")
// //         setAuthenticate(true);
// //         navigate("/main")
// //     }
// //     const handleClickEvent = () => {
// //       if (!userinfo.email || !userinfo.email) {
// //         setErrormessage('이메일과 비밀번호를 입력해야 합니다')
// //       } else {
// //         setErrormessage('')
// //       }
// //       if (!errormessage) {
// //         axios.post('https://localhost:4000/login',{
// //           email: userinfo.email,
// //           password: userinfo.password
// //         })
// //         .then(res => {
// //           handleResposeSuccess(res.data)
// //           setIsLogin(true)
// //         })
// //         .catch(error => setErrormessage2('비밀번호가 일치하지 않습니다'))
// //       }
// //     }

// //   return (
// //     <div>
// //     <div>
// //     <button onClick={(event) => loginUser(event)}>로그인</button>
// //     <button>회원가입</button>
   
// //     </div>
// // <div>
// // <body>
// // <h1 className="title">Login</h1>
// // <div>
// //   <input type="email" onChange={handleInputValue('email')} placeholder="이메일"></input>
// // </div>
// // <div>
// //   <input type="password" onChange={handleInputValue('password')} placeholder="패스워드"></input>
// // </div>
// // <div>
// //   <button onClick={handleClickEvent}>login</button>
// // </div>
// // <div className="errormessage">{errormessage}</div>
// // <div className="errormessage">{errormessage2}</div>


// // </body>
// // </div>
// //     </div>
// //   );
// // }

// // export default Login;
