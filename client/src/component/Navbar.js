import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../src/image/logo.svg"
import styled from 'styled-components';
import Modal from "react-modal";
import { Grid } from "../element"
import search from '../image/search.svg';
import closeButton from '../image/closeButton.svg'
import Login from '../page/Login';
import Signup from '../page/Signup';

const Navbar = ({ authenticate, setAuthenticate , handleLogout, isLogin}) => {
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`?q=${event.target.value}`);
    }
  }
  /*const [isLogin, setIsLogin] = useState(false)*/ 
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onClickModal = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <React.Fragment>
      <HeaderContainer>
        <Grid is_flex padding="16px">
          <Grid>
              <img
                width="100px"
                margin="100px"
                src={logo}
                onClick={() => {
                  navigate("/");
                }}
              />
          </Grid>    
          {isLogin ? (
            <Grid is_flex width="auto" margin="16px">
              <SearchContainer to="/search">
                <img width="18px" src={search} />
              </SearchContainer>
              <WriteButton
                onClick={() => {
                  setAuthenticate(false)
                }}
              >
                로그아웃
              </WriteButton>
            </Grid>
          ) : (
            <Grid is_flex width="auto" margin="16px">
              <SearchContainer to="/search">
                <img width="18px" src={search} />
              </SearchContainer>

              <LoginButton onClick={() => setModalIsOpen(true)}>
                로그인
              </LoginButton>
              <Modal isOpen={modalIsOpen} close={closeModal} style={modalStyle}>
                {isLoginMode ? (
                  <Login onClickModal={onClickModal} />
                ) : (
                  <Signup onClickModal={onClickModal} />
                )}
                <CloseButton
                  src={closeButton}
                  onClick={closeModal}
                />
              </Modal>
            </Grid>
          )}
        </Grid>
      </HeaderContainer>
    </React.Fragment>
  );
};

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(247, 247, 247, 0.8)",
    transition: "opacity 2000ms ease-in-out",
  },
  content: {
    width: "650px",
    height: "510px",
    margin: "auto",
    border: "none",
    boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
  },
};

const CloseButton = styled.img`
  width: 11px;
  position: absolute;
  top: 30px;
  right: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  ${(prop) => prop.theme.responsiveContainer};
  width: 100%;
  max-width: 1444px;
  margin: auto;
  height: 48px;
  padding: 16px;
  display: flex;
  box-sizing: border-box;
`;

const WriteButton = styled.button`
  width: 90px;
  height: 33px;
  border-radius: 33px;
  margin: 0px 12px 0px 0px;
  padding: 7px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.main_black};
  background-color: #ffffff;
  border: 1.5px solid;
  border-color: ${(props) => props.theme.main_black};
  outline: none;
  &:hover {
    background-color: ${(props) => props.theme.main_black};
    color: ${(props) => props.theme.main_white};
    cursor: pointer;
  }
`;

const LoginButton = styled.button`
  min-width: 80px;
  height: 33px;
  border-radius: 33px;
  margin: 5px;
  padding: 7px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.main_white};
  background-color: ${(props) => props.theme.main_black};
  border: 1.5px solid;
  border-color: ${(props) => props.theme.main_black};
  outline: none;
  &:hover {
    opacity: 0.3;
    cursor: pointer;
  }
`;

const SearchContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: inherit;
  width: 37px;
  height: 37px;
  border-radius: 10rem;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

export default Navbar;