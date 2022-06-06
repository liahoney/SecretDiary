import React,{useCallback , useState, useRef, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import sunny from "../image/weather/1.png"
import rainy from "../image/weather/2.png"
import cloudy from "../image/weather/3.png"
import windy from "../image/weather/4.png"
import snowy from "../image/weather/5.png"

const colors = [
    "red",
    "green",
    "yellow",
    "black",
    "blue",
    "orange",
    "purple",
    "silver",
    "gold",
  ]

const {
   NODE_ENV,
   // REACT_APP_API_DOMAIN,
   // REACT_APP_EC2_HTTP,
   // REACT_APP_EC2_HTTPS,
} = process.env;
  // export const url =
  //   NODE_ENV === 'development' ? REACT_APP_EC2_HTTP : REACT_APP_API_DOMAIN;

function Diary() {
  // 캔버스  함수 시작
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      ctx.current.lineWidth = 10;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({
        x,
        y
      })
    }
  }, [lastPosition, mouseDown, selectedColor, setPosition])

  const download = async () => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    setMouseDown(true)
  }

  const onMouseUp = (e) => {
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }

    // const handleSaveClick = () => {
  //   download();
  //   const data = firstCanvas.current.getSaveData();
  // }

  //캔버스 함수 끝

  //다이어리 텍스트 함수 시작

  
  //다이어리 텍스트 함수 끝
  const url =
  process.env.NODE_ENV === 'production'
    ? 'https://client.secretdiary.org'
    : (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:80' : 'https://server.secretdiary.org');

  const register = () => {
    console.log('ENV? = ', NODE_ENV);
    console.log('url? = ', url);

       axios
        .post(`${url}/diary/cdiary`, {
            title: title,
            content: content,
            weather: currentClick
        })
        .then(() => {
          history('/');
        })
        .catch((e) => console.error(e));
    
  };
  

/////// 날짜 함수 끝나는 곳
const [currentClick, setCurrentClick] = React.useState(null);
const [prevClick, setPrevClick] = React.useState(null);
// const [current, setCurrent] = React.useState('')
const GetClick = (e) => {
  setCurrentClick(e.target.id);
  console.log(e.target.id);
};

React.useEffect(
    (e) => {
      if (currentClick !== null) {
        let current = document.getElementById(currentClick);
        console.log(current);
        current.style.color = "black";
        current.style.borderBottom = "10px solid";
        current.style.borderBottomColor = "#1c28f4";
      }

      if (prevClick !== null) {
        let prev = document.getElementById(prevClick);
        prev.style.color = "#bebcbc";
        prev.style.borderBottom = "none";
      }
      setPrevClick(currentClick);
    },
    [currentClick]
  );
/////// 드로잉 함수 들어가는 곳
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
/////// 드로잉 함수 들어가는 곳
const history = useNavigate();

return (
    <Main>  

        <Main1>
            <DateWeather>
                <Todaydate theme={true}>
                    <div>{null}</div>
                </Todaydate>
                <Weather theme={true}>
                    <Image>
                         <WeatherImg id="cloudy" src={cloudy} theme={null} onClick={GetClick} />
                    </Image>
                    <Image>
                  <WeatherImg id="sunny" src={sunny} theme={null} onClick={GetClick} />
               </Image>
               <Image>
                  <WeatherImg id="rainy" src={rainy} theme={null} onClick={GetClick} />
               </Image>
               <Image>
                  <WeatherImg id="snowy"  src={snowy} theme={null} onClick={GetClick} />
               </Image>
               <Image>
                  <WeatherImg id="windy" src={windy} theme={null} onClick={GetClick} />
               </Image>
                </Weather>
            </DateWeather> 
        </Main1>

        <Main2>
        <div className="App">
          <canvas
            style={{
            border: "3px solid #000"
            }}
            width={1370}
            height={500}
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onMouseMove={onMouseMove}
        />
            <br />
        <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
        >
            {
            colors.map(
                color => <option key={color} value={color}>{color}</option>
            )
            }
        </select>
        <Button2 onClick={clear}>Clear</Button2>
        <Button2 onClick={download}>Download</Button2>
      
    </div>
        </Main2>

        <Main3>
        <Title>
            제목: 
            <TypeTitle
                value={title}
                maxLength={15}
                placeholder="제목을 15자내로 입력해주세요"
                onChange={(e) => setTitle(e.target.value)}
                id="typeTitle"
            />
        </Title>
        <Content>
            <TypeContent
                value={content}
                maxLength={149}
                placeholder="일기를 입력해주세요"
                onChange={(e) => setContent(e.target.value)}
                id="typeContent"
            />
        </Content>
        <Counter id="counter">({null} / 최대 150자)</Counter>
        </Main3>
        <Buttons>    
            <Button onClick={register}>등록하기</Button>
        </Buttons>    
    </Main>
)
}
export default Diary;

const Main = styled.div`
background-color: #f6f6ee;
box-sizing: border-box;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
flex-grow: 1;
@media only screen and (max-width: 480px) {
  min-width: 400px;
  height: 70%
}
`;

const Buttons = styled.div`
   flex-grow: 0.5;
   padding-right: 1rem;
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: flex-end;
`;

