import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Navbar from './component/Navbar';
import Login from './page/Login';
import Main from './page/Main';
// import Diary from './page/Diary';
import Diary from './page/Diary'
import Friends from './page/Friends';
import Signup from './page/Signup';
import Mypage from './page/Mypage';
import Mydiary from './page/Mydiary';
import './App.css';
import axios from 'axios'


function App() {
  let [authenticate, setAuthenticate] = useState(false);
  const [userimage, setUserimage] = useState('default.png')
  const [isLogin, setIsLogin] = useState(true);
  const history = useNavigate();
  // const handleUserinfo = () => {
  //   setUserinfo({
  //     user: sessionStorage.getItem('user'),
  //     pwd: sessionStorage.getItem('pwd'),
  //     userName: sessionStorage.getItem('userName'),
      
  //   }, () => console.log(userinfo))
  // }

  const [comment, setComment] = useState({
    content: '',
    movieId: '',
    userId: ''
  })
  const handleLogout = () => {
    axios.post('https://server.secretdiary.org/signup').then((res) => {
      sessionStorage.setItem('user', '')
      sessionStorage.setItem('pwd', '')
      sessionStorage.setItem('userName', '')
      setIsLogin(false);
      history('/');
    });
  };
  const handleResponseSuccess = (res) => {
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
         />} />
        <Route path='/main' element={<Main />} />
        <Route path='/diary' element={<Diary
        userimage={userimage}
        setUserimage={setUserimage}
        handleLogout={handleLogout}
        handleResponseSuccess={handleResponseSuccess}
        setIsLogin={setIsLogin}
        comment={comment}
        setComment={setComment} />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/signup' element={<Signup
         isLogin={isLogin} />} />
        <Route path='/mypage' element={<Mypage 
        handleLogout={handleLogout}
        handleResponseSuccess={handleResponseSuccess}
        setIsLogin={setIsLogin} 
        />} />
        <Route path='/mydiary' element={<Mydiary 
        setUserimage={setUserimage}
        userimage={userimage}
        handleLogout={handleLogout}
        handleResponseSuccess={handleResponseSuccess}
        setIsLogin={setIsLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
