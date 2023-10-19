const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");

app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("client/database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
//connection.connect();

connection.connect(function(err){
  if(err){
    console.log(err)
  }else{
    console.log("SQL 연결 성공")
  }
})

const multer = require("multer"); // 중복되지 않는 이름으로 자동으로 배정
const upload = multer({ dest: './upload' });


// 사용자 입장에서 볼수 있는 api에 출력
app.get('/api/customers', (req, res) => {
  connection.query("SELECT * FROM management.CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
});
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static('./upload'));


app.post('/api/customers', upload.single('image'), (req, res) => {
  console.log("Received data:", req.body); // 포스트가 되었는지 확인
  let sql = 'INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?)';
  let image = "http://localhost:5000/image/" + req.file.filename;
  let name = req.body.name; // Use req.body to access the parsed request body
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(name);
  console.log(birthday);
  console.log(gender);
  console.log(job);
  console.log(image);
  let params = [image, name, birthday, gender, job];
  try{
    connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log("Data inserted successfully");
  })
  } catch(error){
    console.error("데이터 베이스에 데이터가 안들어감. :  ", error);
  }
  
});
//동작 중인지 확인
app.listen(port, () => console.log(`Listening on port ${port}`));
