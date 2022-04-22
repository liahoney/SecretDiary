import React from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({setAuthenticate}) => {
  const navigate = useNavigate();
    const loginUser = (event) => {
        event.preventDefault();
        console.log("login user function issue")
        setAuthenticate(true);
        navigate("/main")
    }

  return (
    <div>
    <button onClick={(event) => loginUser(event)}>로그인</button>
    <button>회원가입</button>
    <button>로그아웃</button>
    </div>
  );
}

export default Login;
