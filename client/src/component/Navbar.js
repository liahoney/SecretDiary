import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../src/image/logo.svg"
const Navbar = ({ authenticate, setAuthenticate , handleLogout, isLogin}) => {
 
  let [width, setWidth] = useState(0);
  let navigate = useNavigate();
  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`?q=${event.target.value}`);
    }
  };
  return (
    <div>
      <div className="side-menu" style={{ width: width }}>
        <button className="closebtn" onClick={() => setWidth(0)}>
          &times;
        </button>
        <div className="side-menu-list" id="menu-list">
          
          
          <button ><a href="/">로그인</a></button>     
         <button> <a href="/diary">일기쓰기</a> </button>
         <button><a href="/mydiary">나의일기</a> </button>
          {/* <button><a href="/friends">친구목록</a></button> */}
          <button><a href="/mypage">마이페이지</a></button>
          <button><a href="/logout">로그아웃</a></button>
          
          
        </div>
      </div>
      <div className="nav-header">
        <div className="burger-menu hide">
          <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
        </div>
        <div className='wow'>
    {
        isLogin === false ? <nav className='wo'>
            
            <a href="/signup">회원가입</a>
            <a href="/">로그인</a>
            {/* <button onClick={handleLogout}>Logout</button> */}
            
        </nav> : 
        <nav>
            <a href="/diary">다이어리</a>
            {/* <a href="/friends">친구목록</a> */}
            <a href="/mypage">마이페이지</a>
            <a href="/main">메인페이지</a>
            <a href="/mydiary">마이다이어리</a>
            
            <button onClick={handleLogout}>Logout</button>
            
        </nav>
        }
    </div>
        {/* {isLogin ? (
          <div  onClick={() => setAuthenticate(false)}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그아웃할래?</span>
          </div>
        ) : (
          <div onClick={() => navigate("/main")}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그인해야지</span>
          </div>
        )} */}
      </div>

      <div className="nav-logo">
        <Link to="/diary">
          <img src={logo}
            width={100}
            
          />
        </Link>
      </div>
      <div class="nav-menu-area">
        {/* <ul className="menu">
          <li>
          <a href="/">로그인</a>
          <a href="/diary">일기쓰기</a>
          <a href="/mydiary">나의일기</a>
          <a href="/friends">친구목록</a>
          <a href="/mypage">마이페이지</a>
          <a href="/logout">로그아웃</a>
          </li>
        </ul> */}

        {/* <div className="search-box"> */}
          {/* <FontAwesomeIcon icon={faSearch} /> */}
          {/* <input type="text" placeholder="친구검색" onKeyPress={onCheckEnter} /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Navbar;