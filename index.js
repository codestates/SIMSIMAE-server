const express = require('express');
//미들웨어
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Url } = require('./models');

const app = express();
const port = 80;

app.use(cors({
    origin: true,
    methods: 'GET, POST, OPTIONS',
    credentials: true
}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//테스트용
app.get('/', async (req, res) => {
    const url = await Url.findOne();
    res.send(url);
})

//라우터 연결
//app.use('/user',)
//app.use('/url',)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});