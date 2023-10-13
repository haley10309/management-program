const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const fs = require('fs');

app.use(express.json());
const cors = require("cors");
app.use(cors());

const data = fs.readFileSync('client/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user : conf.user,
  password : conf.password,
  port : conf.port,
  database : conf.database
});
connection.connect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 사용자 입장에서 볼수 있는 api에 출력
app.get("/api/customers", (req, res) => {
  connection.query(
    "SELECT * FROM management.CUSTOMER",
    (err,rows,fields)=> {
      res.send(rows);
    }
  )
});

//동작 중인지 확인
app.listen(port, () => console.log(`Listening on port ${port}`));