const Button = styled.button`
   border: 2px solid black;
   background: #f6f6ee;
   margin-right: 1rem;
  margin-bottom: 1rem;
   font-size: 1rem;
   font-weight: bold;
   :hover {
      cursor: pointer;
      background: black;
      color: #f6f6ee;
      transition: all 1s;
   }
   @media only screen and (max-width: 480px) {
      font-size: 0.8rem;
   }
`;
/////날짜 css 시작//////////
const Main1 = styled.div`
   border: 3px solid black;
    margin: 1rem 1rem 1rem 1rem;
    border-radius: 0.5rem;
   flex-grow: 0.5;
   display: flex;
   @media only screen and (max-width: 480px) {
      height: 20%;
   }
`;

const DateWeather = styled.div`
   /* border-bottom: 3px solid red; */
   flex-grow: 1;
   display: flex;
   flex-direction: column;
`;

const Todaydate = styled.div`
   border-bottom: ${(props) => (props.theme === true ? "3px solid black" : "none")};
   display: flex;
   height: 100%;
   padding: 0.3rem 0.7rem;
   justify-content: center;
   align-items: center;
   font-size: 1.3rem;
   font-weight: bold;
   letter-spacing: 0.5rem;
   @media only screen and (max-width: 480px) {
      font-size: 1rem;
      padding-left: 1rem;
      letter-spacing: 0.2rem;
   }
`;

const Weather = styled.div`
   /* border-bottom: 3px solid black; */
   display: ${(props) => (props.theme === true ? "flex" : "none")};
   justify-content: center;
   align-items: center;
   flex-wrap: wrap;
   @media only screen and (max-width: 480px) {
      width: 100%;
      height: 60%;
   }
`;

const Image = styled.div`
   /* border: 3px solid red; */
   width: 4rem;
   display: flex;
   justify-content: center;
   #rainy {
      width: 3.3rem;
      @media only screen and (max-width: 480px) {
         width: 2.5rem;
      }
   }
   #snowy {
      width: 3.3rem;
      @media only screen and (max-width: 480px) {
         width: 1.9rem;
      }
   }

    #sunny {
        width: 4.3rem;
        @media only screen and (max-width: 480px) {
            width: 2.5rem;
        }
    }
   @media only screen and (max-width: 480px) {
      margin-right: 0rem;
      width: 2.5rem;
   }
`;

const WeatherImg = styled.img`
   /* border: 3px solid black; */
   width: 3.5rem;
   alt: "";
   :hover {
      cursor: pointer;
   }
   animation: ${(props) => (props.theme === true ? "motion 0.35s linear 0s infinite alternate" : "")};
   margin-top: 0;
   @keyframes motion {
      0% {
         margin-left: 0px;
      }
      100% {
         margin-right: 15px;
      }
   }
   @media (max-width: 480px) {
      width: 2.3rem;
      margin: 0.1rem;
   }
`;

/////날짜 css 끝//////////

//// 드로잉 css 시작//////
const Main2 = styled.div`
background-color: #f6f6ee;
box-sizing: border-box;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
flex-grow: 1;
@media only screen and (max-width: 480px) {
  min-width: 400px;
  height: 70%
}
`;

const Button2 = styled.button`
   border: 2px solid black;
   background: #f6f6ee;
   margin-right: 0.1rem;
  margin-left: 1rem;
   font-size: 0.8rem;
   font-weight: bold;
   :hover {
      cursor: pointer;
      background: black;
      color: #f6f6ee;
      transition: all 1s;
   }
   @media only screen and (max-width: 480px) {
      font-size: 0.8rem;
   }
`;
/// 드로잉 css 끝////

/// 다이어리 텍스트 css시작
const Main3 = styled.div`
// border: 5px solid black;
flex-grow: 6;
display: flex;
flex-direction: column;
`;

const Title = styled.div`
border: 3px solid black;
border-radius: 1rem;
flex-grow: 1;
margin: 1rem 1rem 1rem 1rem;
padding-left: 1rem;
display: flex;
align-items: center;
font-size: 1.5rem;
@media only screen and (max-width: 480px) {
    font-size: 1.2rem;    
    margin: 2rem 1rem 1rem 1rem;
}
`;
const TypeTitle = styled.input`
background-color: rgb(246, 246, 238);
::focus{
    outline: none;
}
border: none;
border-bottom: 1px;
margin-top: 0.2rem;
margin-left: 0.8rem;
height: 40%;
width: 70%;
font-family: "Nanum Brush Script", cursive;
font-size: 1.6rem;
display: flex;
@media only screen and (max-width: 480px) {
    font-size: 1.3rem;
}
`;

const Content = styled.div`
border: 3px solid black;
border-radius: 1rem;
flex-grow: 6;
margin: 0rem 1rem 1rem 1rem;
display: flex;
justify-content: center;
align-items: center;
@media only screen and (max-width: 480px) {
    font-size: 1.5rem;
    margin: 0rem 1rem 0rem 1rem;
}
`;

const TypeContent = styled.textarea`
border: none;
width: 95%;
height: 90%;
font-family: "Nanum Brush Script", cursive;
font-size: 1.5rem;
background-color: rgb(246, 246, 238);
outline: none;
resize: none;
line-height: 3rem;
letter-spacing: 0.5rem;
margin: 1rem 1rem 1rem 1rem;
overflow: hidden;
:focus {
 outline: none;
}
@media only screen and (max-width: 480px) {
    font-size: 1.2rem;
}
`;

const Counter = styled.div`
    margin: 0rem 1rem 1rem 1rem;
    padding-left: 0.3rem;
    color: "#aaa";
    font-size: 1rem;
@media only screen and (max-width: 480px) {
    margin: 0.2rem 3rem 2rem 1rem;
}
`;
/// 다이어리 텍스트 css끝