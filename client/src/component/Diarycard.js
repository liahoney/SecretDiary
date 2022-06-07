import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
const Diarycard = () => {
    const [userinfo, setUserinfo] = useState({
        email: '',
        name: '',
        password: '',
        nickname: ''
      });
    // const [contentinfo, setContentinfo] = useState({
    //     createdAt:'', 
    //     weather:'', 
    //     content:'', 
    //     imgmain:'', 
    //     title:'' } );
    const [userdiary, setUserdiary] = useState([{
        content: '',
        createdAt: '',
        title: '',
        weather:'',
        imgmain:'',
      }])

      useEffect(() => {
        axios.get('https://server.secretdiary.org/diary', {
          params: {
            imgmain: userdiary.imgmain
          }
        }).then(res => setUserdiary(res.data))
      }, [])
  return (
    <div>
      <div className="diary-card-container">
      <div className="diary-image"></div>
      <div>{userinfo.nickname}</div>
      <div className="diary-text">
        <h2>제목:{userdiary.title}</h2>
        <div>날씨:{userdiary.weather}</div>
        <div className="diary-summary-row">
          <h5>그림:{userdiary.imgmain}</h5>
          <h5>일기:{userdiary.content}</h5>
          
        </div>
        <div className="diary-likes">{userdiary.createdAt}</div>
      </div>
    </div>
    </div>
  );
}

export default Diarycard;

// const MovieCard = ({ item }) => {
//     const { title, link, image, pubDate, userRating } = item;
//     return (
//       <div className="movie-card-container">
//         <div className="movie-image"></div>
//         <div className="movie-text">
//           <h2>{title}</h2>
//           <div>{`${pubDate}년도`}</div>
//           <div className="movie-summary-row">
//             <h5>평점</h5>
//           </div>
//           <div className="movie-likes">{`${userRating}/ 10`}</div>
//         </div>
//       </div>
//     );
//   };
