import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom';
const Navbar = ({authenticate, setAuthenticate}) => {
const navigate = useNavigate();  
  const menulist = ['일기쓰기', '나의일기', '친구목록', '마이페이지', '로그아웃']
  return (
    <div>
      <div className="menu-area">
        <ul className="menu-list">
          {menulist.map(menu => <li>{menu}</li>)}
        </ul>
      </div>
      <div>
      <div className="nav-header">
        {authenticate? (
            <div onClick={()=> navigate("/")}>
             <FontAwesomeIcon icon={faUser}/>
             <div>로그아웃</div>
            </div>
        ): (
            <div onClick={()=> navigate("/")}>
            <FontAwesomeIcon icon={faUser}/>
            <span>로그인 하러가기</span>
            </div>
        )}
       </div>
      </div>
    </div>
    

  );
}

export default Navbar;
