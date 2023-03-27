const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// 사용자 입장에서 볼수 있는 api에 출력
app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!'});
});

//동작 중인지 확인
app.listen(port, () => console.log(`Listening on port ${port}`));