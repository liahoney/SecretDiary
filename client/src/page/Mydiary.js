import React,{useEffect, useState} from 'react'
import axios from 'axios'


const Mydiary = () => {
  // const [contentsData, setContentsData] = useState({
  //   id : '',
  //   userid : '',
  //   title : '',
  //   weather : '',
  //   contest: '',
  //   imgmain : '',
  //   created_at : '',
  //   updated_at : ''
    
  // });
  // const handleContentsData = (data) => {
  //   setContentsData({
  //     id : data.id,
  //     userid: data.userid,
  //     title : data.title,
  //     weather : data.weather,
  //     contest : data.contest,
  //     imgmain : data.imgmain,
  //     created_at : data.created_at,
  //     updated_at : data.updated_at
  //   })
  // }
  const [contentsData, setContentsData] = useState([]);

  const url =
  process.env.NODE_ENV === 'production'
    ? 'https://client.secretdiary.org'
    : (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:80' : 'https://server.secretdiary.org');


  // const dataList = axios.get(`${url}/getDiary`);
  function dataList() {
    axios.get(`${url}/getDiary`)
    .then(function(response) {
      setContentsData(response.data);
        console.log("성공");
    })
    .catch(function(error) {
        console.log("실패");
    })
    
}

if(contentsData.length > 0) {
  console.log(contentsData)
  return (
    <div className="diary-div">
    {contentsData.map(data => (
      // (data.id < 10) ? (
        <div key={data.id}>
          <img src={require(`../public/img/${data.imgmain}`)}  className="diary-card" style={{ margin: "auto" }}></img>
                 
                  <h1>제목 : {data.title}</h1>
                  <p>날씨 : {data.weather}</p>
                  <p>일기 : {data.content}</p>
                  <p>날짜 : {data.createdAt}</p>
                  <p>그림 : {data.imgmain}</p>
              </div>
          //     )
          // : null
      ))}
      </div>
  );
} else { // 조회 데이터 존재하지 않을 경우
  return (
      <div>
          <button onClick={dataList}> 불러오기 </button>
      </div>
  )
}
}



export default Mydiary;
