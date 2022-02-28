const { application } = require("express")
const express = require("express")

const app = express()

app.use(express.json())

const coustomer = [
  { firstName: "John", age: 27 },
  { firstName: "James", age: 32 },
  { firstName: "Robert", age: 45 },
]

app.get("/", (req, resp) => {
  resp.send("welcome to the coustomer details")
})

app.get("/customer", (req, resp) => {
  resp.send(coustomer)
})

app.get("/customer/:firstName", (req, resp) => {
  const cust = coustomer.find((v) => v.firstName === req.params.firstName)
  if (!cust) resp.status(404).send("coustomer name invalid")
  resp.send(cust)
})

// app.get("/customer/:age", (req, resp) => {
//   const age = coustomer.find((v) => v.age === parseInt(req.params.id))
//   if (!age) resp.status(404).send("age not match with any customer")
//   resp.send(age)
// })

app.listen(3000)
