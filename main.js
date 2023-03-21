const express = require('express');
const mysql = require('mysql');
const app = express();

//テスト　ログインアカウントの取得******
var os = require('os');
//全情報
console.log(os.userInfo());
//ユーザー名のみ
console.log(os.userInfo().username);

//************************************

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
          console.log(results);
        res.render('index.ejs');
        }
    );
  });

app.listen(3000);