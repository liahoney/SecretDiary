require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const controllers = require('./controllers');
const fs = require('fs');
const https = require('https');
const { sequelize } = require("./models");
const multer = require('multer')

//////
/////

const mysql = require('mysql');
const path = require('path')
const bodyParser = require('body-parser');
const { getMaxListeners } = require('process');
const { response } = require('express');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lia0506*',
  database: 'SecretDiary',
  
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'https://localhost:4000',
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:80',
      'https://localhost:80',
      'http://secretdiary-bucket.s3-website.ap-northeast-2.amazonaws.com',
      'https://secretdiary-bucket.s3-website.ap-northeast-2.amazonaws.com',
      'https://server.secretdiary.org',
      'https://client.secretdiary.org',
      'api-elb.hyodee.link',
      /\.hyodee\.link$/,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
  })
);

app.use(cookieParser());
app.get('/', (req, res) => {
  console.log('health check');
  res.send('health check');
});
app.post('/getUser', (req,res) => {
  console.log('req.body',req.body)
  const sql = "SELECT * FROM users WHERE id = ?"
  con.query(sql,[req.body.id],function(err,result, fields){
    if(err) throw err;
    res.send(result)
  });
})
app.put('/userupdate',(req,res)=>{
  console.log('req',req.body)
  var sql = "UPDATE users SET password = ?, name = ? WHERE id = ?";
  con.query(sql,[req.body.password, req.body.name, req.body.id], function(err,result,fields){
    if(err) throw err;
    console.log('res',res)
    res.send('수정이 완료 되었습니다.')
  })
})


app.post('/login',  (req,response) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?"
  console.log('req.body.user',req.body.user)
  console.log('req.body.pwd',req.body.pwd)
  con.query(sql,[req.body.user, req.body.pwd],function(err,result, fields){
    if(err) throw err;
    console.log('result',result)
    console.log('response.data',response.data)
    response.send(result)
  });
});
// app.post('/login', controllers.login);

app.post('/signup', (req,res) => {
  const sql = "INSERT INTO users(email, createdAt, updatedAt, name, password, nickname) values(?,now(),now(),?,?,'helloworld')"
  
  con.query(sql,[req.body.user, req.body.userName,  req.body.password], function(err, result, fields){
    if(err) throw err;
    // console.log('fields',fields);
    // console.log('result', result);
    console.log('req: ',req.body);
    // console.log('res',res)
    res.send('h test')
  })
})
app.get('/signup', (req,res) => {
  const sql = "SELECT email, createdAt, updatedAt, name, password, nickname From `users`"
  
  con.query(sql,[req.body.user, req.body.userName,  req.body.password], function(err, result, fields){
    if(err) throw err;
    // console.log('fields',fields);
    // console.log('result', result);
    console.log('req: ',req.body);
    // console.log('res',res)
    res.send('등록이 완료 되었습니다.')
  })
})

// });

// app.get('/login', (req,res)=> {
// const sql = "select * from users"
// con.query(sql,function(err,result, fields){
//   if(err) throw err;
//   response.send(result)
// });
// });
// (req, res) => {
//   res.send('login checck 안녕테스트 페이지');
// });

// app.post('/login', (req,res) => res.send(req.body))

// (req, res) => {
  
//   res.send('login'+test);
// });

app.post('/logout', (req, res) => {
  console.log('logout?');
  res.send('logout test yeah');
});


app.post('/diary/cdiary', (req, res) => {
  const sql = "INSERT INTO Contents(id,imgmain,content,weather,title, createdAt, updatedAt) values(?,?,?,?,?,now(),now())"
  
  con.query(sql,[ req.body.id, req.body.imgmain, req.body.content,  req.body.weather, req.body.title, req.body.createdAt], function(err, result, fields){
    if(err) throw err;
    // console.log(sql)
    console.log('req.body', req.body)
    
    // console.log('res',res)
    res.send('등록이 완료 되었습니다.')
  })
});


// 다이어리 카드 불러오기 시작
app.get('/getDiary', (req,res)=> {
  const sql = "select * from contents"
  con.query(sql,function(err,result, fields){
    if(err) throw err;
    res.send(result)
  });
  });
  // 다이어리 카드 불러오기 끝
// app.get('/diary/cdiary', (req,res) => {
//   const sql = "SELECT * From `contents`"
  
//   con.query(sql,[req.body.title, req.body.content,  req.body.imgmain, req.body.weather], function(err, result, fields){
//     if(err) throw err;
//     // console.log('fields',fields);
//     // console.log('result', result);
//     // console.log('req: ',req.body);
//     console.log('res',res)
//     res.send(req.body)
//   })
// })
app.post('/diary/udiary', (req, res) => {
  console.log('udiary?');
  res.send('udiary test');
});

app.put('/diaryimage', (req, res) => {
  console.log('diary image?');
  res.send('diary image test');
});


app.put('/userimage', (req,res) => {
  console.log('userimage?');
  res.send('userimage test')
})
app.get('/userimage', (req,res) => {
  console.log('get userimage?');
  res.send('get userimage test')
})
app.get('/getimage', (req,res) => {
  console.log('getimage?');
  res.send({uploadimage})
})
app.delete('/deleteuser', (req,res) => {
  console.log('deleteuser?');
  res.send('delete user test')
})
app.post('/upload', (req,res) => {
  console.log('upload?')
  res.send('upload test')
})

app.get('/usercomment', (req,res) => {
  const sql = "INSERT INTO users(email, createdAt, updatedAt, name, password, nickname) values(?,now(),now(),?,?,'helloworld')"
  
  con.query(sql,[req.body.user, req.body.userName,  req.body.password], function(err, result, fields){
    if(err) throw err;
    // console.log('fields',fields);
    // console.log('result', result);
    // console.log('req: ',req.body);
    console.log('res',res)
    res.send('등록이 완료 되었습니다.')
  })
})

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));
const storage = multer.diskStorage({
  destination: "../client/src/public/img",
  filename: function(req, file, cb) {
    cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
})

app.post("/imageUpload", upload.single("file"), function(req, res, next) {
  res.send({
    filePath: req.file.filename
  });
});


// app.get('/accesstokenrequest', controllers.accessTokenRequest);
// app.get('/refreshtokenrequest', controllers.refreshTokenRequest);

const HTTPS_PORT = process.env.HTTPS_PORT || 80;

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('HTTPS'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('HTTP'));
}

module.exports = server;