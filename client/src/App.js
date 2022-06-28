import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Navbar from './component/Navbar';
import Login from './page/Login';
import Main from './page/Main';
// import Diary from './page/Diary';
// import Friends from './page/Friends';
import Signup from './page/Signup';
import Mypage from './page/Mypage';
import Mydiary from './page/Mydiary';
import Diary from './page/Diary'
// import Test from './page/Test';
import './App.css';
import axios from 'axios'

function App() {
  let [authenticate, setAuthenticate] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const history = useNavigate();
  const [userinfo, setUserinfo] = useState([]);
  const handleUserinfo = () => {
    setUserinfo({
      id: sessionStorage.getItem('id'),
      name: sessionStorage.getItem('name'),
      email: sessionStorage.getItem('email'),
      created_at: sessionStorage.getItem('created_at'),
      password : sessionStorage.getItem('password')
    }, () => console.log(userinfo))
  }
  const handleLogout = () => {
      sessionStorage.setItem('id', '')
      sessionStorage.setItem('pwd', '')
      sessionStorage.setItem('name', '')
      setIsLogin(false);
      history('/');
  };
  const handleResponseSuccess = (res) => {
    setIsLogin(true);
    history.push("/main")
  };
 
  return (
    <div>
      <Navbar 
      authenticate={authenticate} 
      setAuthenticate={setAuthenticate}
      setIsLogin={setIsLogin}
      isLogin={isLogin}
      handleLogout={handleLogout}
      />
      <Routes>
        <Route path='/' element={<Login 
        setAuthenticate={setAuthenticate}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleResposeSuccess={handleResponseSuccess}
        handleUserinfo = {handleUserinfo}
         />} />
        <Route path='/main' element={<Main isLogin = {isLogin} userinfo = {userinfo}/>} />
        <Route path='/diary' element={<Diary />} />
        {/* <Route path='/friends' element={<Friends />} /> */}
        <Route path='/signup' element={<Signup
         isLogin={isLogin} />} />
        <Route path='/mypage' element={<Mypage userinfo = {userinfo}
        handleLogout={handleLogout} />} />
        <Route path='/mydiary' element={<Mydiary />} />
      </Routes>
    </div>
  );
}

export default App;