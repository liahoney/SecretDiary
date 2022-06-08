import React, { useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { useHistory } from 'react-router-dom'

import NavBar from '../component/Navbar'
import axios from 'axios';


const MyPage = (userinfo,handleLogout) => {
  
  const history = useNavigate();
const [updateinfo, setUpdateinfo] = useState({
  password: '',
  confirmPassword: '',
  name: ''
});

const [password, setPassword] = useState(sessionStorage.getItem('password'))
const [name, setName] = useState(sessionStorage.getItem('name'))
const [id, setId] = useState(sessionStorage.getItem('id'))
const [email, setEmail] = useState(sessionStorage.getItem('email'))
const [created_at, setCreated_at] = useState(sessionStorage.getItem('created_at'))

const [errormessage, setErrormessage] = useState('')
const [errormessage2, setErrormessage2] = useState('')


const handleInputValue = (key) => (e) => {
  setUpdateinfo({ ...updateinfo, [key]: e.target.value });
  validate()
}
const validate = () => {
  if (updateinfo.password.length < 6 || updateinfo.password.length > 12) {
    setErrormessage('비밀번호는 6자리 이상 12자리 이하입니다')
  } else if (updateinfo.password !== updateinfo.confirmPassword) {
    setErrormessage('비밀번호가 일치하지 않습니다')
  } else if (updateinfo.nickname.length < 1 || updateinfo.nickname.length > 6) {
    setErrormessage('닉네임은 1자리 이상 6자리 이하입니다')
  } else {
    setErrormessage('')
  }
}
const url =
process.env.NODE_ENV === 'production'
  ? 'https://client.secretdiary.org'
  : (process.env.NODE_ENV === 'development' 
  ? 'http://localhost:80' : 'https://server.secretdiary.org');

const handleClickUpdate = () => {
 
    axios.put( `${url}/userupdate`, {
    id: Number(window.sessionStorage.getItem('id')),
    password: (password==='')?sessionStorage.getItem('password'):password,
    name: (name==='')?sessionStorage.getItem('name'):name
    })
    .then(history('/'))
    .catch((e) => console.error(e));
  
}
 
  return (
  
          <div className='signup'>
         
            <h1 className="title">User Update</h1>
            <div>
              <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="패스워드 "></input>
            </div>
            <div>
              <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="패스워드 확인"></input>
            </div>
            <div>
              <input type="nickname" onChange={(e) => setName(e.target.value)} placeholder = {name}></input>
            </div>
            <div>
              <input type="email"  value = {email} disabled></input>
            </div>
            <div>
              <input type="text"  value = {created_at} disabled></input>
            </div>
            <div>
              <button onClick={handleClickUpdate}>회원정보수정</button>
            </div>
            <div className="errormessage">{errormessage}</div>
            <div className="errormessage">{errormessage2}</div>
          
        </div>
   
  );
};
const Signup = styled.div`
  text-align: center;
  background-color: black;
  margin: 10% auto;
`
const Wrap = styled.div`
  width: 768px;
  margin: 0 auto;
`;

const WrapPassword = styled.div`
`;

const PWrap = styled.div`
  width: 768px;
  display: flex;
  margin: 0 0 20px 20px;
  flex-direction: column;
`;

const BottomWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 200px;
`;

const Modify = styled.button`
  border: none;
  color: #fff;
  font-weight: bold;
  background-color: rgb(18, 184, 134);
  font-size: 16px;
  height: 40px;
  margin: 12px 15px 0 0;
  padding: 0 20px;
  cursor: pointer;
  border-radius: 5px;
`;

const ModifyPassword = styled.button`
  border: none;
  color: #fff;
  font-weight: bold;
  background-color: rgb(18, 184, 134);
  font-size: 16px;
  height: 40px;
  margin: 12px 15px 0 0;
  padding: 0 20px;
  cursor: pointer;
  border-radius: 5px;
`;

const Cancel = styled.button`
  border: none;
  float: right;
  color: #fff;
  font-weight: bold;
  background-color: rgb(18, 184, 134);
  font-size: 18px;
  height: 40px;
  padding: 8px 20px;
  margin: 12px 15px 0 0;
  cursor: pointer;
  border-radius: 5px;
`;

const Withdraw = styled.button`
  border: none;
  float: right;
  color: #fff;
  font-weight: bold;
  background-color: red;
  font-size: 18px;
  height: 40px;
  padding: 8px 20px;
  margin: 12px 15px 0 0;
  cursor: pointer;
  border-radius: 5px;
`;

const Profile = styled.div`
  display: flex;
  justify-content: start;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
  padding-bottom: 30px;
  margin: 80px 0;
`;

const ProfileImage = styled.img`
  display: block;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
`;

const Blogtitle = styled.input`
  font-size: 24px;
  width: 300px;
  height: 50px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalContainer = styled.div`
  display: grid;
  align-items: center;
`;

const ModalBtn = styled.button`
  align-items: center;
  border: none;
  float: right;
  color: #fff;
  font-weight: bold;
  background-color: red;
  font-size: 18px;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  align-items: center;
  border: none;
  float: right;
  color: #fff;
  font-weight: bold;
  background-color: orange;
  font-size: 18px;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  display: flex;
  border-radius: 10px;
  background-color: #ffffff;
  width: 500px;
  height: 500px;
  justify-content: center;
`;

const PasswordInfo = styled.input`
flex: 1 1 0%;
border-top-left-radius: 2px;
border-bottom-left-radius: 2px;
padding: 1rem;
font-size: 1rem;
border-top: 1px solid rgb(222, 226, 230);
border-bottom: 1px solid rgb(222, 226, 230);
border-left: 1px solid rgb(222, 226, 230);
border-image: initial;
border-right: 1px solid rgb(222, 226, 230);
margin-bottom: 1em;
width: 85%;
overflow: hidden;
`;



export default MyPage;