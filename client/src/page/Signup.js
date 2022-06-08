import { React, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { url } from '../util/getUrl';
import img from "../image/signup.svg";
import { Text } from "../element"

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
    ? 'https://client.secretdiary.org'
    : 'https://server.secretdiary.org';

const Signup = (props) => {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [verPwd, setVerPwd] = useState('');
  const history = useNavigate();

  const signup = () => {
    console.log('ENV?', NODE_ENV);
    console.log('url?', url);

    if (user === '') {
      window.alert('잘못된 유저이름 형식입니다.');
      return;
    } else if (pwd === verPwd) {
      axios
        .post(
          // `${url}/signup`, 
          `https://server.secretdiary.org/signup`,
          {
          user: user,
          userName: userName,
          password: pwd,
        })
        .then(() => {
          history('/');
        })
        .catch((e) => console.error(e));
    }
  };
  const cancle = () => {
    history('/');
  };
  return (
    <Container>
      <Box1>
        <CharImg
        width="168px" 
        src ={img}/>
        <WelcText>입학을 환영합니다!</WelcText>
      </Box1>

      <Box2>
        <Text bold margin="5px" size="16px">
          회원가입
        </Text>
          <LoginInput 
            value={user}
            placeholder='이메일을 입력하세요'
            onChange={(e) => setUser(e.target.value)}
          />
          <LoginInput
            value={userName}
            placeholder='닉네임을 입력하세요'
            onChange={(e) => setUserName(e.target.value)}
          />
          <LoginInput
            value={pwd}
            placeholder='비밀번호를 입력하세요'
            type = 'password'
            onChange={(e) => setPwd(e.target.value)}
          />
          <LoginInput 
            value={verPwd}
            placeholder='비밀번호를 한번 더 입력해주세요'
            type = 'password'
            onChange={(e) => setVerPwd(e.target.value)}
          />
          <LoginButton onClick={signup}>
            회원가입
          </LoginButton>
          <LoginButton onClick={cancle}>
            취소
          </LoginButton>
          <Text  blod margin= "10px 10px 5px 142px" color="#868e96" size="12pt">
            계정이 이미 있으신가요? {" "}
            <TextButton size="12pt" onClick={cancle}>
              로그인
            </TextButton>
          </Text>
      </Box2>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const Box1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 225px;
  height: 560px;
  background-color: #f1f3f5;
  position: absolute;
  align-items: center;
  z-index: 0;
`;
const Box2 = styled.div`
  margin-top: 70px;
  margin-left: 250px;
  z-index: 10;
`;

const CharImg = styled.img`
  position: absolute;
  margin-left: 30px;
  margin-top: 180px;
`;

const WelcText = styled.text`
  position: absolute;
  margin-top: 300px;
  margin-left: 50px;
  font-size: 28px;
  font-weight: bold;
  color: #495057;
`;

const LoginInput = styled.input`
  width: 340px;
  height: 48px;
  border-radius: 0px;
  padding: 16px;
  margin: 5px;
  box-sizing: border-box;
  border: 1px solid #dcdddd;
  font-size: 16px;
  color: ${(props) => props.theme.main_black};
  background-color: ${(props) => props.theme.main_white};
  &:hover {
  }
`;

const LoginButton = styled.button`
  width: 340px;
  height: 48px;
  border-radius: 0px;
  padding: auto;
  margin: 5px;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.main_white};
  background-color: ${(props) => props.theme.main_green};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.main_green_h};
  }
`;

const TextButton = styled.span`
  color: ${(props) => props.theme.main_green};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Signup;
