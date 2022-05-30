import React, { useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../component/Navbar'
import axios from 'axios';


const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState(true);
  const [verify, setVerify] = useState('');
  const history = useNavigate();
  const user = {
    'id': 'yangyunho',
    'password' : '123456'
  }

  const modify = () => {
    axios.put(`/user`, {
      id: user.id,
      password: user.password
    })
    .then(res => {

    })
  };
  const cancel = () => {
    history(-1);
  };
  const modalIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const withdraw = () => {
    axios.delete(`/user`, {
      id: user.id,
      password: user.password
    })
    .then(res => {
      history('/')
    })
  }
  const modalPassword = () => {
    setChangePassword(!changePassword);
  };
  const checkHandler = () => {
    axios.get(`http://localhost:3001/user`, {
      params: {
        id: user.id
      }
    })
    .then(res => {
      if(res.data.user.password === password)
      setChangePassword(false)
    })
  }
  const passwordChange = () => {
    if(password === verify) {
      axios.put(`http://localhost:3001/user`, {
        id: user.id,
        password: user.password
      })
      .then(res => {
        history(-1);
      })
    }
  }
  return (
    <React.Fragment>
      <NavBar />
      <Wrap>
      <Profile>
        <PWrap>
          <Blogtitle placeholder={user.name}></Blogtitle>
        </PWrap>
      </Profile>

      <BottomWrap>
        <ModifyPassword onClick={modalPassword}>비밀번호 변경</ModifyPassword>
        {changePassword === true ? (
            <ModalBackdrop onClick={modalPassword}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <ModalContainer>
                  {checkPassword === true ?  <PasswordInfo placeholder='password'
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></PasswordInfo> :
                  <WrapPassword>
                  <PasswordInfo placeholder='password'
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></PasswordInfo>
                    <PasswordInfo placeholder='verify'
                      onChange={(e) => {
                        setVerify(e.target.value);
                      }}
                    ></PasswordInfo>
                    </WrapPassword>
                    }

                  {checkPassword === true?
                  <ModalButton onClick={checkHandler}>변경</ModalButton>
                  :<ModalButton onClick={passwordChange}>확인</ModalButton>}
                
                </ModalContainer>
              </ModalView>
            </ModalBackdrop>
          ) : null}

        <Modify onClick={modify}>수정</Modify>

        <Cancel onClick={cancel}>취소</Cancel>

        <Withdraw onClick={modalIsOpen}>회원탈퇴</Withdraw>
        {isOpen === true ? (
            <ModalBackdrop onClick={modalIsOpen}>
              <ModalView onClick={(e) => e.stopPropagation()}>
                <ModalContainer>
                  <ModalBtn onClick={withdraw}>회원탈퇴하시겠습니까?</ModalBtn>
                </ModalContainer>
              </ModalView>
            </ModalBackdrop>
          ) : null}
      </BottomWrap>
      </Wrap>
    </React.Fragment>
  );
};

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

