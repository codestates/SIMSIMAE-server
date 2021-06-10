const express = require('express');
//미들웨어
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const port = 80;
const mysql = require('mysql');

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
// app.get('/', (req, res) => {
//     res.send('Hello world!');
// })


var config = {
    host: 'simsimae-database.cxlafetwv62w.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'songyuijo28',
    database: 'simsimae',
    port: 23306,
    
}

const test = mysql.createConnection(config);

test.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
    }
});


const db = test.query('SELECT url FROM Url', function (err, result) {
    if (err) throw err;
    console.log(result)
});

// mysql 서버연결 test 성공했다! 


//라우터 연결
//app.use('/user',)
//app.use('/url',)


app.listen(port, () => {
    console.log(`server listening on ${port}`);
}); 