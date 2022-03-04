const express = require("express")
const req = require("express/lib/request")
const mysql = require("mysql2")

// to creates connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee",
  password: "SUmi15@@",
})

db.connect((err, results) => {
  if (err) throw err
  var results = "my sql connected"

  func_a(results)
  //console.log("my sql connecteddddd")
})

const app = express()
app.use(express.json())

//to create the database
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE employee"
//   db.query(sql, (err, results) => {
//     if (err) throw err

//     console.log(results)
//     res.send("Database created.....")
//   })
// })

//to check is first request
// app.get("/", (req, res) => {
//   let sql = "SELECT * FROM employees"

//   let query = db.query(sql, (err, result) => {
//     if (err) throw err
//     console.log(result)
//     res.send("all details are shown check console!!!!")
//   })
// })

//get details of all employees
app.get("/getemp", (req, res) => {
  let sql = "SELECT * FROM employees;"

  let query = db.query(sql, (err, results) => {
    if (err) throw err
    func_a(results)
    //console.log(result)
    res.send("all details are shown check console!!!!")
  })
})

function func_a(result) {
  console.log(result)
}

//details of one employee
app.get("/getemp/:id", (req, res) => {
  const emp_no = parseInt(req.params.id)
  let sql = "SELECT * FROM employees where emp_no=?;"

  let query = db.query(sql, [emp_no], (err, results) => {
    if (err) throw err
    func_a(results)
    //console.log(results)
    res.send("details of given emp######")
  })
})

//to update
app.put("/getemp/:id", (req, res) => {
  const emp_no = parseInt(req.params.id)
  var f_name = req.body.first_name
  var l_name = req.body.last_name
  var b_date = req.body.birth_date
  var g = req.body.gender
  var no = parseInt(req.params.id)
  var resu = [[f_name], [l_name], [b_date], [g], [no]]
  let sql =
    "UPDATE employees SET first_name=?,last_name=?,birth_date=?,gender=? WHERE emp_no=? ;"

  let query = db.query(sql, resu, (err, results) => {
    if (err) throw err
    func_a(results)
    //console.log(results)
    res.send("details of given emp updates ")
  })
})
//to add the data in employee table

app.post("/addemp", (req, res) => {
  var first_name = req.body.first_name
  var last_name = req.body.last_name
  var birth_date = req.body.birth_date
  var gender = req.body.gender
  var emp_no = null

  let sql =
    "INSERT INTO employees(emp_no,birth_date,first_name,last_name,gender) Values ?;"
  var Values = [[emp_no, birth_date, first_name, last_name, gender]]
  let query = db.query(sql, [Values], (err, results) => {
    if (err) throw err
    func_a(results)
    //console.log(results)
    res.send("details of given emp######")
  })
})

// app.post("/addemp", (req, res) => {
//   let emp = req.body
//   var sql =
//     "SET @birth_date=?;SET @first_name=?;SET @last_name=?; SET @gender=?; CALL EmployeeAddOrEdit(@birth_date,@first_name,@last_name,@gender);"
//   db.query(
//     sql,
//     [emp.birth_date, emp.first_name, emp.last_name, emp.gender],
//     (err, result) => {
//       if (err) throw err
//       console.log("post done !!!!!!!!!!!")
//     }
//   )
// })

app.delete("/delemp/:id", (req, res) => {
  const emp_no = parseInt(req.params.id)
  let sql = "DELETE FROM employees WHERE emp_no=?;"

  let query = db.query(sql, [emp_no], (err, results) => {
    if (err) throw err
    //func_a(results)
    //console.log(results)
    res.send("employee deleted###")
  })
})

//create tables
// app.get('/createemployeetable',(req,resp)=>{
//     let sql="CREATE TABLE "
// })

app.listen("3000", () => {
  var results = "server started on port 3000"
  func_a(results)
})
