const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routers/user');
const urlRouter = require('./routers/url');

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

//라우터 연결
app.use('/user', usersRouter)
app.use('/url', urlRouter)

app.listen(port, () => {
    console.log(`server listening on ${port}`);
});