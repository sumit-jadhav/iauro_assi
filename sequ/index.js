const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { ServerApiVersion } = require("mongodb")
const MongoClient = require("mongodb").MongoClient

dotenv.config()

app.use(express.json())

const users = []

app.get("/users", authenticateToken, (req, resp) => {
  resp.json(users)
})

app.get("/shop", authenticateToken, (req, resp) => {
  database
    .collection("products")
    .find({})
    .toArray((err, result) => {
      if (err) throw err
      resp.send(result)
    })
})

app.post("/shop/addproduct", authenticateToken, (req, resp) => {
  let repo = database.collection("products").find({}).sort({ id: -1 }).limit(1)
  repo.forEach((obj) => {
    if (obj) {
      let pro = {
        id: obj.id + 1,
        product: req.body.product,
        price: req.body.price,
      }
      database.collection("products").insertOne(pro, (err, result) => {
        if (err) resp.status(500).send(err)
        resp.send("added succesfuly!!")
      })
    } else resp("no object present")
  })
})

app.delete("/shop/:id", authenticateToken, (req, resp) => {
  database
    .collection("products")
    .deleteOne({ id: parseInt(req.params.id) }, (err, result) => {
      if (err) throw err
      resp.send("product is deleted")
    })
})

app.put("/shop/:id", authenticateToken, (req, resp) => {
  let query = { id: parseInt(req.params.id) }
  let book = {
    id: parseInt(req.params.id),
    product: req.body.product,
    price: req.body.price,
  }
  let dataset = {
    $set: book,
  }
  database.collection("products").updateOne(query, dataset, (err, result) => {
    if (err) throw err
    resp.send(book)
  })
})

app.post("/users", async (req, resp) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const customer = { name: req.body.name, password: hashedPass }
    users.push(customer)
    resp.status(201).send()
  } catch {
    resp.status(500).send()
  }
})
app.post("/users/login", async (req, resp) => {
  const user = users.find((user) => user.name === req.body.name)
  if (user == null) {
    return resp.status(404).send("canoot find user")
  }
  //   try {
  if (await bcrypt.compare(req.body.password, user.password)) {
    //authenticate user in these if
    const name = req.body.name
    const user = { name: name }
    const accessToken = jwt.sign(user, process.env.TOKEN_T)
    resp.json({ accessToken: accessToken })
  } else {
    resp.send("not allowed")
  }
  //   }
  //   catch {
  // return resp.status(404).send("canoot find user!!!!!!!")
  //   }
})

function authenticateToken(req, resp, next) {
  const autHeader = req.headers["authorization"]
  const token = autHeader && autHeader.split(" ")[1]
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.TOKEN_T, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000, () => {
  MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true },
    (error, result) => {
      if (error) throw error
      database = result.db("Shop")
      console.log("connection successfull!!")
    }
  )
})
