var express = require('express');
var mysql = require('mysql');
var app = express();

//フォームの値を受け取るために必要な典型文
app.use(express.urlencoded({extended: false}));

//DBへの接続情報
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'seiya224',
    database: 'lunchtestDB'
  });

  //DBへの接続失敗時にエラーを表示する
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });

app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
        res.render('index.ejs');
        }
    );
  });

  app.post('/confirmation', (req, res) => {
    var today = new Date()
    if (req.body.rice === undefined){
      req.body.rice = 0;
    }
    console.log(req.body.rice)
    connection.query(
      'INSERT INTO orders(orderDate,orderUserID,rice,orderCount) VALUES(?,?,?,?)',
      [today,1,req.body.rice,req.body.OrderCount],
        (error, results) => {
          connection.query(
          'SELECT * FROM orders',
          (error, results) => {
        res.render('result.ejs',{orderTable: results});
         }
       );
     }
    )
  });
    
app.listen(3000);