const express = require('express');
const app = express();
//
// BODY PARSER
const parser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('libary.sqlite');

app.use(express.static("public"));
app.use(parser.json());

//
// INSERT BOOK IN DATABASE
//
app.post('/newBook/', function (req, res) {

  const student = req.body;

  const sql = `INSERT INTO books VALUES(${parseInt(student.fid)},"${student.fauthor}","${student.ftitle}","${student.fgenre}",${parseInt(student.fprice)})`;
  db.run(sql, (error) => {
    if (error) {
      res.status(404);
      res.send({ 'error': `db error: ${error.message}` });

    } else {
      res.json({ 'result': 'OK' });
    }
  });
});

//
//SELECT author FORM DATABASE
//
app.get('/author/:id', async function (req, res) {
 
  const id = `"${req.params.id}"`;
  const sql = `SELECT * FROM books WHERE author LIKE '%' || ${id} || '%'`;

  try {
    const results = await query(sql, res);
    console.log(`resonse sent . respnse:${results}`);

  } catch (error) {
    console.error(`response sent with err ${error.message}`);
  }
});

//
//SELECT title FORM DATABASE
//
app.get('/title/:id', async function (req, res) {
 
  const id = `"${req.params.id}"`; 
  const sql = `SELECT * FROM books WHERE title LIKE '%' || ${id} || '%'`;

  try {
    const results = await query(sql ,res);
    console.log(`resonse sent . respnse:${results}`);

  } catch (error) {
    console.error(`response sent with err ${error.message}`);
  }
});

//
//SELECT genre FORM DATABASE
//
app.get('/genre/:id', async function (req, res) {
 
  const id = `"${req.params.id}"`;
  const sql = `SELECT * FROM books WHERE genre LIKE '%' || ${id} || '%'`;

  try {
    const results = await query(sql, res);
    console.log(`resonse sent . respnse:${results}`);

  } catch (error) {
    console.error(`response sent with err ${error.message}`);
  }
});
//
// SELECT ALL FROM BOOKS
//
app.get('/allBooks',async function (req, res) {
  const sql = 'SELECT * FROM books';

  try{
     const results = await query(sql,res); 
    console.log(`resonse sent . respnse:${results}`);
  
  }catch(error){
    console.error(`response sent with err ${error.message}`);
  } 

});

//
// QUERY DATABASE
//
function query(sql, res) {

  const promise = new Promise(function (resolve, reject) {

    db.all(sql, (error, results) => {
      if (error) {
        res.status(500);
        res.send({ 'error': `DB error ${error.message}` });
        reject(error);
      }
      else {

        if (results.length == 0) {
          res.status(404);
          res.send({ 'error': 'DB does not exits' });
          resolve(results);

        } else {
          res.json(results);
          resolve(results);
        }
      }
    });
  });

  return promise;
}

//
// LISTEN 3000
//
app.listen(3000, function () {

  console.log("Server")

});