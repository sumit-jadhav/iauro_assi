const { response } = require("express")
const express = require("express")
const { ServerApiVersion } = require("mongodb")
const MongoClient = require("mongodb").MongoClient

const app = express()
app.use(express.json())
var database

app.get("/", (req, resp) => {
  resp.send("welcome to mangodb connction for shop")
})

app.get("/shop", (req, resp) => {
  database
    .collection("products")
    .find({})
    .toArray((err, result) => {
      if (err) throw err
      resp.send(result)
    })
})

app.post("/shop/addproduct", (req, resp) => {
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

app.delete("/shop/:id", (req, resp) => {
  database
    .collection("products")
    .deleteOne({ id: parseInt(req.params.id) }, (err, result) => {
      if (err) throw err
      resp.send("product is deleted")
    })
})

app.put("/shop/:id", (req, resp) => {
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

// app.put("/shop/:id", (req, resp) => {
//   let repo = {
//     id: parseInt(req.params.id),
//     product: req.body.product,
//     price: parseInt(req.body.price),
//   }
//   database
//     .collection("products")
//     .updateMany(
//       { id: parseInt(req.params.id) },
//       { $set: repo },
//       (err, result) => {
//         if (err) throw err
//         resp.send(repo)
//       }
//     )
// })

app.listen(9080, () => {
  MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true },
    (error, result) => {
      if (error) throw error
      database = result.db("Shop")
      console.log("connection succesfulllll")
    }
  )
})
